import type {
	ApplySchemaOptions,
	FlatRecord,
	HydratedDocument,
	Model,
	ObtainDocumentType,
	/* QueryWithHelpers, */
	ResolveSchemaOptions,
} from 'mongoose';

export type IntegrationVirtual = object;

export interface IntegrationInstanceMethods {}
export type IntegrationQueryHelpers = object;
export interface IntegrationDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<IntegrationDocument, IntegrationI, ResolveSchemaOptions<IntegrationSchemaOptions>>,
		ResolveSchemaOptions<IntegrationSchemaOptions>
	> {}
export interface IntegrationHydratedDocument
	extends HydratedDocument<
		FlatRecord<IntegrationDocument>,
		IntegrationInstanceMethods & IntegrationVirtual,
		IntegrationQueryHelpers
	> {}

export interface IntegrationStaticMethods {
	// custom static methods here
}
export interface IntegrationSchemaOptions {
	_id: false;
	timestamps: true;
}
export interface IntegrationModel
	extends Model<
			IntegrationI,
			IntegrationQueryHelpers,
			IntegrationInstanceMethods,
			IntegrationVirtual,
			IntegrationHydratedDocument
		>,
		IntegrationStaticMethods {}
