import { Schema } from 'mongoose';

import type {
	ProductAdditionalInstanceMethods,
	ProductAdditionalModel,
	ProductAdditionalQueryHelpers,
	ProductAdditionalSchemaOptions,
	ProductAdditionalStaticMethods,
	ProductAdditionalVirtual,
} from '!common/generated/schemas/ProductAdditional';

import LanguagesContentSchema from '$common/LanguagesContent';
import {
	ProductAdditionalBooleanEnums,
	ProductAdditionalFilesEnums,
	ProductAdditionalNumberEnums,
	ProductAdditionalServiceEnums,
	ProductAdditionalStringEnums,
	ProductAdditionalVariantsEnums,
} from '@common/data/enums/ProductAdditionalEnums';

import ServiceElementSchema from './ServiceElement';
import UnitedValueSchema from './UnitedValue';
import VariantSchema from './Variant';

/* --------------------- Schema --------------------- */
const ProductAdditionalSchema = new Schema<
	ProductAdditionalI,
	ProductAdditionalModel,
	ProductAdditionalInstanceMethods,
	ProductAdditionalQueryHelpers,
	ProductAdditionalVirtual,
	ProductAdditionalStaticMethods,
	ProductAdditionalSchemaOptions
>(
	{
		// schema here
		...ProductAdditionalNumberEnums.reduce(
			(acc, key) => {
				acc[key] = { type: UnitedValueSchema };
				return acc;
			},
			{} as Record<ProductAdditionalNumberKeys, { type: typeof UnitedValueSchema }>
		),
		...ProductAdditionalStringEnums.reduce(
			(acc, key) => {
				acc[key] = { type: LanguagesContentSchema };
				return acc;
			},
			{} as Record<ProductAdditionalStringKeys, { type: typeof LanguagesContentSchema }>
		),
		...ProductAdditionalServiceEnums.reduce(
			(acc, key) => {
				acc[key] = { type: [ServiceElementSchema] };
				return acc;
			},
			{} as Record<ProductAdditionalServiceKeys, { type: (typeof ServiceElementSchema)[] }>
		),
		...ProductAdditionalBooleanEnums.reduce(
			(acc, key) => {
				acc[key] = { type: Boolean };
				return acc;
			},
			{} as Record<ProductAdditionalBooleanKeys, { type: typeof Boolean }>
		),
		...ProductAdditionalVariantsEnums.reduce(
			(acc, key) => {
				acc[key] = { type: [VariantSchema] };
				return acc;
			},
			{} as Record<ProductAdditionalVariantKeys, { type: (typeof VariantSchema)[] }>
		),
		...ProductAdditionalFilesEnums.reduce(
			(acc, key) => {
				acc[key] = { type: String };
				return acc;
			},
			{} as Record<ProductAdditionalFilesKeys, { type: typeof String }>
		),
	},
	{ timestamps: false, _id: false }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */
/* ProductAdditionalSchema.pre('save', async function (next) {
	try {
	// hook here
		next();
	} catch (err) {
		next(err as Error);
	}
});
 */
/* --------------------- Methods ---------------------  */
ProductAdditionalSchema.methods.toOptimizedObject = () => ({
	// methods here
});
/* --------------------- Exports ---------------------  */
export default ProductAdditionalSchema;
