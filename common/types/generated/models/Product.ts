import type {
	ApplySchemaOptions,
	FilterQuery,
	FlatRecord,
	HydratedDocument,
	Model,
	ObtainDocumentType,
	QueryWithHelpers,
	/* QueryWithHelpers, */
	ResolveSchemaOptions,
	Types,
} from 'mongoose';

export type ProductVirtual = object;

export interface ProductInstanceMethods {
	toOptimizedObject: (this: ProductHydratedDocument) => PublicProductI;
}
export type ProductQueryHelpers = object;
export interface ProductDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<ProductDocument, ProductI<Types.ObjectId>, ResolveSchemaOptions<ProductSchemaOptions>>,
		ResolveSchemaOptions<ProductSchemaOptions>
	> {}
export interface ProductHydratedDocument
	extends HydratedDocument<
		FlatRecord<ProductDocument>,
		ProductInstanceMethods & ProductVirtual,
		ProductQueryHelpers
	> {}
export type ProductQuery = QueryWithHelpers<
	Array<ProductHydratedDocument>,
	ProductHydratedDocument,
	ProductQueryHelpers,
	ProductI<Types.ObjectId>,
	'find',
	ProductInstanceMethods
>;
export interface ProductStaticMethods {
	getProductTableDataI: (
		this: ProductModel,
		query: SortableQuerySearchI<ProductSortableFields>,
		website: Types.ObjectId,
		additionalFilter?: FilterQuery<ProductI>,
		includeCreator?: boolean
	) => Promise<ListOf<ProductTableDataI>>;
}
export interface ProductSchemaOptions {
	timestamps: true;
}
export interface ProductModel
	extends Model<
			ProductI<Types.ObjectId>,
			ProductQueryHelpers,
			ProductInstanceMethods,
			ProductVirtual,
			ProductHydratedDocument
		>,
		ProductStaticMethods {}
