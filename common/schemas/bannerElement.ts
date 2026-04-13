import { Schema } from 'mongoose';

import type {
	BannerElementInstanceMethods,
	BannerElementModel,
	BannerElementQueryHelpers,
	BannerElementSchemaOptions,
	BannerElementStaticMethods,
	BannerElementVirtual,
} from '!common/generated/schemas/bannerElement';
import ButtonSchema from '$common/Button';
import LanguagesContentSchema from './LanguagesContent';
import AlertElementSchema from './alertElement';

const required = true;

/* --------------------- Schema --------------------- */
const BannerElementSchema = new Schema<
	BannerElementI,
	BannerElementModel,
	BannerElementInstanceMethods,
	BannerElementQueryHelpers,
	BannerElementVirtual,
	BannerElementStaticMethods,
	BannerElementSchemaOptions
>(
	{
		// schema here
		title: { type: LanguagesContentSchema, required },
		//content: { type: LanguagesContentSchema, required },
		color: {
			type: String,
			enum: ['light', 'dark'],
		},
		buttons: { type: [ButtonSchema], default: [] }, // Array of ButtonSchema
		alert: { type: AlertElementSchema, default: null },
		image: { type: String, default: '' }, // URL to the image
		overlay: { type: Number, default: 0.3 },
	},
	{ timestamps: true }
);
export default BannerElementSchema;
