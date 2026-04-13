declare interface BaseCustomerI<WEBSITE = string> extends WebsiteLinkedI<WEBSITE> {
	personalInformation: PersonalInformationI;
	phone: string;
	kind: CustomersT;
}

declare interface PublicBaseCustomerI<ID = string, WEBSITE = ID> extends BaseCustomerI<WEBSITE>, TimeStampI {
	_id: ID;
}
declare type BaseCustomerSortableFields =
	| 'createdAt'
	| 'orders'
	| 'personalInformation.firstName'
	| 'personalInformation.lastName'
	| 'kind';
declare interface CustomerTableDataI extends PublicBaseCustomerI {
	email?: string;
	enabled?: boolean;
	orders?: number;
}
