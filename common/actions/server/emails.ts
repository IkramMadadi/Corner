import loadEmailService from '~common/loadEmailService';
import loadResetEmail from '~common/loadResetEmail';
import loadWelcomeCustomerEmail from '~common/loadWelcomeCustomerEmail';
import loadWebsiteData from '~common/websiteCache';

const subject = (websiteName: string): Record<LanguagesI, string> => ({
	en: `Request to reset your password at ${websiteName}`,
	fr: `Demande de réinitialisation de votre mot de passe sur ${websiteName}`,
	ar: `طلب إعادة تعيين كلمة المرور الخاصة بك في ${websiteName}`,
});
export async function sendResetEmail(
	to: string,
	sessionId: string,
	context: Omit<ResetCustomerPasswordEmailContext, 'resetUrl'>,
	locale: LanguagesI
) {
	try {
		const [emailService, ResetEmailTemplate, website] = await Promise.all([
			loadEmailService(),
			loadResetEmail(),
			loadWebsiteData(),
		]);
		const resetUrl = new URL(`/auth/reset-password/${sessionId}`, process.env.FY_DOMAIN).href;
		const email = await ResetEmailTemplate.render({ ...context, resetUrl });
		await emailService.sendEmail({
			from: process.env.FY_EMAIL_USERNAME,
			to,
			subject: subject(website.websiteInformation.name[locale])[locale],
			html: email,
		});
		return true;
	} catch (e) {
		console.error(e);
		return false;
	}
}
const welcomeSubjects = (websiteName: string): Record<LanguagesI, string> => ({
	en: `Welcome to ${websiteName}`,
	fr: `Bienvenue à ${websiteName}`,
	ar: `مرحبًا بكم في ${websiteName}`,
});
export async function sendWelcomeEmail(
	to: string,
	context: Omit<WelcomeCustomerContext, 'customerLoginURL'>,
	locale: LanguagesI
) {
	try {
		const [emailService, WelcomeTemplate, website] = await Promise.all([
			loadEmailService(),
			loadWelcomeCustomerEmail(),
			loadWebsiteData(),
		]);
		const subject = welcomeSubjects(website.websiteInformation.name[locale])[locale];
		const customerLoginURL = new URL('/auth/login', process.env.FY_DOMAIN).href;
		const email = await WelcomeTemplate.render({ ...context, customerLoginURL });
		await emailService.sendEmail({
			from: process.env.FY_EMAIL_USERNAME,
			to,
			subject,
			html: email,
		});
		return true;
	} catch (e) {
		console.error(e);
		return false;
	}
}
