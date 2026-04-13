import { type MyZodType, z } from '^common/defaultZod';
import { languagesContentValidationSchema } from '^common/elements';

export const faqValidationSchema = z.object<MyZodType<FAQI>>({
	question: languagesContentValidationSchema(),
	answer: languagesContentValidationSchema({ max: 500 }),
});
