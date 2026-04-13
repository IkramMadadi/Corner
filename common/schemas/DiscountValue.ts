import { Schema } from 'mongoose';

import type {
	DiscountValueInstanceMethods,
	DiscountValueModel,
	DiscountValueQueryHelpers,
	DiscountValueSchemaOptions,
	DiscountValueStaticMethods,
	DiscountValueVirtual,
} from '!common/generated/schemas/DiscountValue';

import { DiscountValueEnums } from '@common/data/enums/generalEnums';

const required = true;

/* --------------------- Schema --------------------- */
const DiscountValueSchema = new Schema<
	DiscountValueI,
	DiscountValueModel,
	DiscountValueInstanceMethods,
	DiscountValueQueryHelpers,
	DiscountValueVirtual,
	DiscountValueStaticMethods,
	DiscountValueSchemaOptions
>(
	{
		// schema here
		type: {
			type: String,
			required,
			enum: DiscountValueEnums,
		},
		value: {
			type: Number,
			required,
		},
	},
	{ timestamps: true, _id: false }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */
/* DiscountValueSchema.pre('save', async function (next) {
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
export default DiscountValueSchema;
