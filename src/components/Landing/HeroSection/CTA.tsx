import Button from '#client/Buttons/Button';
import ButtonPrimary from '#client/Buttons/ButtonPrimary';
import { getTranslations } from 'next-intl/server';
import React from 'react';

export default async function CTA({ locale }: { locale: LanguagesI }) {
	const t = await getTranslations({ locale, namespace: 'HeroSection' });

	return (
		<div className="flex flex-col items-center gap-4 lg:flex-row">
			<ButtonPrimary href="/products">{t('button')}</ButtonPrimary>
			<Button className="flex gap-4 text-lg text-primary" href={'/#testimonials'}>
				<span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
					<span className="icon-[iconoir--play-solid] h-5 w-5 text-white rtl:rotate-180" />
				</span>
				{t('watchReview')}
			</Button>
		</div>
	);
}
