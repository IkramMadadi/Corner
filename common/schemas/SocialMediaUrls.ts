import { Schema } from 'mongoose';

import type {
	SocialMediaUrlsInstanceMethods,
	SocialMediaUrlsModel,
	SocialMediaUrlsQueryHelpers,
	SocialMediaUrlsSchemaOptions,
	SocialMediaUrlsStaticMethods,
	SocialMediaUrlsVirtual,
} from '!common/generated/schemas/SocialMediaUrls';

/* --------------------- Schema --------------------- */
const socialMediaUrlsSchema = new Schema<
	SocialMediaUrlsI,
	SocialMediaUrlsModel,
	SocialMediaUrlsInstanceMethods,
	SocialMediaUrlsQueryHelpers,
	SocialMediaUrlsVirtual,
	SocialMediaUrlsStaticMethods,
	SocialMediaUrlsSchemaOptions
>(
	{
		facebook: { type: String },
		x: { type: String },
		youtube: { type: String },
		instagram: { type: String },
		linkedin: { type: String },
		tiktok: { type: String },
	},
	{ timestamps: false, _id: false }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */

/* --------------------- Methods ---------------------  */
socialMediaUrlsSchema.methods.toOptimizedObject = function () {
	return this.toObject();
};

export { socialMediaUrlsSchema };
