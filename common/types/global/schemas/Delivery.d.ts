declare type DeliveryChoiceTypes = 'desk' | 'door';

declare interface DeliverOptionsI {
	address: AddressI;
	deliveryChoice: DeliveryChoiceTypes;
}
declare interface DeliveryI extends DeliverOptionsI {
	cost: number;
}
