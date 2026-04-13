import type {
	ApplySchemaOptions,
	FlatRecord,
	HydratedDocument,
	Model,
	ObtainDocumentType,
	/* QueryWithHelpers, */
	ResolveSchemaOptions,
} from 'mongoose';

export type WebsitePoliciesVirtual = object;

export interface WebsitePoliciesInstanceMethods {}
export type WebsitePoliciesQueryHelpers = object;
export interface WebsitePoliciesDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<
			WebsitePoliciesDocument,
			WebsitePoliciesI,
			ResolveSchemaOptions<WebsitePoliciesSchemaOptions>
		>,
		ResolveSchemaOptions<WebsitePoliciesSchemaOptions>
	> {}
export interface WebsitePoliciesHydratedDocument
	extends HydratedDocument<
		FlatRecord<WebsitePoliciesDocument>,
		WebsitePoliciesInstanceMethods & WebsitePoliciesVirtual,
		WebsitePoliciesQueryHelpers
	> {}

export interface WebsitePoliciesStaticMethods {
	// custom static methods here
}
export interface WebsitePoliciesSchemaOptions {
	_id: false;
	timestamps: true;
}
export interface WebsitePoliciesModel
	extends Model<
			WebsitePoliciesI,
			WebsitePoliciesQueryHelpers,
			WebsitePoliciesInstanceMethods,
			WebsitePoliciesVirtual,
			WebsitePoliciesHydratedDocument
		>,
		WebsitePoliciesStaticMethods {}
