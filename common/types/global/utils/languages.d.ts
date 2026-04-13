declare type MainLanguagesI = 'fr' | 'ar';
declare type SecondaryLanguagesI = 'en';

declare type LanguagesI = MainLanguagesI | SecondaryLanguagesI;
declare type LanguagesContentI<T = string> = {
	[key in LanguagesI]: T;
};
