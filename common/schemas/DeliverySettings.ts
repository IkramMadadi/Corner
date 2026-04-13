import { Schema } from 'mongoose';

import type {
	DeliverySettingsInstanceMethods,
	DeliverySettingsModel,
	DeliverySettingsQueryHelpers,
	DeliverySettingsSchemaOptions,
	DeliverySettingsStaticMethods,
	DeliverySettingsVirtual,
} from '!common/generated/models/DeliverySettings';
import PaymentFeeSchema from '$common/PaymentFee';

const required = true;

/* --------------------- Schema --------------------- */
const DeliverySettingsSchema = new Schema<
	DeliverySettingsI,
	DeliverySettingsModel,
	DeliverySettingsInstanceMethods,
	DeliverySettingsQueryHelpers,
	DeliverySettingsVirtual,
	DeliverySettingsStaticMethods,
	DeliverySettingsSchemaOptions
>(
	{
		// schema here
		defaultFee: { type: PaymentFeeSchema, required },
		fees: {
			type: [PaymentFeeSchema],
			required,
		},
		zones: { type: [Number], required },
		daysToDeliver: { type: Number, required },
		freeOnOver: { type: Number },
	},
	{ timestamps: true }
);
export default DeliverySettingsSchema;
export function DeliverySettingsToFees(deliverySettings: DeliverySettingsI): PaymentFeeI[] {
	return deliverySettings.zones.map(zone => {
		if (zone >= 1) {
			const zoneFee = deliverySettings.fees[zone - 1];
			if (zoneFee)
				return {
					desk: zoneFee.desk || deliverySettings.defaultFee.desk,
					door: zoneFee.door || deliverySettings.defaultFee.door,
				};
		}
		return deliverySettings.defaultFee;
	});
}
