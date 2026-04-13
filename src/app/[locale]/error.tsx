'use client';

import ButtonPrimary from '#client/Buttons/ButtonPrimary';
import ButtonSecondary from '#client/Buttons/ButtonSecondary';
import Logo from '#client/Logo';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

type Props = {
	error: Error;
	reset(): void;
};

export default function Error({ error, reset }: Props) {
	const t = useTranslations('Error');

	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="flex min-h-screen w-full flex-col items-center justify-center gap-8 p-8">
			<Logo className="h-40 w-40" mode="tall" />
			<h2 className="font-sans text-5xl font-bold text-primary text-opacity-60 lg:text-7xl">ERROR</h2>
			<h2 className="text-3xl font-bold text-primary lg:text-5xl">{t('title')}</h2>
			<p className="max-w-lg font-sans text-sm lg:text-base">{t('description')}</p>
			<div className="flex gap-4">
				<ButtonPrimary
					sizeClass="px-12 py-2"
					className="max-w-lg font-sans text-sm lg:text-base"
					onClick={() => reset()}
				>
					{t('reload')}
				</ButtonPrimary>
				<ButtonSecondary sizeClass="px-10 py-2" className="max-w-lg font-sans text-sm lg:text-base" href={'/'}>
					{t('home')}
				</ButtonSecondary>
			</div>
		</div>
	);
}
