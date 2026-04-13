import mongoose, { model, Schema, type Types } from 'mongoose';

import type {
	NewsLetterInstanceMethods,
	NewsLetterModel,
	NewsLetterQueryHelpers,
	NewsLetterSchemaOptions,
	NewsLetterStaticMethods,
	NewsLetterVirtual,
} from '!common/generated/models/NewsLetter';

const required = true;
const unique = true;
/* --------------------- Schema --------------------- */
const NewsLetterSchema = new Schema<
	NewsLetterI<Types.ObjectId>,
	NewsLetterModel,
	NewsLetterInstanceMethods,
	NewsLetterQueryHelpers,
	NewsLetterVirtual,
	NewsLetterStaticMethods,
	NewsLetterSchemaOptions
>(
	{
		// schema here
		website: {
			type: Schema.Types.ObjectId,
			ref: 'Website',
			required,
		},
		email: {
			type: String,
			required,
			unique,
		},
		subscribed: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */
/* NewsLetterSchema.pre('save', async function (next) {
	try {
	// hook here
		next();
	} catch (err) {
		next(err as Error);
	}
});
 */
/* --------------------- Methods ---------------------  */
NewsLetterSchema.methods.toOptimizedObject = function () {
	const { _id, createdAt, updatedAt, website, ...rest } = this.toObject();
	return {
		...rest,
		_id: _id.toString(),
		createdAt: createdAt.toString(),
		updatedAt: updatedAt.toString(),
		website: website.toString(),
	};
};
/* --------------------- Query Helpers --------------------- */

/* --------------------- static methods --------------------- */

/* --------------------- Generate Model --------------------- */
const newsLetterModel =
	(mongoose.models.NewsLetter as NewsLetterModel) ||
	model<NewsLetterI<Types.ObjectId>, NewsLetterModel, NewsLetterQueryHelpers>('NewsLetter', NewsLetterSchema);
export default newsLetterModel;
