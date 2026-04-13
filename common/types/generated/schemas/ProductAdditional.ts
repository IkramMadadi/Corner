/* eslint-disable @typescript-eslint/no-empty-object-type */
import type {
	ApplySchemaOptions,
	FlatRecord,
	HydratedDocument,
	Model,
	ObtainDocumentType,
	/* QueryWithHelpers, */
	ResolveSchemaOptions,
} from 'mongoose';

export type ProductAdditionalVirtual = object;

export interface ProductAdditionalInstanceMethods {}
export type ProductAdditionalQueryHelpers = object;
export interface ProductAdditionalDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<
			ProductAdditionalDocument,
			ProductAdditionalI,
			ResolveSchemaOptions<ProductAdditionalSchemaOptions>
		>,
		ResolveSchemaOptions<ProductAdditionalSchemaOptions>
	> {}
export interface ProductAdditionalHydratedDocument
	extends HydratedDocument<
		FlatRecord<ProductAdditionalDocument>,
		ProductAdditionalInstanceMethods & ProductAdditionalVirtual,
		ProductAdditionalQueryHelpers
	> {}

export interface ProductAdditionalStaticMethods {
	// custom static methods here
}
export interface ProductAdditionalSchemaOptions {
	_id: false;
	timestamps: false;
}
export interface ProductAdditionalModel
	extends Model<
			ProductAdditionalI,
			ProductAdditionalQueryHelpers,
			ProductAdditionalInstanceMethods,
			ProductAdditionalVirtual,
			ProductAdditionalHydratedDocument
		>,
		ProductAdditionalStaticMethods {}
