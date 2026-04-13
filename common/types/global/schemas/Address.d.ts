declare interface AddressI {
	province: number;
	city?: number;
	address?: string;
}
declare interface CreatedAddressI<ID = string> extends AddressI {
	_id: ID;
}
