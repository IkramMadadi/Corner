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

export type CartVariantVirtual = object;

export interface CartVariantInstanceMethods {}
export type CartVariantQueryHelpers = object;
export interface CartVariantDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<
			CartVariantDocument,
			CartVariantI<Types.ObjectId>,
			ResolveSchemaOptions<CartVariantSchemaOptions>
		>,
		ResolveSchemaOptions<CartVariantSchemaOptions>
	> {}
export interface CartVariantHydratedDocument
	extends HydratedDocument<
		FlatRecord<CartVariantDocument>,
		CartVariantInstanceMethods & CartVariantVirtual,
		CartVariantQueryHelpers
	> {}

export interface CartVariantStaticMethods {
	// custom static methods here
}
export interface CartVariantSchemaOptions {
	_id: true;
	timestamps: true;
}
export interface CartVariantModel
	extends Model<
			CartVariantI<Types.ObjectId>,
			CartVariantQueryHelpers,
			CartVariantInstanceMethods,
			CartVariantVirtual,
			CartVariantHydratedDocument
		>,
		CartVariantStaticMethods {}
