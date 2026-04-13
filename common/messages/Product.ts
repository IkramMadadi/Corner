type ProductsMessagesKeys =
	| 'product-not-found'
	| 'products-loaded-successfully'
	| 'product-loaded-successfully'
	| 'failed-to-load-products'
	| 'failed-to-load-product'
	| 'category-not-found'
	| 'collection-not-found'
	| 'reviews-loaded-successfully'
	| 'failed-to-load-reviews'
	| 'you-have-to-login'
	| 'review-not-found'
	| 'review-deleted-successfully'
	| 'failed-to-delete-review'
	| 'no-products-found-in';

export const productsMessages: Record<ProductsMessagesKeys, LanguagesContentI> = {
	'product-not-found': {
		en: 'Product not found.',
		ar: 'المنتج غير موجود.',
		fr: 'Produit non trouvé.',
	},
	'products-loaded-successfully': {
		en: 'Products loaded successfully.',
		ar: 'تم تحميل المنتجات بنجاح.',
		fr: 'Produits chargés avec succès.',
	},
	'product-loaded-successfully': {
		en: 'Product loaded successfully.',
		ar: 'تم تحميل المنتج بنجاح.',
		fr: 'Produit chargé avec succès.',
	},
	'failed-to-load-products': {
		en: 'Failed to load products.',
		ar: 'فشل تحميل المنتجات.',
		fr: 'Échec du chargement des produits.',
	},
	'failed-to-load-product': {
		en: 'Failed to load product.',
		ar: 'فشل تحميل المنتج.',
		fr: 'Échec du chargement du produit.',
	},
	'category-not-found': {
		en: 'Category not found.',
		ar: 'الفئة غير موجودة.',
		fr: 'Catégorie non trouvée.',
	},
	'collection-not-found': {
		en: 'Collection not found.',
		ar: 'المجموعة غير موجودة.',
		fr: 'Collection non trouvée.',
	},
	'failed-to-delete-review': {
		en: 'Failed to delete review',
		ar: 'فشل حذف المراجعة',
		fr: "Échec de la suppression de l'examen",
	},
	'review-deleted-successfully': {
		en: 'Review deleted successfully',
		ar: 'تم حذف المراجعة بنجاح',
		fr: 'Examen supprimé avec succès',
	},
	'failed-to-load-reviews': {
		en: 'Failed to load reviews',
		ar: 'فشل تحميل المراجعات',
		fr: 'Échec du chargement des avis',
	},
	'no-products-found-in': {
		en: 'No products found in',
		ar: 'لم يتم العثور على منتجات في',
		fr: 'Aucun produit trouvé dans',
	},
	'review-not-found': {
		en: 'Review not found',
		ar: 'المراجعة غير موجودة',
		fr: 'Avis non trouvé',
	},
	'reviews-loaded-successfully': {
		en: 'Reviews loaded successfully',
		ar: 'تم تحميل المراجعات بنجاح',
		fr: 'Avis chargés avec succès',
	},
	'you-have-to-login': {
		en: 'You have to login',
		ar: 'يجب عليك تسجيل الدخول',
		fr: 'Vous devez vous connecter',
	},
};
