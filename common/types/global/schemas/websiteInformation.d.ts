declare interface WebsiteInformationI {
	name: LanguagesContentI;
	domain: string;
	description: LanguagesContentI;
	keywords: string[];
	aboutUs: LanguagesContentI; // Markdown format
	contactInformation: ContactInformationI;
	addresses: AddressI[];
}
