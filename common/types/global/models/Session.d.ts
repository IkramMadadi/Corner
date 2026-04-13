declare type SessionStatusTypes = "active" | "inactive" | "completed";

declare interface SessionI<PRODUCTS = string, ID = string> {
  information: {
        name: string;
        phone: string;
  };
  ip?: string;
  products: ProductsCartI<PRODUCTS>[];
  done: boolean;
  orderId?: ID;
}

declare interface SessionDocumentI<
  ID = string,
  PRODUCTS = SimpleProductI<string, BaseVariantI & { _id: string }>
> extends SessionI<PRODUCTS>,
    TimeStampI {
  _id: ID;
}

declare interface PublicSessionI extends Omit<SessionI, "orderId">, TimeStampI {
  _id: string;
}

declare interface SessionTableDisplayI extends TimeStampI<string> {
  _id: string;
  information: { name: string; phone: string };
  products: string | ProductsCartI<SimpleProductI>[];
  productsCount?: number;
  done: boolean;
  orderId?: string;
  subTotal?: number;
}

declare interface SessionTableDataI<ID = string, PRODUCTS = SimpleProductI>
  extends Omit<SessionI<PRODUCTS>, "cart">,
    TimeStampI<string> {
  _id: ID;
  products: ProductsCartI<PRODUCTS>[];
}

declare type SessionSortableFields =
  | "createdAt"
  | "done"
  | "products"
  | "information.name"
  | "information.phone";

declare type AdminSessionT = SessionDocumentI<
  string,
  SimpleProductI<string, BaseVariantI & { _id: string }>
>;
