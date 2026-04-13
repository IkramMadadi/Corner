import customerModel from '&common/Customer';
import orderModel from '&common/Order';
import productModel from '&common/Product';
import { customerMessages } from '@common/messages/customer';
import calculateTotalPoints, { getOnlyValidPoints } from '@common/utils/global/Points';
import { Types, isObjectIdOrHexString } from 'mongoose';
import connectToMongoDB from '~common/db';
import { replaceEmail, replacePhone } from '~common/index';
import loadWebsiteData from '~common/websiteCache';
import { sendResetEmail } from './emails';

export async function loadCustomerWishlist(
	customerId: string | Types.ObjectId,
	locale: LanguagesI
): Promise<ResponseI<ListOf<ProductTableDataI>>> {
	try {
		const [website, customer] = await Promise.all([loadWebsiteData(), customerModel.findById(customerId)]);
		if (!customer)
			return {
				success: false,
				message: customerMessages['need-to-be-logged-in'][locale],
				data: null,
				statusCode: 400,
			};

		if (!customer.wishlist.length)
			return {
				success: true,
				message: customerMessages['wishlist-empty'][locale],
				data: { list: [], total: 0 },
				statusCode: 200,
			};

		const products = await productModel.getProductTableDataI(
			{ sort: 'createdAt' },
			website._id,
			{ _id: { $in: customer.wishlist } },
			false
		);

		return {
			success: true,
			message: customerMessages['orders-loaded'][locale],
			data: JSON.parse(JSON.stringify(products)),
			statusCode: 200,
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: customerMessages['failed-to-load-orders'][locale],
			data: null,
			statusCode: 500,
		};
	}
}

export async function addToCustomerWishlist(
	customerId: string | Types.ObjectId,
	productId: string | Types.ObjectId,
	locale: LanguagesI
): Promise<ResponseI> {
	try {
		await connectToMongoDB();
		const customer = await customerModel.findById(customerId);
		if (!customer)
			return {
				success: false,
				message: customerMessages['need-to-be-logged-in'][locale],
				data: null,
				statusCode: 400,
			};

		if (customer.wishlist.some(l => l.equals(productId)))
			return {
				success: false,
				message: customerMessages['product-already-in-wishlist'][locale],
				data: null,
				statusCode: 400,
			};

		customer.wishlist.push(typeof productId === 'string' ? new Types.ObjectId(productId) : productId);
		await customer.save();
		return {
			success: true,
			message: customerMessages['product-added-to-wishlist'][locale],
			data: null,
			statusCode: 200,
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: customerMessages['failed-to-load-orders'][locale],
			data: null,
			statusCode: 500,
		};
	}
}

export async function removeFromCustomerWishlist(
	customerId: string | Types.ObjectId,
	productId: string | Types.ObjectId,
	locale: LanguagesI
): Promise<ResponseI> {
	try {
		await connectToMongoDB();
		const customer = await customerModel.findById(customerId);
		if (!customer)
			return {
				success: false,
				message: customerMessages['need-to-be-logged-in'][locale],
				data: null,
				statusCode: 400,
			};

		if (!customer.wishlist.some(l => l.equals(productId)))
			return {
				success: false,
				message: customerMessages['product-not-in-wishlist'][locale],
				data: null,
				statusCode: 400,
			};

		customer.wishlist = customer.wishlist.filter(l => !l.equals(productId));
		await customer.save();
		return {
			success: true,
			message: customerMessages['product-removed-from-wishlist'][locale],
			data: null,
			statusCode: 200,
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: customerMessages['failed-to-load-orders'][locale],
			data: null,
			statusCode: 500,
		};
	}
}

export async function getCustomerPersonalInformation(
	customerId: string | Types.ObjectId,
	locale: LanguagesI
): Promise<ResponseI<CustomerInformationI>> {
	try {
		const customer = await customerModel.findById(customerId);
		if (!customer)
			return {
				success: false,
				message: customerMessages['need-to-be-logged-in'][locale],
				data: null,
				statusCode: 400,
			};

		return {
			success: true,
			message: customerMessages['customer-info-loaded'][locale],
			data: {
				firstName: customer.personalInformation.firstName,
				lastName: customer.personalInformation.lastName,
				email: customer.email,
				phone: customer.phone,
			},
			statusCode: 200,
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: customerMessages['failed-to-load-orders'][locale],
			data: null,
			statusCode: 500,
		};
	}
}

export async function updateCustomerPersonalInformation(
	customerId: string | Types.ObjectId,
	customerInformation: CustomerInformationI,
	locale: LanguagesI
): Promise<ResponseI<null>> {
	try {
		await connectToMongoDB();
		const customer = await customerModel.findById(customerId);
		if (!customer)
			return {
				success: false,
				message: customerMessages['need-to-be-logged-in'][locale],
				data: null,
				statusCode: 400,
			};

		customer.personalInformation.firstName = customerInformation.firstName;
		customer.personalInformation.lastName = customerInformation.lastName;

		customer.email = customerInformation.email;
		customer.phone = customerInformation.phone;

		await customer.save();
		return {
			success: true,
			message: customerMessages['customer-info-updated'][locale],
			data: null,
			statusCode: 200,
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: customerMessages['failed-to-load-orders'][locale],
			data: null,
			statusCode: 500,
		};
	}
}

export async function updateCustomerPassword(
	customerId: string | Types.ObjectId,
	currentPassword: string,
	newPassword: string,
	locale: LanguagesI
): Promise<ResponseI<null>> {
	try {
		await connectToMongoDB();
		const customer = await customerModel.findById(customerId);
		if (!customer)
			return {
				success: false,
				message: customerMessages['need-to-be-logged-in'][locale],
				data: null,
				statusCode: 400,
			};

		const isPasswordCorrect = await customer.comparePassword(currentPassword);
		if (!isPasswordCorrect)
			return {
				success: false,
				message: customerMessages['invalid-otp'][locale],
				data: null,
				statusCode: 400,
			};

		customer.password = newPassword;
		await customer.save();
		return {
			success: true,
			message: customerMessages['password-updated'][locale],
			data: null,
			statusCode: 200,
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: customerMessages['failed-to-load-orders'][locale],
			data: null,
			statusCode: 500,
		};
	}
}

export async function loadCustomerOrders(
	customerId: string | Types.ObjectId,
	locale: LanguagesI
): Promise<ResponseI<PublicOrderI[]>> {
	try {
		const website = await loadWebsiteData();
		if (!isObjectIdOrHexString(customerId))
			return {
				success: false,
				message: customerMessages['need-to-be-logged-in'][locale],
				data: null,
				statusCode: 400,
			};
		const cId = new Types.ObjectId(customerId);

		const orders = await orderModel
			.find({
				customer: cId,
				website: website._id,
			})
			.select({
				statusHistory: 0,
				website: 0,
			})
			.sort({
				createdAt: -1,
			});

		return {
			success: true,
			message: customerMessages['orders-loaded'][locale],
			//data: JSON.parse(JSON.stringify(ordersLoad)),
			data: JSON.parse(JSON.stringify(orders)),
			statusCode: 200,
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: customerMessages['failed-to-load-orders'][locale],
			data: null,
			statusCode: 500,
		};
	}
}
export async function loadCustomerPoints(
	customerId: string | Types.ObjectId,
	locale: LanguagesI
): Promise<ResponseI<EarnedPoints<string>[]>> {
	try {
		const customer = await customerModel.findById(customerId).lean();
		if (!customer) throw new Error(customerMessages['customer-not-found'][locale]);
		const earnedPoints = getOnlyValidPoints(customer.earnedPoints);
		return {
			success: true,
			message: customerMessages['points-loaded'][locale],
			data: JSON.parse(JSON.stringify(earnedPoints)),
			statusCode: 200,
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: customerMessages['failed-to-load-points'][locale],
			data: null,
			statusCode: 500,
		};
	}
}
export async function loadCustomerAvailableTotalPoints(
	customerId: string | Types.ObjectId,
	locale: LanguagesI
): Promise<ResponseI<number>> {
	try {
		const customer = await customerModel.findById(customerId).lean();
		if (!customer) throw new Error(customerMessages['customer-not-found'][locale]);
		const totalPoints = calculateTotalPoints(customer.earnedPoints);
		return {
			success: true,
			message: customerMessages['points-loaded'][locale],
			data: totalPoints,
			statusCode: 200,
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: customerMessages['failed-to-load-points'][locale],
			data: null,
			statusCode: 500,
		};
	}
}

export async function getCustomerWishlist(
	customerId: string | Types.ObjectId,
	locale: LanguagesI
): Promise<ResponseI<string[]>> {
	try {
		await connectToMongoDB();
		const customer = await customerModel.findById(customerId);
		if (!customer)
			return {
				success: false,
				message: customerMessages['need-to-be-logged-in'][locale],
				data: null,
				statusCode: 400,
			};

		return {
			success: true,
			message: customerMessages['wishlist-loaded'][locale],
			data: JSON.parse(JSON.stringify(customer.wishlist)),
			statusCode: 200,
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: customerMessages['failed-to-load-orders'][locale],
			data: null,
			statusCode: 500,
		};
	}
}

export async function getCustomerAddresses(
	customerId: string | Types.ObjectId,
	locale: LanguagesI
): Promise<ResponseI<CreatedAddressI[]>> {
	try {
		const customer = await customerModel.findById(customerId);
		if (!customer)
			return {
				success: false,
				message: customerMessages['need-to-be-logged-in'][locale],
				data: null,
				statusCode: 400,
			};

		return {
			success: true,
			message: customerMessages['addresses-loaded'][locale],
			data: JSON.parse(JSON.stringify(customer.addresses)),
			statusCode: 200,
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: customerMessages['failed-to-load-orders'][locale],
			data: null,
			statusCode: 500,
		};
	}
}

export async function addToCustomerAddresses(
	customerId: string | Types.ObjectId,
	address: AddressI,
	locale: LanguagesI
) {
	try {
		const customer = await customerModel.findById(customerId);
		if (!customer)
			return {
				success: false,
				message: customerMessages['need-to-be-logged-in'][locale],
				data: null,
				statusCode: 400,
			};

		if (customer.addresses) customer.addresses.push(address);
		else customer.addresses = [address];
		await customer.save();
		return {
			success: true,
			message: customerMessages['address-added'][locale],
			data: null,
			statusCode: 200,
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: customerMessages['failed-to-add-address'][locale],
			data: null,
			statusCode: 500,
		};
	}
}

export async function removeFromCustomerAddresses(
	customerId: string | Types.ObjectId,
	addressId: string,
	locale: LanguagesI
) {
	try {
		const customer = await customerModel.findById(customerId);
		if (!customer)
			return {
				success: false,
				message: customerMessages['need-to-be-logged-in'][locale],
				data: null,
				statusCode: 400,
			};

		if (!customer.addresses)
			return {
				success: false,
				message: customerMessages['no-addresses'][locale],
				data: null,
				statusCode: 400,
			};

		customer.addresses = (customer.addresses as CreatedAddressI[]).filter(a => a._id.toString() !== addressId);
		await customer.save();
		return {
			success: true,
			message: customerMessages['address-removed'][locale],
			data: null,
			statusCode: 200,
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: customerMessages['failed-to-remove-address'][locale],
			data: null,
			statusCode: 500,
		};
	}
}
/* Account recovery */
export async function loadRecoverySessionCustomer(
	sessionId: string,
	locale: LanguagesI
): Promise<ResponseI<NecessaryCustomerI>> {
	try {
		const customer = await customerModel.findOne({
			'recovery.id': sessionId,
			'recovery.expiresAt': { $gte: new Date() },
		});
		if (!customer)
			return {
				success: false,
				message: customerMessages['recovery-session-not-found'][locale],
				data: null,
				statusCode: 400,
			};

		const c = customer.toOptimizedObject();
		const hiddenCustomer: NecessaryCustomerI = {
			...c,
			email: replaceEmail(c.email),
			phone: replacePhone(c.phone),
		};
		return {
			success: true,
			message: customerMessages['recovery-session-loaded'][locale],
			data: hiddenCustomer,
			statusCode: 200,
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: customerMessages['failed-to-load-recovery-session'][locale],
			data: null,
			statusCode: 500,
		};
	}
}
// client
export async function createCustomerRecoverySession(email: string, locale: LanguagesI): Promise<ResponseI<string>> {
	try {
		const website = await loadWebsiteData();
		const customer = await customerModel.findOne({ email, website: website._id });
		if (!customer)
			return {
				success: false,
				message: customerMessages['need-to-be-logged-in'][locale],
				data: null,
				statusCode: 400,
			};

		const recovery: CustomerRecoveryI<Date> =
			customer.recovery && customer.recovery.expiresAt > new Date()
				? customer.recovery
				: {
						id: crypto.randomUUID(),
						otp: Math.floor(Math.random() * 1000000).toString(),
						expiresAt: new Date(Date.now() + 1000 * 60 * 10),
					};
		customer.recovery = recovery;
		//const [emailS] = await Promise.all([loadEmailService(), customer.save()]);
		const [emailS] = await Promise.all([
			sendResetEmail(
				customer.email,
				recovery.id,
				{
					name: `${customer.personalInformation.firstName} ${customer.personalInformation.lastName}`,
					otp: recovery.otp,
				},
				locale
			),
			customer.save(),
		]);
		if (!emailS)
			return {
				success: false,
				message: customerMessages['failed-to-create-recovery-session'][locale],
				data: null,
				statusCode: 500,
			};
		return {
			success: true,
			message: customerMessages['recovery-session-created'][locale],
			data: recovery.id,
			statusCode: 200,
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: customerMessages['failed-to-create-recovery-session'][locale],
			data: null,
			statusCode: 500,
		};
	}
}
// client
export async function verifyCustomerRecoverySession(
	sessionId: string,
	otp: string,
	locale: LanguagesI
): Promise<ResponseI<CustomerRecoveryI<Date>>> {
	try {
		const customer = await customerModel.findOne({
			'recovery.id': sessionId,
		});
		if (!customer)
			return {
				success: false,
				message: customerMessages['need-to-be-logged-in'][locale],
				data: null,
				statusCode: 400,
			};

		if (customer.recovery.otp !== otp)
			return {
				success: false,
				message: customerMessages['invalid-otp'][locale],
				data: null,
				statusCode: 400,
			};

		if (customer.recovery.expiresAt < new Date())
			return {
				success: false,
				message: customerMessages['recovery-session-expired'][locale],
				data: null,
				statusCode: 400,
			};

		return {
			success: true,
			message: customerMessages['recovery-session-verified'][locale],
			data: customer.recovery,
			statusCode: 200,
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: customerMessages['failed-to-verify-recovery-session'][locale],
			data: null,
			statusCode: 500,
		};
	}
}
// client
export async function resetCustomerPassword(
	password: string,
	sessionId: string,
	otp: string,
	locale: LanguagesI
): Promise<ResponseI<null>> {
	try {
		const customer = await customerModel.findOne({
			'recovery.id': sessionId,
		});
		if (!customer)
			return {
				success: false,
				message: customerMessages['need-to-be-logged-in'][locale],
				data: null,
				statusCode: 400,
			};

		if (customer.recovery.otp !== otp)
			return {
				success: false,
				message: customerMessages['invalid-otp'][locale],
				data: null,
				statusCode: 400,
			};

		if (customer.recovery.expiresAt < new Date())
			return {
				success: false,
				message: customerMessages['recovery-session-expired'][locale],
				data: null,
				statusCode: 400,
			};

		customer.password = password;
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		customer.recovery = undefined;
		await customer.save();
		return {
			success: true,
			message: customerMessages['password-reset'][locale],
			data: null,
			statusCode: 200,
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: customerMessages['failed-to-reset-password'][locale],
			data: null,
			statusCode: 500,
		};
	}
}
