import type {
	ApplySchemaOptions,
	FlatRecord,
	HydratedDocument,
	Model,
	ObtainDocumentType,
	/* QueryWithHelpers, */
	ResolveSchemaOptions,
	Types,
} from 'mongoose';

export type ProductsListVirtual = object;

export interface ProductsListInstanceMethods {}
export type ProductsListQueryHelpers = object;
export interface ProductsListDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<
			ProductsListDocument,
			ProductsListI<Types.ObjectId>,
			ResolveSchemaOptions<ProductsListSchemaOptions>
		>,
		ResolveSchemaOptions<ProductsListSchemaOptions>
	> {}
export interface ProductsListHydratedDocument
	extends HydratedDocument<
		FlatRecord<ProductsListDocument>,
		ProductsListInstanceMethods & ProductsListVirtual,
		ProductsListQueryHelpers
	> {}

export interface ProductsListStaticMethods {
	// custom static methods here
}
export interface ProductsListSchemaOptions {
	_id: false;
	timestamps: false;
}
export interface ProductsListModel
	extends Model<
			ProductsListI<Types.ObjectId>,
			ProductsListQueryHelpers,
			ProductsListInstanceMethods,
			ProductsListVirtual,
			ProductsListHydratedDocument
		>,
		ProductsListStaticMethods {}
