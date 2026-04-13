import { Schema } from 'mongoose';

import type {
	AddressInstanceMethods,
	AddressModel,
	AddressQueryHelpers,
	AddressSchemaOptions,
	AddressStaticMethods,
	AddressVirtual,
} from '!common/generated/schemas/Address';

const required = true;
/* --------------------- Schema --------------------- */
const addressSchema = new Schema<
	AddressI,
	AddressModel,
	AddressInstanceMethods,
	AddressQueryHelpers,
	AddressVirtual,
	AddressStaticMethods,
	AddressSchemaOptions
>(
	{
		province: {
			type: Number,
			required,
			min: 1,
			max: 58,
		},
		city: {
			type: Number,
			min: 0,
			max: 100000,
		},
		address: {
			type: String,
		},
	},
	{ timestamps: false }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */

/* --------------------- Methods ---------------------  */
addressSchema.methods.toOptimizedObject = function () {
	return this.toObject();
};

export { addressSchema };
