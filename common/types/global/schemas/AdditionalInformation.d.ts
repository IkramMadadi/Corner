declare type ProductAdditionalNumberKeys = 'size' | 'weight' | 'dimensions' | 'expirationDate';

declare type ProductAdditionalServiceKeys = 'benefits' | 'features';
declare type ProductAdditionalBooleanKeys = 'isOrganic' | 'isVegan' | 'isGlutenFree' | 'isKosher' | 'isHalal';
declare type ProductAdditionalVariantKeys = 'colors' | 'sizes' | 'variants';
declare type ProductAdditionalFilesKeys = 'catalogue';

declare type ProductAdditionalStringKeys =
	| 'ingredients'
	| 'usage'
	| 'careInstructions'
	| 'allergenInformation'
	| 'manufacturer'
	| 'material'
	| 'color'
	| 'warranty'
	| 'countryOfOrigin'
	| 'storageInstructions'
	| 'nutritionalInformation'
	| 'note'
	| 'otherDetails';

declare type ProductAdditionalKeys =
	| ProductAdditionalNumberKeys
	| ProductAdditionalFilesKeys
	| ProductAdditionalStringKeys
	| ProductAdditionalBooleanKeys
	| ProductAdditionalVariantKeys
	| ProductAdditionalServiceKeys;

declare type ProductAdditionalNumber = Optional<Record<ProductAdditionalNumberKeys, UnitedValueI>>;
declare type ProductAdditionalString = Optional<Record<ProductAdditionalStringKeys, LanguagesContentI>>;
declare type ProductAdditionalFiles = Optional<Record<ProductAdditionalFilesKeys, string>>;
declare type ProductAdditionalBoolean = Optional<Record<ProductAdditionalBooleanKeys, boolean>>;
declare type ProductAdditionalVariant = Optional<Record<ProductAdditionalVariantKeys, VariantI[]>>;
declare type ProductAdditionalService = Optional<Record<ProductAdditionalServiceKeys, (ServiceElementI&{_id:string})[]>>;

declare type ProductAdditionalI = ProductAdditionalNumber &
	ProductAdditionalString &
	ProductAdditionalService &
	ProductAdditionalBoolean &
	ProductAdditionalFiles &
	ProductAdditionalVariant;

declare type ProductAdditionalFlagsI = Record<ProductAdditionalStringKeys, boolean>;
