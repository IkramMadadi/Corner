import { Link } from '@client/i18n/routing';
import { localesMap } from '@common/i18n/languages';
import { getTranslations } from 'next-intl/server';
import React from 'react';

export default async function PolicyLayout({
	isLoggingIn = false,
	policy,
	locale,
	namespace,
}: {
	isLoggingIn?: boolean;
	namespace: 'Privacy' | 'TermsAndConditions' | 'CookiesPolicies';
	policy: PolicyI & TimeStampI;
	locale: LanguagesI;
}) {
	const [policies, nPolicy] = await Promise.all([
		getTranslations({ locale, namespace: 'Policies' }),
		getTranslations({ locale, namespace: namespace }),
	]);
	return (
		<div className="container mx-auto my-16 flex flex-col gap-2 font-sans">
			<h2 className="font-serif text-5xl font-bold lg:text-center">{nPolicy('title')}</h2>
			<p className="lg:text-center">
				{policies('update')}{' '}
				{new Date(policy?.updatedAt).toLocaleString(localesMap[locale], {
					day: 'numeric',
					month: 'long',
					year: 'numeric',
				})}
			</p>
			{policy ? (
				<div className="mt-16 flex flex-col justify-between gap-8 lg:flex-row">
					{/* privacy */}
					<div className="lg:max-w-[60%]">
						<h3 className="font-serif text-3xl font-semibold">{nPolicy('description')}</h3>
						<h4 className="mb-4 mt-16 text-2xl font-medium">{nPolicy('title')}</h4>
						<p>{policy.description[locale]}</p>

						<h4 className="mb-4 mt-16 text-2xl font-medium">{nPolicy('summary')}</h4>
						{policy.rules.length > 0 ? (
							<ol className="list-inside list-decimal">
								{policy.rules.map((rule, i) => (
									<li id={'rule-' + (i + 1)} key={'rule-' + i} className="mb-4">
										<span className="font-bold">{rule.question[locale]}</span>{' '}
										<span className="font-normal">{`${rule.answer[locale]}`}</span>
									</li>
								))}
							</ol>
						) : (
							<p>{policies('missingSummary')}</p>
						)}
					</div>

					{/* Table of content */}
					<div className="order-first flex flex-col gap-4 lg:order-last lg:w-[25%]">
						<h3 className="font-serif text-3xl font-bold">{policies('table')}</h3>
						<ol className="list-inside list-decimal font-semibold">
							{policy.rules.map((rules, i) => (
								<li key={'rules-' + i} className="mb-2">
									<a href={'#rules-' + (i + 1)} className="font-medium">
										{rules.question[locale]}
									</a>
								</li>
							))}
						</ol>
						<hr className="w-full bg-neutral-300" />
						{isLoggingIn && (
							<Link locale={locale} href={'/auth/login'}>
								{policies('backToLogin')} <span className="icon-[lets-icons--arrow-top-light]" />
							</Link>
						)}
					</div>
				</div>
			) : (
				<p>{policies('missingSummary')}</p>
			)}
		</div>
	);
}
