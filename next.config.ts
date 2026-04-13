import createNextIntlPlugin from 'next-intl/plugin';
import validateEnv from './common/configurations/env';
import type { NextConfig } from 'next';

validateEnv();
const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'ik.imagekit.io',
			},
			{
				protocol: 'https',
				hostname: 'picsum.photos',
			},
			{
				protocol: 'https',
				hostname: 'cdn.jsdelivr.net',
			},
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com',
			},
			{
				protocol: 'https',
				hostname: 'i.pinimg.com',
			},
			{
				protocol: 'https',
				hostname: 'loremflickr.com',
			},
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com',
			},
			{
				protocol: 'https',
				hostname: 'placehold.co',
			},
		],
	},
	/* env: parsedEnv, */
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
