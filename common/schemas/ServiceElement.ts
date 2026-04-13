import { Schema } from 'mongoose';

import type {
	ServiceElementInstanceMethods,
	ServiceElementModel,
	ServiceElementQueryHelpers,
	ServiceElementSchemaOptions,
	ServiceElementStaticMethods,
	ServiceElementVirtual,
} from '!common/generated/schemas/ServiceElement';
import ImageSchema from './Image';
import LanguagesContentSchema from './LanguagesContent';

const required = true;

/* --------------------- Schema --------------------- */
const ServiceElementSchema = new Schema<
	ServiceElementI,
	ServiceElementModel,
	ServiceElementInstanceMethods,
	ServiceElementQueryHelpers,
	ServiceElementVirtual,
	ServiceElementStaticMethods,
	ServiceElementSchemaOptions
>(
	{
		// schema here
		title: { type: LanguagesContentSchema, required },
		description: { type: LanguagesContentSchema, required },
		image: { type: ImageSchema, required },
	},
	{ timestamps: false, _id: false }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */

/* --------------------- Methods ---------------------  */

export default ServiceElementSchema;
