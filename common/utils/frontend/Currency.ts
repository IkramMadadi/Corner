const DZD: Record<LanguagesI, Intl.NumberFormat> = {
	en: new Intl.NumberFormat('en-UK', {
		style: 'currency',
		currency: 'DZD',
	}),
	fr: new Intl.NumberFormat('fr-FR', {
		style: 'currency',
		currency: 'DZD',
	}),
	ar: new Intl.NumberFormat('ar-DZ', {
		style: 'currency',
		currency: 'DZD',
	}),
};
export default DZD;
