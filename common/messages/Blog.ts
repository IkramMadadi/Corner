type BlogMessagesKeys =
	| 'blogs-loaded-successfully'
	| 'failed-to-load-blogs'
	| 'no-blogs-found'
	| 'blog-loaded-successfully'
	| 'blog-not-found'
	| 'category-not-found'
	| 'collection-not-found'
	| 'reviews-loaded-successfully'
	| 'failed-to-load-reviews'
	| 'review-removed-successfully'
	| 'failed-to-remove-review'
	| 'login-required-to-remove-review';

export const blogMessages: Record<BlogMessagesKeys, LanguagesContentI> = {
	'blogs-loaded-successfully': {
		en: 'Blogs loaded successfully.',
		ar: 'تم تحميل المدونات بنجاح.',
		fr: 'Blogs chargés avec succès.',
	},
	'failed-to-load-blogs': {
		en: 'Failed to load blogs.',
		ar: 'فشل في تحميل المدونات.',
		fr: 'Échec du chargement des blogs.',
	},
	'no-blogs-found': {
		en: 'No blogs found.',
		ar: 'لم يتم العثور على مدونات.',
		fr: 'Aucun blog trouvé.',
	},
	'blog-loaded-successfully': {
		en: 'Blog loaded successfully.',
		ar: 'تم تحميل المدونة بنجاح.',
		fr: 'Blog chargé avec succès.',
	},
	'blog-not-found': {
		en: 'Blog not found.',
		ar: 'لم يتم العثور على المدونة.',
		fr: 'Blog non trouvé.',
	},
	'category-not-found': {
		en: 'Category not found.',
		ar: 'لم يتم العثور على الفئة.',
		fr: 'Catégorie non trouvée.',
	},
	'collection-not-found': {
		en: 'Collection not found.',
		ar: 'لم يتم العثور على المجموعة.',
		fr: 'Collection non trouvée.',
	},
	'reviews-loaded-successfully': {
		en: 'Reviews loaded successfully.',
		ar: 'تم تحميل المراجعات بنجاح.',
		fr: 'Avis chargés avec succès.',
	},
	'failed-to-load-reviews': {
		en: 'Failed to load reviews.',
		ar: 'فشل في تحميل المراجعات.',
		fr: 'Échec du chargement des avis.',
	},
	'review-removed-successfully': {
		en: 'Review removed successfully.',
		ar: 'تمت إزالة المراجعة بنجاح.',
		fr: 'Avis supprimé avec succès.',
	},
	'failed-to-remove-review': {
		en: 'Failed to remove review.',
		ar: 'فشل في إزالة المراجعة.',
		fr: "Échec de la suppression de l'avis.",
	},
	'login-required-to-remove-review': {
		en: 'You have to login to remove a review.',
		ar: 'يجب عليك تسجيل الدخول لإزالة المراجعة.',
		fr: 'Vous devez vous connecter pour supprimer un avis.',
	},
};
