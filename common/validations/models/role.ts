import { BasePermissionsIds } from '@common/permissions/Permissions';
import { type MyZodType, z } from '^common/defaultZod';
import { descriptionSchema, mongoIDSchema, nameSchema } from '^common/elements';

// Define message constants
const roleMessages = {
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
	permissions: {
		required: {
			en: 'Permissions are required',
			fr: 'Les autorisations sont requises',
			ar: 'الأذونات مطلوبة',
		},
		invalid: {
			en: 'Invalid permissions',
			fr: 'Autorisations invalides',
			ar: 'أذونات غير صالحة',
		},
	},
	document: {
		description: {
			en: 'Public Role Schema',
			fr: 'Schéma de rôle public',
			ar: 'مخطط الدور العام',
		},
		invalid: {
			en: 'Invalid Public Role Schema',
			fr: 'Schéma de rôle public invalide',
			ar: 'مخطط الدور العام غير صالح',
		},
		required: {
			en: 'Public Role Schema is required',
			fr: 'Le schéma de rôle public est requis',
			ar: 'مخطط الدور العام مطلوب',
		},
	},
};

// permissions schema
export const permissionsSchema = (locale: LanguagesI) =>
	z
		.array(z.enum(['dev:super', ...BasePermissionsIds]), {
			required_error: roleMessages.permissions.required[locale],
			invalid_type_error: roleMessages.permissions.invalid[locale],
			description: 'Permissions',
		})
		.openapi('Permissions', {
			description: 'Permissions',
			format: 'admin:super',
		});

// create role validation
export const createRoleValidationSchema = (locale: LanguagesI) =>
	z.object<MyZodType<CreateRoleI>>(
		{
			description: descriptionSchema(locale),
			name: nameSchema(locale),
			website: mongoIDSchema(locale).optional(),
		},
		{
			description: roleMessages.document.description[locale],
			invalid_type_error: roleMessages.document.invalid[locale],
			required_error: roleMessages.document.required[locale],
		}
	);

// simple role validation
export const simpleRoleValidationSchema = (locale: LanguagesI) =>
	z.object<MyZodType<BaseRoleI>>(
		{
			_id: mongoIDSchema(locale),
			...createRoleValidationSchema(locale).shape,
		},
		{
			description: roleMessages.document.description[locale],
			invalid_type_error: roleMessages.document.invalid[locale],
			required_error: roleMessages.document.required[locale],
		}
	);

// role validation
export const roleValidationSchema = (locale: LanguagesI) =>
	z.object<MyZodType<RoleI>>(
		{
			...simpleRoleValidationSchema(locale).shape,
			permissions: permissionsSchema(locale),
		},
		{
			description: roleMessages.document.description[locale],
			invalid_type_error: roleMessages.document.invalid[locale],
			required_error: roleMessages.document.required[locale],
		}
	);

// public role validation
export const publicRoleValidationSchema = (locale: LanguagesI) =>
	z.object<MyZodType<PublicRoleI>>(
		{
			...roleValidationSchema(locale).shape,
			_id: mongoIDSchema(locale),
		},
		{
			description: roleMessages.document.description[locale],
			invalid_type_error: roleMessages.document.invalid[locale],
			required_error: roleMessages.document.required[locale],
		}
	);

// form role validation
export const formRoleValidationSchema = (locale: LanguagesI) =>
	z.object<MyZodType<FormRoleI>>(
		{
			...roleValidationSchema(locale).shape,
			permissions: z.object<MyZodType<FormRoleI['permissions']>>(
				BasePermissionsIds.reduce(
					(acc, id) => {
						acc[id] = z.boolean();
						return acc;
					},
					{} as Record<BasePermissionsIdsI, z.ZodBoolean>
				)
			),
			_id: mongoIDSchema(locale),
		},
		{
			description: roleMessages.document.description[locale],
			invalid_type_error: roleMessages.document.invalid[locale],
			required_error: roleMessages.document.required[locale],
		}
	);
