import { type MyZodType, z } from '^common/defaultZod';
import { languagesContentValidationSchema } from '^common/elements';

// Define message constants
const provinceMessages = {
	id: {
		required: {
			en: 'Province ID is required',
			fr: "L'ID de la province est requis",
			ar: 'معرف المقاطعة مطلوب',
		},
		invalid: {
			en: 'Province ID must be a number',
			fr: "L'ID de la province doit être un nombre",
			ar: 'يجب أن يكون معرف المقاطعة رقمًا',
		},
	},
};

export const provinceValidationSchema = (locale: LanguagesI) =>
	z.object<MyZodType<ProvinceI>>({
		name: languagesContentValidationSchema({ min: 2, max: 100 }),
		id: z.number({
			coerce: true,
			description: 'Province ID',
			invalid_type_error: provinceMessages.id.invalid[locale],
			required_error: provinceMessages.id.required[locale],
		}),
	});

export const provincesValidationSchema = (locale: LanguagesI) => z.array(provinceValidationSchema(locale));
