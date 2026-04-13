'use client';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@client/i18n/routing';
import { socialMediaIcons } from '@common/utils/frontend/socialMediaIcons';

export default function ContactInformation({ websiteInformation }: { websiteInformation: WebsiteInformationI }) {
	const t = useTranslations('Footer');
	const locale = useLocale();
	const socialMedias = (Object.keys(socialMediaIcons) as (keyof SocialMediaUrlsI)[])
		.map((platform) =>
			websiteInformation.contactInformation.socialMediaUrls &&
			websiteInformation.contactInformation.socialMediaUrls[platform]
				? {
						icon: socialMediaIcons[platform],
						href: websiteInformation.contactInformation.socialMediaUrls[platform],
					}
				: null
		)
		.filter((platform) => platform !== null);
	return (
		<div className="col-span-1 flex w-full justify-center lg:justify-end">
			<div className="col-span-1 flex w-full max-w-fit flex-col gap-5">
				<h4 className="text-lg font-medium lg:text-2xl">{t('contact')}</h4>
				{websiteInformation.contactInformation.emails.map((email) => (
					<div className="flex items-center gap-2" key={email}>
						<span className="icon-[iconoir--mail]" />
						<a href={`mailto:${email}`} className="text-sm lg:text-base">
							{email}
						</a>
					</div>
				))}
				{websiteInformation.contactInformation.phones.map((phone, i) => (
					<div className="flex items-center gap-2" key={'phone' + i}>
						<span className="icon-[iconoir--phone]" />
						<a dir="ltr" href={`tel:+213${phone}`} className="text-sm lg:text-base">
							+213 {phone}
						</a>
					</div>
				))}
				<div className="flex justify-center gap-4 lg:justify-start">
					{socialMedias.map((media) => (
						<Link
							locale={locale}
							key={media.icon}
							href={media.href}
							className="flex items-center justify-center rounded-full border-2 border-secondaryP p-2 text-secondaryP transition hover:bg-secondaryP hover:text-white"
						>
							<span className={`${media.icon} text-lg`} />
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
