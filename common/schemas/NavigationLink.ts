import { Schema } from 'mongoose';

import type {
	NavigationLinkInstanceMethods,
	NavigationLinkModel,
	NavigationLinkQueryHelpers,
	NavigationLinkSchemaOptions,
	NavigationLinkStaticMethods,
	NavigationLinkVirtual,
} from '!common/generated/schemas/NavigationLink';
import LanguagesContentSchema from './LanguagesContent';
const required = true;
/* --------------------- Schema --------------------- */
export const NavigationLinkSchema = new Schema<
	NavigationLinkI,
	NavigationLinkModel,
	NavigationLinkInstanceMethods,
	NavigationLinkQueryHelpers,
	NavigationLinkVirtual,
	NavigationLinkStaticMethods,
	NavigationLinkSchemaOptions
>({}, { timestamps: true });

NavigationLinkSchema.add({
	label: { type: LanguagesContentSchema, required },
	href: { type: String, required },
	subLinks: { type: [NavigationLinkSchema] },
});
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */

/* --------------------- Methods ---------------------  */
