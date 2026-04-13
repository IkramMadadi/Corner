import type {
	ApplySchemaOptions,
	FlatRecord,
	HydratedDocument,
	Model,
	ObtainDocumentType,
	/* QueryWithHelpers, */
	ResolveSchemaOptions,
} from 'mongoose';

export type VariantVirtual = object;

export interface VariantInstanceMethods {}
export type VariantQueryHelpers = object;
export interface VariantDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<VariantDocument, VariantI, ResolveSchemaOptions<VariantSchemaOptions>>,
		ResolveSchemaOptions<VariantSchemaOptions>
	> {}
export interface VariantHydratedDocument
	extends HydratedDocument<
		FlatRecord<VariantDocument>,
		VariantInstanceMethods & VariantVirtual,
		VariantQueryHelpers
	> {}

export interface VariantStaticMethods {
	// custom static methods here
}
export interface VariantSchemaOptions {
	_id: true;
	timestamps: true;
}
export interface VariantModel
	extends Model<VariantI, VariantQueryHelpers, VariantInstanceMethods, VariantVirtual, VariantHydratedDocument>,
		VariantStaticMethods {}
