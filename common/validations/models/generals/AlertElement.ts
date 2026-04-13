import { type MyZodType, z } from '^common/defaultZod';
import { languagesContentValidationSchema } from '^common/elements';
import { ButtonSchema } from './Button';
// Import your LanguagesContentSchema from its location

// Define message constants
const alertElementMessages = {
	content: {
		required: {
			en: 'Alert content is required',
			fr: "Le contenu de l'alerte est requis",
			ar: 'محتوى التنبيه مطلوب',
		},
	},
	buttons: {
		required: {
			en: 'Alert buttons are required',
			fr: 'Les boutons de l’alerte sont requis',
			ar: 'أزرار التنبيه مطلوبة',
		},
	},
	document: {
		description: {
			en: 'Alert element schema',
			fr: 'Schéma de l’élément d’alerte',
			ar: 'مخطط عنصر التنبيه',
		},
		invalid: {
			en: 'Invalid alert element schema',
			fr: 'Schéma d’élément d’alerte invalide',
			ar: 'مخطط عنصر التنبيه غير صالح',
		},
		required: {
			en: 'Alert element schema is required',
			fr: 'Le schéma de l’élément d’alerte est requis',
			ar: 'مخطط عنصر التنبيه مطلوب',
		},
	},
};

export const AlertElementSchema = (locale: LanguagesI) => {
	return z
		.object<MyZodType<AlertElementI>>(
			{
				content: languagesContentValidationSchema().describe(alertElementMessages.content.required[locale]),
				buttons: z.array(ButtonSchema(locale), {
					required_error: alertElementMessages.buttons.required[locale],
				}),
			},
			{
				description: alertElementMessages.document.description[locale],
				invalid_type_error: alertElementMessages.document.invalid[locale],
				required_error: alertElementMessages.document.required[locale],
			}
		)
		.openapi('Alert_Element_Document', {
			description: alertElementMessages.document.description[locale],
		});
};
