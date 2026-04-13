import { Schema } from 'mongoose';

import type {
	LoyaltyProgramInstanceMethods,
	LoyaltyProgramModel,
	LoyaltyProgramQueryHelpers,
	LoyaltyProgramSchemaOptions,
	LoyaltyProgramStaticMethods,
	LoyaltyProgramVirtual,
} from '!common/generated/schemas/LoyaltyProgram';
import NumbersRangeSchema from './NumbersRange';

const required = true;

/* --------------------- Schema --------------------- */
const LoyaltyProgramSchema = new Schema<
	LoyaltyProgramSettingsI,
	LoyaltyProgramModel,
	LoyaltyProgramInstanceMethods,
	LoyaltyProgramQueryHelpers,
	LoyaltyProgramVirtual,
	LoyaltyProgramStaticMethods,
	LoyaltyProgramSchemaOptions
>(
	{
		// schema here
		conversionRate: { type: Number, required },
		multipliers: {
			promotion: { type: Number, default: 1 },
		},
		bonuses: {
			accountCreation: { type: Number, required },
			newsletterSignup: { type: Number, required },
		},
		tiers: {
			bronze: { type: NumbersRangeSchema },
			silver: { type: NumbersRangeSchema },
			gold: { type: NumbersRangeSchema },
		},

		expirationOnMonths: { type: Number, default: 12 },
	},
	{ timestamps: true, _id: false }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */

/* --------------------- Methods ---------------------  */

/* --------------------- Exports ---------------------  */
export default LoyaltyProgramSchema;
