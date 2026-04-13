type CheckoutMessagesKeys =
	| 'order-created-successfully'
	| 'failed-to-create-order'
	| 'customer-not-found'
	| 'no-products-found'
	| 'some-products-not-found';

export const checkoutMessages: Record<CheckoutMessagesKeys, LanguagesContentI> = {
	'order-created-successfully': {
		en: 'Order created successfully.',
		ar: 'تم إنشاء الطلب بنجاح.',
		fr: 'Commande créée avec succès.',
	},
	'failed-to-create-order': {
		en: 'Failed to create the order.',
		ar: 'فشل في إنشاء الطلب.',
		fr: 'Échec de la création de la commande.',
	},
	'customer-not-found': {
		en: 'Customer not found.',
		ar: 'العميل غير موجود.',
		fr: 'Client non trouvé.',
	},
	'no-products-found': {
		en: 'No products found.',
		ar: 'لم يتم العثور على منتجات.',
		fr: 'Aucun produit trouvé.',
	},
	'some-products-not-found': {
		en: 'Some products not found.',
		ar: 'بعض المنتجات غير موجودة.',
		fr: 'Certains produits non trouvés.',
	},
};
