import type { PipelineStage } from 'mongoose';

export const createdByPipeline: PipelineStage.FacetPipelineStage[] = [
	{
		$lookup: {
			from: 'users',
			localField: 'createdBy',
			foreignField: '_id',
			as: 'createdBy',
			pipeline: [
				{
					$project: {
						_id: 1,
						firstName: '$personalInformation.firstName',
						lastName: '$personalInformation.lastName',
					},
				},
			],
		},
	},
	{
		$unwind: {
			path: '$createdBy',
			preserveNullAndEmptyArrays: true,
		},
	},
];

export const categoryPipeline: PipelineStage.FacetPipelineStage[] = [
	{
		$lookup: {
			from: 'categories',
			localField: 'category',
			foreignField: '_id',
			as: 'category',
			pipeline: [
				{
					$project: {
						_id: 1,
						name: 1,
						slug: 1,
						summary: 1,
					},
				},
			],
		},
	},
	{
		$unwind: { path: '$category', preserveNullAndEmptyArrays: true },
	},
];
export const parentCategoryPipeline: PipelineStage.FacetPipelineStage[] = [
	{
		$lookup: {
			from: 'categories',
			localField: 'parentCategory',
			foreignField: '_id',
			as: 'parentCategory',
			pipeline: [
				{
					$project: {
						_id: 1,
						name: 1,
						slug: 1,
						summary: 1,
					},
				},
			],
		},
	},
	{
		$unwind: { path: '$parentCategory', preserveNullAndEmptyArrays: true },
	},
];
