declare interface NewsLetterI<ID = string> extends WebsiteLinkedI<ID> {
	email: string;
	subscribed: boolean;
}

declare interface PublicNewsLetterI<ID = string> extends NewsLetterI<ID>, TimeStampI {
	_id: ID;
}
declare interface CreateNewsLetterI extends Omit<NewsLetterI, 'website' | 'subscribed'> {}
declare interface PromotionInformationsI {
	to: string[];
	subject: string;
}

declare interface PromotionMailI extends PromotionInformationsI {
	html: string;
}

declare interface MailTemplateI {
	template: any;
	name: string;
}
declare type NewsLetterSortableFields = 'createdAt' | 'updatedAt' | 'email' | 'subscribed';
