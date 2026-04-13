declare interface QuickLinkI {
	label: LanguagesContentI;
	href: string;
	icon?: string;
}

declare interface NavigationLinkI {
	label: LanguagesContentI;
	icon?: string;
	href: string;
	subLinks?: NavigationLinkI[];
}
