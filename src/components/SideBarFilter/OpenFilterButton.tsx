'use client';
import { filterBarEventEmitter } from '@common/events/filterBar';
import { useTranslations } from 'next-intl';

export function OpenFilterButton() {
	const t = useTranslations('Filters');
	return (
		<button
			onClick={() => {
				filterBarEventEmitter.emit('filterBarOpen');
			}}
			className="flex items-center gap-2 rounded-md border bg-[#F4F4F5]/20 px-4 py-2 lg:hidden"
		>
			{t('open')}
			<span className="icon-[mdi--account-filter-outline] flex-shrink-0" />
		</button>
	);
}
