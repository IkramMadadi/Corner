import { type MyZodType, z } from '^common/defaultZod';
import { phoneSchema } from '^common/elements';

// Define message constants
const guestMessages = {
	name: {
		required: {
			en: 'Full name is required',
			fr: 'Le nom complet est requis',
			ar: 'الاسم الكامل مطلوب',
		},
		invalid: {
			en: 'Full name is invalid',
			fr: 'Le nom complet est invalide',
			ar: 'الاسم الكامل غير صالح',
		},
	},
};

export const registerGuestValidationSchema = (locale: LanguagesI) =>
	z.object<MyZodType<RegisterGuestI>>({
		name: z.string({
			required_error: guestMessages.name.required[locale],
			invalid_type_error: guestMessages.name.invalid[locale],
		}),
		phone: phoneSchema(locale),
	});
