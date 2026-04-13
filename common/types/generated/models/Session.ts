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
} from "mongoose";

export type SessionVirtual = object;

export interface SessionInstanceMethods {
  toOptimizedObject: (this: SessionHydratedDocument) => PublicSessionI;
}
export type SessionQueryHelpers = object;
export interface SessionDocument
  extends ApplySchemaOptions<
    ObtainDocumentType<
      SessionDocument,
      SessionI<SimpleProductI<Types.ObjectId>, Types.ObjectId>,
      ResolveSchemaOptions<SessionSchemaOptions>
    >,
    ResolveSchemaOptions<SessionSchemaOptions>
  > {}
export interface SessionHydratedDocument
  extends HydratedDocument<
    FlatRecord<SessionDocument>,
    SessionInstanceMethods & SessionVirtual,
    SessionQueryHelpers
  > {}

export interface SessionStaticMethods {
  // custom static methods here
  getSessionsTableData: (
    this: SessionModel,
    query: SortableQuerySearchI<SessionSortableFields>,
    website: Types.ObjectId,
    options?: {
      additionalFilter?: FilterQuery<SessionI>;
      productsPopulation?: IncludeProducts;
    }
  ) => Promise<ListOf<SessionTableDisplayI>>;
}
export interface SessionSchemaOptions {
  timestamps: true;
}
export interface SessionModel
  extends Model<
      SessionI<SimpleProductI<Types.ObjectId>, Types.ObjectId>,
      SessionQueryHelpers,
      SessionInstanceMethods,
      SessionVirtual,
      SessionHydratedDocument
    >,
    SessionStaticMethods {}
