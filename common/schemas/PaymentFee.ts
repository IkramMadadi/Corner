import { Schema } from 'mongoose';

import type {
	PaymentFeeInstanceMethods,
	PaymentFeeModel,
	PaymentFeeQueryHelpers,
	PaymentFeeSchemaOptions,
	PaymentFeeStaticMethods,
	PaymentFeeVirtual,
} from '!common/generated/schemas/PaymentFee';

const required = true;

/* --------------------- Schema --------------------- */
const PaymentFeeSchema = new Schema<
	PaymentFeeI,
	PaymentFeeModel,
	PaymentFeeInstanceMethods,
	PaymentFeeQueryHelpers,
	PaymentFeeVirtual,
	PaymentFeeStaticMethods,
	PaymentFeeSchemaOptions
>(
	{
		// schema here
		desk: {
			type: Number,
			required,
		},
		door: {
			type: Number,
			required,
		},
	},
	{ timestamps: false, _id: false }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */

/* --------------------- Methods ---------------------  */

/* --------------------- Exports ---------------------  */
export default PaymentFeeSchema;
