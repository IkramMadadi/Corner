import { ProductAdditionalVariantsEnums } from '@common/data/enums/ProductAdditionalEnums';

export function hashProductCart(productId: string, variants?: null | CartVariantI[]): string {
	const variantsMap = new Map(variants?.map(v => [v.type, v.id]));
	return (
		productId +
		ProductAdditionalVariantsEnums.map(t => {
			const id = variantsMap.get(t);
			return id ? `${t}:${id}` : undefined;
		})
			.filter(x => x)
			.join('-')
	);
}
