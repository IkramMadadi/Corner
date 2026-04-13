declare interface ResetPasswordEmailContext extends TemplateContexts {
	name: string;
	otp: string;
	resetUrl: string;
}
