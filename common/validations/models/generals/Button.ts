import { buttonIconTypesEnum, buttonTypesEnum } from '@common/data/enums/buttonTypesEnum';
import { type MyZodType, z } from '^common/defaultZod';
import { urlSchema } from '^common/elements';

// Define message constants
const buttonMessages = {
	link: {
		required: {
			en: 'Button link is required',
			fr: 'Le lien du bouton est requis',
			ar: 'رابط الزر مطلوب',
		},
	},
	type: {
		required: {
			en: 'Button type is required',
			fr: 'Le type de bouton est requis',
			ar: 'نوع الزر مطلوب',
		},
		invalid: {
			en: 'Invalid button type',
			fr: 'Type de bouton invalide',
			ar: 'نوع الزر غير صالح',
		},
	},
	icon: {
		invalid: {
			en: 'Invalid icon type',
			fr: "Type d'icône invalide",
			ar: 'نوع الأيقونة غير صالح',
		},
	},
	text: {
		required: {
			en: 'Button text is required',
			fr: 'Le texte du bouton est requis',
			ar: 'نص الزر مطلوب',
		},
	},
	document: {
		description: {
			en: 'Button schema',
			fr: 'Schéma du bouton',
			ar: 'مخطط الزر',
		},
		invalid: {
			en: 'Invalid button schema',
			fr: 'Schéma de bouton invalide',
			ar: 'مخطط زر غير صالح',
		},
		required: {
			en: 'Button schema is required',
			fr: 'Le schéma du bouton est requis',
			ar: 'مخطط الزر مطلوب',
		},
	},
};

// ButtonIconType schema
const ButtonIconTypeSchema = (locale: LanguagesI) =>
	z.enum(buttonIconTypesEnum as [ButtonIconType, ...ButtonIconType[]], {
		invalid_type_error: buttonMessages.icon.invalid[locale],
		required_error: buttonMessages.icon.invalid[locale],
	});

// ButtonType schema
const ButtonTypeSchema = (locale: LanguagesI) =>
	z.enum(buttonTypesEnum as [ButtonType, ...ButtonType[]], {
		invalid_type_error: buttonMessages.type.invalid[locale],
		required_error: buttonMessages.type.required[locale],
	});

// ButtonI schema
export const ButtonSchema = (locale: LanguagesI) => {
	return z
		.object<MyZodType<ButtonI>>(
			{
				link: urlSchema(locale),
				type: ButtonTypeSchema(locale),
				icon: z
					.object({
						left: ButtonIconTypeSchema(locale).optional(),
						right: ButtonIconTypeSchema(locale).optional(),
					})
					.optional(),
				text: z.any({
					required_error: buttonMessages.text.required[locale],
				}), // Replace z.any with the actual LanguagesContentI schema if available
			},
			{
				description: buttonMessages.document.description[locale],
				invalid_type_error: buttonMessages.document.invalid[locale],
				required_error: buttonMessages.document.required[locale],
			}
		)
		.openapi('Button_Document', {
			description: buttonMessages.document.description[locale],
		});
};
