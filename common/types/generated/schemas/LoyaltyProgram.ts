import type {
	ApplySchemaOptions,
	FlatRecord,
	HydratedDocument,
	Model,
	ObtainDocumentType,
	/* QueryWithHelpers, */
	ResolveSchemaOptions,
} from 'mongoose';

export type LoyaltyProgramVirtual = object;

export interface LoyaltyProgramInstanceMethods {}
export type LoyaltyProgramQueryHelpers = object;
export interface LoyaltyProgramDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<
			LoyaltyProgramDocument,
			LoyaltyProgramSettingsI,
			ResolveSchemaOptions<LoyaltyProgramSchemaOptions>
		>,
		ResolveSchemaOptions<LoyaltyProgramSchemaOptions>
	> {}
export interface LoyaltyProgramHydratedDocument
	extends HydratedDocument<
		FlatRecord<LoyaltyProgramDocument>,
		LoyaltyProgramInstanceMethods & LoyaltyProgramVirtual,
		LoyaltyProgramQueryHelpers
	> {}

export interface LoyaltyProgramStaticMethods {
	// custom static methods here
}
export interface LoyaltyProgramSchemaOptions {
	_id: false;
	timestamps: true;
}
export interface LoyaltyProgramModel
	extends Model<
			LoyaltyProgramSettingsI,
			LoyaltyProgramQueryHelpers,
			LoyaltyProgramInstanceMethods,
			LoyaltyProgramVirtual,
			LoyaltyProgramHydratedDocument
		>,
		LoyaltyProgramStaticMethods {}
