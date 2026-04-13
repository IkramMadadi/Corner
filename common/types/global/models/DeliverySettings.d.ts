declare interface DeliverySettingsI {
	// 58 province map to zone
	zones: number[];
	fees: PaymentFeeI[];
	defaultFee: PaymentFeeI;
	daysToDeliver: number;
	freeOnOver?: number;
}

declare interface DeliveryZoneI {
	id: number; // zone from 1 to length of rows
	provinces: number[]; // province id from 1 to 58
	desk: number; // shipment price for desk zone
	home: number; // shipment price for home delivery zone
}

declare interface DeliverySettingsFormI extends Omit<DeliverySettingsI, 'zones' | 'fees'> {
	zones: DeliveryZoneI[];
}
