import { Schema } from 'mongoose';

import type {
	QuickLinkInstanceMethods,
	QuickLinkModel,
	QuickLinkQueryHelpers,
	QuickLinkSchemaOptions,
	QuickLinkStaticMethods,
	QuickLinkVirtual,
} from '!common/generated/schemas/QuickLink';
import LanguagesContentSchema from './LanguagesContent';
const required = true;
/* --------------------- Schema --------------------- */
export const QuickLinkSchema = new Schema<
	QuickLinkI,
	QuickLinkModel,
	QuickLinkInstanceMethods,
	QuickLinkQueryHelpers,
	QuickLinkVirtual,
	QuickLinkStaticMethods,
	QuickLinkSchemaOptions
>(
	{
		// schema here
		label: { type: LanguagesContentSchema, required },
		href: { type: String, required },
		icon: { type: String },
	},
	{ timestamps: true, _id: false }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */

/* --------------------- Methods ---------------------  */
