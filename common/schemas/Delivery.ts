import { Schema } from 'mongoose';

import type {
	DeliveryInstanceMethods,
	DeliveryModel,
	DeliveryQueryHelpers,
	DeliverySchemaOptions,
	DeliveryStaticMethods,
	DeliveryVirtual,
} from '!common/generated/schemas/Delivery';
import { addressSchema } from '$common/address';

import { DeliveryChoiceEnums } from '@common/data/enums/generalEnums';

const required = true;

/* --------------------- Schema --------------------- */
const DeliverySchema = new Schema<
	DeliveryI,
	DeliveryModel,
	DeliveryInstanceMethods,
	DeliveryQueryHelpers,
	DeliveryVirtual,
	DeliveryStaticMethods,
	DeliverySchemaOptions
>(
	{
		// schema here
		cost: {
			type: Number,
			required,
		},
		address: {
			type: addressSchema,
			required,
		},
		deliveryChoice: {
			type: String,
			required,
			enum: DeliveryChoiceEnums,
		},
	},
	{ timestamps: true, _id: false }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */
/* DeliverySchema.pre('save', async function (next) {
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
export default DeliverySchema;
