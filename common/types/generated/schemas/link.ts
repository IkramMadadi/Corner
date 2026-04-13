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

export type LinkVirtual = object;

export interface LinkInstanceMethods {}
export type LinkQueryHelpers = object;
export interface LinkDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<LinkDocument, LinkI<Types.ObjectId>, ResolveSchemaOptions<LinkSchemaOptions>>,
		ResolveSchemaOptions<LinkSchemaOptions>
	> {}
export interface LinkHydratedDocument
	extends HydratedDocument<FlatRecord<LinkDocument>, LinkInstanceMethods & LinkVirtual, LinkQueryHelpers> {}

export interface LinkStaticMethods {
	// custom static methods here
}
export interface LinkSchemaOptions {
	_id: false;
	timestamps: false;
}
export interface LinkModel
	extends Model<LinkI<Types.ObjectId>, LinkQueryHelpers, LinkInstanceMethods, LinkVirtual, LinkHydratedDocument>,
		LinkStaticMethods {}
