'use client';
import { cn } from '@common/utils/frontend/utils';
import { filterBarEventEmitter } from '@common/events/filterBar';
import { useLocale } from 'next-intl';
import { Link } from '@client/i18n/routing';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react';
function preventDefault(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
	e.preventDefault();
	e.stopPropagation();
	return false;
}
export default function CategoryItem({ exit = false, item }: { item: SimpleCategoryI; index: number; exit?: boolean }) {
	const locale = useLocale() as LanguagesI;
	const searchParams = useSearchParams();
	const router = useRouter();
	const onExit = useCallback(
		(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
			event.preventDefault();
			event.stopPropagation();
			const currentParams = new URLSearchParams(searchParams.toString());
			const categories = currentParams.get('categories')?.split(',') || [];
			const newCategories = categories.filter((category) => category !== item._id);
			currentParams.set('categories', newCategories.join(','));
			filterBarEventEmitter.emit('removeCategory', item._id);
			router.push(`?${currentParams.toString()}`, {
				scroll: false,
			});
		},
		[item._id, router, searchParams]
	);

	return (
		<div className="flex h-full w-full select-none justify-center">
			<Link
				locale={locale}
				href={`/products?categories=${item._id}`}
				onMouseDown={exit ? preventDefault : undefined}
				className={cn(
					`flex h-full w-full cursor-pointer items-center gap-4 rounded-full border-2 border-primary px-4 py-2 text-2xl text-primary transition-colors focus:bg-primary focus:text-white`,
					exit ? 'justify-between' : 'justify-center'
				)}
			>
				<p className="text-center text-sm font-medium first-letter:uppercase sm:text-base">
					{item.name[locale]}
				</p>
				{exit ? (
					<button
						onClick={onExit}
						className="flex flex-shrink-0 rounded-full p-1 text-sm font-medium hover:bg-slate-200"
						type="button"
					>
						<span className="icon-[ph--x-circle] h-6 w-6 flex-shrink-0 text-primary" />
					</button>
				) : null}
			</Link>
		</div>
	);
}
