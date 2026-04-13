declare interface SupportRequestI<ID = string> extends WebsiteLinkedI<ID> {
	customerName: string;
	email: string;
	subject: string; // Markdown format
	report: string; // Markdown format
	enabled: boolean;
}

declare interface RequestSupportI<ID = string> extends Omit<SupportRequestI<ID>, 'website' | 'enabled'> {}
declare interface PublicSupportRequestI<ID = string> extends SupportRequestI<ID>, TimeStampI {
	_id: ID;
}
declare type SupportSortableFields = 'createdAt' | 'updatedAt' | 'customerName' | 'email' | 'subject' | 'report';
