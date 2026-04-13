import type {
	ApplySchemaOptions,
	FilterQuery,
	FlatRecord,
	GetLeanResultType,
	HydratedDocument,
	Model,
	ObtainDocumentType,
	Query,
	QueryWithHelpers,
	/* QueryWithHelpers, */
	ResolveSchemaOptions,
	Types,
} from 'mongoose';

export type CategoryVirtual = object;

export interface CategoryInstanceMethods {
	toOptimizedObject: (this: CategoryHydratedDocument) => OptimizedCategoryI;
	toTableSimpleCategory: (this: CategoryHydratedDocument) => TableSimpleCategoryI;
}
export type CategoryQueryHelpers = object;
export interface CategoryDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<CategoryDocument, CategoryI<Types.ObjectId>, ResolveSchemaOptions<CategorySchemaOptions>>,
		ResolveSchemaOptions<CategorySchemaOptions>
	> {}
export interface CategoryHydratedDocument
	extends HydratedDocument<
		FlatRecord<CategoryDocument>,
		CategoryInstanceMethods & CategoryVirtual,
		CategoryQueryHelpers
	> {}
export type CategoryQuery = QueryWithHelpers<
	Array<CategoryHydratedDocument>,
	CategoryHydratedDocument,
	CategoryQueryHelpers,
	CategoryI<Types.ObjectId>,
	'find',
	CategoryInstanceMethods
>;
export type CategoryQueryLean = Query<
	GetLeanResultType<CategoryI<Types.ObjectId>, CategoryI<Types.ObjectId>[], 'find'>,
	//Array<CategoryHydratedDocument>,
	CategoryHydratedDocument,
	CategoryQueryHelpers,
	CategoryI<Types.ObjectId>,
	'find',
	CategoryInstanceMethods
>;
export interface CategoryStaticMethods {
	// custom static methods here
	getCategoriesTableDataI: (
		this: CategoryModel,
		query: SortableQuerySearchI<CategorySortableFields>,
		website: Types.ObjectId,
		options?: {
			additionalFilter?: FilterQuery<CategoryI>;
			categoryType?: PublishableContentTypeI;
		}
	) => Promise<ListOf<CategoryTableDataI>>;
}
export interface CategorySchemaOptions {
	timestamps: true;
}
export interface CategoryModel
	extends Model<
			CategoryI<Types.ObjectId>,
			CategoryQueryHelpers,
			CategoryInstanceMethods,
			CategoryVirtual,
			CategoryHydratedDocument
		>,
		CategoryStaticMethods {}
