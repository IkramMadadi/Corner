declare interface EmailContexts {
	resetPassword: ResetPasswordEmailContext;
	welcomeAdmin: WelcomeAdminContext;
	resetedPassword: ResetedPasswordEmailContext;
	validateEmail: ValidateEmailEmailContext;
}
declare interface CustomerEmailContexts {
	resetCustomerPassword: ResetCustomerPasswordEmailContext;
	welcomeCustomer: WelcomeCustomerContext;
}
declare interface AdditionalContext {
	logo: string;
	supportEmail: string;
	AppName: string;
}
declare interface ExtraAdditionalContext extends AdditionalContext {
	WebsiteName: string;
}

declare type EmailTemplates = keyof EmailContexts;
declare type CustomerEmailTemplates = keyof CustomerEmailContexts;

declare type EmailAccounts = /* 'info' | 'support' | */ 'noReply';

declare interface QueuedEmail<T extends EmailTemplates = EmailTemplates> {
	from: EmailAccounts;
	to: string | string[];
	cc?: string | string[];
	bcc?: string | string[];
	subject: string;
	template: T;
	context: EmailContexts[T];
}
