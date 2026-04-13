import { type MyZodType, z } from '^common/defaultZod';

// Define message constants
const ratingAggregationMessages = {
	average: {
		required: {
			en: 'Rating average is required',
			fr: 'La moyenne des notes est requise',
			ar: 'متوسط التقييم مطلوب',
		},
		invalid: {
			en: 'Rating average is not a valid number',
			fr: "La moyenne des notes n'est pas un nombre valide",
			ar: 'متوسط التقييم ليس رقمًا صالحًا',
		},
	},
	count: {
		required: {
			en: 'Rating count is required',
			fr: 'Le nombre de notes est requis',
			ar: 'عدد التقييمات مطلوب',
		},
		invalid: {
			en: 'Rating count is not a valid number',
			fr: "Le nombre de notes n'est pas un nombre valide",
			ar: 'عدد التقييمات ليس رقمًا صالحًا',
		},
	},
	distribution: {
		required: {
			en: 'Rating distribution is required',
			fr: 'La distribution des notes est requise',
			ar: 'توزيع التقييمات مطلوب',
		},
		invalid: {
			en: 'Rating distribution is not a valid number',
			fr: "La distribution des notes n'est pas un nombre valide",
			ar: 'توزيع التقييمات ليس رقمًا صالحًا',
		},
		length: {
			en: 'Rating distribution must have 5 elements',
			fr: 'La distribution des notes doit comporter 5 éléments',
			ar: 'يجب أن يحتوي توزيع التقييمات على 5 عناصر',
		},
	},
};

export const ratingAggregationValidationSchema = (locale: LanguagesI) =>
	z.object<MyZodType<RatingAggregationI>>({
		average: z.number({
			description: 'Rating average',
			invalid_type_error: ratingAggregationMessages.average.invalid[locale],
			required_error: ratingAggregationMessages.average.required[locale],
		}),
		count: z.number({
			description: 'Rating count',
			invalid_type_error: ratingAggregationMessages.count.invalid[locale],
			required_error: ratingAggregationMessages.count.required[locale],
		}),
		distribution: z.tuple(
			[
				z.number({
					description: '1-star rating count',
					invalid_type_error: ratingAggregationMessages.distribution.invalid[locale],
					required_error: ratingAggregationMessages.distribution.required[locale],
				}),
				z.number({
					description: '2-star rating count',
					invalid_type_error: ratingAggregationMessages.distribution.invalid[locale],
					required_error: ratingAggregationMessages.distribution.required[locale],
				}),
				z.number({
					description: '3-star rating count',
					invalid_type_error: ratingAggregationMessages.distribution.invalid[locale],
					required_error: ratingAggregationMessages.distribution.required[locale],
				}),
				z.number({
					description: '4-star rating count',
					invalid_type_error: ratingAggregationMessages.distribution.invalid[locale],
					required_error: ratingAggregationMessages.distribution.required[locale],
				}),
				z.number({
					description: '5-star rating count',
					invalid_type_error: ratingAggregationMessages.distribution.invalid[locale],
					required_error: ratingAggregationMessages.distribution.required[locale],
				}),
			],
			{
				description: 'Rating distribution array with 5 elements',
				errorMap: (issue, ctx) => {
					if (issue.code === 'too_small' || issue.code === 'too_big') {
						return { message: ratingAggregationMessages.distribution.length[locale] };
					}
					return { message: ctx.defaultError };
				},
			}
		),
	});
