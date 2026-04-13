import { websitesEmitter } from '@common/events/websites';
import mongoose, { model, Schema, type Types } from 'mongoose';

import type {
	WebSettingsInstanceMethods,
	WebSettingsModel,
	WebSettingsQueryHelpers,
	WebSettingsSchemaOptions,
	WebSettingsStaticMethods,
	WebSettingsVirtual,
} from '!common/generated/models/WebSite';
import { FAQSchema } from '$common/FAQ';
import NumbersRangeSchema from '$common/NumbersRange';
import RatedServiceElementSchema from '$common/RatedServiceElement';
import ServiceElementSchema from '$common/ServiceElement';
import BannerElementSchema from '$common/bannerElement';
import websiteInformationSchema from '$common/websiteInformation';

import AnalyticsIntegrationSchema from '$common/AnalyticsIntegration';
import DeliverySettingsSchema, { DeliverySettingsToFees } from '$common/DeliverySettings';
import ImageSchema from '$common/Image';
import LoyaltyProgramSchema from '$common/LoyaltyProgram';
import { NavigationLinkSchema } from '$common/NavigationLink';
import PageContentSchema from '$common/PageContent';
//import ProductsListSchema from '$common/ProductsList';
import { QuickLinkSchema } from '$common/QuickLink';
import WebsitePoliciesSchema from '$common/WebsitePolicies';
import { ProductAdditionalEnums, ProductAdditionalVariantsEnums } from '@common/data/enums/ProductAdditionalEnums';
import { WebsiteFeaturesFlagsEnums } from '@common/data/enums/WebsiteFeaturesFlagsEnums';

const required = true;
const unique = true;
/* --------------------- Schema --------------------- */
const WebSiteSchema = new Schema<
	WebSiteI<Types.ObjectId>,
	WebSettingsModel,
	WebSettingsInstanceMethods,
	WebSettingsQueryHelpers,
	WebSettingsVirtual,
	WebSettingsStaticMethods,
	WebSettingsSchemaOptions
>(
	{
		// schema here
		FY_ID: {
			type: String,
			required,
			unique,
		},
		enabled: { type: Boolean, default: true },
		banners: { type: [BannerElementSchema], default: [] },
		faqs: { type: [FAQSchema], default: [] },
		flags: {
			type: [{ type: String, required, enum: WebsiteFeaturesFlagsEnums }],
			required,
		},
		productsAttributes: {
			type: [{ type: String, required, enum: ProductAdditionalEnums }],
			default: ['benefits', 'usage', 'ingredients', 'size', 'storageInstructions'] as ProductAdditionalKeys[],
		},
		pricePriority: { type: [{ type: String, enum: ProductAdditionalVariantsEnums }], default: [] },
		services: { type: [ServiceElementSchema], default: [] },
		websiteInformation: { type: websiteInformationSchema, required },
		policies: { type: WebsitePoliciesSchema, required },
		priceRange: { type: NumbersRangeSchema, required },
		deliverySettings: { type: DeliverySettingsSchema, required },
		testimonials: { type: [RatedServiceElementSchema], default: [] },
		pagesContent: {
			home: {
				type: PageContentSchema,
				required: true,
			},
			auth: {
				cover: {
					type: ImageSchema,
				},
			},
			products: {
				cover: {
					type: ImageSchema,
				},
			},
		},
		// mainCategories: { type: [Schema.Types.ObjectId], default: [] },
		// productsLists: { type: [ProductsListSchema], default: [] },
		links: { type: [QuickLinkSchema], default: [] },
		navigations: {
			footer: { type: [NavigationLinkSchema], default: [] },
			navbar: {
				left: { type: [NavigationLinkSchema], default: [] },
				right: { type: [NavigationLinkSchema], default: [] },
			},
		},
		integrations: {
			type: AnalyticsIntegrationSchema,
			required,
		},
		loyaltyProgram: LoyaltyProgramSchema,
	},
	{ timestamps: true }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */

WebSiteSchema.post('save', function (doc) {
	// Emit the role creation event
	if (this.isNew) websitesEmitter.emit('websiteCreated', doc);
	else websitesEmitter.emit('websiteUpdated', doc);
});

WebSiteSchema.post('deleteOne', { document: true, query: false }, doc => {
	// Emit an event after deleting a document
	websitesEmitter.emit('websiteDeleted', doc._id.toString());
});
/* --------------------- Methods ---------------------  */
WebSiteSchema.methods.toOptimizedObject = function () {
	const { createdAt, updatedAt, ...rest } = this.toObject();

	return {
		...JSON.parse(
			JSON.stringify({
				...rest,
				/* mainCategories: rest.mainCategories /* ?.map(cat => cat.toString()) * / || [],
		productsLists:
			rest.productsLists /* ?.map(({ products, ...pl }) => ({ ...pl, products: products.map(p => p.toString()) })) * / ||
			[], */
				PaymentFees: DeliverySettingsToFees(rest.deliverySettings),

				createdAt: createdAt.toISOString(),
				updatedAt: updatedAt.toISOString(),
			})
		),
		_id: this._id,
	};
};
/* WebSiteSchema.methods.toPublicObject = function () {
	const optimized = this.toOptimizedObject();

	return {
		...optimized,
		mainCategories: optimized.mainCategories?.map(cat => cat.toString()) || [],
		productsLists:
			optimized.productsLists?.map(({ products, ...pl }) => ({
				...pl,
				products: products.map(p => p.toString()),
			})) || [],
		PaymentFees: DeliverySettingsToFees(optimized.deliverySettings),
	};
}; */

/* --------------------- Query Helpers --------------------- */

/* --------------------- static methods --------------------- */

/* --------------------- Generate Model --------------------- */
const webSiteModel =
	(mongoose.models.Website as WebSettingsModel) ||
	model<WebSiteI<Types.ObjectId>, WebSettingsModel, WebSettingsQueryHelpers>('Website', WebSiteSchema);
export default webSiteModel;
