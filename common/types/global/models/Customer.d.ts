declare interface CustomerRecoveryI<DATE = string> {
	id: string;
	otp: string;
	expiresAt: DATE;
}

declare interface CustomerI<WEBSITE = string, DATE = string, PRODUCTS = WEBSITE>
	extends BaseCustomerI<WEBSITE>,
		ActivatableI {
	kind: 'customer';
	email: string;
	password: string;
	addresses: AddressI[];
	wishlist: PRODUCTS[]; // productIDs
	recovery: CustomerRecoveryI<DATE>;
	earnedPoints: EarnedPoints<WEBSITE>[];
	redeemedPoints: RedeemedPoints[];
	conversionRate?: number;
}

declare interface NecessaryCustomerI<ID = string, WEBSITE = ID>
	extends Omit<
		CustomerI<WEBSITE>,
		'password' | 'wishlist' | 'website' | 'addresses' | 'earnedPoints' | 'redeemedPoints' | 'recovery'
	> {
	_id: ID;
}

declare type CustomerRegisterI = Omit<
	CustomerI,
	| 'kind'
	| 'wishlist'
	| 'website'
	| 'enabled'
	| 'addresses'
	| 'recovery'
	| 'earnedPoints'
	| 'redeemedPoints'
	| 'conversionRate'
>;

declare type CustomerLoginI = Pick<CustomerI, 'email' | 'password'>;

declare interface CustomerInformationI extends Pick<PersonalInformationI, 'firstName' | 'lastName'> {
	phone: string;
	email: string;
}

declare interface SimpleCustomerInformationI<ID = string>
	extends Pick<PersonalInformationI, 'firstName' | 'lastName'>,
		Pick<BaseCustomerI, 'kind' | 'phone'> {
	_id: ID;
}
declare interface SimpleAdminInformationI<ID = string> extends Omit<SimpleCustomerInformationI<ID>, 'kind'> {
	email: string;
}
declare interface PublicCustomerI<ID = string, WEBSITE = ID> extends CustomerI<WEBSITE>, TimeStampI {
	_id: ID;
}
