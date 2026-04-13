import { Schema } from 'mongoose';

import type {
	IntegrationInstanceMethods,
	IntegrationModel,
	IntegrationQueryHelpers,
	IntegrationSchemaOptions,
	IntegrationStaticMethods,
	IntegrationVirtual,
} from '!common/generated/schemas/Integration';

/* --------------------- Schema --------------------- */
const IntegrationSchema = new Schema<
	IntegrationI,
	IntegrationModel,
	IntegrationInstanceMethods,
	IntegrationQueryHelpers,
	IntegrationVirtual,
	IntegrationStaticMethods,
	IntegrationSchemaOptions
>(
	{
		// schema here
		id: { type: String },
		access_token: { type: String },
		flags: {
			order: { type: Schema.Types.Boolean, default: true },
			'add-product': { type: Schema.Types.Boolean, default: true },
			'remove-product': { type: Schema.Types.Boolean, default: true },
			'increment-product': { type: Schema.Types.Boolean, default: true },
			'decrement-product': { type: Schema.Types.Boolean, default: true },
		},
	},
	{ timestamps: true }
);
/* --------------------- Virtual ---------------------  */
/* --------------------- Hooks ---------------------  */
/* --------------------- Methods ---------------------  */
/* --------------------- Exports ---------------------  */
export default IntegrationSchema;
