'use client';
import Input from './Inputs/Input';
import React, { useCallback, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useRouter } from '@client/i18n/routing';

export default function SearchInput() {
	const t = useTranslations('ProductsPage');
	const router = useRouter();
	const searchParams = useSearchParams();
	const [text, setText] = useState(searchParams.get('search') || '');
	const [debouncedQuery] = useDebounce(text, 750);

	const [isMounted, setIsMounted] = useState(false);
	useEffect(() => setIsMounted(true), []);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setText(e.target.value);
	};
	const updateUrl = useCallback(
		(debouncedSearch: string) => {
			if (!isMounted) return;

			const currentParams = new URLSearchParams(searchParams.toString());
			const currentSearch = currentParams.get('search') || '';

			if (debouncedSearch === currentSearch) return;

			if (debouncedSearch) {
				currentParams.set('search', debouncedSearch);
			} else {
				currentParams.delete('search');
			}

			router.push(`?${currentParams.toString()}`, { scroll: false });
		},
		[router, searchParams, isMounted]
	);
	useEffect(() => {
		updateUrl(debouncedQuery);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedQuery]);

	return (
		<div className="flex w-full max-w-xl items-center gap-2 rounded-xl border border-neutral-300 bg-[#F4F4F5]/20 px-3 py-1 focus-within:border-blackN">
			<span
				className="icon-[iconoir--search] cursor-pointer text-2xl text-blackN"
				onClick={() => updateUrl(debouncedQuery)}
			/>
			<hr className="h-6 border border-blackN" />
			<Input
				type="text"
				value={text}
				onChange={handleInputChange}
				onKeyDown={(e) => e.key === 'Enter' && router.push(`?search=${debouncedQuery}`)}
				className="border-transparent bg-[#F4F4F5]/20 placeholder:text-neutral-500 focus:border-transparent focus:outline-none"
				placeholder={t('searchPlaceholder')}
			/>
		</div>
	);
}
