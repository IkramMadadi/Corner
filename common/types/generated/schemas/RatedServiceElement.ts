import type {
	ApplySchemaOptions,
	FlatRecord,
	HydratedDocument,
	Model,
	ObtainDocumentType,
	/* QueryWithHelpers, */
	ResolveSchemaOptions,
} from 'mongoose';

export type RatedServiceElementVirtual = object;

export interface RatedServiceElementInstanceMethods {}
export type RatedServiceElementQueryHelpers = object;
export interface RatedServiceElementDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<
			RatedServiceElementDocument,
			RatedServiceElementI,
			ResolveSchemaOptions<RatedServiceElementSchemaOptions>
		>,
		ResolveSchemaOptions<RatedServiceElementSchemaOptions>
	> {}
export interface RatedServiceElementHydratedDocument
	extends HydratedDocument<
		FlatRecord<RatedServiceElementDocument>,
		RatedServiceElementInstanceMethods & RatedServiceElementVirtual,
		RatedServiceElementQueryHelpers
	> {}

export interface RatedServiceElementStaticMethods {
	// custom static methods here
}
export interface RatedServiceElementSchemaOptions {
	_id: false;
	timestamps: false;
}
export interface RatedServiceElementModel
	extends Model<
			RatedServiceElementI,
			RatedServiceElementQueryHelpers,
			RatedServiceElementInstanceMethods,
			RatedServiceElementVirtual,
			RatedServiceElementHydratedDocument
		>,
		RatedServiceElementStaticMethods {}
