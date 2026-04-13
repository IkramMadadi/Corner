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

export type PublishablePageContentVirtual = object;

export interface PublishablePageContentInstanceMethods {
	//toPublicObject: (this: PublishablePageContentHydratedDocument) => PublicPublishablePageContentI;
}
export type PublishablePageContentQueryHelpers = object;
export interface PublishablePageContentDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<
			PublishablePageContentDocument,
			PublishablePageContentI<Types.ObjectId>,
			ResolveSchemaOptions<PublishablePageContentSchemaOptions>
		>,
		ResolveSchemaOptions<PublishablePageContentSchemaOptions>
	> {}
export type PublishablePageContentHydratedDocument = HydratedDocument<
	FlatRecord<PublishablePageContentDocument>,
	PublishablePageContentInstanceMethods & PublishablePageContentVirtual,
	PublishablePageContentQueryHelpers
>;

export type PublishablePageContentStaticMethods = object;
export interface PublishablePageContentSchemaOptions {
	timestamps: true;
}
export interface PublishablePageContentModel
	extends Model<
			PublishablePageContentI<Types.ObjectId>,
			PublishablePageContentQueryHelpers,
			PublishablePageContentInstanceMethods,
			PublishablePageContentVirtual,
			PublishablePageContentHydratedDocument
		>,
		PublishablePageContentStaticMethods {}
export type PublishablePageContentToObject = FlatRecord<PublishablePageContentDocument> & {
	_id: Types.ObjectId;
};
