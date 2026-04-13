import { Schema } from 'mongoose';

import type {
	AlertElementInstanceMethods,
	AlertElementModel,
	AlertElementQueryHelpers,
	AlertElementSchemaOptions,
	AlertElementStaticMethods,
	AlertElementVirtual,
} from '!common/generated/schemas/alertElement';
import ButtonSchema from '$common/Button';
import LanguagesContentSchema from './LanguagesContent';

const required = true;

/* --------------------- Schema --------------------- */
const AlertElementSchema = new Schema<
	AlertElementI,
	AlertElementModel,
	AlertElementInstanceMethods,
	AlertElementQueryHelpers,
	AlertElementVirtual,
	AlertElementStaticMethods,
	AlertElementSchemaOptions
>(
	{
		// schema here
		content: { type: LanguagesContentSchema, required },
		//content: { type: LanguagesContentSchema, required },
		buttons: { type: [ButtonSchema], default: [] }, // Array of ButtonSchema
	},
	{ timestamps: true }
);
export default AlertElementSchema;
