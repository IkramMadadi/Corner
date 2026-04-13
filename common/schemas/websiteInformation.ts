import { Schema } from 'mongoose';

import type {
	WebsiteInformationInstanceMethods,
	WebsiteInformationModel,
	WebsiteInformationQueryHelpers,
	WebsiteInformationSchemaOptions,
	WebsiteInformationStaticMethods,
	WebsiteInformationVirtual,
} from '!common/generated/schemas/websiteInformation';

import { contactInformationSchema } from './ContactInformation';
import LanguagesContentSchema from './LanguagesContent';
import { addressSchema } from './address';

const required = true;

/* --------------------- Schema --------------------- */
const websiteInformationSchema = new Schema<
	WebsiteInformationI,
	WebsiteInformationModel,
	WebsiteInformationInstanceMethods,
	WebsiteInformationQueryHelpers,
	WebsiteInformationVirtual,
	WebsiteInformationStaticMethods,
	WebsiteInformationSchemaOptions
>(
	{
		// schema here
		name: { type: LanguagesContentSchema, required },
		domain: { type: String, required },
		description: { type: LanguagesContentSchema, required },
		aboutUs: { type: LanguagesContentSchema, required },
		addresses: { type: [addressSchema], required },
		contactInformation: contactInformationSchema,
		keywords: { type: [String], required },
	},
	{ timestamps: true, _id: false }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */
/* WebsiteInformationSchema.pre('save', async function (next) {
	try {
	// hook here
		next();
	} catch (err) {
		next(err as Error);
	}
});
 */
/* --------------------- Methods ---------------------  */

export default websiteInformationSchema;
