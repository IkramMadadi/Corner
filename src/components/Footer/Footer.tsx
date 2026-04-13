import { Link } from '@client/i18n/routing';
import React from 'react';

import Logo from '#client/Logo';
//import Newsletter from './Newsletter';
import loadWebsiteData from '~common/websiteCache';
import { getTranslations } from 'next-intl/server';
import ContactInformation from './ContactInformation';
const year = new Date().getFullYear();
export default async function Footer({ locale }: { locale: LanguagesI }) {
	const [t, website] = await Promise.all([getTranslations({ locale, namespace: 'Footer' }), loadWebsiteData()]);
	const legals = [
		{ href: '/privacy-policy', name: t('privacy') },
		{ href: '/terms-and-conditions', name: t('terms') },
		{ href: '/cookies-policy', name: t('cookie') },
	];
	return (
		<div className="w-full text-center text-blackN lg:text-start">
			{/* newsletter 
			<Newsletter />
			*/}
			<div className="container mx-auto mt-32 grid w-full grid-cols-1 gap-8 px-6 font-sans lg:grid-cols-4 lg:gap-12">
				{/* description */}
				<div className="col-span-1 -mt-4 flex w-full flex-col items-center gap-4 lg:items-start">
					<Logo mode="tall" className="-mt-12 h-24 shrink-0" />
					<div className="flex flex-col gap-3 font-serif">
						<p className="text-sm lg:text-base">{website.websiteInformation.description[locale]}</p>
						<p className="text-xs lg:text-sm">
							{t.rich('rights', {
								website: website.websiteInformation.name[locale],
								year,
								a: (chunk) => (
									<a
										href={
											website.websiteInformation.contactInformation.websites
												? website.websiteInformation.contactInformation.websites[0] || '/'
												: '/'
										}
										target="_blank"
										rel="noreferrer"
									>
										{chunk}
									</a>
								),
							})}
						</p>
					</div>
				</div>
				{/* links */}
				<div className="col-span-1 grid grid-cols-2 gap-8 lg:col-span-2 lg:gap-12">
					{/* legal */}
					<div className="col-span-1 flex flex-col gap-3">
						<h4 className="text-lg font-medium lg:text-2xl">{t('legal')}</h4>
						{legals.map((link) => (
							<div key={link.name} className="text-sm lg:text-base">
								<Link locale={locale} href={link.href}>
									{link.name}
								</Link>
							</div>
						))}
					</div>

					{/* quick links */}
					<div className="col-span-1 flex flex-col gap-3">
						<h4 className="text-lg font-medium lg:text-2xl">{t('quickLinks')}</h4>
						{website.navigations.footer.map((link, i) => {
							return (
								<div key={'quick-links-' + i} className="text-sm lg:text-base">
									{link.href.startsWith('#') || link.href.startsWith('/') ? (
										<Link locale={locale} href={link.href}>
											{link.label[locale]}
										</Link>
									) : (
										/* external link */
										<a
											href={link.href}
											target="_blank"
											rel="noopener noreferrer"
											title={link.label[locale]}
										>
											{link.label[locale]}
										</a>
									)}
								</div>
							);
						})}
					</div>
				</div>
				{/* contact */}
				<ContactInformation websiteInformation={JSON.parse(JSON.stringify(website.websiteInformation))} />
			</div>
			<p className="mt-6 px-6 pb-4 text-center font-serif text-xs lg:text-sm">Made with 🌼 by BloomQ Agency</p>
		</div>
	);
}
