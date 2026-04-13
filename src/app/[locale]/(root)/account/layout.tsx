import Navbar from '#client/Header/Navbar';
import LeftSidebar from '#client/LeftSidebar';
import { ReactNode, Suspense } from 'react';

export default async function layout({
	children,
	params,
}: {
	children: ReactNode;
	params: Promise<{ locale: LanguagesI }>;
}) {
	const { locale } = await params;
	return (
		<div className="flex h-screen w-full">
			<LeftSidebar />
			<div className="h-screen w-full overflow-y-auto p-8">
				<div className="flex w-full justify-between gap-4">
					<Navbar locale={locale} />
				</div>
				<Suspense>
					<div className="flex w-full flex-col py-8 font-sans">{children}</div>
				</Suspense>
			</div>
		</div>
	);
}
