import mongoose, { model, Schema, type Types } from 'mongoose';

import type {
	DiscountInstanceMethods,
	DiscountModel,
	DiscountQueryHelpers,
	DiscountSchemaOptions,
	DiscountStaticMethods,
	DiscountVirtual,
} from '!common/generated/models/Discount';
import DiscountValueSchema from '$common/DiscountValue';

const required = true;

/* --------------------- Schema --------------------- */
const DiscountSchema = new Schema<
	DiscountI<Types.ObjectId>,
	DiscountModel,
	DiscountInstanceMethods,
	DiscountQueryHelpers,
	DiscountVirtual,
	DiscountStaticMethods,
	DiscountSchemaOptions
>(
	{
		// schema here
		website: {
			type: Schema.Types.ObjectId,
			ref: 'Website',
			required,
		},
		enabled: {
			type: Boolean,
			default: true,
		},
		code: {
			type: String,
			required,
			trim: true,
		},
		expiringDate: {
			type: Date,
			required,
		},
		value: {
			type: DiscountValueSchema,
			required,
		},
		maxValue: {
			type: DiscountValueSchema,
		},
	},
	{ timestamps: true }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */

/* --------------------- Methods ---------------------  */

/* --------------------- Query Helpers --------------------- */

/* --------------------- static methods --------------------- */

/* --------------------- Generate Model --------------------- */
const discountModel =
	(mongoose.models.Discount as DiscountModel) ||
	model<DiscountI<Types.ObjectId>, DiscountModel, DiscountQueryHelpers>('Discount', DiscountSchema);
export default discountModel;
