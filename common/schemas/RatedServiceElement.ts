import { Schema } from 'mongoose';

import type {
	RatedServiceElementInstanceMethods,
	RatedServiceElementModel,
	RatedServiceElementQueryHelpers,
	RatedServiceElementSchemaOptions,
	RatedServiceElementStaticMethods,
	RatedServiceElementVirtual,
} from '!common/generated/schemas/RatedServiceElement';
import ImageSchema from './Image';
import LanguagesContentSchema from './LanguagesContent';

const required = true;

/* --------------------- Schema --------------------- */
const RatedServiceElementSchema = new Schema<
	RatedServiceElementI,
	RatedServiceElementModel,
	RatedServiceElementInstanceMethods,
	RatedServiceElementQueryHelpers,
	RatedServiceElementVirtual,
	RatedServiceElementStaticMethods,
	RatedServiceElementSchemaOptions
>(
	{
		// schema here
		title: { type: LanguagesContentSchema, required },
		description: { type: LanguagesContentSchema, required },
		image: { type: ImageSchema, required },
		rating: { type: Number, required },
	},
	{ timestamps: true }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */

/* --------------------- Methods ---------------------  */

export default RatedServiceElementSchema;
