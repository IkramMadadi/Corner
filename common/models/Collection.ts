import mongoose, { type AnyExpression, type Expression, model, type PipelineStage, Schema, type Types } from 'mongoose';

import type {
	CollectionInstanceMethods,
	CollectionModel,
	CollectionQueryHelpers,
	CollectionSchemaOptions,
	CollectionStaticMethods,
	CollectionVirtual,
} from '!common/generated/models/Collection';
import ImageSchema from '$common/Image';

import LanguagesContentSchema from '$common/LanguagesContent';
import { PublishableContentEnums } from '@common/data/enums/generalEnums';
const required = true;
const unique = true;
/* --------------------- Schema --------------------- */
const CollectionSchema = new Schema<
	CollectionDocumentI<Types.ObjectId>,
	CollectionModel,
	CollectionInstanceMethods,
	CollectionQueryHelpers,
	CollectionVirtual,
	CollectionStaticMethods,
	CollectionSchemaOptions
>(
	{
		// schema here
		website: { type: Schema.Types.ObjectId, ref: 'Website', required },
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
		label: { type: String },
		tags: { type: [{ type: String, required }], required },
		enabled: { type: Boolean, default: true },
		for: { type: String, enum: PublishableContentEnums, required },
		isPublic: { type: Boolean, default: true },
		publishables: {
			type: [{ type: Schema.Types.ObjectId, ref: (doc: CollectionDocumentI<Types.ObjectId>) => (doc.for === 'p' ? 'Product' : 'Blog'), required }],
			required,
		},
		isPublished: { type: Boolean, default: false },
		cover: { type: ImageSchema },
		avatar: { type: ImageSchema },
		summary: { type: LanguagesContentSchema, required, maxlength: [200, 'length must be less than 200'] },
	},
	{ timestamps: true }
);
CollectionSchema.index(
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

/* --------------------- Methods ---------------------  */
CollectionSchema.methods.toOptimizedObject = function () {
	const collection = this.toObject();
	return {
		...collection,
		_id: collection._id.toString(),
		publishables: collection.publishables.map(p => p.toString()),
		website: collection.website.toString(),
	};
};
CollectionSchema.methods.toSimpleCollection = function () {
	const collection = this.toObject();
	return {
		_id: collection._id.toString(),
		numberOfPublishables: collection.publishables.length,
		avatar: collection.avatar,
		for: collection.for,
		isPublic: collection.isPublic,
		isPublished: collection.isPublished,
		name: collection.name,
		slug: collection.slug,
	};
};
/* --------------------- Query Helpers --------------------- */

/* --------------------- static methods --------------------- */
const CollectionTableProjection: Record<keyof CollectionTableDataI | 'score', AnyExpression | Expression> = {
	_id: 1,
	summary: 1,
	createdAt: 1,
	updatedAt: 1,
	enabled: 1,
	for: 1,
	name: 1,
	isPublished: 1,
	slug: 1,
	label: 1,
	tags: 1,
	website: 1,
	avatar: 1,
	score: 1,
	isPublic: 1,
};
CollectionSchema.statics.getCollectionsTableDataI = async function (
	query,
	website,
	{ collectionType = 'p', additionalFilter = { enabled: true, isPublished: true } } = {
		collectionType: 'p',
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

		{
			$project: CollectionTableProjection,
		},
	];

	return (
		await this.aggregate<ListOf<CollectionTableDataI>>([
			...stages,
			{
				$match: {
					website: website,
					for: collectionType,
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
const collectionModel =
	(mongoose.models.Collection as CollectionModel) ||
	model<CollectionDocumentI<Types.ObjectId>, CollectionModel, CollectionQueryHelpers>('Collection', CollectionSchema);
export default collectionModel;
