import { LinkCollectionEnums } from '@common/data/enums/LinkCollectionEnums';
import { type MyZodType, z } from '^common/defaultZod';

// Define message constants
const linkMessages = {
	ref: {
		required: {
			en: 'Link ref is required',
			fr: 'La référence du lien est requise',
			ar: 'مرجع الرابط مطلوب',
		},
		invalid: {
			en: 'Link ref is not a valid string',
			fr: "La référence du lien n'est pas une chaîne valide",
			ar: 'مرجع الرابط ليس سلسلة صالحة',
		},
	},
	refCollection: {
		required: {
			en: 'Link ref collection is required',
			fr: 'La collection de référence du lien est requise',
			ar: 'مجموعة مرجع الرابط مطلوبة',
		},
		invalid: {
			en: 'Link ref collection is not a valid enum',
			fr: "La collection de référence du lien n'est pas un énumérateur valide",
			ar: 'مجموعة مرجع الرابط ليست تعدادًا صالحًا',
		},
	},
};

export const linkValidationSchema = (locale: LanguagesI) =>
	z.object<MyZodType<LinkI>>({
		ref: z.string({
			description: 'Link ref',
			invalid_type_error: linkMessages.ref.invalid[locale],
			required_error: linkMessages.ref.required[locale],
		}),
		refCollection: z.enum<LinkKeys, MyEnum<LinkKeys>>(LinkCollectionEnums as unknown as MyEnum<LinkKeys>, {
			description: 'Link ref collection',
			invalid_type_error: linkMessages.refCollection.invalid[locale],
			required_error: linkMessages.refCollection.required[locale],
		}),
	});
