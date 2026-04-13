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

export type BlogVirtual = object;

export interface BlogInstanceMethods {
	toOptimizedObject: (this: BlogHydratedDocument) => PublicBlogI;
}
export type BlogQueryHelpers = object;
export interface BlogDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<BlogDocument, BlogDocumentI<Types.ObjectId>, ResolveSchemaOptions<BlogSchemaOptions>>,
		ResolveSchemaOptions<BlogSchemaOptions>
	> {}
export interface BlogHydratedDocument
	extends HydratedDocument<FlatRecord<BlogDocument>, BlogInstanceMethods & BlogVirtual, BlogQueryHelpers> {}
export type BlogQuery = QueryWithHelpers<
	Array<BlogHydratedDocument>,
	BlogHydratedDocument,
	BlogQueryHelpers,
	BlogDocumentI<Types.ObjectId>,
	'find',
	BlogInstanceMethods
>;
export interface BlogStaticMethods {
	// custom static methods here
	getBlogTableDataI: (
		this: BlogModel,
		query: SortableQuerySearchI<BlogSortableFields>,
		website: Types.ObjectId,
		additionalFilter?: FilterQuery<BlogDocumentI>,
		includeCreator?: boolean
	) => Promise<ListOf<BlogTableDataI>>;
}
export interface BlogSchemaOptions {
	timestamps: true;
}
export interface BlogModel
	extends Model<
			BlogDocumentI<Types.ObjectId>,
			BlogQueryHelpers,
			BlogInstanceMethods,
			BlogVirtual,
			BlogHydratedDocument
		>,
		BlogStaticMethods {}
