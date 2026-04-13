import { ProductAdditionalVariantsEnums } from '@common/data/enums/ProductAdditionalEnums';
import { DeliveryChoiceEnums } from '@common/data/enums/generalEnums';
import { type MyZodType, z } from '^common/defaultZod';
import { languagesContentValidationSchema, mongoIDSchema, phoneSchema } from '^common/elements';
import { AddressValidationSchema } from './generals/Address';
import { registerGuestValidationSchema } from './guest';
import { cartProductValidationSchema } from './products';

// Define message constants
const cartMessages = {
	deliveryChoice: {
		required: {
			en: 'Delivery choice is required',
			fr: 'Le choix de livraison est requis',
			ar: 'اختيار التسليم مطلوب',
		},
		invalid: {
			en: 'Delivery choice is not a valid delivery choice',
			fr: "Le choix de livraison n'est pas un choix de livraison valide",
			ar: 'اختيار التسليم ليس اختيارًا صالحًا',
		},
	},
	deliveryCost: {
		required: {
			en: 'Delivery cost is required',
			fr: 'Le coût de livraison est requis',
			ar: 'تكلفة التسليم مطلوبة',
		},
		invalid: {
			en: 'Delivery cost is not a valid number',
			fr: "Le coût de livraison n'est pas un nombre valide",
			ar: 'تكلفة التسليم ليست رقمًا صالحًا',
		},
		message: {
			en: 'Delivery cost must be greater than 0',
			fr: 'Le coût de livraison doit être supérieur à 0',
			ar: 'يجب أن تكون تكلفة التسليم أكبر من 0',
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
			en: 'Cart schema validation',
			fr: 'Validation du schéma du panier',
			ar: 'التحقق من صحة مخطط العربة',
		},
		invalid: {
			en: "Object isn't a valid Cart object",
			fr: "L'objet n'est pas un objet de panier valide",
			ar: 'الكائن ليس كائن عربة صالح',
		},
		required: {
			en: 'Cart is required',
			fr: 'Le panier est requis',
			ar: 'العربة مطلوبة',
		},
	},
};

export const deliveryOptionsValidationSchema = (locale: LanguagesI) =>
	z.object<MyZodType<DeliverOptionsI>>({
		address: AddressValidationSchema(locale),
		deliveryChoice: z.enum<DeliveryChoiceTypes, MyEnum<DeliveryChoiceTypes>>(
			DeliveryChoiceEnums as unknown as MyEnum<DeliveryChoiceTypes>,
			{
				description: 'Delivery choice',
				invalid_type_error: cartMessages.deliveryChoice.invalid[locale],
				required_error: cartMessages.deliveryChoice.required[locale],
			}
		),
	});

export const deliveryValidationSchema = (locale: LanguagesI) =>
	z.object<MyZodType<DeliveryI>>({
		...deliveryOptionsValidationSchema(locale).shape,
		cost: z
			.number({
				description: 'Delivery cost',
				invalid_type_error: cartMessages.deliveryCost.invalid[locale],
				required_error: cartMessages.deliveryCost.required[locale],
			})
			.min(0, {
				message: cartMessages.deliveryCost.message[locale],
			}),
	});

export const catVariantsValidationSchema = (locale: LanguagesI) =>
	z.object<MyZodType<CartVariantI>>({
		id: mongoIDSchema(locale),
		label: languagesContentValidationSchema(),
		type: z.enum<ProductAdditionalVariantKeys, MyEnum<ProductAdditionalVariantKeys>>(
			ProductAdditionalVariantsEnums as unknown as MyEnum<ProductAdditionalVariantKeys>,
			{
				description: 'Variants types',
				invalid_type_error: cartMessages.deliveryChoice.invalid[locale],
				required_error: cartMessages.deliveryChoice.required[locale],
			}
		),
	});

export const productCartValidationSchema = (locale: LanguagesI) =>
	z.object<MyZodType<ProductsCartI<CartProductI>>>({
		count: z
			.number({
				description: 'Product count',
				invalid_type_error: cartMessages.productCount.invalid[locale],
				required_error: cartMessages.productCount.required[locale],
			})
			.min(1, {
				message: cartMessages.productCount.message[locale],
			}),
		variants: z.array(catVariantsValidationSchema(locale)).optional(),
		product: cartProductValidationSchema(locale),
	});

export const idCartValidationSchema = (locale: LanguagesI) =>
	z.object<MyZodType<ProductsCartI<string>>>({
		count: z
			.number({
				description: 'Product count',
				invalid_type_error: cartMessages.productCount.invalid[locale],
				required_error: cartMessages.productCount.required[locale],
			})
			.min(1, {
				message: cartMessages.productCount.message[locale],
			}),
		variants: z.array(catVariantsValidationSchema(locale)).optional(),
		product: mongoIDSchema(locale),
	});

export const cartValidationSchema = (locale: LanguagesI) =>
	z
		.object<MyZodType<CartI>>(
			{
				delivery: deliveryValidationSchema(locale),
				products: z.array(productCartValidationSchema(locale)),
				usePoints: z.boolean().optional(),
			},
			{
				description: cartMessages.document.description[locale],
				invalid_type_error: cartMessages.document.invalid[locale],
				required_error: cartMessages.document.required[locale],
			}
		)
		.openapi('Cart Schema', {
			description: cartMessages.document.description[locale],
		});

export const SessionCartValidationSchema = (locale: LanguagesI) =>
	z.object<MyZodType<SessionCartI>>({
		products: z.array(idCartValidationSchema(locale)).min(1, 'At least one product is required'),
	});

export const checkoutCartValidationSchema = (locale: LanguagesI) =>
	z.object<MyZodType<CartI<string>>>({
		delivery: deliveryValidationSchema(locale),
		products: z.array(idCartValidationSchema(locale)).min(1, 'At least one product is required'),
		usePoints: z.boolean().optional(),
	});

export const checkoutAsGuestValidationSchema = (locale: LanguagesI) =>
	z.object<MyZodType<CheckoutAsGuestI>>({
		guest: registerGuestValidationSchema(locale),
		checkout: checkoutCartValidationSchema(locale),
		sessionId: mongoIDSchema(locale).optional()
	});

export const guestSessionInformationSchema = (locale: LanguagesI) => 
	z.object({
		name: z.string().optional().or(z.literal('')).default(''),
		phone: phoneSchema(locale),
	});

export const checkoutAsGuestWithSessionValidationSchema = (locale: LanguagesI) =>
	z.object({
		information: guestSessionInformationSchema(locale),
		products: z.array(idCartValidationSchema(locale)).min(1, 'At least one product is required'),
		sessionId: mongoIDSchema(locale).optional()
	}) as unknown as z.ZodType<CheckoutAsGuestSessionI>; 

