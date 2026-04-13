declare type PublishableContentTypeI =
	| 'p' // products
	| 'b'; // blog
declare type CategoryLabelsT = 'new' | 'featured' | 'onSale';

declare interface CategoryI<WEBSITE = string, CATEGORY = WEBSITE>
	extends PublishableContentI<WEBSITE, CategoryLabelsT> {
	for: PublishableContentTypeI;
	parentCategory?: CATEGORY; // reference to Category
	cover: CaptionedImageI;
	avatar: CaptionedImageI;
}

declare interface OptimizedCategoryI<ID = string> extends CategoryI<ID> {
	_id: ID;
}
declare interface SimpleCategoryI<ID = string, WEBSITE = string, CATEGORY = WEBSITE>
	extends Omit<CategoryI<WEBSITE, CATEGORY>, 'parentCategory' | 'tags' | 'summary' | 'website' | 'enabled' | 'for'> {
	productsCount: number;
	_id: ID;
}

declare interface PublicOriginalCategoryI<ID = string, WEBSITE = ID, CAT = ID>
	extends CategoryI<WEBSITE, CAT>,
		TimeStampI {
	_id: ID;
}

declare interface PublicCategoryI<ID = string, WEBSITE = ID, CAT = ID, PUB = ID>
	extends CategoryI<WEBSITE, CAT>,
		TimeStampI {
	_id: ID;
	subCategories: CAT[];
	publishables: PUB[];
}
declare interface TableSimpleCategoryI<ID = string, WEBSITE = ID>
	extends Pick<PublicOriginalCategoryI<ID, WEBSITE>, '_id' | 'name' | 'avatar' | 'slug' | 'isPublished' | 'for'> {}
declare interface CategoryTableDataI<ID = string, WEBSITE = string, CATEGORY = BasicPublishableInformationWithIdI<ID>>
	extends Omit<CategoryI<WEBSITE, CATEGORY>, 'cover'>,
		TimeStampI {
	_id: ID;
}
declare type CategoryInformationI = Pick<PublicCategoryI, 'name' | 'summary' | 'slug' | 'for'>;
declare type CategoryImagesI = Pick<PublicCategoryI, 'cover' | 'avatar'>;

declare type CategorySortableFields = 'createdAt' | 'name' | 'for';
