import { notoSerif, poppins, notoSansArabic, notoNaskh } from '@client/utils/fonts';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Head from 'next/head';
import { ReactNode, Suspense } from 'react';
import BaseLayoutClient from './BaseLayoutClient';

export default async function BaseLayout({ locale, children }: { locale: LanguagesI; children: ReactNode }) {
	const messages = await getMessages({ locale });
	const now = new Date();

	return (
		<html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
			<Head>
				<link rel="icon" type="image/png" href="/images/favicon-96x96.png" sizes="96x96" />
				<link rel="icon" type="image/svg+xml" href="/images/favicon.svg" />
				<link rel="shortcut icon" href="/favicon.ico" />
				<link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
				<meta name="apple-mobile-web-app-title" content="DecoDar" />
			</Head>
			<body
				suppressHydrationWarning
				className={`${poppins.variable} ${notoSerif.variable} ${notoSansArabic.variable} ${notoNaskh.variable} font-serif antialiased`}
			>
				<Suspense>
					<NextIntlClientProvider messages={messages} locale={locale} now={now} timeZone="Africa/Algiers">
						<BaseLayoutClient>{children}</BaseLayoutClient>
					</NextIntlClientProvider>
				</Suspense>
			</body>
		</html>
	);
}
