import mongoose, { model, type PipelineStage, Schema, type Types } from 'mongoose';

import type {
	BlogInstanceMethods,
	BlogModel,
	BlogQueryHelpers,
	BlogSchemaOptions,
	BlogStaticMethods,
	BlogVirtual,
} from '!common/generated/models/Blog';
import ImageSchema from '$common/Image';
import LanguagesContentSchema from '$common/LanguagesContent';
import { personalInformationSchema } from '$common/PersonalInformation';
import RatingAggregationSchema from '$common/RatingAggregation';
import { categoryPipeline, createdByPipeline } from '@common/utils/backend/pipelines';



const required = true;
const unique = true;
const defaultRating: RatingAggregationI = {
	average: 0,
	count: 0,
	distribution: [0, 0, 0, 0, 0],
};
/* --------------------- Schema --------------------- */
const BlogSchema = new Schema<
	BlogDocumentI<Types.ObjectId>,
	BlogModel,
	BlogInstanceMethods,
	BlogQueryHelpers,
	BlogVirtual,
	BlogStaticMethods,
	BlogSchemaOptions
>(
	{
		// schema here
		website: { type: Schema.Types.ObjectId, ref: 'Website', required },
		slug: { type: String, required, unique },
		name: { type: LanguagesContentSchema, required },
		tags: { type: [{ type: String, required }], required },
		enabled: { type: Boolean, default: true },
		author: { type: personalInformationSchema, required },
		category: { type: Schema.Types.ObjectId, ref: 'Category' },
		content: { type: LanguagesContentSchema, required },
		ratingAggregation: { type: RatingAggregationSchema, default: defaultRating },
		createdBy: { type: Schema.Types.ObjectId, ref: 'User', required },
		isPublished: { type: Boolean, default: false },
		views: { type: Number, default: 0 },
		cover: { type: ImageSchema },
		label: { type: String },
		thumbnail: { type: ImageSchema, required },
		summary: { type: LanguagesContentSchema, required },
	},
	{ timestamps: true }
);
BlogSchema.index(
	{
		'name.en': 'text',
		'name.fr': 'text',
		'name.ar': 'text',
		'summary.en': 'text',
		'summary.fr': 'text',
		'summary.ar': 'text',
	},
	{
		weights: {
			'name.en': 10,
			'name.fr': 10,
			'name.ar': 10,
			'summary.en': 5,
			'summary.fr': 5,
			'summary.ar': 5,
		},
	}
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */
/* BlogSchema.pre('save', async function (next) {
	try {
	// hook here
		next();
	} catch (err) {
		next(err as Error);
	}
});
 */
/* --------------------- Methods ---------------------  */
BlogSchema.methods.toOptimizedObject = function () {
	return {
		_id: this._id.toString(),
		category: this.category?.toString(),
		author: this.author,
		content: this.content,
		createdAt: this.createdAt.toISOString(),
		enabled: this.enabled,
		isPublished: this.isPublished,
		name: this.name,
		ratingAggregation: this.ratingAggregation,
		slug: this.slug,
		tags: this.tags,
		updatedAt: this.updatedAt.toISOString(),
		views: this.views,
		cover: this.cover,
		website: this.website.toString(),
		summary: this.summary,
		createdBy: this.createdBy.toString(),
		thumbnail: this.thumbnail,
		label: this.label,
	};
};
/* --------------------- Query Helpers --------------------- */

/* --------------------- static methods --------------------- */
const BlogTableProjectionE: Record<keyof Omit<BlogTableDataI, 'createdBy'> | 'score', 1> = {
	_id: 1,
	category: 1,
	author: 1,
	summary: 1,
	createdAt: 1,
	updatedAt: 1,
	enabled: 1,
	isPublished: 1,
	name: 1,
	ratingAggregation: 1,
	views: 1,
	slug: 1,
	tags: 1,
	label: 1,
	website: 1,
	thumbnail: 1,
	score: 1,
};
const BlogTableProjectionInclude: Record<keyof BlogTableDataI | 'score', 1> = {
	...BlogTableProjectionE,
	createdBy: 1,
};

BlogSchema.statics.getBlogTableDataI = async function (
	query,
	website,
	f = {
		enabled: true,
		isPublished: true,
	},
	includeCreator = true
) {
	const { search, page = 1, limit = 10, sort = 'createdAt', sortDir = 'asc' } = query;
	const stages: PipelineStage[] = [];
	const sortPipeline: PipelineStage.FacetPipelineStage[] = [];
	if (search) {
		stages.push({
			$search: {
				index: 'default',
				text: {
					query: search,
					path: ['summary.en', 'summary.fr', 'summary.ar', 'name.en', 'name.fr', 'name.ar'],
					fuzzy: {},
				},
			},
		});
		sortPipeline.push(
			{
				$addFields: {
					score: {
						$meta: 'searchScore',
					},
				},
			},
			{
				$sort: {
					score: sortDir === 'asc' ? 1 : -1,
				},
			}
		);
	} else {
		sortPipeline.push({
			$sort: {
				[sort]: sortDir === 'asc' ? 1 : -1,
			},
		});
	}
	const listPipeline = [
		...sortPipeline,
		{
			$skip: (Number(page) - 1) * Number(limit),
		},
		{
			$limit: Number(limit),
		},
		...categoryPipeline,
		...(includeCreator ? createdByPipeline : []),
		{
			$project: includeCreator ? BlogTableProjectionInclude : BlogTableProjectionE,
		},
	];

	return (
		await this.aggregate<ListOf<BlogTableDataI>>([
			...stages,
			{
				$match: {
					website: website,
					...f,
				},
			},
			{
				$facet: {
					list: listPipeline,
					total: [{ $count: 'total' }],
				},
			},
			{
				$project: {
					list: 1,
					total: { $arrayElemAt: ['$total.total', 0] }, // Extract the total number from the array
				},
			},
		])
	)[0];
};
/* --------------------- Model --------------------- */
const blogModel =
	(mongoose.models.Blog as BlogModel) ||
	model<BlogDocumentI<Types.ObjectId>, BlogModel, BlogQueryHelpers>('Blog', BlogSchema);
export default blogModel;
