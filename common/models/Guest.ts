import mongoose, { Schema, type Types } from 'mongoose';

import type {
	GuestInstanceMethods,
	GuestModel,
	GuestQueryHelpers,
	GuestSchemaOptions,
	GuestStaticMethods,
	GuestVirtual,
} from '!common/generated/models/Guest';
import baseCustomerModel from './BaseCustomer';

/* --------------------- Schema --------------------- */
const GuestSchema = new Schema<
	GuestI<Types.ObjectId>,
	GuestModel,
	GuestInstanceMethods,
	GuestQueryHelpers,
	GuestVirtual,
	GuestStaticMethods,
	GuestSchemaOptions
>({});
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */

/* --------------------- Methods ---------------------  */
GuestSchema.methods.toOptimizedObject = function () {
	return {
		_id: this._id.toString(),
		personalInformation: this.personalInformation,
		phone: this.phone,
		website: this.website.toString(),
		kind: this.kind,
	};
};
/* --------------------- Query Helpers --------------------- */

/* --------------------- static methods --------------------- */

/* --------------------- Generate Model --------------------- */
const guestModel =
	(mongoose.models.Guest as GuestModel) ||
	baseCustomerModel.discriminator<GuestI<Types.ObjectId>, GuestModel>('Guest', GuestSchema);
export default guestModel;
