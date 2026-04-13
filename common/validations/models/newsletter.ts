import { type MyZodType, z } from '^common/defaultZod';
import { emailSchema } from '^common/elements';

export const createNewsLetterValidationSchema = (locale: LanguagesI) =>
	z.object<MyZodType<CreateNewsLetterI>>({
		email: emailSchema(locale),
	});
