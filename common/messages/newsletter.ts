type NewsLetterMessagesKeys =
	| 'already-subscribed'
	| 'subscribed-successfully'
	| 'unsubscribed-successfully'
	| 'failed-to-subscribe'
	| 'failed-to-unsubscribe';
export const newsLetterMessages: Record<NewsLetterMessagesKeys, LanguagesContentI> = {
	'already-subscribed': {
		en: 'You have already subscribed to our newsletter.',
		ar: 'لقد اشتركت بالفعل في النشرة الإخبارية الخاصة بنا.',
		fr: 'Vous êtes déjà abonné à notre newsletter.',
	},
	'subscribed-successfully': {
		en: 'You have successfully subscribed to our newsletter.',
		ar: 'لقد اشتركت بنجاح في النشرة الإخبارية الخاصة بنا.',
		fr: 'Vous vous êtes abonné avec succès à notre newsletter.',
	},
	'unsubscribed-successfully': {
		en: 'You have successfully unsubscribed from our newsletter.',
		ar: 'لقد تم إلغاء اشتراكك بنجاح من النشرة الإخبارية الخاصة بنا.',
		fr: 'Vous vous êtes désabonné avec succès de notre newsletter.',
	},
	'failed-to-subscribe': {
		en: 'Failed to subscribe to our newsletter.',
		ar: 'فشل الاشتراك في النشرة الإخبارية الخاصة بنا.',
		fr: "Échec de l'abonnement à notre newsletter.",
	},
	'failed-to-unsubscribe': {
		en: 'Failed to unsubscribe from our newsletter.',
		ar: 'فشل إلغاء الاشتراك في النشرة الإخبارية الخاصة بنا.',
		fr: 'Échec de la désinscription de notre newsletter.',
	},
};
