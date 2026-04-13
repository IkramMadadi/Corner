import { Schema } from 'mongoose';

import type {
	ProductFlagsInstanceMethods,
	ProductFlagsModel,
	ProductFlagsQueryHelpers,
	ProductFlagsSchemaOptions,
	ProductFlagsStaticMethods,
	ProductFlagsVirtual,
} from '!common/generated/schemas/ProductFlags';

/* --------------------- Schema --------------------- */
const ProductFlagsSchema = new Schema<
	ProductFlagsI,
	ProductFlagsModel,
	ProductFlagsInstanceMethods,
	ProductFlagsQueryHelpers,
	ProductFlagsVirtual,
	ProductFlagsStaticMethods,
	ProductFlagsSchemaOptions
>(
	{
		// schema here
		comingSoon: { type: Boolean, default: false },
		preOrder: { type: Boolean, default: false },
	},
	{ timestamps: false, _id: false }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */
/* ProductFlagsSchema.pre('save', async function (next) {
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
export default ProductFlagsSchema;
