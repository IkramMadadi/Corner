declare interface GuestI<WEBSITE = string> extends BaseCustomerI<WEBSITE> {
	kind: 'guest';
}

declare interface PublicGuestI<ID = string, WEBSITE = ID> extends GuestI<WEBSITE> {
	_id: ID;
}
declare interface SimpleCustomerI<ID = string, WEBSITE = ID> extends PublicGuestI<ID, WEBSITE> {
	refCollection: CustomersT;
}

declare interface RegisterGuestI {
	name: string;
	phone: string;
}
