import mongoose, { model, Schema, type Types } from 'mongoose';

import type {
	SupportRequestInstanceMethods,
	SupportRequestModel,
	SupportRequestQueryHelpers,
	SupportRequestSchemaOptions,
	SupportRequestStaticMethods,
	SupportRequestVirtual,
} from '!common/generated/models/SupportRequest';

const required = true;

/* --------------------- Schema --------------------- */
const SupportRequestSchema = new Schema<
	SupportRequestI<Types.ObjectId>,
	SupportRequestModel,
	SupportRequestInstanceMethods,
	SupportRequestQueryHelpers,
	SupportRequestVirtual,
	SupportRequestStaticMethods,
	SupportRequestSchemaOptions
>(
	{
		// schema here
		website: { type: Schema.Types.ObjectId, ref: 'Website', required },
		customerName: { type: String, required },
		email: { type: String, required },
		subject: { type: String, required },
		report: { type: String, required },
	},
	{ timestamps: true }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */
/* SupportRequestSchema.pre('save', async function (next) {
	try {
	// hook here
		next();
	} catch (err) {
		next(err as Error);
	}
});
 */
/* --------------------- Methods ---------------------  */
SupportRequestSchema.methods.toOptimizedObject = function () {
	const { _id, createdAt, updatedAt, website, ...rest } = this.toObject();
	return {
		...rest,
		_id: _id.toString(),
		createdAt: createdAt.toString(),
		updatedAt: updatedAt.toString(),
		website: website.toString(),
	};
}; /* --------------------- Query Helpers --------------------- */

/* --------------------- static methods --------------------- */

/* --------------------- Generate Model --------------------- */
const supportRequestModel =
	(mongoose.models.SupportRequest as SupportRequestModel) ||
	model<SupportRequestI<Types.ObjectId>, SupportRequestModel, SupportRequestQueryHelpers>(
		'SupportRequest',
		SupportRequestSchema
	);
export default supportRequestModel;
