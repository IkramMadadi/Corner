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

export type CollectionVirtual = object;

export interface CollectionInstanceMethods {
	toOptimizedObject: (this: CollectionHydratedDocument) => OptimizedCollectionI;
	toSimpleCollection: (this: CollectionHydratedDocument) => SimpleCollectionI;
}
export type CollectionQueryHelpers = object;
export interface CollectionDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<
			CollectionDocument,
			CollectionDocumentI<Types.ObjectId>,
			ResolveSchemaOptions<CollectionSchemaOptions>
		>,
		ResolveSchemaOptions<CollectionSchemaOptions>
	> {}
export interface CollectionHydratedDocument
	extends HydratedDocument<
		FlatRecord<CollectionDocument>,
		CollectionInstanceMethods & CollectionVirtual,
		CollectionQueryHelpers
	> {}
export type CollectionQuery = QueryWithHelpers<
	Array<CollectionHydratedDocument>,
	CollectionHydratedDocument,
	CollectionQueryHelpers,
	CollectionDocumentI<Types.ObjectId>,
	'find',
	CollectionInstanceMethods
>;
export type CollectionQueryLean = Query<
	GetLeanResultType<CollectionI<Types.ObjectId>, CollectionI<Types.ObjectId>[], 'find'>,
	//Array<CollectionHydratedDocument>,
	CollectionHydratedDocument,
	CollectionQueryHelpers,
	CollectionI<Types.ObjectId>,
	'find',
	CollectionInstanceMethods
>;
export interface CollectionStaticMethods {
	// custom static methods here
	getCollectionsTableDataI: (
		this: CollectionModel,
		query: SortableQuerySearchI<CollectionSortableFields>,
		website: Types.ObjectId,
		options?: {
			additionalFilter?: FilterQuery<CategoryI>;
			collectionType?: PublishableContentTypeI;
		}
	) => Promise<ListOf<CollectionTableDataI>>;
}
export interface CollectionSchemaOptions {
	timestamps: true;
}
export interface CollectionModel
	extends Model<
			CollectionDocumentI<Types.ObjectId>,
			CollectionQueryHelpers,
			CollectionInstanceMethods,
			CollectionVirtual,
			CollectionHydratedDocument
		>,
		CollectionStaticMethods {}
