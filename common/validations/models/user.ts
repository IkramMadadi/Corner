import { type MyZodType, z } from '^common/defaultZod';
import {
	arraySchema,
	booleanSchema,
	emailSchema,
	mongoIDSchema,
	passwordSchema,
	phoneSchema,
	stringDateSchema,
} from '^common/elements';
import { ContactInformationSchema } from './generals/ContactInformation';
import { PersonalInformationSchema } from './generals/PersonalInformation';
import { webSitePermissionsISchema, webSitePermissionsIWithBWSSchema } from './website';

// Define message constants
const userMessages = {
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
			en: 'User document Schema',
			fr: 'Schéma de document utilisateur',
			ar: 'مخطط وثيقة المستخدم',
		},
		invalid: {
			en: 'Invalid User Schema',
			fr: 'Schéma utilisateur invalide',
			ar: 'مخطط مستخدم غير صالح',
		},
		required: {
			en: 'User document Schema is required',
			fr: 'Le schéma de document utilisateur est requis',
			ar: 'مخطط وثيقة المستخدم مطلوب',
		},
	},
};

/* --------------------------------- User Login Schema --------------------------------- */
export const userLoginSchema = (locale: LanguagesI) =>
	z
		.object<MyZodType<UserLogInI>>(
			{
				email: emailSchema(locale),
				password: passwordSchema(locale),
				stay: booleanSchema(locale).optional(),
			},
			{
				description: userMessages.document.description[locale],
				invalid_type_error: userMessages.document.invalid[locale],
				required_error: userMessages.document.required[locale],
			}
		)
		.openapi('User_Login_Request', { description: userMessages.document.description[locale] });

export const userLoginWithCaptchaSchema = (locale: LanguagesI) =>
	userLoginSchema(locale)
		.extend(
			{
				captcha: z.string({
					required_error: userMessages.document.required[locale],
					invalid_type_error: userMessages.document.invalid[locale],
				}),
			}
		)
		.openapi('User_Login_Request', { description: userMessages.document.description[locale] });

/* --------------------------------- User Apps Schema --------------------------------- */
export const EnabledUserAppsMap: EnabledUserAppsI = {
	google: 'google',
};
export const EnabledUserAppsList = Object.keys(EnabledUserAppsMap) as EnabledUserAppsEnum[];

export const DisabledUserAppsMap: DisabledUserAppsI = {
	facebook: 'facebook',
	twitter: 'twitter',
	github: 'github',
};

export const DisabledUserAppsList = Object.keys(DisabledUserAppsMap) as DisabledUserAppsEnum[];

export const UserAppsMap: UserAppsI = {
	...EnabledUserAppsMap,
	...DisabledUserAppsMap,
};
export const UserAppsList = Object.keys(UserAppsMap) as UserAppsEnum[];
export const isDisabledUserApp = (app: UserAppsEnum): app is DisabledUserAppsEnum =>
	DisabledUserAppsList.includes(app as DisabledUserAppsEnum);

export const AppDetailsSchema = z.object<MyZodType<AppDetailsI>>({
	id: z.string({
		description: 'App ID',
		invalid_type_error: 'Invalid App ID',
		required_error: 'App ID is required',
	}),
	username: z.string({
		description: 'App username',
		invalid_type_error: 'Invalid App username',
		required_error: 'App username is required',
	}),
});

export const EnabledUserAppsSchema = () =>
	z.object<MyZodType<EnabledUserAppsI<AppDetailsI>>>({
		google: AppDetailsSchema,
	});

/* --------------------------------- User Document Schema --------------------------------- */

export const UserDocumentSchema = (locale: LanguagesI) =>
	z
		.object<MyZodType<UserDocumentI>>(
			{
				email: emailSchema(locale),
				personalInformation: PersonalInformationSchema(locale),
				password: passwordSchema(locale),
				phone: phoneSchema(locale),
				enabled: booleanSchema(locale),
				lastLogin: stringDateSchema(locale),
				contactInformation: ContactInformationSchema(locale),
				roles: arraySchema(mongoIDSchema(locale), locale),
			},
			{
				description: userMessages.document.description[locale],
				invalid_type_error: userMessages.document.invalid[locale],
				required_error: userMessages.document.required[locale],
			}
		)
		.openapi('User_Document', { description: userMessages.document.description[locale] });

/* --------------------------------- User Schema --------------------------------- */

export const GeneralUserSchema = (locale: LanguagesI) =>
	z
		.object<MyZodType<UserI>>(
			{
				email: emailSchema(locale),
				phone: phoneSchema(locale),
				personalInformation: PersonalInformationSchema(locale),
				password: passwordSchema(locale),
			},
			{
				description: userMessages.document.description[locale],
				invalid_type_error: userMessages.document.invalid[locale],
				required_error: userMessages.document.required[locale],
			}
		)
		.openapi('Public_User', { description: userMessages.document.description[locale] });

export const PublicUserSchema = (locale: LanguagesI) =>
	z
		.object<MyZodType<PublicUserI>>(
			{
				email: emailSchema(locale),
				phone: phoneSchema(locale),
				_id: mongoIDSchema(locale),
				personalInformation: PersonalInformationSchema(locale),
				emailValidated: booleanSchema(locale),
				websitesPermissions: arraySchema(webSitePermissionsISchema(locale), locale),
			},
			{
				description: userMessages.document.description[locale],
				invalid_type_error: userMessages.document.invalid[locale],
				required_error: userMessages.document.required[locale],
			}
		)
		.openapi('Public_User', { description: userMessages.document.description[locale] });

export const PublicUserBWSSchema = (locale: LanguagesI) =>
	z
		.object<MyZodType<PublicUserI<BasicWebSiteI>>>(
			{
				email: emailSchema(locale),
				phone: phoneSchema(locale),
				_id: mongoIDSchema(locale),
				personalInformation: PersonalInformationSchema(locale),
				emailValidated: booleanSchema(locale),
				websitesPermissions: arraySchema(webSitePermissionsIWithBWSSchema(locale), locale),
			},
			{
				description: userMessages.document.description[locale],
				invalid_type_error: userMessages.document.invalid[locale],
				required_error: userMessages.document.required[locale],
			}
		)
		.openapi('Public_User', { description: userMessages.document.description[locale] });

export const AuthUserSchema = (locale: LanguagesI) =>
	z
		.object<MyZodType<UserAuthI>>(
			{
				user: PublicUserBWSSchema(locale),
				new: booleanSchema(locale).optional(),
			},
			{
				description: userMessages.document.description[locale],
				invalid_type_error: userMessages.document.invalid[locale],
				required_error: userMessages.document.required[locale],
			}
		)
		.openapi('User_Auth_Response', { description: userMessages.document.description[locale] });

export const NecessaryUserSchema = (locale: LanguagesI) =>
	z
		.object<MyZodType<NecessaryUserI>>(
			{
				...PublicUserSchema(locale).shape,
			},
			{
				description: userMessages.document.description[locale],
				invalid_type_error: userMessages.document.invalid[locale],
				required_error: userMessages.document.required[locale],
			}
		)
		.openapi('Necessary_User', { description: userMessages.document.description[locale] });

/* --------------------------------- User Register Schema --------------------------------- */
export const userRegisterSchema = (locale: LanguagesI) => {
	const schema = z
		.object<MyZodType<UserRegistrationI>>(
			{
				email: emailSchema(locale),
				phone: phoneSchema(locale),
				...PersonalInformationSchema(locale).shape,
				password: passwordSchema(locale),
				confirmPassword: passwordSchema(locale),
			},
			{
				description: userMessages.document.description[locale],
				invalid_type_error: userMessages.document.invalid[locale],
				required_error: userMessages.document.required[locale],
			}
		)
		.openapi('User_Registration_Request', { description: userMessages.document.description[locale] });
	schema.superRefine(({ confirmPassword, password }, ctx) => {
		if (confirmPassword !== password) {
			ctx.addIssue({
				code: 'custom',
				message: userMessages.password.invalid[locale],
			});
		}
	});
	return schema;
};

export const userCreateAdminSchema = (locale: LanguagesI) =>
	z
		.object<MyZodType<Omit<UserI, 'password'>>>(
			{
				email: emailSchema(locale),
				phone: phoneSchema(locale),
				personalInformation: PersonalInformationSchema(locale),
			},
			{
				description: userMessages.document.description[locale],
				invalid_type_error: userMessages.document.invalid[locale],
				required_error: userMessages.document.required[locale],
			}
		)
		.openapi('User_Registration_Request', { description: userMessages.document.description[locale] });

export const changePasswordSchema = (locale: LanguagesI) => {
	const schema = z
		.object<MyZodType<ChangePasswordI>>(
			{
				oldPassword: passwordSchema(locale),
				newPassword: passwordSchema(locale),
				confirmPassword: passwordSchema(locale),
			},
			{
				description: userMessages.document.description[locale],
				invalid_type_error: userMessages.document.invalid[locale],
				required_error: userMessages.document.required[locale],
			}
		)
		.refine(({ confirmPassword, newPassword }) => confirmPassword === newPassword, {
			message: userMessages.password.invalid[locale],
			path: ['confirmPassword'],
		})
		.openapi('Change_Password_Request', { description: userMessages.document.description[locale] });

	return schema;
};
