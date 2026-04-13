import mongoose, { type AnyExpression, type Expression, type PipelineStage, Schema, Types, model } from 'mongoose';

import type {
	ProductInstanceMethods,
	ProductModel,
	ProductQueryHelpers,
	ProductSchemaOptions,
	ProductStaticMethods,
	ProductVirtual,
} from '!common/generated/models/Product';
import ImageSchema from '$common/Image';
import LanguagesContentSchema from '$common/LanguagesContent';
import PricingSchema from '$common/Pricing';
import ProductAdditionalSchema from '$common/ProductAdditional';
import ProductFlagsSchema from '$common/ProductFlags';
import RatingAggregationSchema from '$common/RatingAggregation';
import SoldAggregationSchema from '$common/SoldAggregation';
import { ProductAdditionalVariantsEnums } from '@common/data/enums/ProductAdditionalEnums';
import { productLabelsEnums } from '@common/data/enums/generalEnums';
import { categoryPipeline, createdByPipeline } from '@common/utils/backend/pipelines';

const required = true;
const unique = true;

/* --------------------- Upsell Schema --------------------- */
const UpsellSchema = new Schema(
	{
		parent: { type: Schema.Types.ObjectId, ref: 'Product' },
		landingPage: { type: String },
		enabled: { type: Boolean, default: false },
	},
	{ _id: false }
);

/* --------------------- Schema --------------------- */
const ProductSchema = new Schema<
	ProductI<Types.ObjectId>,
	ProductModel,
	ProductInstanceMethods,
	ProductQueryHelpers,
	ProductVirtual,
	ProductStaticMethods,
	ProductSchemaOptions
>(
	{
		additional: { type: ProductAdditionalSchema, required },
		category: { type: Schema.Types.ObjectId, ref: 'Category' },
		createdBy: { type: Schema.Types.ObjectId, ref: 'User', required },
		description: { type: LanguagesContentSchema, required },
		name: { type: LanguagesContentSchema, required },
		flags: { type: ProductFlagsSchema },
		thumbnail: { type: ImageSchema, required },
		images: { type: [{ type: ImageSchema, required }], required },
		pricing: { type: PricingSchema, required },
		sku: { type: String, required },
		ratingAggregation: {
			type: RatingAggregationSchema,
			default: { count: 0, average: 0, distribution: [0, 0, 0, 0, 0] },
		},
		soldAggregation: { type: SoldAggregationSchema, default: { count: 0, delivered: 0 } },
		website: { type: Schema.Types.ObjectId, ref: 'Website', required },
		enabled: { type: Boolean, default: true },
		isPublished: { type: Boolean, default: false },
		slug: { type: String, required, unique },
		label: { type: String, enum: productLabelsEnums },
		tags: { type: [{ type: String, required }], required },
		summary: { type: LanguagesContentSchema, required, maxlength: 200 },
		pricePriority: { type: [{ type: String, enum: ProductAdditionalVariantsEnums }], default: [] },
		upsell: {
			type: UpsellSchema,
			default: { enabled: false },
		},
	},
	{ timestamps: true }
);
/* --------------------- Virtual ---------------------  */
ProductSchema.index(
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

/* --------------------- Hooks ---------------------  */

/* --------------------- Methods ---------------------  */
ProductSchema.methods.toOptimizedObject = function () {
	const obj = this.toObject();
	return {
		_id: obj._id.toString(),
		enabled: obj.enabled,
		isPublished: obj.isPublished,
		additional: obj.additional,
		category: obj.category?.toString(),
		createdBy: obj.createdBy?.toString(),
		description: obj.description,
		name: obj.name,
		flags: obj.flags,
		images: obj.images,
		thumbnail: obj.thumbnail,
		pricing: obj.pricing,
		sku: obj.sku,
		ratingAggregation: obj.ratingAggregation,
		soldAggregation: obj.soldAggregation,
		website: obj.website?.toString(),
		slug: obj.slug,
		label: obj.label,
		tags: obj.tags,
		summary: obj.summary,
		pricePriority: obj.pricePriority,
		createdAt: obj.createdAt.toISOString(),
		updatedAt: obj.updatedAt.toISOString(),
		upsell: obj.upsell ? {
			parent: obj.upsell.parent?.toString(),
			landingPage: obj.upsell.landingPage,
			enabled: obj.upsell.enabled,
		} : undefined,
	};
};
/* --------------------- Query Helpers --------------------- */

/* --------------------- static methods --------------------- */

const ProductTableProjection: Record<keyof Omit<ProductTableDataI, 'createdBy'> | 'score', AnyExpression | Expression> =
{
	_id: 1,
	name: 1,
	thumbnail: 1,
	category: 1,
	createdAt: 1,
	updatedAt: 1,
	website: 1,
	enabled: 1,
	isPublished: 1,
	ratingAggregation: 1,
	soldAggregation: 1,
	pricing: 1,
	sku: 1,
	slug: 1,
	label: 1,
	summary: 1,
	pricePriority: 1,
	upsell: 1,
	hasAdditional: {
		$or: [
			{ $gt: [{ $size: { $ifNull: ['$additional.variants', []] } }, 0] },
			{ $gt: [{ $size: { $ifNull: ['$additional.colors', []] } }, 0] },
			{ $gt: [{ $size: { $ifNull: ['$additional.sizes', []] } }, 0] },
		],
	},
	score: 1,
};

const ProductTableProjectionInclude: Record<keyof ProductTableDataI | 'score', AnyExpression | Expression> = {
	...ProductTableProjection,
	createdBy: 1,
};

ProductSchema.statics.getProductTableDataI = async function (
	query,
	website,
	f = { enabled: true, isPublished: true },
	includeCreator = true
) {
	const { search, page = 1, limit = 100, sort = 'createdAt', sortDir = 'asc' } = query;
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
			$project: includeCreator ? ProductTableProjectionInclude : ProductTableProjection,
		},
	];

	const websiteId = new Types.ObjectId(website.toString());

	return (
		await this.aggregate<ListOf<ProductTableDataI>>([
			...stages,
			{
				$match: {
					website: websiteId,
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

/* --------------------- Generate Model --------------------- */
const productModel =
	(mongoose.models.Product as ProductModel) ||
	model<ProductI<Types.ObjectId>, ProductModel, ProductQueryHelpers>('Product', ProductSchema);
export default productModel;
