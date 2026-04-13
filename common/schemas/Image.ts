import { Schema } from 'mongoose';

import type {
	ImageInstanceMethods,
	ImageModel,
	ImageQueryHelpers,
	ImageSchemaOptions,
	ImageStaticMethods,
	ImageVirtual,
} from '!common/generated/schemas/Image';

/* --------------------- Schema --------------------- */
const ImageSchema = new Schema<
	CaptionedImageI,
	ImageModel,
	ImageInstanceMethods,
	ImageQueryHelpers,
	ImageVirtual,
	ImageStaticMethods,
	ImageSchemaOptions
>(
	{
		// schema here
		src: { type: String, default: '' },
		alt: { type: String, default: '' },
		width: { type: Number, default: 300 },
		height: { type: Number, default: 300 },
	},
	{ timestamps: false, _id: false }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */
/* ImageSchema.pre('save', async function (next) {
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
export default ImageSchema;
