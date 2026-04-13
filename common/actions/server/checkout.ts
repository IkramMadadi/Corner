import customerModel from "&common/Customer";
import guestModel from "&common/Guest";

import type { CustomerHydratedDocument } from "!common/generated/models/Customer";
import { checkoutMessages } from "@common/messages/checkout";
import { orderMessages } from "@common/messages/orders";
import { getOnlyValidPoints } from "@common/utils/global/Points";
import { addMonths } from "date-fns";
import type { Types } from "mongoose";
import loadWebsiteData from "~common/websiteCache";
import { createOrder } from "./orders";
import Session from "&common/Session";
import connectToMongoDB from "~common/db";

export async function checkoutAsGuest(
	guest: RegisterGuestI,
	checkout: CartI<string>,
	locale: LanguagesI,
	sessionId?: string,
): Promise<ResponseI<PublicOrderI>> {
	try {
		await connectToMongoDB();

		if (sessionId) {
			const sessionLock = await Session.findOneAndUpdate({ _id: sessionId, done: false }, { done: true });
			if (!sessionLock) {
				console.warn(`Duplicate request blocked for session ${sessionId}`);
				throw new Error("Order is already being processed");
			}
		}

		const website = await loadWebsiteData();
		const [firstName, ...names] = guest.name.trim().split(/\s+/);
		const lastName = names.length > 0 ? names.join(" ") : "-";

		const guestToCreate: BaseCustomerI<Types.ObjectId> = {
			website: website._id,
			personalInformation: { firstName, lastName },
			phone: guest.phone,
			kind: "Guest",
		};

		const guestD = await guestModel.create(guestToCreate);
		try {
			const [orderD] = await createOrder(checkout, website, guestD._id, locale);

			if (sessionId) {
				await Session.findByIdAndDelete(sessionId).catch((e) => console.warn("Cleanup error", e));
			}

			return {
				success: true,
				message: checkoutMessages["order-created-successfully"][locale],
				data: JSON.parse(JSON.stringify(orderD)),
				statusCode: 200,
			};
		} catch (err) {
			if (sessionId) {
				await Session.findByIdAndUpdate(sessionId, { done: false });
			}
			if (err instanceof Error) {
				if (
					err.message.includes(orderMessages["some-not-found"][locale]) ||
					err.message.includes(orderMessages["no-product"][locale])
				)
					await guestD.deleteOne();
			}
			throw err;
		}
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: checkoutMessages["failed-to-create-order"][locale],
			data: null,
			statusCode: 500,
		};
	}
}

function redeemDiscountPoints(customer: CustomerHydratedDocument) {
	return async (subTotal: number) => {
		const validPoints = getOnlyValidPoints(customer.earnedPoints);
		const total = validPoints.reduce((total, pointBatch) => total + (pointBatch.amount - pointBatch.redeemed), 0); // Sum unredeemed points
		const discount = Math.min(total, subTotal);
		// Redeem points from the oldest batches first (FIFO)
		let pointsToRedeem = discount;
		for (const pointBatch of validPoints) {
			const availablePoints = pointBatch.amount - pointBatch.redeemed;
			if (availablePoints > 0) {
				const toRedeem = Math.min(pointsToRedeem, availablePoints);
				pointBatch.redeemed += toRedeem;
				pointsToRedeem -= toRedeem;
				if (pointsToRedeem === 0) break; // Redemption complete
			}
		}

		// Log redemption
		customer.redeemedPoints.push({
			amount: discount,
			date: new Date(),
		});
		await customer.save();
		return discount;
	};
}

export async function checkoutAsCustomer(
	customerId: string | Types.ObjectId,
	checkout: CartI<string>,
	locale: LanguagesI,
): Promise<ResponseI<PublicOrderI>> {
	try {
		const [website, customer] = await Promise.all([loadWebsiteData(), customerModel.findById(customerId)]);
		if (!customer)
			return {
				success: false,
				message: checkoutMessages["customer-not-found"][locale],
				data: null,
				statusCode: 400,
			};

		const [orderD, finalSubTotal] = await createOrder(
			checkout,
			website,
			customer._id,
			locale,
			checkout.usePoints ? redeemDiscountPoints(customer) : undefined,
		);

		if (finalSubTotal > 0) {
			const points = Math.floor((customer.conversionRate || website.loyaltyProgram.conversionRate) * finalSubTotal);
			if (!Number.isNaN(points)) {
				const earnedPoint: EarnedPoints<Types.ObjectId> = {
					order: orderD._id,
					amount: points,
					date: new Date(),
					redeemed: 0,
					expirationDate: addMonths(new Date(), website.loyaltyProgram.expirationOnMonths),
				};
				customer.earnedPoints.push(earnedPoint);
				await customer.save();
			}
		}
		return {
			success: true,
			message: checkoutMessages["order-created-successfully"][locale],
			data: JSON.parse(JSON.stringify(orderD)),
			statusCode: 200,
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: checkoutMessages["failed-to-create-order"][locale],
			data: null,
			statusCode: 500,
		};
	}
}
