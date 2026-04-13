import { Schema, type Types } from 'mongoose';

import type {
	LinkInstanceMethods,
	LinkModel,
	LinkQueryHelpers,
	LinkSchemaOptions,
	LinkStaticMethods,
	LinkVirtual,
} from '!common/generated/schemas/link';

import { LinkEnums } from '@common/data/enums/generalEnums';

const required = true;

/* --------------------- Schema --------------------- */
const linkSchema = new Schema<
	LinkI<Types.ObjectId>,
	LinkModel,
	LinkInstanceMethods,
	LinkQueryHelpers,
	LinkVirtual,
	LinkStaticMethods,
	LinkSchemaOptions
>(
	{
		// schema here
		ref: {
			type: Schema.Types.ObjectId,
			refPath: 'refCollection',
			required,
		},
		refCollection: {
			type: String,
			required,
			enum: LinkEnums,
		},
	},
	{ timestamps: false, _id: false }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */
/* LinkSchema.pre('save', async function (next) {
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
export default linkSchema;
