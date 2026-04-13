import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';
import { addDynamicIconSelectors } from '@iconify/tailwind';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./common/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./common/utils/**/*.{js,ts,jsx,tsx,json,mdx}',
		'./common/enums/**/*.{js,ts,jsx,tsx,mdx}',
		'./common/providers/**/*.{js,ts,jsx,tsx,mdx}',
		'./common/data/enums/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
				primary: '#3E5A6F',
				primaryG: '#B6E99D',
				secondary: '#F2B598',
				secondaryB: '#3A5A91',
				secondaryP: '#93ABB0',
				secondaryO: '#F02D00',
				secondaryY: '#fdb011',
				productB: '#9DA4D0',
				blackN: '#0C0C20',
				grayN: '#A1A1A1',
			},
			fontFamily: {
				sans: ['var(--font-poppins)', 'var(--font-noto-sans-arabic)', ...fontFamily.sans],
				serif: ['var(--font-noto-serif)', 'var(--font-noto-naskh-arabic)', ...fontFamily.serif],
			},
		},
	},
	plugins: [addDynamicIconSelectors()],
};
export default config;
