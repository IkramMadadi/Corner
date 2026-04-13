export const PublishableContentEnums: PublishableContentTypeI[] = ['b', 'p'];
export const PublishableContentMap: Record<PublishableContentTypeI, LanguagesContentI> = {
	b: {
		en: 'Blogs',
		ar: 'مدونات',
		fr: 'Blogs',
	},
	p: {
		en: 'Products',
		ar: 'منتجات',
		fr: 'Produits',
	},
};
export const OrderStatusEnums: OrderStatusTypes[] = [
	'pending',
	'confirmed',
	'shipped',
	'delivered',
	'cancelled',
	'returned',
];
export const DeliveryChoiceEnums: DeliveryChoiceTypes[] = ['desk', 'door'];
export const DiscountValueEnums: DiscountValueType[] = ['P', 'V'];
export const LinkEnums: LinkKeys[] = ['Website', 'Product', 'WebCollection', 'Category', 'Blog', 'Customer'];
export const genderEnums = ['M', 'F'];
export const categoryLabelsEnums: CategoryLabelsT[] = ['new', 'featured', 'onSale'];
export const collectionLabelsEnums: CollectionLabelsT[] = categoryLabelsEnums;
export const productLabelsEnums: ProductLabelsT[] = [...categoryLabelsEnums, 'bestSeller', 'outOfStock', 'lowInStock'];
export const productLabelsMap: Record<ProductLabelsT, LanguagesContentI> = {
	new: {
		en: 'New',
		ar: 'جديد',
		fr: 'Nouveau',
	},
	bestSeller: {
		en: 'Best Seller',
		ar: 'الأكثر مبيعا',
		fr: 'Meilleur',
	},
	featured: {
		en: 'Featured',
		ar: 'مميز',
		fr: 'Favori',
	},
	onSale: {
		en: 'On Sale',
		ar: 'على الخصم',
		fr: 'Promotion',
	},
	outOfStock: {
		en: 'Out of Stock',
		ar: 'غير متوفر',
		fr: 'Épuisé',
	},
	lowInStock: {
		en: 'Low in Stock',
		ar: 'قليل في المخزون',
		fr: 'En rupture de stock',
	},
};
export const orderStatusMap: Record<OrderStatusTypes, LanguagesContentI> = {
	pending: {
		en: 'Pending',
		ar: 'قيد الانتظار',
		fr: 'En attente',
	},
	confirmed: {
		en: 'Confirmed',
		ar: 'تم التأكيد',
		fr: 'Confirmé',
	},
	shipped: {
		en: 'Shipped',
		ar: 'تم الشحن',
		fr: 'Expédié',
	},
	delivered: {
		en: 'Delivered',
		ar: 'تم التوصيل',
		fr: 'Livré',
	},
	cancelled: {
		en: 'Cancelled',
		ar: 'تم الإلغاء',
		fr: 'Annulé',
	},
	returned: {
		en: 'Returned',
		fr: 'Retournée',
		ar: 'مرتجعة',
	},
};
export const blogsLabels: BlogsLabelsT[] = ['Tips', 'News', 'Articles', 'Tutorials', 'Reviews', 'Interviews', 'Other'];
export const blogsLabelsMap: Record<BlogsLabelsT, LanguagesContentI> = {
	Tips: {
		en: 'Tips',
		ar: 'نصائح',
		fr: 'Conseils',
	},
	News: {
		en: 'News',
		ar: 'أخبار',
		fr: 'Nouvelles',
	},
	Articles: {
		en: 'Articles',
		ar: 'مقالات',
		fr: 'Articles',
	},
	Tutorials: {
		en: 'Tutorials',
		ar: 'دروس',
		fr: 'Tutoriels',
	},
	Reviews: {
		en: 'Reviews',
		ar: 'مراجعات',
		fr: 'Avis',
	},
	Interviews: {
		en: 'Interviews',
		ar: 'مقابلات',
		fr: 'Entretiens',
	},
	Other: {
		en: 'Other',
		ar: 'أخرى',
		fr: 'Autres',
	},
};
export const DeliveryChoiceMap: Record<DeliveryChoiceTypes, LanguagesContentI> = {
	desk: {
		en: 'Desk',
		ar: 'المكتب',
		fr: 'Au bureau',
	},
	door: {
		en: 'Door',
		ar: 'المنزل',
		fr: 'À la porte',
	},
};
