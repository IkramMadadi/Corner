import { Schema } from 'mongoose';

import type {
	RatingAggregationInstanceMethods,
	RatingAggregationModel,
	RatingAggregationQueryHelpers,
	RatingAggregationSchemaOptions,
	RatingAggregationStaticMethods,
	RatingAggregationVirtual,
} from '!common/generated/schemas/RatingAggregation';

/* --------------------- Schema --------------------- */
const RatingAggregationSchema = new Schema<
	RatingAggregationI,
	RatingAggregationModel,
	RatingAggregationInstanceMethods,
	RatingAggregationQueryHelpers,
	RatingAggregationVirtual,
	RatingAggregationStaticMethods,
	RatingAggregationSchemaOptions
>(
	{
		// schema here
		count: { type: Number, default: 0 },
		average: { type: Number, default: 0 },
		distribution: {
			type: [{ type: Number, default: 0 }],
			default: [0, 0, 0, 0, 0],
			validate: {
				validator: arr => {
					return arr.length === 5; // Ensures the array has exactly 5 elements
				},
				message: 'Array must contain exactly 5 numbers.',
			},
		},
	},
	{ timestamps: true, _id: false }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */
/* RatingAggregationSchema.pre('save', async function (next) {
	try {
	// hook here
		next();
	} catch (err) {
		next(err as Error);
	}
});
 */
/* --------------------- Methods ---------------------  */
RatingAggregationSchema.methods.toOptimizedObject = () => ({
	// methods here
});
/* --------------------- Exports ---------------------  */
export default RatingAggregationSchema;
