import './tailwind.css';
import { lazy, ReactNode, Suspense } from 'react';
import { getTranslations } from 'next-intl/server';

import loadWebsiteData from '~common/websiteCache';
import TanstackQueryProvider from '@common/providers/TanstackQueryProvider';

import type { Metadata } from 'next';
import BaseLayout from '#client/BaseLayout';
import { Toaster } from 'react-hot-toast';
import { toasterConfig } from '#client/toaster';
import { locales, localesMap } from '@common/i18n/languages';

const FacebookPixel = lazy(() => import('#common/FacebookPixel'));
const GoogleAnalytics = lazy(() => import('#common/GoogleAnalytics'));
const TikTokPixel = lazy(() => import('#common/TixTok'));

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: LanguagesI; pageTitle: string }>;
}): Promise<Metadata> {
	const [{ locale, pageTitle = 'Home' }, website] = await Promise.all([params, loadWebsiteData()]);
	const t = await getTranslations({ locale, namespace: 'Metadata' });

	const title = t('title', { pageTitle: t(pageTitle) });
	return {
		title,
		description: website.websiteInformation.description[locale],
		keywords: website.websiteInformation.keywords,
		openGraph: {
			title,
			description: t('description'),
			url: website.websiteInformation.domain,
			siteName: website.websiteInformation.name[locale],
			type: 'website',
			locale: locale,
			alternateLocale: locales.map((l) => localesMap[l] as string),
			images: [`${process.env.FY_DOMAIN || ''}/images/the9er3a.png`],
			countryName: 'Algeria',
			phoneNumbers: website.websiteInformation.contactInformation.phones,
			emails: website.websiteInformation.contactInformation.emails,
		},
		category: 'e-commerce',
		publisher: 'Deco Dar',
		applicationName: title,
		other: {
			'facebook-domain-verification': '7ndillq7gyhcdc639aq1a9e19aiwbr',
		},
	};
}
/* 
export async function generateStaticParams() {
	return locales.map((locale) => ({ locale }));
} */
export default async function LocaleLayout({
	children,
	params,
}: Readonly<{
	children: ReactNode;
	params: Promise<{ locale: LanguagesI }>;
}>) {
	const [{ locale }, website] = await Promise.all([params, loadWebsiteData()]);
	return (
		<BaseLayout locale={locale}>
			<Suspense>
				{website.integrations.meta?.id && (
					<FacebookPixel pixelId={website.integrations.meta.id} websiteId={website._id.toString()} />
				)}
				{website.integrations.google_analytics?.id && (
					<GoogleAnalytics gaId={website.integrations?.google_analytics.id} />
				)}
				{website.integrations.tiktok?.id && <TikTokPixel tiktokId={website.integrations?.tiktok.id} />}
				<TanstackQueryProvider>{children}</TanstackQueryProvider>
			</Suspense>
			<Toaster {...toasterConfig} />
		</BaseLayout>
	);
}
