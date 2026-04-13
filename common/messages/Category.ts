type CategoryMessagesKeys =
	| 'categories-loaded-successfully'
	| 'failed-to-load-categories'
	| 'category-not-found'
	| 'category-loaded-successfully'
	| 'failed-to-load-category';

export const categoryMessages: Record<CategoryMessagesKeys, LanguagesContentI> = {
	'categories-loaded-successfully': {
		en: 'Categories loaded successfully.',
		ar: 'تم تحميل الفئات بنجاح.',
		fr: 'Catégories chargées avec succès.',
	},
	'failed-to-load-categories': {
		en: 'Failed to load categories.',
		ar: 'فشل في تحميل الفئات.',
		fr: 'Échec du chargement des catégories.',
	},
	'category-not-found': {
		en: 'Category not found.',
		ar: 'الفئة غير موجودة.',
		fr: 'Catégorie non trouvée.',
	},
	'category-loaded-successfully': {
		en: 'Category loaded successfully.',
		ar: 'تم تحميل الفئة بنجاح.',
		fr: 'Catégorie chargée avec succès.',
	},
	'failed-to-load-category': {
		en: 'Failed to load category.',
		ar: 'فشل في تحميل الفئة.',
		fr: 'Échec du chargement de la catégorie.',
	},
};
