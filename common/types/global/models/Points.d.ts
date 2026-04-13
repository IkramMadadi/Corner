declare interface EarnedPoints<ID = string> {
	order: ID;
	amount: number;
	date: Date;
	expirationDate: Date;
	redeemed: number;
}

declare interface RedeemedPoints {
	amount: number;
	date: Date;
}
