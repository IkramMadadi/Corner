import type { ZodType } from 'zod';
import { type MyZodType, z } from './defaultZod';
import { invalidMessage } from './messages';

// Define message constants
const usernameMessages: Record<'required' | 'small' | 'big' | 'invalidRegex', LanguagesContentI> = {
	required: {
		en: 'Username is required',
		fr: "Nom d'utilisateur est requis",
		ar: 'اسم المستخدم مطلوب',
	},
	small: {
		en: 'Username must be at least 4 characters long',
		fr: "Le nom d'utilisateur doit comporter au moins 4 caractères",
		ar: 'يجب أن يتكون اسم المستخدم من 4 أحرف على الأقل',
	},
	big: {
		en: 'Username cannot be longer than 35 characters',
		fr: "Le nom d'utilisateur ne peut pas dépasser 35 caractères",
		ar: 'لا يمكن أن يكون اسم المستخدم أطول من 35 حرفًا',
	},
	invalidRegex: {
		en: 'Username can only contain letters, numbers, underscores, periods, and hyphens',
		fr: "Le nom d'utilisateur ne peut contenir que des lettres, des chiffres, des traits de soulignement, des points et des tirets",
		ar: 'يمكن أن يحتوي اسم المستخدم فقط على أحرف وأرقام وشرطات سفلية ونقاط وشرطات',
	},
};

// username
export const usernameSchema = (locale: LanguagesI) =>
	z
		.string({
			invalid_type_error: invalidMessage[locale],
			required_error: usernameMessages.required[locale],
		})
		.trim()
		.min(4, usernameMessages.small[locale])
		.max(35, usernameMessages.big[locale])
		.regex(/^[a-z0-9_.-]+$/, usernameMessages.invalidRegex[locale]);

// Define message constants for other schemas
const slugMessages: Record<'required' | 'small' | 'big' | 'invalidRegex', LanguagesContentI> = {
	required: {
		en: 'Slug is required',
		fr: 'Le slug est requis',
		ar: 'السلج مطلوب',
	},
	small: {
		en: 'Slug must be at least 4 characters long',
		fr: 'Le slug doit comporter au moins 4 caractères',
		ar: 'يجب أن يتكون السلج من 4 أحرف على الأقل',
	},
	big: {
		en: 'Slug cannot be longer than 35 characters',
		fr: 'Le slug ne peut pas dépasser 35 caractères',
		ar: 'لا يمكن أن يكون السلج أطول من 35 حرفًا',
	},
	invalidRegex: {
		en: 'Slug can only contain letters, numbers, underscores, periods, and hyphens',
		fr: 'Le slug ne peut contenir que des lettres, des chiffres, des traits de soulignement, des points et des tirets',
		ar: 'يمكن أن يحتوي السلج فقط على أحرف وأرقام وشرطات سفلية ونقاط وشرطات',
	},
};

// slug
export const slugSchema = (locale: LanguagesI) =>
	z
		.string({
			invalid_type_error: invalidMessage[locale],
			required_error: slugMessages.required[locale],
		})
		.trim()
		.min(4, slugMessages.small[locale])
		.max(64, slugMessages.big[locale])
		.regex(/^[a-z0-9_.-]+$/, slugMessages.invalidRegex[locale]);

const emailMessages: Record<'required' | 'invalid', LanguagesContentI> = {
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
};

// email
export const emailSchema = (locale: LanguagesI) =>
	z
		.string({
			invalid_type_error: invalidMessage[locale],
			required_error: emailMessages.required[locale],
		})
		.email(emailMessages.invalid[locale]);

const passwordMessages: Record<'required' | 'small' | 'big' | 'invalidRegex', LanguagesContentI> = {
	required: {
		en: 'Password is required',
		fr: 'Mot de passe est requis',
		ar: 'كلمة المرور مطلوبة',
	},
	small: {
		en: 'Password must be at least 8 characters long',
		fr: 'Le mot de passe doit comporter au moins 8 caractères',
		ar: 'يجب أن تتكون كلمة المرور من 8 أحرف على الأقل',
	},
	big: {
		en: 'Password cannot be longer than 35 characters',
		fr: 'Le mot de passe ne peut pas dépasser 35 caractères',
		ar: 'لا يمكن أن تكون كلمة المرور أطول من 35 حرفًا',
	},
	invalidRegex: {
		en: 'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character',
		fr: 'Le mot de passe doit contenir au moins 1 lettre majuscule, 1 lettre minuscule, 1 chiffre et 1 caractère spécial',
		ar: 'يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل وحرف صغير واحد ورقم واحد وحرف خاص واحد',
	},
};

// password
export const passwordSchema = (locale: LanguagesI, addRegex = false) => {
	const schema = z
		.string({
			invalid_type_error: invalidMessage[locale],
			required_error: passwordMessages.required[locale],
		})
		.min(8, passwordMessages.small[locale])
		.max(35, passwordMessages.big[locale]);
	if (addRegex)
		schema.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
			passwordMessages.invalidRegex[locale]
		);
	return schema;
};

const phoneMessages: Record<'required' | 'small' | 'big' | 'invalidRegex', LanguagesContentI> = {
	required: {
		en: 'Phone number is required',
		fr: 'Le numéro de téléphone est requis',
		ar: 'رقم الهاتف مطلوب',
	},
	small: {
		en: 'Phone number must be at least 9 characters long',
		fr: 'Le numéro de téléphone doit comporter au moins 9 caractères',
		ar: 'يجب أن يتكون رقم الهاتف من 9 أحرف على الأقل',
	},
	big: {
		en: 'Phone number cannot be longer than 14 characters',
		fr: 'Le numéro de téléphone ne peut pas dépasser 14 caractères',
		ar: 'لا يمكن أن يكون رقم الهاتف أطول من 14 حرفًا',
	},
	invalidRegex: {
		en: 'Phone number can only contain numbers',
		fr: 'Le numéro de téléphone ne peut contenir que des chiffres',
		ar: 'يمكن أن يحتوي رقم الهاتف فقط على أرقام',
	},
};

// phone
export const phoneSchema = (locale: LanguagesI) =>
	z
		.string({
			invalid_type_error: invalidMessage[locale],
			required_error: phoneMessages.required[locale],
		})
		.min(9, phoneMessages.small[locale])
		.max(14, phoneMessages.big[locale])
		.regex(/^(00213|\+213|0)(5|6|7)[0-9]{8}$/, phoneMessages.invalidRegex[locale]);

const nameMessages: Record<'required' | 'small' | 'big', LanguagesContentI> = {
	required: {
		en: 'Name is required',
		fr: 'Le nom est requis',
		ar: 'الاسم مطلوب',
	},
	small: {
		en: 'Name must be at least 2 characters long',
		fr: 'Le nom doit comporter au moins 2 caractères',
		ar: 'يجب أن يتكون الاسم من 2 أحرف على الأقل',
	},
	big: {
		en: 'Name must be less than 48 characters long',
		fr: 'Le nom doit comporter moins de 48 caractères',
		ar: 'يجب أن يكون الاسم أقل من 48 حرفًا',
	},
};

// name
export const nameSchema = (locale: LanguagesI) =>
	z
		.string({
			invalid_type_error: invalidMessage[locale],
			required_error: nameMessages.required[locale],
		})
		.min(2, nameMessages.small[locale])
		.max(48, nameMessages.big[locale]);

const descriptionMessages: Record<'required', LanguagesContentI> = {
	required: {
		en: 'Description is required',
		fr: 'La description est requise',
		ar: 'الوصف مطلوب',
	},
};

// description
export const descriptionSchema = (locale: LanguagesI) =>
	z.string({
		invalid_type_error: invalidMessage[locale],
		required_error: descriptionMessages.required[locale],
	});

const stringDateMessages: Record<'required' | 'invalid', LanguagesContentI> = {
	required: {
		en: 'Date is required',
		fr: 'La date est requise',
		ar: 'التاريخ مطلوب',
	},
	invalid: {
		en: 'Invalid date',
		fr: 'Date invalide',
		ar: 'تاريخ غير صالح',
	},
};

// string date
export const stringDateSchema = (locale: LanguagesI) =>
	z
		.string({
			invalid_type_error: invalidMessage[locale],
			required_error: stringDateMessages.required[locale],
		})
		.refine(val => !Number.isNaN(Date.parse(val)), stringDateMessages.invalid[locale]);

const numberDateMessages: Record<'required' | 'small' | 'invalid', LanguagesContentI> = {
	required: {
		en: 'Date is required',
		fr: 'La date est requise',
		ar: 'التاريخ مطلوب',
	},
	small: {
		en: 'Date must be at least 0',
		fr: 'La date doit être au moins 0',
		ar: 'يجب أن يكون التاريخ على الأقل 0',
	},
	invalid: {
		en: 'Invalid date',
		fr: 'Date invalide',
		ar: 'تاريخ غير صالح',
	},
};

// number date
export const numberDateSchema = (locale: LanguagesI) =>
	z
		.number({
			invalid_type_error: invalidMessage[locale],
			required_error: numberDateMessages.required[locale],
		})
		.min(0, numberDateMessages.small[locale]);

const mongoIDMessages: Record<'required' | 'invalid', LanguagesContentI> = {
	required: {
		en: 'ID is required',
		fr: "L'identifiant est requis",
		ar: 'المعرف مطلوب',
	},
	invalid: {
		en: 'Invalid ID',
		fr: 'Identifiant invalide',
		ar: 'معرف غير صالح',
	},
};

// mongodb id
export const mongoIDSchema = (locale: LanguagesI) =>
	z
		.string({
			invalid_type_error: invalidMessage[locale],
			required_error: mongoIDMessages.required[locale],
		})
		.refine(val => val.match(/^[0-9a-fA-F]{24}$/), mongoIDMessages.invalid[locale]);

const uuidMessages: Record<'required' | 'invalid', LanguagesContentI> = {
	required: {
		en: 'UUID is required',
		fr: 'UUID est requis',
		ar: 'UUID مطلوب',
	},
	invalid: {
		en: 'Invalid UUID',
		fr: 'UUID invalide',
		ar: 'UUID غير صالح',
	},
};

// uuid
export const uuidSchema = (locale: LanguagesI) =>
	z
		.string({
			invalid_type_error: invalidMessage[locale],
			required_error: uuidMessages.required[locale],
		})
		.regex(/^[0-9a-zA-Z]{10,15}$/, uuidMessages.invalid[locale]);

const nullElementMessages: Record<'required' | 'invalid', LanguagesContentI> = {
	required: {
		en: 'Element is required',
		fr: "L'élément est requis",
		ar: 'العنصر مطلوب',
	},
	invalid: {
		en: 'Element must be null',
		fr: "L'élément doit être nul",
		ar: 'يجب أن يكون العنصر فارغًا',
	},
};

// null element
export const nullElementSchema = (locale: LanguagesI) =>
	z.null({
		invalid_type_error: nullElementMessages.invalid[locale],
		required_error: nullElementMessages.required[locale],
	});

const errorMessages: Record<'required' | 'invalid', LanguagesContentI> = {
	required: {
		en: 'Error message is required',
		fr: "Le message d'erreur est requis",
		ar: 'رسالة الخطأ مطلوبة',
	},
	invalid: {
		en: 'Invalid error message',
		fr: "Message d'erreur invalide",
		ar: 'رسالة خطأ غير صالحة',
	},
};

// error
export const errorSchema = (locale: LanguagesI) =>
	z.object<MyZodType<ErrorResponseI>>({
		message: z.string({
			invalid_type_error: invalidMessage[locale],
			required_error: errorMessages.required[locale],
		}),
		error: z.any({
			invalid_type_error: invalidMessage[locale],
			required_error: errorMessages.required[locale],
		}),
	});

const booleanMessages: Record<'required' | 'invalid', LanguagesContentI> = {
	required: {
		en: 'Boolean is required',
		fr: 'Le booléen est requis',
		ar: 'القيمة المنطقية مطلوبة',
	},
	invalid: {
		en: 'Invalid boolean',
		fr: 'Booléen invalide',
		ar: 'قيمة منطقية غير صالحة',
	},
};

// boolean
export const booleanSchema = (locale: LanguagesI) =>
	z.boolean({
		invalid_type_error: booleanMessages.invalid[locale],
		required_error: booleanMessages.required[locale],
	});

const arrayMessages: Record<'required' | 'invalid', LanguagesContentI> = {
	required: {
		en: 'Array is required',
		fr: 'Le tableau est requis',
		ar: 'المصفوفة مطلوبة',
	},
	invalid: {
		en: 'Invalid array',
		fr: 'Tableau invalide',
		ar: 'مصفوفة غير صالحة',
	},
};

// array
export const arraySchema = <X = unknown>(schema: ZodType<X>, locale: LanguagesI) =>
	z.array<ZodType<X>>(schema, {
		invalid_type_error: arrayMessages.invalid[locale],
		required_error: arrayMessages.required[locale],
	});

const urlMessages: Record<'required' | 'invalid', LanguagesContentI> = {
	required: {
		en: 'URL is required',
		fr: "L'URL est requis",
		ar: 'الرابط مطلوب',
	},
	invalid: {
		en: 'Invalid URL',
		fr: 'URL invalide',
		ar: 'رابط غير صالح',
	},
};

// url
export const urlSchema = (locale: LanguagesI) =>
	z
		.string({
			invalid_type_error: urlMessages.invalid[locale],
			required_error: urlMessages.required[locale],
		})
		.url(urlMessages.invalid[locale])
		.or(z.literal(''))
		// or url path that start with /
		.or(z.string().regex(/^\/.*/, urlMessages.invalid[locale]));

const otpMessages: Record<'required' | 'invalid', LanguagesContentI> = {
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
};

// otp
export const otpSchema = (locale: LanguagesI) =>
	z
		.string({
			invalid_type_error: otpMessages.invalid[locale],
			required_error: otpMessages.required[locale],
		})
		.refine(val => val.match(/^\d{6}$/), otpMessages.invalid[locale]);

const ratingMessages: Record<'required' | 'small' | 'big', LanguagesContentI> = {
	required: {
		en: 'Rating is required',
		fr: 'La note est requise',
		ar: 'التقييم مطلوب',
	},
	small: {
		en: 'Rating must be at least 0',
		fr: 'La note doit être au moins 0',
		ar: 'يجب أن يكون التقييم على الأقل 0',
	},
	big: {
		en: 'Rating cannot be more than 5',
		fr: 'La note ne peut pas dépasser 5',
		ar: 'لا يمكن أن يكون التقييم أكثر من 5',
	},
};

// rating
export const ratingSchema = (locale: LanguagesI) =>
	z
		.number({
			invalid_type_error: invalidMessage[locale],
			required_error: ratingMessages.required[locale],
		})
		.min(0, ratingMessages.small[locale])
		.max(5, ratingMessages.big[locale]);

const languagesContentMessages: Record<LanguagesI, ErrorsSchemaMsgI> = {
	en: {
		required: 'Error message is required',
		invalid: 'Invalid error message',
		description: 'The error message',
	},
	fr: {
		required: "Le message d'erreur est requis",
		invalid: "Message d'erreur invalide",
		description: "Le message d'erreur",
	},
	ar: {
		required: 'رسالة الخطأ مطلوبة',
		invalid: 'رسالة خطأ غير صالحة',
		description: 'رسالة الخطأ',
	},
};

// languages content validation
export const languagesContentValidationSchema = ({ min = 0, max = 100 } = {}) =>
	z.object<MyZodType<LanguagesContentI>>({
		en: z
			.string({
				required_error: languagesContentMessages.en.required,
				invalid_type_error: languagesContentMessages.en.invalid,
				description: languagesContentMessages.en.description,
			})
			.min(min, `You should write at least ${min} letter`)
			.max(max, `You shouldn't write more than ${max} letter`),
		fr: z
			.string({
				required_error: languagesContentMessages.fr.required,
				invalid_type_error: languagesContentMessages.fr.invalid,
				description: languagesContentMessages.fr.description,
			})
			.min(min, `Vous devez écrire au moins ${min} lettre`)
			.max(max, `Vous ne devez pas écrire plus de ${max} lettre`),
		ar: z
			.string({
				required_error: languagesContentMessages.ar.required,
				invalid_type_error: languagesContentMessages.ar.invalid,
				description: languagesContentMessages.ar.description,
			})
			.min(min, `يجب أن تكتب على الأقل ${min} حرفا`)
			.max(max, `لا يجب أن تكتب أكثر من ${max} حرفًا `),
	});
