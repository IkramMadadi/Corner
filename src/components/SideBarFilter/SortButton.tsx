'use client';
import { cn } from '@common/utils/frontend/utils';
import { useLocale } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
const linkClassName = 'block px-4 py-2 text-sm text-gray-700 text-start hover:bg-gray-100 w-full text-nowrap';

export function SortButton<V extends string = string>({ sortables }: { sortables: LabelValueI<V>[] }) {
	const locale = useLocale() as LanguagesI;
	const searchParams = useSearchParams();
	const [sort, setSort] = useState<V>((searchParams.get('sort') as V) || sortables[0].value);
	const [sortDir, setSortDir] = useState<string>(searchParams.get('sortDir') || 'desc');

	const router = useRouter();
	const updateSort = useCallback(
		(value: V) => {
			setSort(value);
			const currentParams = new URLSearchParams(searchParams.toString());
			if (value) {
				if (value === currentParams.get('sort')) {
					setSortDir((p) => (p === 'asc' ? 'desc' : 'asc'));
				} else setSortDir('desc');
				currentParams.set('sort', value);
			} else {
				currentParams.delete('sort');
			}
			// Push the new URL with updated query parameters
			router.push(`?${currentParams.toString()}`, {
				scroll: false,
			});
		},
		[router, searchParams]
	);
	useEffect(() => {
		const currentParams = new URLSearchParams(searchParams.toString());
		if (sortDir) {
			currentParams.set('sortDir', sortDir);
		} else {
			currentParams.delete('sortDir');
		}
		// Push the new URL with updated query parameters
		router.push(`?${currentParams.toString()}`, {
			scroll: false,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sortDir]);
	const sortLabel = useMemo(
		() => sortables.find((sortable) => sortable.value === sort)?.label || sortables[0].label,
		[sort, sortables]
	);
	return (
		<div className="group relative bg-[#F4F4F5]/20">
			<button className="flex items-center gap-2 rounded-md border px-4 py-2 group-focus-within:ring-1">
				{sortLabel[locale]}
				<span className={'icon-[solar--sort-outline]' + (sortDir === 'desc' ? '' : ' rotate-180')} />
			</button>
			<div
				className={cn(
					'absolute z-40 mt-2 rounded-md bg-[#F4F4F5] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
					'right-0 origin-top-right',
					'hidden flex-col group-focus-within:flex'
				)}
				role="menu"
				aria-orientation="vertical"
				aria-labelledby="menu-button"
				tabIndex={-1}
			>
				{sortables.map((sort) => (
					<button
						key={sort.value}
						type="button"
						className={linkClassName}
						onClick={() => updateSort(sort.value)}
						role="menuitem"
						tabIndex={-1}
						id="menu-item-0"
					>
						{sort.label[locale]}
					</button>
				))}
			</div>
		</div>
	);
}
