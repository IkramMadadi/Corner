type ReviewMessagesKeys =
	| 'already-reviewed'
	| 'customer-not-found'
	| 'document-not-found'
	| 'invalid-link'
	| 'product-not-found'
	| 'blog-not-found'
	| 'review-created-successfully'
	| 'already-reviewed'
	| 'failed-to-create-review';
export const reviewMessages: Record<ReviewMessagesKeys, LanguagesContentI> = {
	'already-reviewed': {
		en: 'You have already reviewed this document.',
		ar: 'لقد قمت بمراجعة هذا المستند بالفعل.',
		fr: 'Vous avez déjà examiné ce document.',
	},
	'customer-not-found': {
		en: 'Customer not found.',
		ar: 'العميل غير موجود.',
		fr: 'Client non trouvé.',
	},
	'document-not-found': {
		en: 'Document not found.',
		ar: 'المستند غير موجود.',
		fr: 'Document introuvable.',
	},
	'invalid-link': {
		en: 'Invalid Review link.',
		ar: 'رابط مراجعة غير صالح.',
		fr: "Lien d'examen invalide.",
	},
	'product-not-found': {
		en: 'Product not found.',
		ar: 'المنتج غير موجود.',
		fr: 'Produit non trouvé.',
	},
	'blog-not-found': {
		en: 'Blog not found.',
		ar: 'المدونة غير موجودة.',
		fr: 'Blog introuvable.',
	},
	'review-created-successfully': {
		en: 'Review created successfully.',
		ar: 'تم إنشاء المراجعة بنجاح.',
		fr: 'Examen créé avec succès.',
	},
	'failed-to-create-review': {
		en: 'Failed to create review.',
		ar: 'فشل إنشاء المراجعة.',
		fr: "Échec de la création de l'examen.",
	},
};
