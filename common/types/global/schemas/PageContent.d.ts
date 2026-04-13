declare interface PublishablePageContentI<CATEGORY = string, COLLECTION = CATEGORY> {
	categories: CATEGORY[];
	collections: COLLECTION[];
}

declare interface PageContentI<CATEGORY = string, COLLECTION = CATEGORY> {
	products: PublishablePageContentI<CATEGORY, COLLECTION>;
	blogs: PublishablePageContentI<CATEGORY, COLLECTION>;
}
