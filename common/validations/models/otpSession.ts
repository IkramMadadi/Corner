import { type MyZodType, z } from '^common/defaultZod';
import { emailSchema, otpSchema, passwordSchema } from '^common/elements';
import { NecessaryUserSchema } from './user';

// Define message constants
const otpMessages = {
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
	otpCode: {
		required: {
			en: 'OTP is required',
			fr: 'OTP est requis',
			ar: 'OTP مطلوب',
		},
		invalid: {
			en: 'Invalid OTP',
			fr: 'OTP invalide',
			ar: 'OTP غير صالح',
		},
	},
	sessionId: {
		required: {
			en: 'Session ID is required',
			fr: "L'identifiant de session est requis",
			ar: 'معرف الجلسة مطلوب',
		},
		invalid: {
			en: 'Invalid session ID',
			fr: 'Identifiant de session invalide',
			ar: 'معرف الجلسة غير صالح',
		},
	},
	password: {
		required: {
			en: 'Password is required',
			fr: 'Le mot de passe est requis',
			ar: 'كلمة المرور مطلوبة',
		},
		invalid: {
			en: 'Invalid password',
			fr: 'Mot de passe invalide',
			ar: 'كلمة مرور غير صالحة',
		},
	},
	passwordNotEqual: {
		invalid: {
			en: 'Password and confirm password must match',
			fr: 'Le mot de passe et la confirmation du mot de passe doivent correspondre',
			ar: 'يجب أن تتطابق كلمة المرور وتأكيد كلمة المرور',
		},
	},
	document: {
		description: {
			en: 'Recovery session schema',
			fr: 'Schéma de session de récupération',
			ar: 'مخطط جلسة الاسترداد',
		},
		invalid: {
			en: 'Invalid recovery session schema',
			fr: 'Schéma de session de récupération invalide',
			ar: 'مخطط جلسة الاسترداد غير صالح',
		},
		required: {
			en: 'Recovery session schema is required',
			fr: 'Le schéma de session de récupération est requis',
			ar: 'مخطط جلسة الاسترداد مطلوب',
		},
	},
};

// OTPSession schema
export const OTPSessionSchema = (locale: LanguagesI) =>
	z
		.object<MyZodType<OTPSessionI>>(
			{
				email: emailSchema(locale),
			},
			{
				description: otpMessages.document.description[locale],
				invalid_type_error: otpMessages.document.invalid[locale],
				required_error: otpMessages.document.required[locale],
			}
		)
		.openapi('Recovery_Session', { description: otpMessages.document.description[locale] });

// OTPSessionSend schema
export const OTPSessionSendSchema = (locale: LanguagesI) =>
	z
		.object<MyZodType<OTPSessionSendI>>(
			{
				otpCode: otpSchema(locale),
				sessionId: z.string({
					description: 'OTP session Id',
					required_error: otpMessages.sessionId.required[locale],
				}),
			},
			{
				description: otpMessages.document.description[locale],
				invalid_type_error: otpMessages.document.invalid[locale],
				required_error: otpMessages.document.required[locale],
			}
		)
		.openapi('Recovery_Session_Send', { description: otpMessages.document.description[locale] });

// ResetPassword schema
export const ResetPasswordSchema = (locale: LanguagesI) =>
	z
		.object<MyZodType<ResetPasswordI>>({
			sessionId: z.string({
				description: 'OTP session Id',
				required_error: otpMessages.sessionId.required[locale],
			}),
			password: passwordSchema(locale),
			otpCode: otpSchema(locale),
		})
		.openapi('Reset_Password', { description: otpMessages.document.description[locale] });

// ConfirmedResetPassword schema
export const ConfirmedResetPasswordSchema = (locale: LanguagesI) =>
	z
		.object<MyZodType<ConfirmedResetPasswordI>>({
			sessionId: z.string({
				description: 'OTP session Id',
				required_error: otpMessages.sessionId.required[locale],
			}),
			password: passwordSchema(locale),
			confirmPassword: passwordSchema(locale),
			otpCode: otpSchema(locale),
		})
		.openapi('Reset_Password', { description: otpMessages.document.description[locale] })
		.superRefine((data, ctx) => {
			if (data.password !== data.confirmPassword) {
				return ctx.addIssue({
					code: 'custom',
					message: otpMessages.passwordNotEqual.invalid[locale],
					path: ['confirmPassword'],
				});
			}
		});

// OTPSessionResponse schema
export const OTPSessionResponseSchema = (locale: LanguagesI) =>
	z
		.object<MyZodType<OTPSessionResponseI>>(
			{
				sessionId: z.string({
					description: 'Otp session ID',
					required_error: otpMessages.sessionId.required[locale],
				}),
				user: NecessaryUserSchema(locale),
			},
			{
				description: otpMessages.document.description[locale],
				invalid_type_error: otpMessages.document.invalid[locale],
				required_error: otpMessages.document.required[locale],
			}
		)
		.openapi('Recovery_Session_Response', { description: otpMessages.document.description[locale] });
