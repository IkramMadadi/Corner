declare interface WebSitePermissionsI<WebsiteI = string> {
	website?: WebsiteI;
	permissions: PermissionsIdsI[];
}

declare type MainPagesTypes = 'home';
declare type SecondaryPagesTypes = 'auth' | 'products';
declare type PagesContentI<CATEGORY = string, COLLECTION = CATEGORY> = Partial<
	Record<MainPagesTypes, PageContentI<CATEGORY, COLLECTION>>
> &
	Partial<
		Record<
			SecondaryPagesTypes,
			{
				cover: CaptionedImageI;
			}
		>
	>;
declare interface WebSiteI<CATEGORY = string, COLLECTION = CATEGORY> {
	FY_ID: string;
	enabled: boolean; // for maintenance
	banners: BannerElementI[];
	services: ServiceElementI[];
	testimonials: RatedServiceElementI[];
	policies: WebsitePoliciesI;
	faqs: FAQI[];
	websiteInformation: WebsiteInformationI;
	flags: WebsiteFeaturesFlagsKeys[];
	productsAttributes: ProductAdditionalKeys[];
	pricePriority: ProductAdditionalVariantKeys[];
	priceRange: NumbersRangeI;
	deliverySettings: DeliverySettingsI;
	pagesContent: PagesContentI<CATEGORY, COLLECTION>;
	// mainCategories: CATEGORY[];
	// productsLists: ProductsListI<PRODUCT>[];
	integrations: AnalyticsIntegrationI;
	links: QuickLinkI[];
	navigations: {
		footer: NavigationLinkI[];
		navbar: { left: NavigationLinkI[]; right: NavigationLinkI[] };
	};
	loyaltyProgram: LoyaltyProgramSettingsI;
}

declare interface PublicWebSiteI<ID = string, CATEGORY = ID, PRODUCT = CATEGORY>
	extends WebSiteI<CATEGORY, PRODUCT>,
		TimeStampI {
	_id: ID;
	PaymentFees: PaymentFeeI[];
}
declare interface BasicWebSiteI extends Pick<PublicWebSiteI, 'FY_ID' | '_id' | 'productsAttributes' | 'flags'> {
	name: PublicWebSiteI['websiteInformation']['name'];
	domain: PublicWebSiteI['websiteInformation']['domain'];
}
declare interface WebSiteDocumentI<ID = string, DATE = number> extends WebSiteI<ID>, TimeStampI<DATE> {
	_id: ID;
}

declare type WebSiteSortableFields =
	| 'FY_ID'
	| 'createdAt'
	| 'websiteInformation.name.en'
	| 'websiteInformation.name.fr'
	| 'websiteInformation.name.ar'
	| 'websiteInformation.domain';

/* Forms */
declare interface ServicesSettingsFromI extends Pick<WebSiteI, 'services'> {}
declare interface TestimonialsSettingsFromI extends Pick<WebSiteI, 'testimonials'> {}
declare interface FAQSettingsFromI extends Pick<WebSiteI, 'faqs'> {}
declare interface BannerSettingsFromI extends Pick<WebSiteI, 'banners'> {}
declare interface NavigationSettingsI extends Pick<WebSiteI, 'navigations' | 'links'> {}
