import { type MyZodType, z } from '^common/defaultZod';
import { languagesContentValidationSchema } from '^common/elements';
import { AlertElementSchema } from './AlertElement';
import { ButtonSchema } from './Button';

const bannerElementMessages = {
	title: {
		required: {
			en: 'Banner title is required',
			fr: 'Le titre de la bannière est requis',
			ar: 'عنوان الشعار مطلوب',
		},
	},
	buttons: {
		required: {
			en: 'Banner buttons are required',
			fr: 'Les boutons de la bannière sont requis',
			ar: 'أزرار الشعار مطلوبة',
		},
	},
	image: {
		invalid: {
			en: 'Invalid banner image',
			fr: 'Image de bannière invalide',
			ar: 'صورة الشعار غير صالحة',
		},
	},
	alert: {
		invalid: {
			en: 'Invalid alert element',
			fr: 'Élément d’alerte invalide',
			ar: 'عنصر تنبيه غير صالح',
		},
	},
	color: {
		required: {
			en: 'Banner color is required',
			fr: 'La couleur de la bannière est requise',
			ar: 'لون الشعار مطلوب',
		},
		invalid: {
			en: 'Invalid banner color',
			fr: 'Couleur de bannière invalide',
			ar: 'لون الشعار غير صالح',
		},
	},
	overlay: {
		required: {
			en: 'Banner overlay is required',
			fr: "L'overlay de la bannière est requis",
			ar: 'تراكب الشعار مطلوب',
		},
		min: {
			en: 'Banner overlay must be at least 0',
			fr: "L'overlay de la bannière doit être au moins 0",
			ar: 'يجب أن يكون تراكب الشعار على الأقل 0',
		},
		max: {
			en: 'Banner overlay must be at most 1',
			fr: "L'overlay de la bannière doit être au plus 1",
			ar: 'يجب أن يكون تراكب الشعار على الأكثر 1',
		},
	},
	document: {
		description: {
			en: 'Banner element schema',
			fr: 'Schéma de l’élément de bannière',
			ar: 'مخطط عنصر الشعار',
		},
		invalid: {
			en: 'Invalid banner element schema',
			fr: 'Schéma d’élément de bannière invalide',
			ar: 'مخطط عنصر الشعار غير صالح',
		},
		required: {
			en: 'Banner element schema is required',
			fr: 'Le schéma de l’élément de bannière est requis',
			ar: 'مخطط عنصر الشعار مطلوب',
		},
	},
};

const BannerColorSchema = (locale: LanguagesI) =>
	z.enum(['light', 'dark'], {
		invalid_type_error: bannerElementMessages.color.invalid[locale],
		required_error: bannerElementMessages.color.required[locale],
	});

export const BannerElementSchema = (locale: LanguagesI) => {
	return z
		.object<MyZodType<BannerElementI>>(
			{
				title: languagesContentValidationSchema().describe(bannerElementMessages.title.required[locale]),
				buttons: z.array(ButtonSchema(locale), {
					required_error: bannerElementMessages.buttons.required[locale],
				}),
				// accept empty string
				image: z.string().optional(),
				alert: AlertElementSchema(locale).nullable().describe(bannerElementMessages.alert.invalid[locale]),
				color: BannerColorSchema(locale),
				overlay: z
					.number({
						required_error: bannerElementMessages.overlay.required[locale],
					})
					.min(0, {
						message: bannerElementMessages.overlay.min[locale],
					})
					.max(1, {
						message: bannerElementMessages.overlay.max[locale],
					}),
			},
			{
				description: bannerElementMessages.document.description[locale],
				invalid_type_error: bannerElementMessages.document.invalid[locale],
				required_error: bannerElementMessages.document.required[locale],
			}
		)
		.openapi('Banner_Element_Document', {
			description: bannerElementMessages.document.description[locale],
		});
};
