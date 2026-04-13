export function publicProductToCart<T>(product: PublicProductI<string, string, T>): CartProductI {
	return {
		_id: product._id,
		name: product.name,
		createdAt: product.createdAt,
		updatedAt: product.updatedAt,
		enabled: product.enabled,
		pricing: product.pricing,
		thumbnail: product.thumbnail.src ? product.thumbnail : product.images[0] || product.thumbnail,
		ratingAggregation: product.ratingAggregation,
		sku: product.sku,
		slug: product.slug,
		label: product.label,
		isPublished: product.isPublished,
		hasAdditional: !!(
			(product.additional.variants && product.additional.variants.length > 0) ||
			(product.additional.colors && product.additional.colors?.length > 0) ||
			(product.additional.sizes && product.additional.sizes?.length > 0)
		),
	};
}
export function productTableDataToCart(product: ProductTableDataI): CartProductI {
	return {
		_id: product._id,
		name: product.name,
		createdAt: product.createdAt,
		updatedAt: product.updatedAt,
		enabled: product.enabled,
		pricing: product.pricing,
		thumbnail: product.thumbnail,
		ratingAggregation: product.ratingAggregation,
		sku: product.sku,
		slug: product.slug,
		label: product.label,
		isPublished: product.isPublished,
		hasAdditional: product.hasAdditional,
	};
}
