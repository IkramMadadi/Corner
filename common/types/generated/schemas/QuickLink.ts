import type {
	ApplySchemaOptions,
	FlatRecord,
	HydratedDocument,
	Model,
	ObtainDocumentType,
	/* QueryWithHelpers, */
	ResolveSchemaOptions,
} from 'mongoose';

export type QuickLinkVirtual = object;

export interface QuickLinkInstanceMethods {}
export type QuickLinkQueryHelpers = object;
export interface QuickLinkDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<QuickLinkDocument, QuickLinkI, ResolveSchemaOptions<QuickLinkSchemaOptions>>,
		ResolveSchemaOptions<QuickLinkSchemaOptions>
	> {}
export interface QuickLinkHydratedDocument
	extends HydratedDocument<
		FlatRecord<QuickLinkDocument>,
		QuickLinkInstanceMethods & QuickLinkVirtual,
		QuickLinkQueryHelpers
	> {}

export interface QuickLinkStaticMethods {
	// custom static methods here
}
export interface QuickLinkSchemaOptions {
	_id: false;
	timestamps: false;
}
export interface QuickLinkModel
	extends Model<
			QuickLinkI,
			QuickLinkQueryHelpers,
			QuickLinkInstanceMethods,
			QuickLinkVirtual,
			QuickLinkHydratedDocument
		>,
		QuickLinkStaticMethods {}
