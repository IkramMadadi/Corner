// Loyalty program settings interface
declare interface LoyaltyTiersI {
	bronze: NumbersRangeI; // 0 - 9,999 DZD
	silver: NumbersRangeI; // 10,000 - 49,999 DZD
	gold: NumbersRangeI; // 50,000+ DZD
}
declare interface LoyaltyProgramSettingsI {
	conversionRate: number; // e.g., 0.01 for 1 point per 100 DZD
	tiers: LoyaltyTiersI;
	bonuses: {
		accountCreation?: number; // e.g., 100 points
		newsletterSignup?: number; // e.g., 50 points
	};
	expirationOnMonths: number; // e.g., 12 months
	multipliers: {
		promotion: number; // e.g., 2 for doubling points during promotions
	};
}
