import { type MyZodType, z } from '^common/defaultZod';

// Define message constants
const imageMessages = {
	alt: {
		required: {
			en: 'Image alt is required',
			fr: "Le texte alternatif de l'image est requis",
			ar: 'النص البديل للصورة مطلوب',
		},
		invalid: {
			en: 'Image alt is not a valid string',
			fr: "Le texte alternatif de l'image n'est pas une chaîne valide",
			ar: 'النص البديل للصورة ليس سلسلة صالحة',
		},
	},
	src: {
		required: {
			en: 'Image src is required',
			fr: "La source de l'image est requise",
			ar: 'مصدر الصورة مطلوب',
		},
		invalid: {
			en: 'Image src is not a valid string',
			fr: "La source de l'image n'est pas une chaîne valide",
			ar: 'مصدر الصورة ليس سلسلة صالحة',
		},
	},
	width: {
		required: {
			en: 'Image width is required',
			fr: "La largeur de l'image est requise",
			ar: 'عرض الصورة مطلوب',
		},
		invalid: {
			en: 'Image width is not a valid number',
			fr: "La largeur de l'image n'est pas un nombre valide",
			ar: 'عرض الصورة ليس رقمًا صالحًا',
		},
	},
	height: {
		required: {
			en: 'Image height is required',
			fr: "La hauteur de l'image est requise",
			ar: 'ارتفاع الصورة مطلوب',
		},
		invalid: {
			en: 'Image height is not a valid number',
			fr: "La hauteur de l'image n'est pas un nombre valide",
			ar: 'ارتفاع الصورة ليس رقمًا صالحًا',
		},
	},
};

export const imageValidationSchema = (locale: LanguagesI) =>
	z.object<MyZodType<CaptionedImageI>>({
		alt: z.string({
			description: 'Image alt',
			invalid_type_error: imageMessages.alt.invalid[locale],
			required_error: imageMessages.alt.required[locale],
		}),
		src: z.string({
			description: 'Image src',
			invalid_type_error: imageMessages.src.invalid[locale],
			required_error: imageMessages.src.required[locale],
		}),
		width: z.number({
			description: 'Image width',
			invalid_type_error: imageMessages.width.invalid[locale],
			required_error: imageMessages.width.required[locale],
		}),
		height: z.number({
			description: 'Image height',
			invalid_type_error: imageMessages.height.invalid[locale],
			required_error: imageMessages.height.required[locale],
		}),
	});
