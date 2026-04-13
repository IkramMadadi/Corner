import bcrypt from 'bcrypt';
import mongoose, { Schema, type Types } from 'mongoose';

import type {
	CustomerInstanceMethods,
	CustomerModel,
	CustomerQueryHelpers,
	CustomerSchemaOptions,
	CustomerStaticMethods,
	CustomerVirtual,
} from '!common/generated/models/Customer';
// import { passwordSchema } from '^common/elements';

import { addressSchema } from '../schemas/address';
import baseCustomerModel from './BaseCustomer';
const required = true;
/* --------------------- Schema --------------------- */
const CustomerSchema = new Schema<
	CustomerI<Types.ObjectId>,
	CustomerModel,
	CustomerInstanceMethods,
	CustomerQueryHelpers,
	CustomerVirtual,
	CustomerStaticMethods,
	CustomerSchemaOptions
>(
	{
		email: {
			type: String,
			required,
			match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email is invalid'],
		},
		password: {
			type: String,
			required,
		},
		wishlist: {
			type: [Schema.Types.ObjectId],
			ref: 'Product',
			default: [],
		},
		enabled: {
			type: Boolean,
			default: true,
		},
		addresses: { type: [addressSchema], default: [] },
		earnedPoints: {
			type: [
				{
					amount: { type: Number, required },
					redeemed: { type: Number, default: 0 },
					date: { type: Date, default: Date.now },
					expirationDate: { type: Date, required },
				},
			],
			default: [],
		},
		redeemedPoints: {
			type: [
				{
					amount: { type: Number, required },
					date: { type: Date, default: Date.now },
				},
			],
			default: [],
		},
		conversionRate: { type: Number },
		recovery: {
			id: { type: String },
			otp: { type: String },
			expiresAt: { type: Date },
		},
	},
	{ timestamps: true }
);
/* --------------------- Virtual ---------------------  */
/* --------------------- Hooks ---------------------  */
CustomerSchema.pre('save', async function (next) {
	try {
		// hook here
		if (this.isNew || this.isModified('password')) {
			//passwordSchema(this.||'en').parse(this.password);
			this.password = await bcrypt.hash(this.password, 10);
		}
		next();
	} catch (err) {
		next(err as Error);
	}
});

/* --------------------- Methods ---------------------  */
CustomerSchema.methods.toOptimizedObject = function () {
	return {
		_id: this._id.toString(),
		personalInformation: {
			firstName: this.personalInformation.firstName,
			lastName: this.personalInformation.lastName,
		},
		email: this.email,
		phone: this.phone,
		enabled: this.enabled,
		kind: this.kind,
		conversionRate: this.conversionRate,
	};
};
CustomerSchema.methods.comparePassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};
/* --------------------- Query Helpers --------------------- */

/* --------------------- static methods --------------------- */

/* --------------------- Generate Model --------------------- */
const customerModel =
	(mongoose.models.Customer as CustomerModel) ||
	baseCustomerModel.discriminator<CustomerI<Types.ObjectId>, CustomerModel>('Customer', CustomerSchema);
export default customerModel;
