import type {
	ApplySchemaOptions,
	FlatRecord,
	HydratedDocument,
	Model,
	ObtainDocumentType,
	/* QueryWithHelpers, */
	ResolveSchemaOptions,
} from 'mongoose';

export type AnalyticsIntegrationVirtual = object;

export interface AnalyticsIntegrationInstanceMethods {}
export type AnalyticsIntegrationQueryHelpers = object;
export interface AnalyticsIntegrationDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<
			AnalyticsIntegrationDocument,
			AnalyticsIntegrationI,
			ResolveSchemaOptions<AnalyticsIntegrationSchemaOptions>
		>,
		ResolveSchemaOptions<AnalyticsIntegrationSchemaOptions>
	> {}
export interface AnalyticsIntegrationHydratedDocument
	extends HydratedDocument<
		FlatRecord<AnalyticsIntegrationDocument>,
		AnalyticsIntegrationInstanceMethods & AnalyticsIntegrationVirtual,
		AnalyticsIntegrationQueryHelpers
	> {}

export interface AnalyticsIntegrationStaticMethods {
	// custom static methods here
}
export interface AnalyticsIntegrationSchemaOptions {
	_id: false;
	timestamps: true;
}
export interface AnalyticsIntegrationModel
	extends Model<
			AnalyticsIntegrationI,
			AnalyticsIntegrationQueryHelpers,
			AnalyticsIntegrationInstanceMethods,
			AnalyticsIntegrationVirtual,
			AnalyticsIntegrationHydratedDocument
		>,
		AnalyticsIntegrationStaticMethods {}
