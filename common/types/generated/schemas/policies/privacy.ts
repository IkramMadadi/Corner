import type {
	ApplySchemaOptions,
	FlatRecord,
	HydratedDocument,
	Model,
	ObtainDocumentType,
	/* QueryWithHelpers, */
	ResolveSchemaOptions,
} from 'mongoose';

export type PolicyVirtual = object;

export interface PolicyInstanceMethods {}
export type PolicyQueryHelpers = object;
export interface PolicyDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<PolicyDocument, PolicyI, ResolveSchemaOptions<PolicySchemaOptions>>,
		ResolveSchemaOptions<PolicySchemaOptions>
	> {}
export interface PolicyHydratedDocument
	extends HydratedDocument<FlatRecord<PolicyDocument>, PolicyInstanceMethods & PolicyVirtual, PolicyQueryHelpers> {}

export interface PolicyStaticMethods {
	// custom static methods here
}
export interface PolicySchemaOptions {
	_id: false;
	timestamps: true;
}
export interface PolicyModel
	extends Model<PolicyI, PolicyQueryHelpers, PolicyInstanceMethods, PolicyVirtual, PolicyHydratedDocument>,
		PolicyStaticMethods {}
