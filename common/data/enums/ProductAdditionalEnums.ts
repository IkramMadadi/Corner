export const ProductAdditionalNumberEnums: ProductAdditionalNumberKeys[] = [
	'size',
	'weight',
	'dimensions',
	'expirationDate',
];
export const ProductAdditionalStringEnums: ProductAdditionalStringKeys[] = [
	'ingredients',
	'usage',
	'careInstructions',
	'allergenInformation',
	'manufacturer',
	'material',
	'color',
	'warranty',
	'countryOfOrigin',
	'storageInstructions',
	'nutritionalInformation',
	'note',
	'otherDetails',
];

export const ProductAdditionalFilesEnums: ProductAdditionalFilesKeys[] = ['catalogue'];
export const ProductAdditionalBooleanEnums: ProductAdditionalBooleanKeys[] = [
	'isGlutenFree',
	'isHalal',
	'isKosher',
	'isVegan',
	'isOrganic',
];
export const ProductAdditionalServiceEnums: ProductAdditionalServiceKeys[] = ['benefits', 'features'];
export const ProductAdditionalVariantsEnums: ProductAdditionalVariantKeys[] = ['colors', 'sizes', 'variants'];

export const ProductAdditionalEnums: ProductAdditionalKeys[] = [
	...ProductAdditionalNumberEnums,
	...ProductAdditionalStringEnums,
	...ProductAdditionalServiceEnums,
	...ProductAdditionalBooleanEnums,
	...ProductAdditionalVariantsEnums,
	...ProductAdditionalFilesEnums,
];
