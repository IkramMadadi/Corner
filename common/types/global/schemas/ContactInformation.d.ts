declare interface ContactInformationI {
	emails: string[];
	validatedEmails?: string[];
	phones: string[];
	faxes?: string[];
	websites?: string[];
	socialMediaUrls?: SocialMediaUrlsI;
}
/* declare interface PhoneI {
	number: string;
	code?: string;
} */
declare interface SocialMediaUrlsI {
	facebook?: string;
	x?: string;
	instagram?: string;
	youtube?: string;
	linkedin?: string;
	tiktok?: string;
}
