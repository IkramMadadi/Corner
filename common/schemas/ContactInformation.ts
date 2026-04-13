import { Schema } from 'mongoose';

import type {
	ContactInformationInstanceMethods,
	ContactInformationModel,
	ContactInformationQueryHelpers,
	ContactInformationSchemaOptions,
	ContactInformationStaticMethods,
	ContactInformationVirtual,
} from '!common/generated/schemas/ContactInformation';

import { socialMediaUrlsSchema } from './SocialMediaUrls';
//import { phoneSchema } from './phone';

/* --------------------- Schema --------------------- */
const contactInformationSchema = new Schema<
	ContactInformationI,
	ContactInformationModel,
	ContactInformationInstanceMethods,
	ContactInformationQueryHelpers,
	ContactInformationVirtual,
	ContactInformationStaticMethods,
	ContactInformationSchemaOptions
>(
	{
		phones: {
			type: [String],
			default: [],
		},
		faxes: {
			type: [String],
		},
		emails: {
			type: [String],
			default: [],
		},
		validatedEmails: {
			type: [String],
			default: [],
		},
		websites: {
			type: [String],
		},

		socialMediaUrls: {
			type: socialMediaUrlsSchema,
		},
	},
	{ timestamps: false, _id: false }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */

/* --------------------- Methods ---------------------  */
contactInformationSchema.methods.toOptimizedObject = function () {
	return this.toObject();
};

export { contactInformationSchema };
