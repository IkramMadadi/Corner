import { Suspense } from 'react';
import loadWebsiteData from '~common/websiteCache';
import DeliveryForm from './DeliveryForm';
import { getSession } from '@client/auth.config';
import { Section } from '#client/Section';
import GuestInfo from './GuestInfo';
import CustomerPersonalInformation from './CustomerPersonalInformation';
import Loading from '#client/Loading';
import { getTranslations } from 'next-intl/server';

export default async function OrderInformation({ locale }: { locale: LanguagesI }) {
	const [website, session, t] = await Promise.all([
		loadWebsiteData(),
		getSession(),
		getTranslations({ locale, namespace: 'Checkout' }),
	]);
	return (
		<div className="flex w-full flex-col gap-8 font-sans lg:sticky lg:top-24">
			<h3 className="text-2xl font-semibold">{t('information')}</h3>
			<div className="flex flex-col rounded-xl border border-neutral-300">
				<Suspense fallback={<Loading />}>
					{session ? (
						<CustomerPersonalInformation
							locale={locale}
							paymentsFees={website.PaymentFees}
							user={session.user}
						/>
					) : (
						<>
							<GuestInfo />
							<Section>
								<DeliveryForm paymentsFees={website.PaymentFees} editable />
							</Section>
						</>
					)}
				</Suspense>
			</div>
		</div>
	);
}
