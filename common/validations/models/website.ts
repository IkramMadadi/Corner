import { ProductAdditionalEnums } from "@common/data/enums/ProductAdditionalEnums";
import { WebsiteFeaturesFlagsEnums } from "@common/data/enums/WebsiteFeaturesFlagsEnums";
import { type MyZodType, z } from "^common/defaultZod";
import {
  languagesContentValidationSchema,
  mongoIDSchema,
  slugSchema,
  urlSchema,
} from "^common/elements";
import { AddressValidationSchema } from "./generals/Address";
import { BannerElementSchema } from "./generals/BannerElement";
import { ContactInformationSchema } from "./generals/ContactInformation";
import {
  ratedServiceElementValidationSchema,
  serviceElementValidationSchema,
} from "./generals/ServiceElement";
import { faqValidationSchema } from "./generals/faq";
import { permissionsSchema } from "./role";

// Define message constants
const websiteMessages = {
  name: {
    required: {
      en: "Name is required",
      fr: "Le nom est requis",
      ar: "الاسم مطلوب",
    },
    invalid: {
      en: "Invalid name",
      fr: "Nom invalide",
      ar: "اسم غير صالح",
    },
  },
  summary: {
    required: {
      en: "Summary is required",
      fr: "Le résumé est requis",
      ar: "الملخص مطلوب",
    },
    invalid: {
      en: "Invalid summary",
      fr: "Résumé invalide",
      ar: "ملخص غير صالح",
    },
  },
  slug: {
    required: {
      en: "Slug is required",
      fr: "Le slug est requis",
      ar: "السلج مطلوب",
    },
    invalid: {
      en: "Invalid slug",
      fr: "Slug invalide",
      ar: "سلج غير صالح",
    },
  },
  domain: {
    required: {
      en: "Domain is required",
      fr: "Le domaine est requis",
      ar: "النطاق مطلوب",
    },
    invalid: {
      en: "Invalid domain",
      fr: "Domaine invalide",
      ar: "نطاق غير صالح",
    },
  },
  document: {
    description: {
      en: "Website information",
      fr: "Informations sur le site Web",
      ar: "معلومات الموقع",
    },
    invalid: {
      en: "Invalid Website information",
      fr: "Informations sur le site Web invalides",
      ar: "معلومات الموقع غير صالحة",
    },
    required: {
      en: "Website information is required",
      fr: "Les informations sur le site Web sont requises",
      ar: "معلومات الموقع مطلوبة",
    },
  },
};

// website product additional enum validation
export const websiteProductAdditionalEnumValidationSchema = (
  locale: LanguagesI
) =>
  z.enum<ProductAdditionalKeys, MyEnum<ProductAdditionalKeys>>(
    ProductAdditionalEnums as unknown as MyEnum<ProductAdditionalKeys>,
    {
      invalid_type_error: websiteMessages.document.invalid[locale],
    }
  );

// website features flag enum validation
export const WebsiteFeaturesFlagEnumValidationSchema = (locale: LanguagesI) =>
  z.enum<WebsiteFeaturesFlagsKeys, MyEnum<WebsiteFeaturesFlagsKeys>>(
    WebsiteFeaturesFlagsEnums as unknown as MyEnum<WebsiteFeaturesFlagsKeys>,
    {
      invalid_type_error: websiteMessages.document.invalid[locale],
    }
  );

// basic website schema
export const basicWebSiteISchema = (locale: LanguagesI) =>
  z.object<MyZodType<BasicWebSiteI>>(
    {
      _id: mongoIDSchema(locale),
      FY_ID: slugSchema(locale),
      domain: urlSchema(locale),
      name: languagesContentValidationSchema({ min: 3, max: 150 }),
      flags: z.array(WebsiteFeaturesFlagEnumValidationSchema(locale)),
      productsAttributes: z.array(
        websiteProductAdditionalEnumValidationSchema(locale)
      ),
    },
    {
      description: websiteMessages.document.description[locale],
      invalid_type_error: websiteMessages.document.invalid[locale],
      required_error: websiteMessages.document.required[locale],
    }
  );

// website permissions schema
export const webSitePermissionsISchema = (locale: LanguagesI) =>
  z.object<MyZodType<WebSitePermissionsI>>(
    {
      permissions: permissionsSchema(locale),
      website: mongoIDSchema(locale).optional(),
    },
    {
      description: websiteMessages.document.description[locale],
      invalid_type_error: websiteMessages.document.invalid[locale],
      required_error: websiteMessages.document.required[locale],
    }
  );

// website permissions with BWS schema
export const webSitePermissionsIWithBWSSchema = (locale: LanguagesI) =>
  z.object<MyZodType<WebSitePermissionsI<BasicWebSiteI>>>(
    {
      permissions: permissionsSchema(locale),
      website: basicWebSiteISchema(locale).optional(),
    },
    {
      description: websiteMessages.document.description[locale],
      invalid_type_error: websiteMessages.document.invalid[locale],
      required_error: websiteMessages.document.required[locale],
    }
  );

// website information validation
export const websiteInformationValidationSchema = (locale: LanguagesI) =>
  z.object<MyZodType<WebsiteInformationI>>({
    name: languagesContentValidationSchema({ min: 3, max: 150 }),
    aboutUs: languagesContentValidationSchema({ min: 3, max: 10000 }),
    description: languagesContentValidationSchema({ min: 3, max: 1000 }),
    domain: urlSchema(locale),
    addresses: z.array(AddressValidationSchema(locale)),
    contactInformation: ContactInformationSchema(locale),
    keywords: z.array(z.string()),
  });

// services settings validation
export const servicesSettingsValidationSchema = (locale: LanguagesI) =>
  z.object<MyZodType<ServicesSettingsFromI>>({
    services: z.array(serviceElementValidationSchema(locale)),
  });

// testimonials settings validation
export const testimonialsSettingsValidationSchema = (locale: LanguagesI) =>
  z.object<MyZodType<TestimonialsSettingsFromI>>({
    testimonials: z.array(ratedServiceElementValidationSchema(locale)),
  });

// faqs settings validation
export const faqsSettingsValidationSchema = z.object<
  MyZodType<FAQSettingsFromI>
>({
  faqs: z.array(faqValidationSchema),
});

// navigation link validation
export const navigationLinkValidationSchema = (locale: LanguagesI) => {
  const navigationLinkValidationSchemaR: z.ZodType<NavigationLinkI> = z.lazy(
    () =>
      z.object({
        label: languagesContentValidationSchema({ min: 3, max: 100 }),
        href: urlSchema(locale),
        subLinks: z.array(navigationLinkValidationSchemaR).optional(), // Recursive reference
      })
  );
  return navigationLinkValidationSchemaR;
};

// quick link validation
export const quickLinkValidationSchema = (locale: LanguagesI) =>
  z.object<MyZodType<QuickLinkI>>({
    label: languagesContentValidationSchema({ min: 3, max: 100 }),
    href: urlSchema(locale),
    icon: z.string().optional(),
  });

// navigation settings validation
export const navigationSettingsValidationSchema = (locale: LanguagesI) =>
  z.object<MyZodType<NavigationSettingsI>>({
    links: z.array(quickLinkValidationSchema(locale)),
    navigations: z.object<MyZodType<NavigationSettingsI["navigations"]>>({
      footer: z.array(navigationLinkValidationSchema(locale)),
      navbar: z.object<MyZodType<NavigationSettingsI["navigations"]["navbar"]>>(
        {
          left: z.array(navigationLinkValidationSchema(locale)),
          right: z.array(navigationLinkValidationSchema(locale)),
        }
      ),
    }),
  });

// numbers range validation
const numbersRangeValidationSchema = (
  locale: LanguagesI,
  attribute: string
) => {
  const messages = {
    required_error: {
      en: `${attribute} is required`,
      fr: `${attribute} est requis`,
      ar: `${attribute} مطلوب`,
    },
    invalid_type_error: {
      en: `${attribute} must be a valid number range`,
      fr: `${attribute} doit être un intervalle de nombres valide`,
      ar: `${attribute} يجب أن يكون نطاق أرقام صالح`,
    },
    min_max_error: {
      en: `${attribute} minimum must be less than or equal to maximum`,
      fr: `${attribute} minimum doit être inférieur ou égal au maximum`,
      ar: `${attribute} الحد الأدنى يجب أن يكون أقل من أو يساوي الحد الأقصى`,
    },
  };
  return z
    .object<MyZodType<NumbersRangeI>>({
      max: z.coerce.number({
        required_error: messages.required_error[locale],
        invalid_type_error: messages.invalid_type_error[locale],
      }),
      min: z.coerce.number({
        required_error: messages.required_error[locale],
        invalid_type_error: messages.invalid_type_error[locale],
      }),
    })
    .refine((val) => val.min <= val.max, {
      message: messages.min_max_error[locale],
      path: ["min"], // Highlight the `min` field as the source of the error
    });
};

// loyalty program settings validation
const loyaltyProgramMessages = {
  bonuses: {
    accountCreation: {
      required_error: {
        en: "Account creation must be a positive number",
        fr: "La création de compte doit être un nombre positif",
        ar: "يجب أن يكون إنشاء الحساب رقمًا موجبًا",
      },
      invalid_type_error: {
        en: "Account creation must be a positive number",
        fr: "La création de compte doit être un nombre positif",
        ar: "يجب أن يكون إنشاء الحساب رقمًا موجبًا",
      },
    },
    newsletterSignup: {
      required_error: {
        en: "Newsletter signup must be a positive number",
        fr: "L'inscription à la newsletter doit être un nombre positif",
        ar: "يجب أن يكون الاشتراك في النشرة الإخبارية رقمًا موجبًا",
      },
      invalid_type_error: {
        en: "Newsletter signup must be a positive number",
        fr: "L'inscription à la newsletter doit être un nombre positif",
        ar: "يجب أن يكون الاشتراك في النشرة الإخبارية رقمًا موجبًا",
      },
    },
  },
  conversionRate: {
    required_error: {
      en: "Conversion rate must be a positive number",
      fr: "Le taux de conversion doit être un nombre positif",
      ar: "يجب أن يكون معدل التحويل رقمًا موجبًا",
    },
    invalid_type_error: {
      en: "Conversion rate must be a positive number",
      fr: "Le taux de conversion doit être un nombre positif",
      ar: "يجب أن يكون معدل التحويل رقمًا موجبًا",
    },
  },
  expirationOnMonths: {
    required_error: {
      en: "Expiration must be a positive number",
      fr: "L'expiration doit être un nombre positif",
      ar: "يجب أن تكون مدة الصلاحية رقمًا موجبًا",
    },
    invalid_type_error: {
      en: "Expiration must be a positive number",
      fr: "L'expiration doit être un nombre positif",
      ar: "يجب أن تكون مدة الصلاحية رقمًا موجبًا",
    },
  },
  multipliers: {
    promotion: {
      required_error: {
        en: "Promotion multiplier must be a positive number",
        fr: "Le multiplicateur de promotion doit être un nombre positif",
        ar: "يجب أن يكون مضاعف الترويج رقمًا موجبًا",
      },
      invalid_type_error: {
        en: "Promotion multiplier must be a positive number",
        fr: "Le multiplicateur de promotion doit être un nombre positif",
        ar: "يجب أن يكون مضاعف الترويج رقمًا موجبًا",
      },
    },
  },
};

export const loyaltyProgramSettingsValidationSchema = (locale: LanguagesI) =>
  z.object<MyZodType<LoyaltyProgramSettingsI>>({
    bonuses: z.object<MyZodType<LoyaltyProgramSettingsI["bonuses"]>>({
      accountCreation: z
        .number({
          coerce: true,
          required_error:
            loyaltyProgramMessages.bonuses.accountCreation.required_error[
              locale
            ],
          invalid_type_error:
            loyaltyProgramMessages.bonuses.accountCreation.invalid_type_error[
              locale
            ],
        })
        .optional(),
      newsletterSignup: z
        .number({
          coerce: true,
          required_error:
            loyaltyProgramMessages.bonuses.newsletterSignup.required_error[
              locale
            ],
          invalid_type_error:
            loyaltyProgramMessages.bonuses.newsletterSignup.invalid_type_error[
              locale
            ],
        })
        .optional(),
    }),
    conversionRate: z.number({
      coerce: true,
      required_error:
        loyaltyProgramMessages.conversionRate.required_error[locale],
      invalid_type_error:
        loyaltyProgramMessages.conversionRate.invalid_type_error[locale],
    }),
    expirationOnMonths: z.number({
      coerce: true,
      required_error:
        loyaltyProgramMessages.expirationOnMonths.required_error[locale],
      invalid_type_error:
        loyaltyProgramMessages.expirationOnMonths.invalid_type_error[locale],
    }),
    multipliers: z.object<MyZodType<LoyaltyProgramSettingsI["multipliers"]>>({
      promotion: z.number({
        required_error:
          loyaltyProgramMessages.multipliers.promotion.required_error[locale],
        invalid_type_error:
          loyaltyProgramMessages.multipliers.promotion.invalid_type_error[
            locale
          ],
      }),
    }),
    tiers: z.object<MyZodType<LoyaltyProgramSettingsI["tiers"]>>({
      bronze: numbersRangeValidationSchema(locale, "Bronze multiplier"),
      silver: numbersRangeValidationSchema(locale, "Silver multiplier"),
      gold: numbersRangeValidationSchema(locale, "Gold multiplier"),
    }),
  });

// policy validation
export const policyValidationSchema = z.object<MyZodType<PolicyI>>({
  description: languagesContentValidationSchema({ max: 10000 }),
  rules: z.array(faqValidationSchema),
});

// policies settings validation
export const policiesSettingsValidationsSchema = z.object<
  MyZodType<WebsitePoliciesI>
>({
  privacy: policyValidationSchema,
  termsOfService: policyValidationSchema,
  cookies: policyValidationSchema,
});

// integration validation
export const integrationValidationsSchema = z.object<MyZodType<IntegrationI>>({
  id: z.string(),
  access_token: z.string().optional(),
  flags: z.object<MyZodType<IntegrationI["flags"]>>({
    "add-product": z.boolean(),
    "decrement-product": z.boolean(),
    "increment-product": z.boolean(),
    "remove-product": z.boolean(),
    order: z.boolean(),
  }),
});

// analytics integration validation
export const analyticsIntegrationValidationsSchema = z.object<MyZodType<AnalyticsIntegrationI>>({
	google_analytics: integrationValidationsSchema.optional(),
	meta: integrationValidationsSchema.optional(),
	tiktok: integrationValidationsSchema.optional(),
});

// publishable content validation
export const publishableContentValidationsSchema = (locale: LanguagesI) =>
  z.object<MyZodType<PublishablePageContentI>>({
    categories: z.array(mongoIDSchema(locale)),
    collections: z.array(mongoIDSchema(locale)),
  });

// page content validation
export const pageContentValidationsSchema = (locale: LanguagesI) =>
  z.object<MyZodType<PageContentI>>({
    blogs: publishableContentValidationsSchema(locale),
    products: publishableContentValidationsSchema(locale),
  });

const deliverySettingsMessages = {
  zones: {
    required: {
      en: "Zones are required",
      fr: "Les zones sont requises",
      ar: "المناطق مطلوبة",
    },
    invalid: {
      en: "Invalid zones",
      fr: "Zones invalides",
      ar: "مناطق غير صالحة",
    },
  },
  fees: {
    required: {
      en: "Fees are required",
      fr: "Les frais sont requis",
      ar: "الرسوم مطلوبة",
    },
    invalid: {
      en: "Invalid fees",
      fr: "Frais invalides",
      ar: "رسوم غير صالحة",
    },
  },
  defaultFee: {
    required: {
      en: "Default fee is required",
      fr: "Les frais par défaut sont requis",
      ar: "الرسوم الافتراضية مطلوبة",
    },
    invalid: {
      en: "Invalid default fee",
      fr: "Frais par défaut invalides",
      ar: "رسوم افتراضية غير صالحة",
    },
  },
  daysToDeliver: {
    required: {
      en: "Days to deliver are required",
      fr: "Les jours de livraison sont requis",
      ar: "أيام التسليم مطلوبة",
    },
    invalid: {
      en: "Invalid days to deliver",
      fr: "Jours de livraison invalides",
      ar: "أيام تسليم غير صالحة",
    },
  },
  freeOnOver: {
    invalid: {
      en: "Invalid free on over value",
      fr: "Valeur gratuite invalide",
      ar: "قيمة غير صالحة",
    },
  },
};

// delivery settings validation
export const deliverySettingsValidationSchema = (locale: LanguagesI) =>
  z.object<MyZodType<DeliverySettingsI>>({
    zones: z
      .array(z.number().int().min(1).max(58))
      .nonempty({
        message: deliverySettingsMessages.zones.required[locale],
      })
      .refine((val) => val.length > 0, {
        message: deliverySettingsMessages.zones.invalid[locale],
      }),
    fees: z
      .array(
        z.object({
          desk: z.number().nonnegative({
            message: deliverySettingsMessages.fees.invalid[locale],
          }),
          door: z.number().nonnegative({
            message: deliverySettingsMessages.fees.invalid[locale],
          }),
        })
      )
      .nonempty({
        message: deliverySettingsMessages.fees.required[locale],
      }),
    defaultFee: z.object({
      desk: z.number().nonnegative({
        message: deliverySettingsMessages.defaultFee.invalid[locale],
      }),
      door: z.number().nonnegative({
        message: deliverySettingsMessages.defaultFee.invalid[locale],
      }),
    }),
    daysToDeliver: z
      .number()
      .int()
      .min(1, {
        message: deliverySettingsMessages.daysToDeliver.invalid[locale],
      })
      .nonnegative({
        message: deliverySettingsMessages.daysToDeliver.required[locale],
      }),
    freeOnOver: z
      .number()
      .nonnegative({
        message: deliverySettingsMessages.freeOnOver.invalid[locale],
      })
      .optional(),
  });
// bannersSettingsValidationSchema
const bannersSettingsMessages = {
  nonEmpty: {
    en: "Banners cannot be empty",
    fr: "Les bannières ne peuvent pas être vides",
    ar: "لا يمكن أن تكون اللافتات فارغة",
  },
};
export const bannersSettingsValidationSchema = (locale: LanguagesI) =>
  z.object<MyZodType<BannerSettingsFromI>>({
    banners: z.array(BannerElementSchema(locale)).nonempty({
      message: bannersSettingsMessages.nonEmpty[locale],
    }),
  });
