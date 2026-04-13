import { productLabelsEnums } from '@common/data/enums/generalEnums';
import { type MyZodType, z } from '^common/defaultZod';
import { languagesContentValidationSchema, mongoIDSchema, slugSchema, stringDateSchema } from '^common/elements';
import { basicPublishableInformationWithIdValidationSchema } from './generals/BasicPublishableInformation';
import { imageValidationSchema } from './generals/Image';
import { pricingValidationSchema } from './generals/Pricing';
import { ratingAggregationValidationSchema } from './generals/RatingAggregation';

// Define message constants
const productMessages = {
	description: {
		required: {
			en: 'Description is required',
			fr: 'La description est requise',
			ar: 'الوصف مطلوب',
		},
		invalid: {
			en: 'Invalid description',
			fr: 'Description invalide',
			ar: 'وصف غير صالح',
		},
	},
	summary: {
		required: {
			en: 'Summary is required',
			fr: 'Le résumé est requis',
			ar: 'الملخص مطلوب',
		},
		invalid: {
			en: 'Invalid summary',
			fr: 'Résumé invalide',
			ar: 'ملخص غير صالح',
		},
	},
	name: {
		required: {
			en: 'Name is required',
			fr: 'Le nom est requis',
			ar: 'الاسم مطلوب',
		},
		invalid: {
			en: 'Invalid name',
			fr: 'Nom invalide',
			ar: 'اسم غير صالح',
		},
	},
	slug: {
		required: {
			en: 'Slug is required',
			fr: 'Le slug est requis',
			ar: 'السلج مطلوب',
		},
		invalid: {
			en: 'Invalid slug',
			fr: 'Slug invalide',
			ar: 'سلج غير صالح',
		},
	},
	sku: {
		required: {
			en: 'Product SKU is required',
			fr: 'Le SKU du produit est requis',
			ar: 'SKU المنتج مطلوب',
		},
		invalid: {
			en: 'Invalid product SKU',
			fr: 'SKU du produit invalide',
			ar: 'SKU المنتج غير صالح',
		},
	},
	productCount: {
		required: {
			en: 'Product count is required',
			fr: 'Le nombre de produits est requis',
			ar: 'عدد المنتجات مطلوب',
		},
		invalid: {
			en: 'Product count is not a valid number',
			fr: "Le nombre de produits n'est pas un nombre valide",
			ar: 'عدد المنتجات ليس رقمًا صالحًا',
		},
		message: {
			en: 'Product count must be greater than 0',
			fr: 'Le nombre de produits doit être supérieur à 0',
			ar: 'يجب أن يكون عدد المنتجات أكبر من 0',
		},
	},
	document: {
		description: {
			en: 'Product information',
			fr: 'Informations sur le produit',
			ar: 'معلومات المنتج',
		},
		invalid: {
			en: 'Invalid Product information',
			fr: 'Informations sur le produit invalides',
			ar: 'معلومات المنتج غير صالحة',
		},
		required: {
			en: 'Product information is required',
			fr: 'Les informations sur le produit sont requises',
			ar: 'معلومات المنتج مطلوبة',
		},
	},
};

const variantsMessages = {
	value: {
		required: {
			en: 'Value is required',
			fr: 'La valeur est requise',
			ar: 'القيمة مطلوبة',
		},
		invalid: {
			en: 'Invalid value',
			fr: 'Valeur invalide',
			ar: 'قيمة غير صالحة',
		},
	},
};

export const ProductInformationISchema = (locale: LanguagesI) =>
	z.object<MyZodType<ProductInformationI>>(
		{
			description: languagesContentValidationSchema({ min: 2, max: 2000 }),
			name: languagesContentValidationSchema({ min: 2, max: 62 }),
			summary: languagesContentValidationSchema({ min: 2, max: 350 }),
			slug: slugSchema(locale),
			sku: z.string({
				description: 'Product SKU',
				invalid_type_error: productMessages.sku.invalid[locale],
				required_error: productMessages.sku.required[locale],
			}),
		},
		{
			description: productMessages.document.description[locale],
			invalid_type_error: productMessages.document.invalid[locale],
			required_error: productMessages.document.required[locale],
		}
	);

// cart product validation
export const cartProductValidationSchema = (locale: LanguagesI) =>
	z.object<MyZodType<CartProductI>>({
		hasAdditional: z.boolean(),
		name: languagesContentValidationSchema({ min: 2, max: 100 }),
		_id: mongoIDSchema(locale),
		enabled: z.boolean({
			description: 'Product enabled',
			invalid_type_error: productMessages.productCount.invalid[locale],
			required_error: productMessages.productCount.required[locale],
		}),
		pricing: pricingValidationSchema(locale),
		createdAt: stringDateSchema(locale),
		updatedAt: stringDateSchema(locale),
		ratingAggregation: ratingAggregationValidationSchema(locale),
		sku: z.string({
			description: 'Product SKU',
			invalid_type_error: productMessages.sku.invalid[locale],
			required_error: productMessages.sku.required[locale],
		}),
		slug: slugSchema(locale),
		category: basicPublishableInformationWithIdValidationSchema(locale).optional(),
		thumbnail: imageValidationSchema(locale),
		isPublished: z.boolean({
			description: 'Product published',
			invalid_type_error: productMessages.productCount.invalid[locale],
			required_error: productMessages.productCount.required[locale],
		}),
		label: z
			.enum<ProductLabelsT, MyEnum<ProductLabelsT>>(productLabelsEnums as unknown as MyEnum<ProductLabelsT>, {
				description: 'Product label',
				invalid_type_error: productMessages.productCount.invalid[locale],
				required_error: productMessages.productCount.required[locale],
			})
			.optional(),
	});

// base variant validation
export const baseVariantValidationSchema = (locale: LanguagesI) =>
	z.object<MyZodType<BaseVariantI>>({
		label: languagesContentValidationSchema({ min: 2, max: 100 }),
		value: z.union([z.string(), z.number()], {
			required_error: variantsMessages.value.required[locale],
			invalid_type_error: variantsMessages.value.invalid[locale],
		}),
	});

// simple product validation
export const simpleProductValidationSchema = (locale: LanguagesI) =>
	z.object<MyZodType<SimpleProductI>>({
		name: languagesContentValidationSchema({ min: 2, max: 100 }),
		price: z.number({
			description: 'Product price',
			invalid_type_error: productMessages.productCount.invalid[locale],
			required_error: productMessages.productCount.required[locale],
		}),
		productId: mongoIDSchema(locale),
		thumbnail: imageValidationSchema(locale),
	});

// product labels validation
export const productLabelsValidationSchema = (locale: LanguagesI) =>
	z.object<MyZodType<PublishableLabelsI<ProductLabelsT>>>({
		label: z
			.enum<ProductLabelsT, MyEnum<ProductLabelsT>>(
				['', ...productLabelsEnums] as unknown as MyEnum<ProductLabelsT>,
				{
					description: 'Product label',
					invalid_type_error: productMessages.productCount.invalid[locale],
					required_error: productMessages.productCount.required[locale],
				}
			)
			.optional(),
		tags: z.array(
			z.string({
				description: 'Product tags',
				invalid_type_error: productMessages.productCount.invalid[locale],
				required_error: productMessages.productCount.required[locale],
			})
		),
	});
