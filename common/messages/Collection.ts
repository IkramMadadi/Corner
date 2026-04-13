type CollectionMessagesKeys =
	| 'collections-loaded-successfully'
	| 'failed-to-load-collections'
	| 'collection-not-found'
	| 'collection-loaded-successfully'
	| 'failed-to-load-collection';

export const collectionMessages: Record<CollectionMessagesKeys, LanguagesContentI> = {
	'collections-loaded-successfully': {
		en: 'Collections loaded successfully.',
		ar: 'تم تحميل المجموعات بنجاح.',
		fr: 'Collections chargées avec succès.',
	},
	'failed-to-load-collections': {
		en: 'Failed to load collections.',
		ar: 'فشل في تحميل المجموعات.',
		fr: 'Échec du chargement des collections.',
	},
	'collection-not-found': {
		en: 'Collection not found.',
		ar: 'المجموعة غير موجودة.',
		fr: 'Collection non trouvée.',
	},
	'collection-loaded-successfully': {
		en: 'Collection loaded successfully.',
		ar: 'تم تحميل المجموعة بنجاح.',
		fr: 'Collection chargée avec succès.',
	},
	'failed-to-load-collection': {
		en: 'Failed to load collection.',
		ar: 'فشل في تحميل المجموعة.',
		fr: 'Échec du chargement de la collection.',
	},
};
