import { Schema, type Types } from 'mongoose';

import type {
	PageContentInstanceMethods,
	PageContentModel,
	PageContentQueryHelpers,
	PageContentSchemaOptions,
	PageContentStaticMethods,
	PageContentVirtual,
} from '!common/generated/schemas/PageContent';
import PublishablePageContentSchema from './PublishablePageContent';
const required = true;

/* --------------------- Schema --------------------- */
const PageContentSchema = new Schema<
	PageContentI<Types.ObjectId>,
	PageContentModel,
	PageContentInstanceMethods,
	PageContentQueryHelpers,
	PageContentVirtual,
	PageContentStaticMethods,
	PageContentSchemaOptions
>(
	{
		blogs: {
			type: PublishablePageContentSchema,
			required,
		},
		products: {
			type: PublishablePageContentSchema,
			required,
		},
	},
	{ timestamps: true, _id: true }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */

/* --------------------- Methods ---------------------  */

/* --------------------- Exports ---------------------  */
export default PageContentSchema;
