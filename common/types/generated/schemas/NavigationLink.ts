import type {
	ApplySchemaOptions,
	FlatRecord,
	HydratedDocument,
	Model,
	ObtainDocumentType,
	/* QueryWithHelpers, */
	ResolveSchemaOptions,
} from 'mongoose';

export type NavigationLinkVirtual = object;

export interface NavigationLinkInstanceMethods {}
export type NavigationLinkQueryHelpers = object;
export interface NavigationLinkDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<NavigationLinkDocument, NavigationLinkI, ResolveSchemaOptions<NavigationLinkSchemaOptions>>,
		ResolveSchemaOptions<NavigationLinkSchemaOptions>
	> {}
export interface NavigationLinkHydratedDocument
	extends HydratedDocument<
		FlatRecord<NavigationLinkDocument>,
		NavigationLinkInstanceMethods & NavigationLinkVirtual,
		NavigationLinkQueryHelpers
	> {}

export interface NavigationLinkStaticMethods {
	// custom static methods here
}
export interface NavigationLinkSchemaOptions {
	_id: false;
	timestamps: false;
}
export interface NavigationLinkModel
	extends Model<
			NavigationLinkI,
			NavigationLinkQueryHelpers,
			NavigationLinkInstanceMethods,
			NavigationLinkVirtual,
			NavigationLinkHydratedDocument
		>,
		NavigationLinkStaticMethods {}
