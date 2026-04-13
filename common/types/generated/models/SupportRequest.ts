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

export type SupportRequestVirtual = object;

export interface SupportRequestInstanceMethods {
	toOptimizedObject: (this: SupportRequestHydratedDocument) => PublicSupportRequestI;
}
export type SupportRequestQueryHelpers = object;
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SupportRequestDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<
			SupportRequestDocument,
			SupportRequestI<Types.ObjectId>,
			ResolveSchemaOptions<SupportRequestSchemaOptions>
		>,
		ResolveSchemaOptions<SupportRequestSchemaOptions>
	> {}
export type SupportRequestHydratedDocument = HydratedDocument<
	FlatRecord<SupportRequestDocument>,
	SupportRequestInstanceMethods & SupportRequestVirtual,
	SupportRequestQueryHelpers
>;

export interface SupportRequestStaticMethods {
	// custom static methods here
}
export interface SupportRequestSchemaOptions {
	timestamps: true;
}
export interface SupportRequestModel
	extends Model<
			SupportRequestI<Types.ObjectId>,
			SupportRequestQueryHelpers,
			SupportRequestInstanceMethods,
			SupportRequestVirtual,
			SupportRequestHydratedDocument
		>,
		SupportRequestStaticMethods {}
