declare interface UnitedValueI {
	value: number;
	unit?: string;
}
declare interface LabelCValueI<V> {
	label: LanguagesContentI;
	value: V;
}
declare type LabelValueI<V extends string = string> = LabelCValueI<V>;

declare interface BaseVariantI {
	label: LanguagesContentI;
	value: number | string;
}
declare interface CreateVariantI extends BaseVariantI {
	price?: PricingI;
	available: boolean;
}
declare interface VariantI extends CreateVariantI {
	_id: string;
	imagesIndex: number[];
}

declare interface VolumeVariantI extends VariantI {
	value: number;  // الكمية المطلوبة للعرض
	// price.price = سعر الوحدة بعد الخصم
	// price.compareAtPrice = السعر الأصلي للوحدة
}

declare interface VolumeOfferResultI {
	variant: VariantI | null;
	quantity: number;
	unitPrice: number;
	originalUnitPrice: number;
	totalPrice: number;
	originalTotal: number;
	savings: number;
	savingsPercentage: number;
}
