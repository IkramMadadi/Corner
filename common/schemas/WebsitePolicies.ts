import { Schema } from 'mongoose';

import type {
	WebsitePoliciesInstanceMethods,
	WebsitePoliciesModel,
	WebsitePoliciesQueryHelpers,
	WebsitePoliciesSchemaOptions,
	WebsitePoliciesStaticMethods,
	WebsitePoliciesVirtual,
} from '!common/generated/schemas/WebsitePolicies';

import policySchema from './policies/Policy';

const required = true;

/* --------------------- Schema --------------------- */
const WebsitePoliciesSchema = new Schema<
	WebsitePoliciesI,
	WebsitePoliciesModel,
	WebsitePoliciesInstanceMethods,
	WebsitePoliciesQueryHelpers,
	WebsitePoliciesVirtual,
	WebsitePoliciesStaticMethods,
	WebsitePoliciesSchemaOptions
>(
	{
		// schema here
		privacy: { type: policySchema, required },
		termsOfService: { type: policySchema, required },
		cookies: { type: policySchema, required },
	},
	{ timestamps: true, _id: false }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */

/* --------------------- Methods ---------------------  */

export default WebsitePoliciesSchema;
