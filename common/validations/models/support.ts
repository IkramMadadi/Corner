import { type MyZodType, z } from '^common/defaultZod';
import { booleanSchema, emailSchema, mongoIDSchema, nameSchema } from '^common/elements';

// Define message constants
const supportMessages = {
	customerName: {
		required: {
			en: 'Customer name is required',
			fr: 'Le nom du client est requis',
			ar: 'اسم العميل مطلوب',
		},
		invalid: {
			en: 'Customer name is not a valid name',
			fr: "Le nom du client n'est pas valide",
			ar: 'اسم العميل غير صالح',
		},
	},
	email: {
		required: {
			en: 'Email is required',
			fr: "L'email est requis",
			ar: 'البريد الإلكتروني مطلوب',
		},
		invalid: {
			en: 'Email is not a valid email',
			fr: "L'email n'est pas valide",
			ar: 'البريد الإلكتروني غير صالح',
		},
	},
	report: {
		required: {
			en: 'Report is required',
			fr: 'Le rapport est requis',
			ar: 'التقرير مطلوب',
		},
		invalid: {
			en: 'Report is not a valid string',
			fr: "Le rapport n'est pas une chaîne valide",
			ar: 'التقرير ليس سلسلة صالحة',
		},
	},
	subject: {
		required: {
			en: 'Subject is required',
			fr: 'Le sujet est requis',
			ar: 'الموضوع مطلوب',
		},
	},
};

export const requestSupportValidationSchema = (locale: LanguagesI) =>
	z.object<MyZodType<RequestSupportI>>({
		customerName: nameSchema(locale),
		email: emailSchema(locale),
		//enabled:booleanSchema(locale),
		report: z.string({
			description: 'Report',
			invalid_type_error: supportMessages.report.invalid[locale],
			required_error: supportMessages.report.required[locale],
		}),
		subject: z.enum(['Product Inquiry', 'Order Support', 'Business Collaboration'], {
			errorMap: () => ({ message: supportMessages.subject.required[locale] }),
		}),
	});

export const supportRequestValidationSchema = (locale: LanguagesI) =>
	z.object<MyZodType<SupportRequestI>>({
		customerName: nameSchema(locale),
		email: emailSchema(locale),
		enabled: booleanSchema(locale),
		report: z.string({
			description: 'Report',
			invalid_type_error: supportMessages.report.invalid[locale],
			required_error: supportMessages.report.required[locale],
		}),
		subject: z.enum(['Product Inquiry', 'Order Support', 'Business Collaboration'], {
			errorMap: () => ({ message: supportMessages.subject.required[locale] }),
		}),
		website: mongoIDSchema(locale),
	});
