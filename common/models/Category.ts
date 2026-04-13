import mongoose, { type AnyExpression, type Expression, model, type PipelineStage, Schema, type Types } from 'mongoose';

import type {
	CategoryInstanceMethods,
	CategoryModel,
	CategoryQueryHelpers,
	CategorySchemaOptions,
	CategoryStaticMethods,
	CategoryVirtual,
} from '!common/generated/models/Category';
import ImageSchema from '$common/Image';

import LanguagesContentSchema from '$common/LanguagesContent';
import { PublishableContentEnums } from '@common/data/enums/generalEnums';
import { parentCategoryPipeline } from '@common/utils/backend/pipelines';

const required = true;
const unique = true;
/* --------------------- Schema --------------------- */
const CategorySchema = new Schema<
	CategoryI<Types.ObjectId>,
	CategoryModel,
	CategoryInstanceMethods,
	CategoryQueryHelpers,
	CategoryVirtual,
	CategoryStaticMethods,
	CategorySchemaOptions
>(
	{
		// schema here
		website: {
			type: Schema.Types.ObjectId,
			ref: 'Website',
			required,
		},
		slug: {
			type: String,
			required,
			unique,
			validate: {
				// v must not be "blogs" or "products"
				validator: (v: string) => !['blogs', 'products'].includes(v),
				message: 'Category name cannot be "blogs" or "products".',
			},
		},
		name: { type: LanguagesContentSchema, required },
		summary: { type: LanguagesContentSchema, required },
		label: { type: String },
		tags: { type: [{ type: String, required }], required },
		enabled: { type: Boolean, default: true },
		isPublished: { type: Boolean, default: false },
		for: { type: String, enum: PublishableContentEnums, required },
		parentCategory: {
			type: Schema.Types.ObjectId,
			ref: 'Category',
		},
		cover: { type: ImageSchema },
		avatar: { type: ImageSchema },
		/* importance: { type: Number, default: 0 }, */
	},
	{ timestamps: true }
);
CategorySchema.index(
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
/* CategorySchema.pre('save', async function (next) {
	   // Only run this hook if the importance field is not manually set
    if (this.isNew && this.importance === 0) {
        try {
            // Find the document with the highest importance
            const highestImportanceDoc = await mongoose
                .model('MyModel')
                .findOne({})
                .sort({ importance: -1 })
                .select('importance');

            // Increment importance if there is an existing document
            this.importance = highestImportanceDoc ? highestImportanceDoc.importance + 1 : 1;
        } catch (error) {
            return next(error as CallbackError);
        }
    }
    next();
});
 */
/* --------------------- Methods ---------------------  */
CategorySchema.methods.toOptimizedObject = function () {
	const obj = this.toObject();
	return {
		_id: obj._id.toString(),
		website: obj.website.toString(),
		name: obj.name,
		tags: obj.tags,
		label: obj.label,
		isPublished: obj.isPublished,
		enabled: obj.enabled,
		for: obj.for,
		parentCategory: obj.parentCategory?.toString(),
		cover: this.cover,
		avatar: this.avatar,
		createdAt: obj.createdAt,
		updatedAt: obj.updatedAt,
		slug: obj.slug,
		summary: obj.summary,
	};
};
/* --------------------- Methods ---------------------  */

CategorySchema.methods.toTableSimpleCategory = function () {
	const obj = this.toObject();
	return {
		_id: obj._id.toString(),
		avatar: this.avatar,
		for: obj.for,
		isPublished: obj.isPublished,
		name: obj.name,
		slug: obj.slug,
	};
};
/* --------------------- Query Helpers --------------------- */

/* --------------------- static methods --------------------- */

const CategoryTableProjection: Record<keyof CategoryTableDataI | 'score', AnyExpression | Expression> = {
	_id: 1,
	summary: 1,
	createdAt: 1,
	updatedAt: 1,
	enabled: 1,
	isPublished: 1,
	for: 1,
	name: 1,
	slug: 1,
	label: 1,
	tags: 1,
	website: 1,
	avatar: 1,
	score: 1,
	parentCategory: 1,
};
CategorySchema.statics.getCategoriesTableDataI = async function (
	query,
	website,
	{ categoryType = 'p', additionalFilter = { enabled: true, isPublished: true } } = {
		categoryType: 'p',
		additionalFilter: { enabled: true, isPublished: true },
	}
) {
	const { search, page = 1, limit = 10, sort = 'createdAt', sortDir = 'asc' } = query;
	const stages: PipelineStage[] = [];
	const sortPipeline: PipelineStage.FacetPipelineStage[] = [];
	if (search) {
		stages.push({
			$match: {
				$text: {
					$search: search,
				},
			},
		});
		sortPipeline.push(
			{
				$addFields: {
					score: {
						$meta: 'textScore',
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
		...parentCategoryPipeline,
		{
			$project: CategoryTableProjection,
		},
	];

	return (
		await this.aggregate<ListOf<CategoryTableDataI>>([
			...stages,
			{
				$match: {
					website: website,
					for: categoryType,
					...additionalFilter,
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
/* --------------------- Generate Model --------------------- */
const categoryModel =
	(mongoose.models.Category as CategoryModel) ||
	model<CategoryI<Types.ObjectId>, CategoryModel, CategoryQueryHelpers>('Category', CategorySchema);
export default categoryModel;
