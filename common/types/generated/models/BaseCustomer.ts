/* eslint-disable @typescript-eslint/no-empty-object-type */
import type {
	ApplySchemaOptions,
	FilterQuery,
	FlatRecord,
	HydratedDocument,
	Model,
	ObtainDocumentType,
	/* QueryWithHelpers, */
	ResolveSchemaOptions,
	Types,
} from 'mongoose';

export type BaseCustomerVirtual = object;

export interface BaseCustomerInstanceMethods {
	toOptimizedObject: (this: BaseCustomerHydratedDocument) => CustomerTableDataI;
}
export type BaseCustomerQueryHelpers = object;
export interface BaseCustomerDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<
			BaseCustomerDocument,
			BaseCustomerI<Types.ObjectId>,
			ResolveSchemaOptions<BaseCustomerSchemaOptions>
		>,
		ResolveSchemaOptions<BaseCustomerSchemaOptions>
	> {}
export type BaseCustomerHydratedDocument = HydratedDocument<
	FlatRecord<BaseCustomerDocument>,
	BaseCustomerInstanceMethods & BaseCustomerVirtual,
	BaseCustomerQueryHelpers
>;

export interface BaseCustomerStaticMethods {
	// custom static methods here
	getBaseCustomersTableData: (
		this: BaseCustomerModel,
		query: SortableQuerySearchI<BaseCustomerSortableFields>,
		website: Types.ObjectId,
		options?: {
			additionalFilter?: FilterQuery<BaseCustomerI>;
			kind?: CustomersT;
		}
	) => Promise<ListOf<CustomerTableDataI>>;
}
export interface BaseCustomerSchemaOptions {
	timestamps: true;
	discriminatorKey: 'kind';
	collection: 'customers';
}
export interface BaseCustomerModel
	extends Model<
			BaseCustomerI<Types.ObjectId>,
			BaseCustomerQueryHelpers,
			BaseCustomerInstanceMethods,
			BaseCustomerVirtual,
			BaseCustomerHydratedDocument
		>,
		BaseCustomerStaticMethods {}
