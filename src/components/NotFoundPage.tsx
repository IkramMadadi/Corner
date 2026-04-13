import React from 'react';
import { useTranslations } from 'next-intl';
import ButtonSecondary from './Buttons/ButtonSecondary';
import Logo from './Logo';
export default function NotFoundPage() {
	const t = useTranslations('NotFoundPage');
	return (
		<div className="flex min-h-screen w-full flex-col items-center justify-center gap-8 p-8">
			<Logo className="h-40 w-40" mode="tall" />
			<h2 className="font-sans text-5xl font-bold text-primary text-opacity-60 lg:text-7xl">404</h2>
			<h2 className="text-3xl font-bold text-primary lg:text-5xl">{t('title')}</h2>
			<p className="max-w-lg text-center font-sans text-sm lg:text-base">{t('description')}</p>
			<ButtonSecondary href="/">{t('go-back')}</ButtonSecondary>
		</div>
	);
}
