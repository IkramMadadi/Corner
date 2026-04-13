import { Schema, type Types } from 'mongoose';

import type {
	CartVariantInstanceMethods,
	CartVariantModel,
	CartVariantQueryHelpers,
	CartVariantSchemaOptions,
	CartVariantStaticMethods,
	CartVariantVirtual,
} from '!common/generated/schemas/CartVariant';
import { ProductAdditionalVariantsEnums } from '@common/data/enums/ProductAdditionalEnums';
import LanguagesContentSchema from './LanguagesContent';

const required = true;

/* --------------------- Schema --------------------- */
const CartVariantSchema = new Schema<
	CartVariantI<Types.ObjectId>,
	CartVariantModel,
	CartVariantInstanceMethods,
	CartVariantQueryHelpers,
	CartVariantVirtual,
	CartVariantStaticMethods,
	CartVariantSchemaOptions
>(
	{
		// schema here
		id: { type: Schema.Types.ObjectId, required },
		label: { type: LanguagesContentSchema, required },
		type: { type: String, enum: ProductAdditionalVariantsEnums },
	},
	{ timestamps: false, _id: false }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */

/* --------------------- Methods ---------------------  */

/* --------------------- Exports ---------------------  */
export default CartVariantSchema;
