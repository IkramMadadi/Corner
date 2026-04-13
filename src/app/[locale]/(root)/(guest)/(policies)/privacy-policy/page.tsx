import React from 'react';
import loadWebsiteData from '~common/websiteCache';
import PolicyLayout from '../PolicyLayout';

export default async function Privacy({
	params,
	searchParams: asyncSearchParams,
}: {
	params: Promise<{ locale: LanguagesI }>;
	searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const [{ locale }, searchParams, website] = await Promise.all([params, asyncSearchParams, loadWebsiteData()]);

	return (
		<PolicyLayout
			locale={locale}
			namespace="Privacy"
			policy={website.policies.privacy as PolicyI & TimeStampI}
			isLoggingIn={
				searchParams
					? Array.isArray(searchParams)
						? searchParams.some((s) => s === 'log-in')
						: searchParams.ref === 'log-in'
					: false
			}
		/>
	);
}
