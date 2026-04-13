type orderMessagesKeys = 'no-product' | 'some-not-found';
export const orderMessages: Record<orderMessagesKeys, Record<LanguagesI, string>> = {
	'no-product': {
		en: 'No products found.',
		ar: 'لم يتم العثور على منتجات.',
		fr: 'Aucun produit trouvé.',
	},
	'some-not-found': {
		en: 'Some products not found.',
		ar: 'لم يتم العثور على بعض المنتجات.',
		fr: 'Certains produits non trouvés.',
	},
};
