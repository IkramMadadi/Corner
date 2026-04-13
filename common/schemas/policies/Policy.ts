import { Schema } from 'mongoose';

import type {
	PolicyInstanceMethods,
	PolicyModel,
	PolicyQueryHelpers,
	PolicySchemaOptions,
	PolicyStaticMethods,
	PolicyVirtual,
} from '!common/generated/schemas/policies/privacy';

import { FAQSchema } from '../FAQ';
import LanguagesContentSchema from '../LanguagesContent';

const required = true;

/* --------------------- Schema --------------------- */
const policySchema = new Schema<
	PolicyI,
	PolicyModel,
	PolicyInstanceMethods,
	PolicyQueryHelpers,
	PolicyVirtual,
	PolicyStaticMethods,
	PolicySchemaOptions
>(
	{
		// schema here
		description: { type: LanguagesContentSchema, required },
		rules: { type: [FAQSchema], default: [] },
	},
	{ timestamps: true }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */

/* --------------------- Methods ---------------------  */

export default policySchema;
