import { type MyZodType, z } from '^common/defaultZod';
import { stringDateSchema } from '^common/elements';

// Define message constants
const personalInformationMessages = {
	firstName: {
		required: {
			en: 'First name is required',
			fr: 'Le prénom est requis',
			ar: 'الاسم الأول مطلوب',
		},
	},
	lastName: {
		required: {
			en: 'Last name is required',
			fr: 'Le nom de famille est requis',
			ar: 'اسم العائلة مطلوب',
		},
	},
	birthday: {
		required: {
			en: 'Birthday is required',
			fr: 'La date de naissance est requise',
			ar: 'تاريخ الميلاد مطلوب',
		},
		invalid: {
			en: 'Invalid birthday',
			fr: 'Date de naissance invalide',
			ar: 'تاريخ ميلاد غير صالح',
		},
	},
	note: {
		required: {
			en: 'Note is required',
			fr: 'La note est requise',
			ar: 'الملاحظة مطلوبة',
		},
	},
	gender: {
		required: {
			en: 'Gender is required',
			fr: 'Le sexe est requis',
			ar: 'الجنس مطلوب',
		},
		invalid: {
			en: 'Invalid gender',
			fr: 'Sexe invalide',
			ar: 'الجنس غير صالح',
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

export const gendersMap: Record<GendersT, LanguagesContentI> = {
	M: {
		en: 'Male',
		ar: 'ذكر',
		fr: 'Homme',
	},
	F: {
		en: 'Female',
		ar: 'أنثى',
		fr: 'Femme',
	},
};

export const gendersMapToValue: Record<GendersNamesT, GendersT> = { Male: 'M', Female: 'F' };
export const gendersList = Object.keys(gendersMap) as unknown as MyEnum<GendersT>;

export const genderSchema = z.enum<GendersT, MyEnum<GendersT>>(gendersList, {
	description: 'Gender Schema',
	invalid_type_error: personalInformationMessages.gender.invalid.en,
	required_error: personalInformationMessages.gender.required.en,
});

export const PersonalInformationSchema = (locale: LanguagesI) => {
	return z
		.object<MyZodType<PersonalInformationI>>(
			{
				firstName: z.string({ required_error: personalInformationMessages.firstName.required[locale] }),
				lastName: z.string({ required_error: personalInformationMessages.lastName.required[locale] }),
				birthday: stringDateSchema(locale).optional(),
				note: z
					.string({
						required_error: personalInformationMessages.note.required[locale],
					})
					.optional(),
				gender: z
					.enum<GendersT, MyEnum<GendersT>>(gendersList, {
						invalid_type_error: personalInformationMessages.gender.invalid[locale],
						required_error: personalInformationMessages.gender.required[locale],
					})
					.optional(),
			},
			{
				description: personalInformationMessages.document.description[locale],
				invalid_type_error: personalInformationMessages.document.invalid[locale],
				required_error: personalInformationMessages.document.required[locale],
			}
		)
		.openapi('User_Document', { description: personalInformationMessages.document.description[locale] });
};
