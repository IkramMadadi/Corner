declare interface ReviewI<ID = string, CREATOR = ID> extends WebsiteLinkedI<ID>, ActivatableI {
	link: LinkI<ID>; // publishable link
	content: string; // Markdown format
	rating: number; // 1-5 rating
	createdBy: CREATOR; // CustomerID
}

declare interface PublicReviewI<ID = string, CREATOR = ID> extends ReviewI<ID, CREATOR>, TimeStampI {
	_id: ID;
}
declare interface CreateReviewI extends Pick<ReviewI, 'content' | 'rating' | 'link'> {}
