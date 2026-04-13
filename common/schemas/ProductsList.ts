import { Schema, type Types } from 'mongoose';

import type {
	ProductsListInstanceMethods,
	ProductsListModel,
	ProductsListQueryHelpers,
	ProductsListSchemaOptions,
	ProductsListStaticMethods,
	ProductsListVirtual,
} from '!common/generated/schemas/ProductsList';
import LanguagesContentSchema from './LanguagesContent';

const required = true;

/* --------------------- Schema --------------------- */
const ProductsListSchema = new Schema<
	ProductsListI<Types.ObjectId>,
	ProductsListModel,
	ProductsListInstanceMethods,
	ProductsListQueryHelpers,
	ProductsListVirtual,
	ProductsListStaticMethods,
	ProductsListSchemaOptions
>(
	{
		listId: { type: String, required },
		products: { type: [Schema.Types.ObjectId], default: [] },
		title: { type: LanguagesContentSchema, required },
	},
	{ timestamps: false, _id: false }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */

/* --------------------- Methods ---------------------  */

/* --------------------- Exports ---------------------  */
export default ProductsListSchema;
