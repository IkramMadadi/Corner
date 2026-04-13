import CustomerAddress from '#client/Checkout/CustomerAddress';
import { getCustomerAddresses } from '@common/actions/server/customer';
import { getSession } from '@client/auth.config';
import { getTranslations } from 'next-intl/server';
import React, { Suspense } from 'react';
import loadWebsiteData from '~common/websiteCache';

export default async function page({ params }: { params: Promise<{ locale: LanguagesI }> }) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: 'Addresses' });

	return (
		<div className="flex w-full flex-col rounded-md border shadow-sm">
			<div className="flex w-full items-center justify-between p-8">
				<h2 className="flex items-center justify-between gap-6 text-3xl text-primary">
					<span className="icon-[hugeicons--address-book] hidden h-12 w-12 sm:block" />
					{t('title')}
				</h2>
			</div>
			<Suspense>
				<Addresses locale={locale} />
			</Suspense>
		</div>
	);
}

async function Addresses({ locale }: { locale: LanguagesI }) {
	const t = await getTranslations({ locale, namespace: 'Addresses' });
	const [website, session] = await Promise.all([loadWebsiteData(), getSession()]);
	if (!session) return <div>{t('error')}</div>;
	const user = session.user;
	const response = await getCustomerAddresses(user._id, locale);
	if (!response.success) throw new Error(response.message);
	const addresses = response.data;
	return <CustomerAddress addresses={addresses} editable={false} paymentsFees={website.PaymentFees} />;
}
