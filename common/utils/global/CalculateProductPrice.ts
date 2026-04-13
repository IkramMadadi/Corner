export default function CalculateProductPrice<ID>(
	defaultPricing: PricingI,
	additional: ProductAdditionalI,
	variants: CartVariantI<ID>[] | undefined | null,
	pricePriority: ProductAdditionalVariantKeys[]
) {
	let price = defaultPricing;
	if (!variants || variants.length === 0) return price;
	const variantsMap = new Map(variants.map(variant => [variant.type, variant.id]));
	for (const priority of pricePriority) {
		const currentVariant = variantsMap.get(priority);
		const currentAdditional = additional[priority];
		if (!currentAdditional || !currentVariant) continue;
		const variantD = currentAdditional.find(v => v._id.toString() === currentVariant);
		if (!variantD?.price?.current) continue;
		price = variantD.price;
		break;
	}
	return price;
}
