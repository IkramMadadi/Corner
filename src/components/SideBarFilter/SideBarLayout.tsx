'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { cn } from '@common/utils/frontend/utils';
import { filterBarEventEmitter } from '@common/events/filterBar';
import ButtonCircle from '../Buttons/ButtonCircle';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

export default function SideBarLayout({ children }: { children: ReactNode }) {
	const router = useRouter();
	const t = useTranslations('Filters');
	const [filerBarOpen, setFilerBarOpen] = useState(false);

	useEffect(() => {
		function openSidebar() {
			setFilerBarOpen(true);
		}
		function closeSidebar() {
			setFilerBarOpen(false);
		}
		filterBarEventEmitter.on('filterBarOpen', openSidebar);
		filterBarEventEmitter.on('filterBarClose', closeSidebar);
		return () => {
			filterBarEventEmitter.off('filterBarOpen', openSidebar);
			filterBarEventEmitter.off('filterBarClose', closeSidebar);
		};
	}, []);
	return (
		<>
			<div
				className={cn(
					'fixed top-0 flex min-w-72 max-w-xs flex-col gap-4 rounded-lg bg-white px-6 py-8 font-sans max-lg:right-0 max-lg:z-[90] max-lg:h-full max-lg:w-full max-lg:overflow-auto max-lg:bg-slate-50 lg:sticky lg:top-28 lg:translate-x-0 lg:border lg:border-neutral-300',
					filerBarOpen ? 'translate-x-0' : 'translate-x-full'
				)}
			>
				<div className="flex items-center justify-between">
					<h2 className="text-2xl font-semibold">{t('title')}</h2>
					<div className="flex items-center gap-2 lg:gap-0">
						<ButtonCircle
							size=""
							className="flex p-2 hover:bg-slate-300"
							onClick={() => {
								filterBarEventEmitter.emit('emptyFilterBar');
								router.push(`?`, {
									scroll: false,
								});
							}}
						>
							<span className="icon-[solar--filter-bold-duotone] h-4 w-4" />
						</ButtonCircle>
						<ButtonCircle
							className="lg:hidden"
							onClick={() => filterBarEventEmitter.emit('filterBarClose')}
						>
							<span className="icon-[material-symbols--close-rounded] h-8 w-8" />
						</ButtonCircle>
					</div>
				</div>
				{children}
			</div>
			<div
				className={cn(
					'fixed inset-0 z-[80] bg-black/10 transition-opacity lg:hidden',
					filerBarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
				)}
				onClick={() => {
					filterBarEventEmitter.emit('filterBarClose');
				}}
			/>
		</>
	);
}
