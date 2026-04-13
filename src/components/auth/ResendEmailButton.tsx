'use client';
import { useRouter } from '@client/i18n/routing';
import { useTranslations } from 'next-intl';
import React from 'react';

export default function ResendEmailButton() {
	const t = useTranslations('Auth');
	const router = useRouter();
	const goBack = () => {
		router.back();
	};

	return (
		<button onClick={goBack} className="font-sans text-secondaryB disabled:bg-gray-300 disabled:text-gray-500">
			{t('resend')}
		</button>
	);
}
