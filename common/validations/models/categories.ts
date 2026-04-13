import { PublishableContentEnums, categoryLabelsEnums } from '@common/data/enums/generalEnums';
import { type MyZodType, z } from '^common/defaultZod';
import { booleanSchema, languagesContentValidationSchema, mongoIDSchema, slugSchema } from '^common/elements';
import { imageValidationSchema } from './generals/Image';

// Define message constants
const categoryMessages = {
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
			en: 'Category label is required',
			fr: 'Le label de catégorie est requis',
			ar: 'تسمية الفئة مطلوبة',
		},
		invalid: {
			en: 'Category label is not a valid label',
			fr: "Le label de catégorie n'est pas un label valide",
			ar: 'تسمية الفئة ليست تسمية صالحة',
		},
	},
	document: {
		description: {
			en: 'Category information',
			fr: 'Informations sur la catégorie',
			ar: 'معلومات الفئة',
		},
		invalid: {
			en: 'Invalid Category information',
			fr: 'Informations sur la catégorie invalides',
			ar: 'معلومات الفئة غير صالحة',
		},
		required: {
			en: 'Category information is required',
			fr: 'Les informations sur la catégorie sont requises',
			ar: 'معلومات الفئة مطلوبة',
		},
	},
};

export const CategoryInformationISchema = (locale: LanguagesI) =>
	z.object<MyZodType<CategoryInformationI>>(
		{
			name: languagesContentValidationSchema({ min: 2, max: 62 }),
			summary: languagesContentValidationSchema({ min: 2, max: 350 }),
			slug: slugSchema(locale),
			for: z.enum<PublishableContentTypeI, MyEnum<PublishableContentTypeI>>(
				PublishableContentEnums as unknown as MyEnum<PublishableContentTypeI>,
				{
					description: 'Category label',
					invalid_type_error: categoryMessages.for.invalid[locale],
					required_error: categoryMessages.for.required[locale],
				}
			),
		},
		{
			description: categoryMessages.document.description[locale],
			invalid_type_error: categoryMessages.document.invalid[locale],
			required_error: categoryMessages.document.required[locale],
		}
	);

// category labels validation
export const categoryLabelsValidationSchema = (locale: LanguagesI) =>
	z.object<MyZodType<PublishableLabelsI<CategoryLabelsT>>>({
		label: z
			.enum<CategoryLabelsT, MyEnum<CategoryLabelsT>>(
				['', ...categoryLabelsEnums] as unknown as MyEnum<CategoryLabelsT>,
				{
					description: 'Category label',
					invalid_type_error: categoryMessages.for.invalid[locale],
					required_error: categoryMessages.for.required[locale],
				}
			)
			.optional(),
		tags: z.array(
			z.string({
				description: 'Category tags',
				invalid_type_error: categoryMessages.name.invalid[locale],
				required_error: categoryMessages.name.required[locale],
			})
		),
	});

// simple category validation
export const simpleCategoryValidationSchema = (locale: LanguagesI) =>
	z.object<MyZodType<TableSimpleCategoryI>>({
		name: languagesContentValidationSchema({ min: 2, max: 62 }),
		slug: slugSchema(locale),
		_id: mongoIDSchema(locale),
		avatar: imageValidationSchema(locale),
		isPublished: booleanSchema(locale),
		for: z.enum<PublishableContentTypeI, MyEnum<PublishableContentTypeI>>(
			PublishableContentEnums as unknown as MyEnum<PublishableContentTypeI>,
			{
				description: 'Category label',
				invalid_type_error: categoryMessages.for.invalid[locale],
				required_error: categoryMessages.for.required[locale],
			}
		),
	});
