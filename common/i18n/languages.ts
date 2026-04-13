export const languages: LanguagesI[] = ['fr', 'en', 'ar'];
export const defaultLocale: LanguagesI = 'fr'; // Default locale
export const locales = languages; // Supported locales
export const localesMap: Record<LanguagesI, Intl.LocalesArgument> = {
	en: 'en-US',
	ar: 'ar-DZ',
	fr: 'fr-FR',
};
