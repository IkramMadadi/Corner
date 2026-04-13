import { Schema, type Types } from 'mongoose';

import type {
	SimpleProductInstanceMethods,
	SimpleProductModel,
	SimpleProductQueryHelpers,
	SimpleProductSchemaOptions,
	SimpleProductStaticMethods,
	SimpleProductVirtual,
} from '!common/generated/schemas/SimpleProduct';
import ImageSchema from './Image';
import LanguagesContentSchema from './LanguagesContent';

const required = true;
/* --------------------- Schema --------------------- */
const SimpleProductSchema = new Schema<
	SimpleProductI<Types.ObjectId>,
	SimpleProductModel,
	SimpleProductInstanceMethods,
	SimpleProductQueryHelpers,
	SimpleProductVirtual,
	SimpleProductStaticMethods,
	SimpleProductSchemaOptions
>(
	{
		// schema here
		name: { type: LanguagesContentSchema, required },
		price: {
			type: Number,
			required,
		},
		productId: {
			type: Schema.Types.ObjectId,
			required,
		},
		thumbnail: {
			type: ImageSchema,
			required,
		},
	},
	{ timestamps: false, _id: false }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */

/* --------------------- Methods ---------------------  */

/* --------------------- Exports ---------------------  */
export default SimpleProductSchema;
