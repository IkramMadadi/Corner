import { Schema } from 'mongoose';

import type {
	LanguagesContentInstanceMethods,
	LanguagesContentModel,
	LanguagesContentQueryHelpers,
	LanguagesContentSchemaOptions,
	LanguagesContentStaticMethods,
	LanguagesContentVirtual,
} from '!common/generated/schemas/LanguagesContent';
const required = true;
/* --------------------- Schema --------------------- */
const LanguagesContentSchema = new Schema<
	LanguagesContentI,
	LanguagesContentModel,
	LanguagesContentInstanceMethods,
	LanguagesContentQueryHelpers,
	LanguagesContentVirtual,
	LanguagesContentStaticMethods,
	LanguagesContentSchemaOptions
>(
	{
		// schema here
		en: { type: String, required: true },
		ar: { type: String, required: false },
		fr: { type: String, required: false },
	},
	{ timestamps: false, _id: false }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */

/* --------------------- Methods ---------------------  */

/* --------------------- Exports ---------------------  */
export default LanguagesContentSchema;
