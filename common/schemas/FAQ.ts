import { Schema } from 'mongoose';

import type {
	FAQInstanceMethods,
	FAQModel,
	FAQQueryHelpers,
	FAQSchemaOptions,
	FAQStaticMethods,
	FAQVirtual,
} from '!common/generated/schemas/faq';
import LanguagesContentSchema from './LanguagesContent';
const required = true;
/* --------------------- Schema --------------------- */
export const FAQSchema = new Schema<
	FAQI,
	FAQModel,
	FAQInstanceMethods,
	FAQQueryHelpers,
	FAQVirtual,
	FAQStaticMethods,
	FAQSchemaOptions
>(
	{
		// schema here
		question: { type: LanguagesContentSchema, required },
		answer: { type: LanguagesContentSchema, required },
	},
	{ timestamps: true, _id: false }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */

/* --------------------- Methods ---------------------  */
