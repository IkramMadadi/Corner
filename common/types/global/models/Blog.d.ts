declare type BlogsLabelsT = 'Tips' | 'News' | 'Articles' | 'Tutorials' | 'Reviews' | 'Interviews' | 'Other';
declare interface BlogI<WEBSITE = string, CATEGORY = WEBSITE, ADMIN = WEBSITE>
	extends PublishableContentI<WEBSITE, BlogsLabelsT> {
	content: LanguagesContentI; // Markdown format
	author?: PersonalInformationI;
	category?: CATEGORY;
	views: number;
	ratingAggregation: RatingAggregationI;
	thumbnail: CaptionedImageI;
	cover: CaptionedImageI;
	createdBy: ADMIN;
}

declare type BlogDocumentI<ID = string> = BlogI<ID>;
declare interface PublicBlogI<ID = string, WEBSITE = string, CATEGORY = WEBSITE, ADMIN = WEBSITE>
	extends BlogI<WEBSITE, CATEGORY, ADMIN>,
		TimeStampI {
	_id: ID;
}
declare interface CreateBlogI<WEBSITE = string, CATEGORY = WEBSITE>
	extends Omit<BlogI<WEBSITE, CATEGORY>, 'ratingAggregation' | 'views'> {}
declare interface BlogTableDataI<ID = string, WEBSITE = string, ADMIN = PersonalInformationI & { _id: ID }>
	extends Omit<PublicBlogI<ID, WEBSITE, CATEGORY, ADMIN>, 'cover' | 'content'>,
		TimeStampI {}

declare type BlogSortableFields =
	| 'createdAt'
	| 'name'
	| 'score'
	| 'views'
	| 'ratingAggregation.average'
	| 'ratingAggregation.count';
declare type BlogInformationI = Pick<PublicBlogI, 'name' | 'content' | 'summary' | 'slug'>;
declare type BlogImagesI = Pick<BlogI, 'thumbnail' | 'cover'>;
