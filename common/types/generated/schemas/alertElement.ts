import type {
	ApplySchemaOptions,
	FlatRecord,
	HydratedDocument,
	Model,
	ObtainDocumentType,
	/* QueryWithHelpers, */
	ResolveSchemaOptions,
} from 'mongoose';

export type AlertElementVirtual = object;

export interface AlertElementInstanceMethods {}
export type AlertElementQueryHelpers = object;
export interface AlertElementDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<AlertElementDocument, AlertElementI, ResolveSchemaOptions<AlertElementSchemaOptions>>,
		ResolveSchemaOptions<AlertElementSchemaOptions>
	> {}
export interface AlertElementHydratedDocument
	extends HydratedDocument<
		FlatRecord<AlertElementDocument>,
		AlertElementInstanceMethods & AlertElementVirtual,
		AlertElementQueryHelpers
	> {}

export interface AlertElementStaticMethods {
	// custom static methods here
}
export interface AlertElementSchemaOptions {
	timestamps: true;
	_id: false;
}
export interface AlertElementModel
	extends Model<
			AlertElementI,
			AlertElementQueryHelpers,
			AlertElementInstanceMethods,
			AlertElementVirtual,
			AlertElementHydratedDocument
		>,
		AlertElementStaticMethods {}
