'use client';
import RadioFilter from '#client/RadioFilter';
import Status from '#client/Status';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { filterBarEventEmitter } from '@common/events/filterBar';

const availabilityFilters: {
	value: ProductLabelsT;
	title: LanguagesContentI;
}[] = [
	{
		value: 'onSale',
		title: {
			en: 'On Sale',
			ar: 'على التخفيض',
			fr: 'En solde',
		},
	},

	{
		value: 'bestSeller',
		title: {
			en: 'Best Seller',
			ar: 'أفضل المبيعات',
			fr: 'Meilleur article',
		},
	},
	{
		value: 'new',
		title: {
			en: 'New',
			ar: 'جديد',
			fr: 'Nouveau',
		},
	},
];
export default function LabelsFilters() {
	const t = useTranslations('Filters');
	const locale = useLocale() as LanguagesI;
	const [availability, setAvailability] = useState<string>('');
	const router = useRouter();
	const searchParams = useSearchParams();

	useEffect(() => {
		const currentParams = new URLSearchParams(searchParams.toString());
		if (availability) {
			// Create a new URLSearchParams instance to preserve existing queries
			currentParams.set('label', availability); // Set or update the "rating" query
			// Push the new URL with updated query parameters
		} else {
			currentParams.delete('label'); // Set or update the "rating" query
		}
		router.push(`?${currentParams.toString()}`, {
			scroll: false,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [availability]);

	useEffect(() => {
		const emptyFilter = () => {
			setAvailability('');
		};
		filterBarEventEmitter.on('emptyFilterBar', emptyFilter);
		return () => {
			filterBarEventEmitter.off('emptyFilterBar', emptyFilter);
		};
	}, []);

	return (
		<div className="flex w-full flex-col gap-4">
			<h3 className="font-serif">{t('availability')}</h3>
			{availabilityFilters.map((av, i) => (
				<RadioFilter
					key={i}
					name={'label'}
					value={av.value}
					onChange={() => setAvailability(av.value)}
					checked={av.value === availability}
				>
					<Status status={av.value} label={av.title[locale]} />
				</RadioFilter>
			))}
		</div>
	);
}
