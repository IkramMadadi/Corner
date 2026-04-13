type SupportRequestMessagesKeys = 'created-successfully' | 'supportRequestError';
export const supportRequestMessages: Record<SupportRequestMessagesKeys, LanguagesContentI> = {
	'created-successfully': {
		en: 'Your support request has been submitted successfully. We will get back to you as soon as possible.',
		ar: 'تم إرسال طلب الدعم الخاص بك بنجاح. سنعود إليك في أقرب وقت ممكن.',
		fr: 'Votre demande de support a été soumise avec succès. Nous vous répondrons dès que possible.',
	},
	supportRequestError: {
		ar: 'حدث خطأ أثناء إرسال طلب الدعم. يرجى المحاولة مرة أخرى.',
		en: 'An error occurred while submitting the support request. Please try again.',
		fr: "Une erreur s'est produite lors de la soumission de la demande de support. Veuillez réessayer.",
	},
};
