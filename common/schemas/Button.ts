import { Schema } from 'mongoose';

import type {
	ButtonInstanceMethods,
	ButtonModel,
	ButtonQueryHelpers,
	ButtonSchemaOptions,
	ButtonStaticMethods,
	ButtonVirtual,
} from '!common/generated/schemas/Button';

import { buttonIconTypesEnum, buttonTypesEnum } from '@common/data/enums/buttonTypesEnum';
import LanguagesContentSchema from './LanguagesContent';

const required = true;

/* --------------------- Schema --------------------- */
const ButtonSchema = new Schema<
	ButtonI,
	ButtonModel,
	ButtonInstanceMethods,
	ButtonQueryHelpers,
	ButtonVirtual,
	ButtonStaticMethods,
	ButtonSchemaOptions
>(
	{
		// schema here
		link: {
			type: String,
			required,
		},
		type: {
			type: String,
			required,
			enum: buttonTypesEnum,
		},
		icon: {
			left: {
				type: String,
				enum: buttonIconTypesEnum,
			},
			right: {
				type: String,
				enum: buttonIconTypesEnum,
			},
		},

		text: {
			type: LanguagesContentSchema,
			required,
		},
	},
	{ timestamps: true, _id: false }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */
/* ButtonSchema.pre('save', async function (next) {
	try {
	// hook here
		next();
	} catch (err) {
		next(err as Error);
	}
});
 */
/* --------------------- Methods ---------------------  */

/* --------------------- Exports ---------------------  */
export default ButtonSchema;
