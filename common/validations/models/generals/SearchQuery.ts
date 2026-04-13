import { sortOrders } from '@common/data/sortables';
import { type MyZodType, z } from '^common/defaultZod';

// Define message constants
const searchQueryMessages = {
	limit: {
		invalid: {
			en: 'Limit must be a number',
			fr: 'La limite doit être un nombre',
			ar: 'يجب أن تكون الحد رقمًا',
		},
	},
	page: {
		invalid: {
			en: 'Page must be a number',
			fr: 'La page doit être un nombre',
			ar: 'يجب أن تكون الصفحة رقمًا',
		},
	},
	search: {
		invalid: {
			en: 'Search must be a string',
			fr: 'La recherche doit être une chaîne',
			ar: 'يجب أن تكون البحث سلسلة',
		},
	},
	sort: {
		invalid: {
			en: 'Sort must be a string',
			fr: 'Le tri doit être une chaîne',
			ar: 'يجب أن تكون الفرز سلسلة',
		},
	},
	sortDir: {
		invalid: {
			en: 'SortDir must be a string',
			fr: 'SortDir doit être une chaîne',
			ar: 'يجب أن تكون SortDir سلسلة',
		},
	},
	document: {
		description: {
			en: 'Sortable query search schema',
			fr: 'Schéma de recherche de requête triable',
			ar: 'مخطط البحث عن استعلام قابل للفرز',
		},
		invalid: {
			en: 'Invalid sortable query search schema',
			fr: 'Schéma de recherche de requête triable invalide',
			ar: 'مخطط البحث عن استعلام قابل للفرز غير صالح',
		},
		required: {
			en: 'Sortable query search schema is required',
			fr: 'Le schéma de recherche de requête triable est requis',
			ar: 'مخطط البحث عن استعلام قابل للفرز مطلوب',
		},
	},
};

export const SortableQuerySearchSchema = <T extends string>(sortables: MyEnum<T>, locale: LanguagesI) => {
	return z
		.object<MyZodType<SortableQuerySearchI<T>>>(
			{
				limit: z
					.number({
						invalid_type_error: searchQueryMessages.limit.invalid[locale],
					})
					.optional(),
				page: z
					.number({
						invalid_type_error: searchQueryMessages.page.invalid[locale],
					})
					.optional(),
				search: z
					.string({
						invalid_type_error: searchQueryMessages.search.invalid[locale],
					})
					.optional(),
				sort: z.enum<T, MyEnum<T>>(sortables, {
					invalid_type_error: searchQueryMessages.sort.invalid[locale],
				}),
				sortDir: z.enum<SortOrderTypes, MyEnum<SortOrderTypes>>(sortOrders, {
					invalid_type_error: searchQueryMessages.sortDir.invalid[locale],
				}),
				endDate: z
					.number({
						invalid_type_error: searchQueryMessages.limit.invalid[locale],
					})
					.optional(),
				startDate: z
					.number({
						invalid_type_error: searchQueryMessages.limit.invalid[locale],
					})
					.optional(),
			},
			{
				description: searchQueryMessages.document.description[locale],
				invalid_type_error: searchQueryMessages.document.invalid[locale],
				required_error: searchQueryMessages.document.required[locale],
			}
		)
		.openapi('Sortable query search schema', { description: searchQueryMessages.document.description[locale] });
};
