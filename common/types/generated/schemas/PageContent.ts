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

export type PageContentVirtual = object;

export interface PageContentInstanceMethods {
	//toPublicObject: (this: PageContentHydratedDocument) => PublicPageContentI;
}
export type PageContentQueryHelpers = object;
export interface PageContentDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<
			PageContentDocument,
			PageContentI<Types.ObjectId>,
			ResolveSchemaOptions<PageContentSchemaOptions>
		>,
		ResolveSchemaOptions<PageContentSchemaOptions>
	> {}
export type PageContentHydratedDocument = HydratedDocument<
	FlatRecord<PageContentDocument>,
	PageContentInstanceMethods & PageContentVirtual,
	PageContentQueryHelpers
>;

export type PageContentStaticMethods = object;
export interface PageContentSchemaOptions {
	timestamps: true;
}
export interface PageContentModel
	extends Model<
			PageContentI<Types.ObjectId>,
			PageContentQueryHelpers,
			PageContentInstanceMethods,
			PageContentVirtual,
			PageContentHydratedDocument
		>,
		PageContentStaticMethods {}
export type PageContentToObject = FlatRecord<PageContentDocument> & {
	_id: Types.ObjectId;
};
