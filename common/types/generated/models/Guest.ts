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

export type GuestVirtual = object;

export interface GuestInstanceMethods {
	toOptimizedObject: (this: GuestHydratedDocument) => PublicGuestI;
}
export type GuestQueryHelpers = object;
export interface GuestDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<GuestDocument, GuestI<Types.ObjectId>, ResolveSchemaOptions<GuestSchemaOptions>>,
		ResolveSchemaOptions<GuestSchemaOptions>
	> {}
export interface GuestHydratedDocument
	extends HydratedDocument<FlatRecord<GuestDocument>, GuestInstanceMethods & GuestVirtual, GuestQueryHelpers> {}

export interface GuestStaticMethods {
	// custom static methods here
}
export interface GuestSchemaOptions {
	timestamps: true;
}
export interface GuestModel
	extends Model<GuestI<Types.ObjectId>, GuestQueryHelpers, GuestInstanceMethods, GuestVirtual, GuestHydratedDocument>,
		GuestStaticMethods {}
