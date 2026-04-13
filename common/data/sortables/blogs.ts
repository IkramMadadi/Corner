export const blogSortableFields: BlogSortableFields[] = [
	'createdAt',
	'name',
	'ratingAggregation.average',
	'ratingAggregation.count',
	'score',
	'views',
];

export const blogSortableLabels: LabelValueI<BlogSortableFields>[] = [
	{
		label: {
			fr: 'Date de création',
			en: 'Creation date',
			ar: 'تاريخ الإنشاء',
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
	{
		label: {
			en: 'Number of views',
			fr: 'Nombre de vues',
			ar: 'عدد المشاهدات',
		},
		value: 'views',
	},
];

export const blogSortableLabelsWithScore: LabelValueI<BlogSortableFields>[] = [
	{
		label: {
			en: 'Most relevant',
			fr: 'Le plus pertinent',
			ar: 'الأكثر ذات صلة',
		},
		value: 'score',
	},
	...blogSortableLabels,
];
