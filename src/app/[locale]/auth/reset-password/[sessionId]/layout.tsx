import Button from '#client/Buttons/Button';
import { loadRecoverySessionCustomer } from '@common/actions/server/customer';
import ResetProvider from '@common/providers/ResetProvider';
import { ReactNode } from 'react';

export default async function page({
	params,
	children,
}: {
	params: Promise<{ sessionId: string; locale: LanguagesI }>;
	children: ReactNode;
}) {
	const { sessionId, locale } = await params;
	const response = await loadRecoverySessionCustomer(sessionId, locale);
	if (!response.success)
		return (
			<div className="container mx-auto flex flex-col items-center gap-8">
				<div className="flex items-center justify-center rounded-lg border p-2">
					<span className="icon-[hugeicons--mail-open] h-16 w-16" />
				</div>
				<h1 className="text-3xl font-semibold md:text-5xl">Session not found</h1>
				<p className="max-w-sm text-center text-sm">
					The session you are trying to access does not exist or has expired. Please try again.
				</p>
				<Button
					href="/auth/forgot-password"
					className="w-full gap-2 rounded-xl bg-primary text-lg text-white hover:cursor-pointer sm:py-4"
				>
					Go back
				</Button>
			</div>
		);
	const customer = response.data;
	return (
		<ResetProvider sessionId={sessionId} customer={customer}>
			{children}
		</ResetProvider>
	);
}
