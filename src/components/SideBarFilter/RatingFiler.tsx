'use client';

import RadioFilter from '#client/RadioFilter';
import { filterBarEventEmitter } from '@common/events/filterBar';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const ratingFilters = [
	{ name: 'rating', value: '4' },
	{ name: 'rating', value: '3' },
];
export default function RatingFiler() {
	const t = useTranslations('Filters');
	const [rating, setRating] = useState<string | null>(null);
	const router = useRouter();
	const searchParams = useSearchParams();

	useEffect(() => {
		// Create a new URLSearchParams instance to preserve existing queries
		const currentParams = new URLSearchParams(searchParams.toString());
		if (rating) {
			currentParams.set('min-rating', rating);
		} else {
			currentParams.delete('min-rating');
		}
		// Push the new URL with updated query parameters
		router.push(`?${currentParams.toString()}`, {
			scroll: false,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [rating]);
	useEffect(() => {
		const emptyFilter = () => {
			setRating(null);
		};
		filterBarEventEmitter.on('emptyFilterBar', emptyFilter);
		return () => {
			filterBarEventEmitter.off('emptyFilterBar', emptyFilter);
		};
	}, []);
	return (
		<div className="flex w-full flex-col gap-4">
			<h3 className="font-serif">{t('rating')}</h3>
			{ratingFilters.map((r, i) => (
				<RadioFilter
					key={i}
					name={r.name}
					value={r.value}
					checked={r.value === rating}
					onChange={() => setRating(r.value)}
				>
					<div className="flex items-center">
						{[...Array(+r.value)].map((_, index) => (
							<span key={`full-${index}`} className="icon-[solar--star-bold] h-6 w-6 text-secondaryY" />
						))}
						<span className="ml-2 text-sm text-gray-600">{t('up')}</span>
					</div>
				</RadioFilter>
			))}
		</div>
	);
}
