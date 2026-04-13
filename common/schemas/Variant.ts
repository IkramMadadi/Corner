import { Schema } from 'mongoose';

import type {
	VariantInstanceMethods,
	VariantModel,
	VariantQueryHelpers,
	VariantSchemaOptions,
	VariantStaticMethods,
	VariantVirtual,
} from '!common/generated/schemas/Variant';
import LanguagesContentSchema from './LanguagesContent';
import PricingSchema from './Pricing';

const required = true;

/* --------------------- Schema --------------------- */
const VariantSchema = new Schema<
	VariantI,
	VariantModel,
	VariantInstanceMethods,
	VariantQueryHelpers,
	VariantVirtual,
	VariantStaticMethods,
	VariantSchemaOptions
>(
	{
		// schema here
		label: { type: LanguagesContentSchema, required },
		price: { type: PricingSchema },
		available: { type: Boolean, default: true },
		value: {
			type: Schema.Types.Mixed, // Allows any type
			validate: {
				validator: v => typeof v === 'number' || typeof v === 'string',
				message: props => `${props.value} is not a number or string!`,
			},
			required,
		},
		imagesIndex: {
			type: [{ type: Number }],
			default: [],
		},
	},
	{ timestamps: true, _id: true }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */

/* --------------------- Methods ---------------------  */

/* --------------------- Exports ---------------------  */
export default VariantSchema;
