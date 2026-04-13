import { ReactNode, Suspense } from 'react';
import Header from '#client/Header/Header';
import Footer from '#client/Footer/Footer';
import MenuBar from '#client/Header/MenuBar';

export default async function RootLayout({
	children,
	params,
}: {
	children: ReactNode;
	params: Promise<{ locale: LanguagesI }>;
}) {
	const { locale } = await params;
	return (
		<>
			<Header locale={locale} />
			<MenuBar locale={locale} />
			<Suspense>{children}</Suspense>
			<Footer locale={locale} />
		</>
	);
}
