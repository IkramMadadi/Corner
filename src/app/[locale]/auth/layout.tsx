import Logo from '#client/Logo';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@client/i18n/routing';
import { ReactNode } from 'react';
import loadWebsiteData from '~common/websiteCache';

export default async function layout({
	params,
	children,
}: {
	params: Promise<{ locale: LanguagesI }>;
	children: ReactNode;
}) {
	const [{ locale }, website] = await Promise.all([params, loadWebsiteData()]);

	const t = await getTranslations({ locale, namespace: 'Auth' });

	return (
		<div className="container mx-auto flex min-h-screen flex-col items-center justify-center gap-8 overflow-auto p-4 py-8 lg:flex-row xl:gap-16">
			<div className="relative my-auto flex-1">
				<div className="absolute inset-x-0 flex flex-wrap items-center justify-between gap-4 p-4">
					<Logo className="h-6 w-auto lg:h-10" />
					<Link
						locale={locale}
						className={`ms-auto flex max-h-fit items-center justify-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold lg:text-base rtl:flex-row-reverse`}
						href={'/'}
					>
						<p>{t('back')}</p>
						<div className={`flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white`}>
							<span className="icon-[material-symbols--arrow-right-alt] text-xl text-white" />
						</div>
					</Link>
				</div>
				<Image
					className="h-96 w-full rounded-3xl object-cover object-center lg:h-[70vh]"
					src={website.pagesContent.auth?.cover.src || '/images/auth-banner.jpg'}
					alt={website.pagesContent.auth?.cover.alt || 'banner'}
					width={website.pagesContent.auth?.cover.width || 1080}
					height={website.pagesContent.auth?.cover.height || 607}
					quality={100}
				/>
			</div>
			<div className="w-full min-w-72 max-w-xl">{children}</div>
		</div>
	);
}
