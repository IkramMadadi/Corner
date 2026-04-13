import { Schema, type Types } from 'mongoose';

import type {
	ProductsCartInstanceMethods,
	ProductsCartModel,
	ProductsCartQueryHelpers,
	ProductsCartSchemaOptions,
	ProductsCartStaticMethods,
	ProductsCartVirtual,
} from '!common/generated/schemas/ProductsCart';
import CartVariantSchema from './CartVariant';
import SimpleProductSchema from './SimpleProduct';

const required = true;
/* --------------------- Schema --------------------- */
const ProductsCartSchema = new Schema<
	ProductsCartI<SimpleProductI<Types.ObjectId>>,
	ProductsCartModel,
	ProductsCartInstanceMethods,
	ProductsCartQueryHelpers,
	ProductsCartVirtual,
	ProductsCartStaticMethods,
	ProductsCartSchemaOptions
>(
	{
		// schema here
		product: { type: SimpleProductSchema, required, ref: 'Product' },
		variants: { type: [CartVariantSchema] },
		count: { type: Number, required },
	},
	{ timestamps: false, _id: false }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */

/* --------------------- Methods ---------------------  */

/* --------------------- Exports ---------------------  */
export default ProductsCartSchema;
