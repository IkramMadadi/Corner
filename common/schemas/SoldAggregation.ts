import { Schema } from 'mongoose';

import type {
	SoldAggregationInstanceMethods,
	SoldAggregationModel,
	SoldAggregationQueryHelpers,
	SoldAggregationSchemaOptions,
	SoldAggregationStaticMethods,
	SoldAggregationVirtual,
} from '!common/generated/schemas/SoldAggregation';

/* --------------------- Schema --------------------- */
const SoldAggregationSchema = new Schema<
	SoldAggregationI,
	SoldAggregationModel,
	SoldAggregationInstanceMethods,
	SoldAggregationQueryHelpers,
	SoldAggregationVirtual,
	SoldAggregationStaticMethods,
	SoldAggregationSchemaOptions
>(
	{
		count: { type: Number, default: 0 },
		delivered: { type: Number, default: 0 },
		// schema here
	},
	{ timestamps: false, _id: false }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */
/* SoldAggregationSchema.pre('save', async function (next) {
	try {
	// hook here
		next();
	} catch (err) {
		next(err as Error);
	}
});
 */
/* --------------------- Methods ---------------------  */

/* --------------------- Exports ---------------------  */
export default SoldAggregationSchema;
