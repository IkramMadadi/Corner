import mongoose, { model, Schema, type Types } from 'mongoose';

import type {
	ReviewInstanceMethods,
	ReviewModel,
	ReviewQueryHelpers,
	ReviewSchemaOptions,
	ReviewStaticMethods,
	ReviewVirtual,
} from '!common/generated/models/Review';
import linkSchema from '$common/link';

const required = true;

/* --------------------- Schema --------------------- */
const ReviewSchema = new Schema<
	ReviewI<Types.ObjectId>,
	ReviewModel,
	ReviewInstanceMethods,
	ReviewQueryHelpers,
	ReviewVirtual,
	ReviewStaticMethods,
	ReviewSchemaOptions
>(
	{
		// schema here
		content: { type: String, required },
		createdBy: { type: Schema.Types.ObjectId, ref: 'Customer', required },
		link: { type: linkSchema, required },
		enabled: { type: Boolean, default: true },
		rating: { type: Number, required },
		website: { type: Schema.Types.ObjectId, ref: 'Website', required },
	},
	{ timestamps: true }
);
ReviewSchema.index({ createdBy: 1, 'link.ref': 1, website: 1 }, { unique: true });
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */
/* ReviewSchema.pre('save', async function (next) {
	try {
	// hook here
		next();
	} catch (err) {
		next(err as Error);
	}
});
 */
/* --------------------- Methods ---------------------  */
ReviewSchema.methods.toOptimizedObject = function () {
	return {
		_id: this._id.toString(),
		createdBy: this.createdBy.toString(),
		link: {
			ref: this.link.ref.toString(),
			refCollection: this.link.refCollection,
		},
		enabled: this.enabled,
		rating: this.rating,
		website: this.website.toString(),
		content: this.content,
		createdAt: this.createdAt.toString(),
		updatedAt: this.updatedAt.toString(),
	};
}; /* --------------------- Query Helpers --------------------- */

/* --------------------- static methods --------------------- */

/* --------------------- Generate Model --------------------- */
const reviewModel =
	(mongoose.models.Review as ReviewModel) ||
	model<ReviewI<Types.ObjectId>, ReviewModel, ReviewQueryHelpers>('Review', ReviewSchema);
export default reviewModel;
