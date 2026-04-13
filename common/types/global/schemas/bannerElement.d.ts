declare interface BannerElementI {
	title: LanguagesContentI;
	//content?: LanguagesContentI | null; // Markdown format
	buttons: ButtonI[];
	//showContent: boolean; // whether to show content on the website
	image?: string; // URL to the image
	alert?: AlertElementI | null; // null if no alert
	color: 'light' | 'dark'; // 'light' or 'dark' theme
	overlay: number; // overlay opacity
}
declare interface PublicBannerElementI extends BannerElementI {
	_id: string;
}
