import { type MyZodType, z } from '^common/defaultZod';
import { linkValidationSchema } from './generals/Link';

// Define message constants
const reviewMessages = {
	content: {
		required: {
			en: 'Review content is required',
			fr: "Le contenu de l'avis est requis",
			ar: 'محتوى المراجعة مطلوب',
		},
		invalid: {
			en: 'Review content is not a valid string',
			fr: "Le contenu de l'avis n'est pas une chaîne valide",
			ar: 'محتوى المراجعة ليس سلسلة صالحة',
		},
		message: {
			en: 'Review content must be at least 10 characters long',
			fr: "Le contenu de l'avis doit comporter au moins 10 caractères",
			ar: 'يجب أن يكون محتوى المراجعة 10 أحرف على الأقل',
		},
	},
	rating: {
		required: {
			en: 'Review rating is required',
			fr: "La note de l'avis est requise",
			ar: 'تقييم المراجعة مطلوب',
		},
		invalid: {
			en: 'Review rating is not a valid number',
			fr: "La note de l'avis n'est pas un nombre valide",
			ar: 'تقييم المراجعة ليس رقمًا صالحًا',
		},
		message: {
			en: 'Review rating must be between 1 and 5',
			fr: "La note de l'avis doit être comprise entre 1 et 5",
			ar: 'يجب أن يكون تقييم المراجعة بين 1 و 5',
		},
	},
};

export const createRevireValidationSchema = (locale: LanguagesI) =>
	z.object<MyZodType<CreateReviewI>>({
		content: z
			.string({
				description: 'Review content',
				invalid_type_error: reviewMessages.content.invalid[locale],
				required_error: reviewMessages.content.required[locale],
			})
			.min(10, {
				message: reviewMessages.content.message[locale],
			}),
		rating: z
			.number({
				description: 'Review rating',
				invalid_type_error: reviewMessages.rating.invalid[locale],
				required_error: reviewMessages.rating.required[locale],
			})
			.min(1, {
				message: reviewMessages.rating.message[locale],
			})
			.max(5, {
				message: reviewMessages.rating.message[locale],
			}),
		link: linkValidationSchema(locale),
	});
