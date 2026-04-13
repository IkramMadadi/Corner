declare interface WelcomeAdminContext extends TemplateContexts {
	name: string;
	password: string;
	adminLoginURL: string;
	email: string;
}
declare interface WelcomeCustomerContext {
	name: string;
	customerLoginURL: string;
	email: string;
}
