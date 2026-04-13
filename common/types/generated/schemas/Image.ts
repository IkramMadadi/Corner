import type {
	ApplySchemaOptions,
	FlatRecord,
	HydratedDocument,
	Model,
	ObtainDocumentType,
	/* QueryWithHelpers, */
	ResolveSchemaOptions,
} from 'mongoose';

export type ImageVirtual = object;

export interface ImageInstanceMethods {}
export type ImageQueryHelpers = object;
export interface ImageDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<ImageDocument, CaptionedImageI, ResolveSchemaOptions<ImageSchemaOptions>>,
		ResolveSchemaOptions<ImageSchemaOptions>
	> {}
export interface ImageHydratedDocument
	extends HydratedDocument<FlatRecord<ImageDocument>, ImageInstanceMethods & ImageVirtual, ImageQueryHelpers> {}

export interface ImageStaticMethods {
	// custom static methods here
}
export interface ImageSchemaOptions {
	timestamps: false;
	_id: false;
}
export interface ImageModel
	extends Model<CaptionedImageI, ImageQueryHelpers, ImageInstanceMethods, ImageVirtual, ImageHydratedDocument>,
		ImageStaticMethods {}
