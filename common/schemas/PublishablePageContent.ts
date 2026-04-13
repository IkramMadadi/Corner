import { Schema, type Types } from 'mongoose';

import type {
	PublishablePageContentInstanceMethods,
	PublishablePageContentModel,
	PublishablePageContentQueryHelpers,
	PublishablePageContentSchemaOptions,
	PublishablePageContentStaticMethods,
	PublishablePageContentVirtual,
} from '!common/generated/schemas/PublishablePageContent';

/* --------------------- Schema --------------------- */
const PublishablePageContentSchema = new Schema<
	PublishablePageContentI<Types.ObjectId>,
	PublishablePageContentModel,
	PublishablePageContentInstanceMethods,
	PublishablePageContentQueryHelpers,
	PublishablePageContentVirtual,
	PublishablePageContentStaticMethods,
	PublishablePageContentSchemaOptions
>(
	{
		categories: {
			type: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
			default: [],
		},
		collections: {
			type: [{ type: Schema.Types.ObjectId, ref: 'Collection' }],
			default: [],
		},
	},
	{ timestamps: true, _id: true }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */

/* --------------------- Methods ---------------------  */

/* --------------------- Exports ---------------------  */
export default PublishablePageContentSchema;
