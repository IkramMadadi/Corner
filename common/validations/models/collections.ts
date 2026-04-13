import { PublishableContentEnums, collectionLabelsEnums } from '@common/data/enums/generalEnums';
import { type MyZodType, z } from '^common/defaultZod';
import { booleanSchema, languagesContentValidationSchema, mongoIDSchema, slugSchema } from '^common/elements';
import { imageValidationSchema } from './generals/Image';

// Define message constants
const collectionMessages = {
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
	for: {
		required: {
			en: 'Collection label is required',
			fr: 'Le label de collection est requis',
			ar: 'تسمية المجموعة مطلوبة',
		},
		invalid: {
			en: 'Collection label is not a valid label',
			fr: "Le label de collection n'est pas un label valide",
			ar: 'تسمية المجموعة ليست تسمية صالحة',
		},
	},
	document: {
		description: {
			en: 'Collection information',
			fr: 'Informations sur la collection',
			ar: 'معلومات المجموعة',
		},
		invalid: {
			en: 'Invalid Collection information',
			fr: 'Informations sur la collection invalides',
			ar: 'معلومات المجموعة غير صالحة',
		},
		required: {
			en: 'Collection information is required',
			fr: 'Les informations sur la collection sont requises',
			ar: 'معلومات المجموعة مطلوبة',
		},
	},
};

export const CollectionInformationISchema = (locale: LanguagesI) =>
	z.object<MyZodType<CollectionInformationI>>(
		{
			name: languagesContentValidationSchema({ min: 2, max: 62 }),
			summary: languagesContentValidationSchema({ min: 2, max: 350 }),
			slug: slugSchema(locale),
			for: z.enum<PublishableContentTypeI, MyEnum<PublishableContentTypeI>>(
				PublishableContentEnums as unknown as MyEnum<PublishableContentTypeI>,
				{
					description: 'Collection label',
					invalid_type_error: collectionMessages.for.invalid[locale],
					required_error: collectionMessages.for.required[locale],
				}
			),
		},
		{
			description: collectionMessages.document.description[locale],
			invalid_type_error: collectionMessages.document.invalid[locale],
			required_error: collectionMessages.document.required[locale],
		}
	);

// collection labels validation
export const collectionLabelsValidationSchema = (locale: LanguagesI) =>
	z.object<MyZodType<PublishableLabelsI<CollectionLabelsT>>>({
		label: z
			.enum<CollectionLabelsT, MyEnum<CollectionLabelsT>>(
				['', ...collectionLabelsEnums] as unknown as MyEnum<CollectionLabelsT>,
				{
					description: 'Collection label',
					invalid_type_error: collectionMessages.for.invalid[locale],
					required_error: collectionMessages.for.required[locale],
				}
			)
			.optional(),
		tags: z.array(
			z.string({
				description: 'Collection tags',
				invalid_type_error: collectionMessages.name.invalid[locale],
				required_error: collectionMessages.name.required[locale],
			})
		),
	});

// simple collection validation
export const simpleCollectionValidationSchema = (locale: LanguagesI) =>
	z.object<MyZodType<SimpleCollectionI>>({
		name: languagesContentValidationSchema({ min: 2, max: 62 }),
		slug: slugSchema(locale),
		_id: mongoIDSchema(locale),
		avatar: imageValidationSchema(locale),
		isPublic: booleanSchema(locale),
		isPublished: booleanSchema(locale),
		for: z.enum<PublishableContentTypeI, MyEnum<PublishableContentTypeI>>(
			PublishableContentEnums as unknown as MyEnum<PublishableContentTypeI>,
			{
				description: 'Collection label',
				invalid_type_error: collectionMessages.for.invalid[locale],
				required_error: collectionMessages.for.required[locale],
			}
		),
	});
