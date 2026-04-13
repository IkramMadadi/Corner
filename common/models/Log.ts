import mongoose, { model, Schema, type Types } from 'mongoose';

import type {
	LogInstanceMethods,
	LogModel,
	LogQueryHelpers,
	LogSchemaOptions,
	LogStaticMethods,
	LogVirtual,
} from '!common/generated/models/Log';

const required = true;

/* --------------------- Schema --------------------- */
const LogSchema = new Schema<
	LogI<Types.ObjectId>,
	LogModel,
	LogInstanceMethods,
	LogQueryHelpers,
	LogVirtual,
	LogStaticMethods,
	LogSchemaOptions
>(
	{
		// schema here
		website: {
			type: Schema.Types.ObjectId,
			ref: 'Website',
			required,
		},
		action: {
			type: String,
			required,
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required,
		},
	},
	{ timestamps: true }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */
/* LogSchema.pre('save', async function (next) {
	try {
	// hook here
		next();
	} catch (err) {
		next(err as Error);
	}
});
 */
/* --------------------- Methods ---------------------  */

/* --------------------- Query Helpers --------------------- */

/* --------------------- static methods --------------------- */

/* --------------------- Generate Model --------------------- */
const logModel =
	(mongoose.models.Log as LogModel) || model<LogI<Types.ObjectId>, LogModel, LogQueryHelpers>('Log', LogSchema);
export default logModel;
