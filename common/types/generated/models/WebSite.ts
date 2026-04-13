/* eslint-disable @typescript-eslint/no-empty-object-type */
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

export type WebSettingsVirtual = object;

export interface WebSettingsInstanceMethods {
	toOptimizedObject: (this: WebSettingsHydratedDocument) => PublicWebSiteI<Types.ObjectId>;
	//toPublicObject: (this: WebSettingsHydratedDocument) => PublicWebSiteI;
}
export type WebSettingsQueryHelpers = object;
export interface WebSettingsDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<
			WebSettingsDocument,
			WebSiteI<Types.ObjectId>,
			ResolveSchemaOptions<WebSettingsSchemaOptions>
		>,
		ResolveSchemaOptions<WebSettingsSchemaOptions>
	> {}
export type WebSettingsHydratedDocument = HydratedDocument<
	FlatRecord<WebSettingsDocument>,
	WebSettingsInstanceMethods & WebSettingsVirtual,
	WebSettingsQueryHelpers
>;

export type WebSettingsStaticMethods = object;
export interface WebSettingsSchemaOptions {
	timestamps: true;
}
export interface WebSettingsModel
	extends Model<
			WebSiteI<Types.ObjectId>,
			WebSettingsQueryHelpers,
			WebSettingsInstanceMethods,
			WebSettingsVirtual,
			WebSettingsHydratedDocument
		>,
		WebSettingsStaticMethods {}
export type WebSettingsToObject = FlatRecord<WebSettingsDocument> & {
	_id: Types.ObjectId;
};
