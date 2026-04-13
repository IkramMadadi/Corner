import { type MyZodType, z } from '^common/defaultZod';
import { languagesContentValidationSchema, ratingSchema } from '^common/elements';
import { imageValidationSchema } from './Image';

export const serviceElementValidationSchema = (locale: LanguagesI) =>
	z.object<MyZodType<ServiceElementI>>({
		image: imageValidationSchema(locale),
		title: languagesContentValidationSchema(),
		description: languagesContentValidationSchema({ max: 500 }),
	});
export const ratedServiceElementValidationSchema = (locale: LanguagesI) =>
	z.object<MyZodType<RatedServiceElementI>>({
		...serviceElementValidationSchema(locale).shape,
		rating: ratingSchema(locale),
	});
