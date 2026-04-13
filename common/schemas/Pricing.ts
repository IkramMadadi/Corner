import { Schema } from 'mongoose';

import type {
	PricingInstanceMethods,
	PricingModel,
	PricingQueryHelpers,
	PricingSchemaOptions,
	PricingStaticMethods,
	PricingVirtual,
} from '!common/generated/schemas/Pricing';

const required = true;

/* --------------------- Schema --------------------- */
const PricingSchema = new Schema<
	PricingI,
	PricingModel,
	PricingInstanceMethods,
	PricingQueryHelpers,
	PricingVirtual,
	PricingStaticMethods,
	PricingSchemaOptions
>(
	{
		// schema here
		current: { type: Number, required },
		original: { type: Number },
	},
	{ timestamps: false, _id: false }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */

/* --------------------- Methods ---------------------  */

/* --------------------- Exports ---------------------  */
export default PricingSchema;
