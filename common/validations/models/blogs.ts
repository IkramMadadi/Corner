import { blogsLabels } from '@common/data/enums/generalEnums';
import { type MyZodType, z } from '^common/defaultZod';
import { languagesContentValidationSchema, slugSchema } from '^common/elements';

// Define message constants
const blogMessages = {
	label: {
		required: {
			en: 'label is required',
			fr: 'Le label est requis',
			ar: 'الاسم مطلوب',
		},
		invalid: {
			en: 'Invalid name',
			fr: 'Nom invalide',
			ar: 'اسم غير صالح',
		},
	},
	tags: {
		required: {
			en: 'Tags are required',
			fr: 'Les tags sont requis',
			ar: 'العلامات مطلوبة',
		},
		invalid: {
			en: 'Invalid Tags',
			fr: 'Tags invalides',
			ar: 'علامات غير صالحة',
		},
	},
	document: {
		description: {
			en: 'Blog information',
			fr: 'Informations sur le blog',
			ar: 'معلومات المدونة',
		},
		invalid: {
			en: 'Invalid Blog information',
			fr: 'Informations sur le blog invalides',
			ar: 'معلومات المدونة غير صالحة',
		},
		required: {
			en: 'Blog information is required',
			fr: 'Les informations sur le blog sont requises',
			ar: 'معلومات المدونة مطلوبة',
		},
	},
};

export const BlogInformationISchema = (locale: LanguagesI) =>
	z.object<MyZodType<BlogInformationI>>(
		{
			content: languagesContentValidationSchema({ min: 2, max: 2000 }),
			name: languagesContentValidationSchema({ min: 2, max: 62 }),
			summary: languagesContentValidationSchema({ min: 2, max: 350 }),
			slug: slugSchema(locale),
		},
		{
			description: blogMessages.document.description[locale],
			invalid_type_error: blogMessages.document.invalid[locale],
			required_error: blogMessages.document.required[locale],
		}
	);

// blog labels validation
export const blogLabelsValidationSchema = (locale: LanguagesI) =>
	z.object<MyZodType<PublishableLabelsI<BlogsLabelsT>>>({
		label: z
			.enum<BlogsLabelsT, MyEnum<BlogsLabelsT>>(['', ...blogsLabels] as unknown as MyEnum<BlogsLabelsT>, {
				description: 'Blog label',
				invalid_type_error: blogMessages.label.invalid[locale],
				required_error: blogMessages.label.required[locale],
			})
			.optional(),
		tags: z.array(
			z.string({
				description: 'Blog tags',
				invalid_type_error: blogMessages.tags.invalid[locale],
				required_error: blogMessages.tags.required[locale],
			})
		),
	});
