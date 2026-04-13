import { type MyZodType, z } from '^common/defaultZod';

// Define message constants
const pricingMessages = {
	current: {
		required: {
			en: 'Pricing current is required',
			fr: 'Le prix actuel est requis',
			ar: 'السعر الحالي مطلوب',
		},
		invalid: {
			en: 'Pricing current is not a valid number',
			fr: "Le prix actuel n'est pas un nombre valide",
			ar: 'السعر الحالي ليس رقمًا صالحًا',
		},
	},
	original: {
		required: {
			en: 'Pricing original is required',
			fr: 'Le prix original est requis',
			ar: 'السعر الأصلي مطلوب',
		},
		invalid: {
			en: 'Pricing original is not a valid number',
			fr: "Le prix original n'est pas un nombre valide",
			ar: 'السعر الأصلي ليس رقمًا صالحًا',
		},
	},
	validation: {
		message: {
			en: 'Current price must be less than original price',
			fr: 'Le prix actuel doit être inférieur au prix original',
			ar: 'يجب أن يكون السعر الحالي أقل من السعر الأصلي',
		},
	},
};

export const pricingValidationSchema = (locale: LanguagesI) =>
	z
		.object<MyZodType<PricingI>>({
			current: z.number({
				description: 'Pricing current',
				invalid_type_error: pricingMessages.current.invalid[locale],
				required_error: pricingMessages.current.required[locale],
			}),
			original: z
				.number({
					description: 'Pricing original',
					invalid_type_error: pricingMessages.original.invalid[locale],
					required_error: pricingMessages.original.required[locale],
				})
				.optional(),
		})
		.refine(
			({ current, original }) => {
				if (original && current >= original) return false;
				return true;
			},
			{
				message: pricingMessages.validation.message[locale],
				path: ['current'],
			}
		);
