export const productSortableFields: ProductSortableFields[] = [
	'createdAt',
	'name',
	'pricing.current',
	'ratingAggregation.average',
	'ratingAggregation.count',
	'score',
	'soldAggregation.count',
];

export const productSortableLabels: LabelValueI<ProductSortableFields>[] = [
	{
		label: {
			en: 'Newest',
			fr: 'Nouveau',
			ar: 'الأحدث',
		},
		value: 'createdAt',
	},
	{
		label: {
			fr: 'Nom',
			en: 'Name',
			ar: 'الاسم',
		},
		value: 'name',
	},
	{
		label: {
			fr: 'Prix',
			en: 'Price',
			ar: 'السعر',
		},
		value: 'pricing.current',
	},
	{
		label: {
			fr: 'Note',
			en: 'Rating',
			ar: 'التقييم',
		},
		value: 'ratingAggregation.average',
	},
	{
		label: {
			fr: 'Nombre de notes',
			en: 'Number of ratings',
			ar: 'عدد التقييمات',
		},
		value: 'ratingAggregation.count',
	},
];

export const productSortableLabelsWithScore: LabelValueI<ProductSortableFields>[] = [
	{
		label: {
			en: 'Most relevant',
			fr: 'Le plus pertinent',
			ar: 'الأكثر ذات صلة',
		},
		value: 'score',
	},
	...productSortableLabels,
];
