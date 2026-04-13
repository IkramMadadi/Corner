import Loading from '@client/app/[locale]/loading';
import React, { type ReactNode, Suspense } from 'react';

export default async function ProductLayout({ children }: { children: ReactNode }) {
	return <Suspense fallback={<Loading />}>{children}</Suspense>;
}
