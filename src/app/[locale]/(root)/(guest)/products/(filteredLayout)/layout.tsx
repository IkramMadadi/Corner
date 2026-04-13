import SidebarFilters from '#client/SideBarFilter';

import Image from 'next/image';
import loadWebsiteData from '~common/websiteCache';
import { getTranslations } from 'next-intl/server';
import { type ReactNode, Suspense } from 'react';
import Loading from './loading';

export default async function ProductsLayout({
	children,

	params,
}: {
	params: Promise<{ locale: LanguagesI }>;
	children: ReactNode;
}) {
	const [{ locale }, websiteCache] = await Promise.all([params, loadWebsiteData()]);
	const t = await getTranslations({ locale, namespace: 'ProductsPage' });
	return (
		<div className="flex w-full flex-col gap-8 overflow-x-clip p-8">
			<div className="container mx-auto">
				<Image
					className="max-h-[500px] w-full rounded-3xl object-cover object-center"
					src={websiteCache.pagesContent.products?.cover.src || '/images/probanner.webp'}
					alt={websiteCache.pagesContent.products?.cover.alt || 'banner'}
					width={websiteCache.pagesContent.products?.cover.width || 1201}
					height={websiteCache.pagesContent.products?.cover.height || 629}
					quality={100}
				/>
			</div>
			<h2 className="text-center text-5xl font-bold">{t('title')}</h2>
			<div className="container mx-auto flex items-start gap-6">
				<SidebarFilters locale={locale} />
				<div className="flex w-full flex-1 flex-col gap-4">
					<Suspense fallback={<Loading />}>{children}</Suspense>
				</div>
			</div>
		</div>
	);
}
