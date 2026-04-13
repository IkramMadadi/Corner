import { type MyZodType, z } from '^common/defaultZod';
import { emailSchema, passwordSchema, phoneSchema } from '^common/elements';
import { PersonalInformationSchema } from './generals/PersonalInformation';

// Define message constants
const customerMessages = {
	email: {
		required: {
			en: 'Email is required',
			fr: 'Email est requis',
			ar: 'البريد الإلكتروني مطلوب',
		},
		invalid: {
			en: 'Invalid email address',
			fr: 'Adresse e-mail invalide',
			ar: 'عنوان البريد الإلكتروني غير صالح',
		},
	},
	password: {
		required: {
			en: 'Password is required',
			fr: 'Mot de passe est requis',
			ar: 'كلمة المرور مطلوبة',
		},
		invalid: {
			en: 'Invalid password',
			fr: 'Mot de passe invalide',
			ar: 'كلمة مرور غير صالحة',
		},
	},
	phone: {
		required: {
			en: 'Phone number is required',
			fr: 'Le numéro de téléphone est requis',
			ar: 'رقم الهاتف مطلوب',
		},
		invalid: {
			en: 'Invalid phone number',
			fr: 'Numéro de téléphone invalide',
			ar: 'رقم الهاتف غير صالح',
		},
	},
	firstName: {
		required: {
			en: 'First Name is required',
			fr: 'Le prénom est requis',
			ar: 'الاسم الأول مطلوب',
		},
		invalid: {
			en: 'Invalid First Name',
			fr: 'Prénom invalide',
			ar: 'الاسم الأول غير صالح',
		},
	},
	lastName: {
		required: {
			en: 'Last Name is required',
			fr: 'Le nom de famille est requis',
			ar: 'اسم العائلة مطلوب',
		},
		invalid: {
			en: 'Invalid Last Name',
			fr: 'Nom de famille invalide',
			ar: 'اسم العائلة غير صالح',
		},
	},
	document: {
		description: {
			en: 'Customer Information Schema',
			fr: "Schéma d'information client",
			ar: 'مخطط معلومات العميل',
		},
		invalid: {
			en: 'Invalid Customer Information Schema',
			fr: "Schéma d'information client invalide",
			ar: 'مخطط معلومات العميل غير صالح',
		},
		required: {
			en: 'Customer Information Schema is required',
			fr: "Le schéma d'information client est requis",
			ar: 'مخطط معلومات العميل مطلوب',
		},
	},
};

// customer login schema
export const customerLoginSchema = (locale: LanguagesI) =>
	z
		.object<MyZodType<CustomerLoginI>>(
			{
				email: emailSchema(locale),
				password: passwordSchema(locale),
			},
			{
				description: customerMessages.document.description[locale],
				invalid_type_error: customerMessages.document.invalid[locale],
				required_error: customerMessages.document.required[locale],
			}
		)
		.openapi('Customer_Login_Request', { description: customerMessages.document.description[locale] });

// customer register schema
export const customerRegisterSchema = (locale: LanguagesI) =>
	z
		.object<MyZodType<CustomerRegisterI>>(
			{
				personalInformation: PersonalInformationSchema(locale),
				phone: phoneSchema(locale),
				email: emailSchema(locale),
				password: passwordSchema(locale),
			},
			{
				description: customerMessages.document.description[locale],
				invalid_type_error: customerMessages.document.invalid[locale],
				required_error: customerMessages.document.required[locale],
			}
		)
		.openapi('Customer_Register_Request', { description: customerMessages.document.description[locale] });

// customer information schema
export const customerInformationSchema = (locale: LanguagesI) =>
	z
		.object<MyZodType<CustomerInformationI>>(
			{
				firstName: z.string({
					required_error: customerMessages.firstName.required[locale],
					invalid_type_error: customerMessages.firstName.invalid[locale],
				}),
				lastName: z.string({
					required_error: customerMessages.lastName.required[locale],
					invalid_type_error: customerMessages.lastName.invalid[locale],
				}),
				email: emailSchema(locale),
				phone: phoneSchema(locale),
			},
			{
				description: customerMessages.document.description[locale],
				invalid_type_error: customerMessages.document.invalid[locale],
				required_error: customerMessages.document.required[locale],
			}
		)
		.openapi('Customer_Information_Request', { description: customerMessages.document.description[locale] });
