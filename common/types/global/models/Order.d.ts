declare type OrderStatusTypes = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled' | 'returned';

declare interface OrderI<PRODUCTS = SimpleProductI, CUSTOMER = string, WEBSITE = CUSTOMER, ADMIN = WEBSITE>
	extends WebsiteLinkedI<WEBSITE> {
	customer: CUSTOMER; // CustomerID or GuestID
	products: ProductsCartI<PRODUCTS>[]; // Array of productIDs
	totalPrice: number;
	discount: number;
	status: OrderStatusTypes;
	statusHistory: OrderStatusHistoryI<ADMIN>[];
	delivery: DeliveryI;
}
declare interface OrderDocumentI<
	ID = string,
	PRODUCTS = SimpleProductI<string, BaseVariantI & { _id: string }>,
	CUSTOMER = ID,
	ADMIN = ID,
	WEBSITE = ID,
> extends OrderI<PRODUCTS, CUSTOMER, WEBSITE, ADMIN>,
		TimeStampI {
	statusHistory: (OrderStatusHistoryI<ADMIN> & TimeStampI)[];
	_id: ID;
}
declare interface PublicOrderI extends Omit<OrderI, 'statusHistory' | 'website'>, TimeStampI {
	_id: ID;
}

declare interface CartI<ID = CartProductI> extends Pick<OrderI<ID>, 'products' | 'delivery'> {
	usePoints?: boolean;
}

declare type CheckoutCart<ID = CartProductI> = Pick<OrderI<ID>, 'products' | 'totalPrice' | 'delivery'>;

declare interface CheckoutAsGuestI {
	guest: RegisterGuestI;
	checkout: CartI<string>;
	sessionId?: string | null;
}
declare interface OrdersLoadI {
	orders: PublicOrderI[];
	products: ProductTableDataI[];
}
declare type IncludeProducts = 'include' | 'length';
/* management */
declare interface OrderTableDataI<
	INCLUDES extends IncludeProducts = 'length',
	ID = string,
	PRODUCTS = SimpleProductI,
	USER = SimpleCustomerInformationI,
> extends Omit<OrderI<PRODUCTS, USER>, 'statusHistory' | 'products'>,
		TimeStampI<string> {
	_id: ID;
	products: INCLUDES extends 'include' ? ProductsCartI<PRODUCTS>[] : number; // Array of productIDs
	subTotal: number;
}

declare type OrderSortableFields =
	| 'createdAt'
	| 'totalPrice'
	| 'delivery.deliveryChoice'
	| 'delivery.address.province'
	| 'delivery.cost';

/* Forms types */

declare interface CheckoutAsGuestI {
	guest: RegisterGuestI;
	checkout: CartI<string>;
}
declare interface CreateSessionI {
	information: RegisterGuestI;
	cart: SessionCartI<string>;
}
declare interface CheckoutAsGuestSessionI {
	sessionId?: string;
	information: RegisterGuestI;
	products: ProductsCartI<string>[]
}
declare type AdminOrderT = OrderDocumentI<
	string,
	SimpleProductI<string, BaseVariantI & { _id: string }>,
	SimpleCustomerInformationI,
	SimpleAdminInformationI
>;

declare interface OrderProductUpdateI {
	productHash: string;
}
declare interface OrderProductPriceUpdateI extends OrderProductUpdateI {
	price: number;
}
declare interface OrderProductCountUpdateI extends OrderProductUpdateI {
	count: number;
}
declare interface SessionCartI {
	products: ProductsCartI<string>[]
};
