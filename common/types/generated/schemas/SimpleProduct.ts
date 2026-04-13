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

export type SimpleProductVirtual = object;

export interface SimpleProductInstanceMethods {}
export type SimpleProductQueryHelpers = object;
export interface SimpleProductDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<
			SimpleProductDocument,
			SimpleProductI<Types.ObjectId>,
			ResolveSchemaOptions<SimpleProductSchemaOptions>
		>,
		ResolveSchemaOptions<SimpleProductSchemaOptions>
	> {}
export interface SimpleProductHydratedDocument
	extends HydratedDocument<
		FlatRecord<SimpleProductDocument>,
		SimpleProductInstanceMethods & SimpleProductVirtual,
		SimpleProductQueryHelpers
	> {}

export interface SimpleProductStaticMethods {
	// custom static methods here
}
export interface SimpleProductSchemaOptions {
	_id: false;
	timestamps: true;
}
export interface SimpleProductModel
	extends Model<
			SimpleProductI<Types.ObjectId>,
			SimpleProductQueryHelpers,
			SimpleProductInstanceMethods,
			SimpleProductVirtual,
			SimpleProductHydratedDocument
		>,
		SimpleProductStaticMethods {}
