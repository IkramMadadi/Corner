import { type MyZodType, z } from '^common/defaultZod';
import { arraySchema, emailSchema, phoneSchema, urlSchema } from '^common/elements';

// Define message constants
const contactInformationMessages = {
	emails: {
		required: {
			en: 'Emails are required',
			fr: 'Les e-mails sont requis',
			ar: 'البريد الإلكتروني مطلوب',
		},
	},
	validatedEmails: {
		required: {
			en: 'Validated emails are required',
			fr: 'Les e-mails validés sont requis',
			ar: 'البريد الإلكتروني المعتمد مطلوب',
		},
	},
	websites: {
		required: {
			en: 'Websites are required',
			fr: 'Les sites Web sont requis',
			ar: 'المواقع الإلكترونية مطلوبة',
		},
	},
	faxes: {
		required: {
			en: 'Faxes are required',
			fr: 'Les fax sont requis',
			ar: 'الفاكسات مطلوبة',
		},
	},
	phones: {
		required: {
			en: 'Phones are required',
			fr: 'Les téléphones sont requis',
			ar: 'الهواتف مطلوبة',
		},
	},
	socialMediaUrls: {
		required: {
			en: 'Social media URLs are required',
			fr: 'Les URL des réseaux sociaux sont requis',
			ar: 'روابط وسائل التواصل الاجتماعي مطلوبة',
		},
	},
	document: {
		description: {
			en: 'Contact information document Schema',
			fr: "Schéma de document d'information de contact",
			ar: 'مخطط وثيقة معلومات الاتصال',
		},
		invalid: {
			en: 'Invalid Contact information Schema',
			fr: "Schéma d'information de contact invalide",
			ar: 'مخطط معلومات الاتصال غير صالح',
		},
		required: {
			en: 'Contact information document Schema is required',
			fr: "Le schéma de document d'information de contact est requis",
			ar: 'مخطط وثيقة معلومات الاتصال مطلوب',
		},
	},
};

/* Social media schema */
export const SocialMediaSchema = (locale: LanguagesI) => {
	return z
		.object<MyZodType<SocialMediaUrlsI>>(
			{
				facebook: z.string().optional(),
				instagram: z.string().optional(),
				linkedin: z.string().optional(),
				x: z.string().optional(),
				youtube: z.string().optional(),
				tiktok: z.string().optional(),
			},
			{
				description: contactInformationMessages.document.description[locale],
				invalid_type_error: contactInformationMessages.document.invalid[locale],
				required_error: contactInformationMessages.document.required[locale],
			}
		)
		.openapi('Social_Media_Document', { description: contactInformationMessages.document.description[locale] });
};

/* Contact information schema */
export const ContactInformationSchema = (locale: LanguagesI) => {
	return z
		.object<MyZodType<ContactInformationI>>(
			{
				emails: arraySchema(emailSchema(locale), locale),
				validatedEmails: arraySchema(emailSchema(locale), locale),
				websites: arraySchema(urlSchema(locale), locale),
				faxes: arraySchema(phoneSchema(locale), locale),
				phones: arraySchema(phoneSchema(locale), locale),
				socialMediaUrls: SocialMediaSchema(locale).optional(),
			},
			{
				description: contactInformationMessages.document.description[locale],
				invalid_type_error: contactInformationMessages.document.invalid[locale],
				required_error: contactInformationMessages.document.required[locale],
			}
		)
		.openapi('Contact_information_Document', {
			description: contactInformationMessages.document.description[locale],
		});
};
