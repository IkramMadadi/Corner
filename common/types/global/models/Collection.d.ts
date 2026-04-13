declare type CollectionLabelsT = 'new' | 'featured' | 'onSale';

declare interface CollectionI<WEBSITE = string, PUBLISHABLE = WEBSITE>
	extends PublishableContentI<WEBSITE, CollectionLabelsT> {
	publishables: PUBLISHABLE[]; // productIDs
	isPublic: boolean;
	for: PublishableContentTypeI;
	cover: CaptionedImageI;
	avatar: CaptionedImageI;
}

declare type CollectionDocumentI<ID = string> = CollectionI<ID>;
declare interface OptimizedCollectionI<ID = string, WEBSITE = string, PUBLISHABLE = WEBSITE>
	extends CollectionI<WEBSITE, PUBLISHABLE> {
	_id: ID;
}
declare interface PublicCollectionI<ID = string, PUBLISHABLE = ID, WEBSITE = ID>
	extends CollectionI<WEBSITE, PUBLISHABLE>,
		TimeStampI {
	_id: ID;
}

declare interface SimpleCollectionI<ID = string, PUBLISHABLE = ID, WEBSITE = ID>
	extends Pick<
		PublicCollectionI<ID, PUBLISHABLE, WEBSITE>,
		'_id' | 'name' | 'avatar' | 'isPublic' | 'slug' | 'isPublished' | 'for'
	> {}

declare interface CollectionTableDataI<ID = string, WEBSITE = string>
	extends Omit<PublicCollectionI<ID, string, WEBSITE>, 'cover' | 'publishables'>,
		TimeStampI {}

declare type CollectionSortableFields = 'createdAt' | 'name' | 'for';

declare type CollectionInformationI = Pick<PublicCollectionI, 'name' | 'summary' | 'slug' | 'for'>;
declare type CollectionImagesI = Pick<PublicCollectionI, 'cover' | 'avatar'>;
declare type CollectionStateI = PublishableStateI | Pick<PublicCollectionI, 'isPublic'>;
