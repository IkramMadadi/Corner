import Image from 'next/image';
import OrderSummary from '#client/Checkout/OrderSummary';
import OrderInformation from '#client/Checkout/OrderInformation';
import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import loadWebsiteData from '~common/websiteCache';
import { loadCustomerAvailableTotalPoints } from '@common/actions/server/customer';
import { getSession } from '@client/auth.config';

export default async function CheckoutPage({ params }: { params: Promise<{ locale: LanguagesI }> }) {
	const [{ locale }, session] = await Promise.all([params, getSession()]);
	const [t, website, totalPointsResponse] = await Promise.all([
		getTranslations({ locale, namespace: 'Checkout' }),
		loadWebsiteData(),
		session?.user._id ? loadCustomerAvailableTotalPoints(session.user._id, locale) : null,
	]);
	const totalPoints = totalPointsResponse ? (totalPointsResponse.success ? totalPointsResponse.data : 0) : null;
	return (
		<>
			<main className="container mx-auto px-6 py-8 lg:pb-28 lg:pt-12">
				<div className="mb-8">
					<h2 className="text-2xl font-semibold sm:text-3xl lg:text-4xl">{t('title')}</h2>
				</div>

				<div className="flex flex-col gap-10 lg:flex-row lg:items-start">
					<Suspense>
						<OrderInformation locale={locale} />
					</Suspense>

					<div className="shrink-0 border-t border-neutral-300 lg:border-l lg:border-t-0" />
					<div className="w-full gap-8">
						<OrderSummary totalPoints={totalPoints} freeOver={website.deliverySettings.freeOnOver} />
					</div>
				</div>
			</main>
			<div className="container mx-auto px-6 pb-6">
				<Image
					className="max-h-[550px] w-full rounded-3xl object-cover object-center"
					src={website.pagesContent.auth?.cover.src || '/images/auth-banner.jpg'}
					alt={website.pagesContent.auth?.cover.alt || 'banner'}
					width={website.pagesContent.auth?.cover.width || 1080}
					height={website.pagesContent.auth?.cover.height || 607}
					quality={100}
				/>
			</div>
		</>
	);
}
