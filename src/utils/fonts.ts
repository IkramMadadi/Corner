import { Noto_Serif, Poppins, Noto_Naskh_Arabic, Noto_Sans_Arabic } from 'next/font/google';

export const notoSerif = Noto_Serif({
	subsets: ['greek'],
	weight: ['400', '500', '600', '700'],
	variable: '--font-noto-serif',
});

export const poppins = Poppins({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
	variable: '--font-poppins',
});

export const notoSansArabic = Noto_Sans_Arabic({
	subsets: ['arabic'],
	weight: ['400', '700'],
	variable: '--font-noto-sans-arabic',
});

export const notoNaskh = Noto_Naskh_Arabic({
	subsets: ['arabic'],
	weight: ['400', '500', '600', '700'],
	variable: '--font-noto-naskh-arabic',
});
