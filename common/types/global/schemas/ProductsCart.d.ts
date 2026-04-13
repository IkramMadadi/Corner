declare interface CartVariantI<ID = string> {
	id: ID;
	label: LanguagesContentI;
	type: ProductAdditionalVariantKeys;
}
declare interface ProductsCartI<ID = string> {
	product: ID;
	variants?: CartVariantI[];
	count: number;
}
