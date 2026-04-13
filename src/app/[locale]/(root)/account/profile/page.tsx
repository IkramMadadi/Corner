import React from 'react';
import PersonalInformationForm from '#client/account/PersonalInformationForm';
import { getSession } from '@client/auth.config';
import { getCustomerPersonalInformation } from '@common/actions/server/customer';
import SecurityInformationForm from '#client/account/SecurityInformationForm';
import { getTranslations } from 'next-intl/server';

export default async function page({ params }: { params: Promise<{ locale: LanguagesI }> }) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: 'Addresses' });
	const session = await getSession();
	if (!session) {
		return <div>{t('error')}</div>;
	}
	const response = await getCustomerPersonalInformation(session.user._id, locale);
	if (!response.success) {
		throw new Error(response.message);
	}
	const customerInformation = response.data;

	return (
		<div className="flex flex-col gap-10">
			<PersonalInformationForm customerInformation={customerInformation} />
			<SecurityInformationForm />
		</div>
	);
}
