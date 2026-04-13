import type {
	ApplySchemaOptions,
	FlatRecord,
	HydratedDocument,
	Model,
	ObtainDocumentType,
	/* QueryWithHelpers, */
	ResolveSchemaOptions,
} from 'mongoose';

export type LanguagesContentVirtual = object;

export interface LanguagesContentInstanceMethods {}
export type LanguagesContentQueryHelpers = object;
export interface LanguagesContentDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<
			LanguagesContentDocument,
			LanguagesContentI,
			ResolveSchemaOptions<LanguagesContentSchemaOptions>
		>,
		ResolveSchemaOptions<LanguagesContentSchemaOptions>
	> {}
export interface LanguagesContentHydratedDocument
	extends HydratedDocument<
		FlatRecord<LanguagesContentDocument>,
		LanguagesContentInstanceMethods & LanguagesContentVirtual,
		LanguagesContentQueryHelpers
	> {}

export interface LanguagesContentStaticMethods {
	// custom static methods here
}
export interface LanguagesContentSchemaOptions {
	timestamps: false;
	_id: false;
}
export interface LanguagesContentModel
	extends Model<
			LanguagesContentI,
			LanguagesContentQueryHelpers,
			LanguagesContentInstanceMethods,
			LanguagesContentVirtual,
			LanguagesContentHydratedDocument
		>,
		LanguagesContentStaticMethods {}
