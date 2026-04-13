import type { OrderHydratedDocument } from '!common/generated/models/Order';
import type { ProductHydratedDocument } from '!common/generated/models/Product';
import orderModel from '&common/Order';
import productModel from '&common/Product';
import customerModel from '&common/Customer';
import guestModel from '&common/Guest';
import { orderMessages } from '@common/messages/orders';
import CalculateProductPrice from '@common/utils/global/CalculateProductPrice';
import type { Types } from 'mongoose';
import { sendTelegramNotification } from '../client/telegram';

export function CalculateOrder(
	products: ProductsCartI<SimpleProductI<Types.ObjectId>>[],
	website: PublicWebSiteI<Types.ObjectId>,
	delivery: DeliverOptionsI
) {
	const subTotal = products.reduce((acc, p) => acc + p.count * p.product.price, 0);
	const shipping =
		website.deliverySettings.freeOnOver && subTotal >= website.deliverySettings.freeOnOver
			? 0
			: website.PaymentFees[(delivery.address.province || 16) - 1][delivery.deliveryChoice];
	return { subTotal, shipping };
}

export async function createOrder(
	checkout: CartI<string>,
	website: PublicWebSiteI<Types.ObjectId>,
	customer: Types.ObjectId,
	locale: LanguagesI,
	discountCalculator?: (subTotal: number) => Promise<number>
): Promise<[OrderHydratedDocument, number]> {

	const ids = checkout.products.map(p => p.product);
	const productsD = await productModel.find({ _id: { $in: ids } }).lean();

	if (!productsD.length) throw new Error(orderMessages['no-product'][locale]);

	const productMap = new Map(productsD.map(p => [p._id.toString(), p] as [string, ProductHydratedDocument]));

	let customerData: any = null;

	const [customerRes, guestRes] = await Promise.allSettled([
		customerModel.findById(customer).select('personalInformation phone').lean(),
		guestModel.findById(customer).select('personalInformation phone').lean()
	]);

	if (customerRes.status === 'fulfilled' && customerRes.value) {
		customerData = customerRes.value;
	} else if (guestRes.status === 'fulfilled' && guestRes.value) {
		customerData = guestRes.value;
	}

	const products = checkout.products.map(p => {
		const item = productMap.get(p.product as string) as ProductHydratedDocument;
		if (!item) throw new Error(orderMessages['some-not-found'][locale]);

		return {
			product: {
				productId: item._id,
				name: item.name,
				price: CalculateProductPrice(
					item.pricing,
					item.additional,
					p.variants,
					item.pricePriority && item.pricePriority.length > 0
						? item.pricePriority
						: website.pricePriority || []
				).current,
				thumbnail: item.thumbnail || item.images[0],
			},
			variants: p.variants,
			count: p.count,
		};
	});

	const { shipping, subTotal } = CalculateOrder(products, website, checkout.delivery);
	const discount = discountCalculator ? await discountCalculator(subTotal) : 0;
	const totalAmount = subTotal + shipping - discount;

	const order: OrderI<SimpleProductI<Types.ObjectId>, Types.ObjectId> = {
		customer: customer,
		products: products,
		discount,
		totalPrice: totalAmount,
		website: website._id,
		delivery: { ...checkout.delivery, cost: shipping },
		status: 'pending',
		statusHistory: [],
	};

	const provinceNames = {
		en: ['', 'Adrar', 'Chlef', 'Laghouat', 'Oum El Bouaghi', 'Batna', 'Béjaïa', 'Biskra', 'Béchar', 'Blida', 'Bouira', 'Tamanrasset', 'Tébessa', 'Tlemcen', 'Tiaret', 'Tizi Ouzou', 'Alger', 'Djelfa', 'Jijel', 'Sétif', 'Saïda', 'Skikda', 'Sidi Bel Abbès', 'Annaba', 'Guelma', 'Constantine', 'Médéa', 'Mostaganem', "M'Sila", 'Mascara', 'Ouargla', 'Oran', 'El Bayadh', 'Illizi', 'Bordj Bou Arréridj', 'Boumerdès', 'El Tarf', 'Tindouf', 'Tissemsilt', 'El Oued', 'Khenchela', 'Souk Ahras', 'Tipaza', 'Mila', 'Aïn Defla', 'Naâma', 'Aïn Témouchent', 'Ghardaïa', 'Relizane', 'El M\'Ghair', 'El Meniaa', 'Ouled Djellal', 'Bordj Baji Mokhtar', 'Béni Abbès', 'Timimoun', 'Touggourt', 'Djanet', "Aïn Salah", 'Aïn Guezzam'],
		fr: ['', 'Adrar', 'Chlef', 'Laghouat', 'Oum El Bouaghi', 'Batna', 'Béjaïa', 'Biskra', 'Béchar', 'Blida', 'Bouira', 'Tamanrasset', 'Tébessa', 'Tlemcen', 'Tiaret', 'Tizi Ouzou', 'Alger', 'Djelfa', 'Jijel', 'Sétif', 'Saïda', 'Skikda', 'Sidi Bel Abbès', 'Annaba', 'Guelma', 'Constantine', 'Médéa', 'Mostaganem', "M'Sila", 'Mascara', 'Ouargla', 'Oran', 'El Bayadh', 'Illizi', 'Bordj Bou Arréridj', 'Boumerdès', 'El Tarf', 'Tindouf', 'Tissemsilt', 'El Oued', 'Khenchela', 'Souk Ahras', 'Tipaza', 'Mila', 'Aïn Defla', 'Naâma', 'Aïn Témouchent', 'Ghardaïa', 'Relizane', 'El M\'Ghair', 'El Meniaa', 'Ouled Djellal', 'Bordj Baji Mokhtar', 'Béni Abbès', 'Timimoun', 'Touggourt', 'Djanet', "Aïn Salah", 'Aïn Guezzam'],
		ar: ['', 'أدرار', 'الشلف', 'الأغواط', 'أم البواقي', 'باتنة', 'بجاية', 'بسكرة', 'بشار', 'البليدة', 'البويرة', 'تمنراست', 'تبسة', 'تلمسان', 'تيارت', 'تيزي وزو', 'الجزائر', 'الجلفة', 'جيجل', 'سطيف', 'سعيدة', 'سكيكدة', 'سيدي بلعباس', 'عنابة', 'قالمة', 'قسنطينة', 'المدية', 'مستغانم', 'المسيلة', 'معسكر', 'ورقلة', 'وهران', 'البيض', 'إليزي', 'برج بوعريريج', 'بومرداس', 'الطارف', 'تندوف', 'تسمسيلت', 'الوادي', 'خنشلة', 'سوق أهراس', 'تيبازة', 'ميلة', 'عين الدفلى', 'النعامة', 'عين تموشنت', 'غرداية', 'غليزان', 'المغير', 'المنيعة', 'أولاد جلال', 'برج باجي مختار', 'بني عباس', 'تيميمون', 'تقرت', 'جانت', 'عين صالح', 'عين قزام']
	};

	const deliveryChoiceNames = {
		en: { desk: 'Store Pickup', door: 'Home Delivery' },
		fr: { desk: 'Retrait en magasin', door: 'Livraison à domicile' },
		ar: { desk: 'استلام من المتجر', door: 'توصيل للمنزل' }
	};

	const createdOrder = await orderModel.create(order);

	try {
		let customerName = 'Unknown Customer';
		let customerPhone = 'No phone';

		if (customerData) {
			const firstName = customerData.personalInformation?.firstName || '';
			const lastName = customerData.personalInformation?.lastName || '';
			const fullName = `${firstName} ${lastName}`.trim();
			if (fullName) customerName = fullName;
			if (customerData.phone) customerPhone = customerData.phone;
		}

		if (customerName === 'Unknown Customer') customerName = `Guest ${customer.toString().slice(-4)}`;

		const provinceName = provinceNames[locale]?.[checkout.delivery.address.province] || `Province ${checkout.delivery.address.province}`;
		const deliveryMethod = deliveryChoiceNames[locale]?.[checkout.delivery.deliveryChoice] || checkout.delivery.deliveryChoice;

		const productSummary = products.slice(0, 3).map(p => {
			const name = typeof p.product.name === 'object'
				? (p.product.name[locale] || Object.values(p.product.name)[0])
				: p.product.name;
			return `• ${name} x${p.count}`;
		}).join('\n');

		const remainingProducts = products.length > 3 ? `\n... and ${products.length - 3} more` : '';

		const message = `🛒 *NEW ORDER* 🛒\n\n` +
			`👤 *${customerName}*\n` +
			`📱 \`${customerPhone}\`\n` +
			`📍 ${provinceName} (${checkout.delivery.address.province})\n` +
			`💰 *Total: ${totalAmount.toFixed(2)} DZD*\n` +
			`🚚 ${deliveryMethod}\n\n` +
			`📦 *Items:*\n${productSummary}${remainingProducts}\n` +
			`⏰ ${new Date().toLocaleString('ar-DZ')}`;

		await sendTelegramNotification(message);

		console.log('✅ Telegram notification sent for order:', createdOrder._id);

	} catch (err) {
		console.error('Telegram failed (order still created):', err);
	}

	return [createdOrder, totalAmount];
}
