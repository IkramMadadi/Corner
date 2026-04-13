import { type MyZodType, z } from '^common/defaultZod';
import { languagesContentValidationSchema, mongoIDSchema, slugSchema } from '^common/elements';

export const basicPublishableInformationValidationSchema = (locale: LanguagesI) =>
	z.object<MyZodType<BasicPublishableInformationI>>({
		name: languagesContentValidationSchema({ min: 2, max: 100 }),
		summary: languagesContentValidationSchema({ min: 2, max: 1000 }),
		slug: slugSchema(locale),
	});

export const basicPublishableInformationWithIdValidationSchema = (locale: LanguagesI) =>
	z.object<MyZodType<BasicPublishableInformationWithIdI>>({
		_id: mongoIDSchema(locale),
		...basicPublishableInformationValidationSchema(locale).shape,
	});
