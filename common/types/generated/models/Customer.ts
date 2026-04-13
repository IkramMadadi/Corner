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

export type CustomerVirtual = object;

export interface CustomerInstanceMethods {
	comparePassword: (this: CustomerHydratedDocument, password: string) => Promise<boolean>;
	toOptimizedObject: (this: CustomerHydratedDocument) => NecessaryCustomerI;
}
export type CustomerQueryHelpers = object;
export interface CustomerDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<
			CustomerDocument,
			CustomerI<Types.ObjectId, Date>,
			ResolveSchemaOptions<CustomerSchemaOptions>
		>,
		ResolveSchemaOptions<CustomerSchemaOptions>
	> {}
export type CustomerHydratedDocument = HydratedDocument<
	FlatRecord<CustomerDocument>,
	CustomerInstanceMethods & CustomerVirtual,
	CustomerQueryHelpers
>;

export interface CustomerStaticMethods {
	// custom static methods here
}
export interface CustomerSchemaOptions {
	timestamps: true;
}
export interface CustomerModel
	extends Model<
			CustomerI<Types.ObjectId, Date>,
			CustomerQueryHelpers,
			CustomerInstanceMethods,
			CustomerVirtual,
			CustomerHydratedDocument
		>,
		CustomerStaticMethods {}
