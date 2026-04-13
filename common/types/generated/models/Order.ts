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

export type OrderVirtual = object;

export interface OrderInstanceMethods {
	toOptimizedObject: (this: OrderHydratedDocument) => PublicOrderI;
}
export type OrderQueryHelpers = object;
export interface OrderDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<
			OrderDocument,
			OrderI<SimpleProductI<Types.ObjectId>, Types.ObjectId>,
			ResolveSchemaOptions<OrderSchemaOptions>
		>,
		ResolveSchemaOptions<OrderSchemaOptions>
	> {}
export interface OrderHydratedDocument
	extends HydratedDocument<FlatRecord<OrderDocument>, OrderInstanceMethods & OrderVirtual, OrderQueryHelpers> {}

export interface OrderStaticMethods {
	// custom static methods here
	getOrdersTableData: (
		this: OrderModel,
		query: SortableQuerySearchI<OrderSortableFields>,
		website: Types.ObjectId,
		options?: {
			additionalFilter?: FilterQuery<OrderI>;
			productsPopulation?: IncludeProducts;
		}
	) => Promise<ListOf<OrderTableDataI>>;
}
export interface OrderSchemaOptions {
	timestamps: true;
}
export interface OrderModel
	extends Model<
			OrderI<SimpleProductI<Types.ObjectId>, Types.ObjectId>,
			OrderQueryHelpers,
			OrderInstanceMethods,
			OrderVirtual,
			OrderHydratedDocument
		>,
		OrderStaticMethods {}
