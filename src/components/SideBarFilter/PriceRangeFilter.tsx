'use client';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import React, { useEffect, useMemo, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import DZD from '@common/utils/frontend/Currency';
import { filterBarEventEmitter } from '@common/events/filterBar';

export default function PriceRangeFilter({ priceRange: defaultPriceRange }: { priceRange: NumbersRangeI }) {
	const t = useTranslations('Filters');
	const PRICE_RANGE = useMemo(
		() => [Math.max(0, defaultPriceRange.min - 100), defaultPriceRange.max + 100],
		[defaultPriceRange]
	);
	const [showPriceSlider, setShowPriceSlider] = useState(false);
	const [priceRange, setPriceRange] = useState(PRICE_RANGE);
	const [debouncedPriceRange] = useDebounce(priceRange, 750);
	const router = useRouter();
	const searchParams = useSearchParams();
	const locale = useLocale() as LanguagesI;

	useEffect(() => {
		const currentParams = new URLSearchParams(searchParams.toString());
		if (debouncedPriceRange && debouncedPriceRange.length >= 2) {
			currentParams.set('min-price', debouncedPriceRange[0].toString());
			currentParams.set('max-price', debouncedPriceRange[1].toString());
		} else {
			currentParams.delete('min-price');
			currentParams.delete('max-price');
		}
		// Push the new URL with updated query parameters
		router.push(`?${currentParams.toString()}`, {
			scroll: false,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedPriceRange]);
	useEffect(() => {
		const emptyFilter = () => {
			setShowPriceSlider(false);
			setPriceRange(PRICE_RANGE);
		};
		filterBarEventEmitter.on('emptyFilterBar', emptyFilter);
		return () => {
			filterBarEventEmitter.off('emptyFilterBar', emptyFilter);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div className="flex flex-col gap-4">
			<button
				className="flex w-full items-center justify-between rounded-2xl border border-neutral-300 px-4 py-3 font-serif font-medium"
				onClick={() => setShowPriceSlider(!showPriceSlider)}
			>
				<span>{t('price')}</span>
				<span className="flex h-7 w-7 items-center justify-center rounded-full border border-blackN shadow-lg">
					<span
						className={`h-5 w-5 transform rounded-full border border-blackN transition-transform ${
							showPriceSlider ? 'rotate-180' : ''
						} icon-[material-symbols--keyboard-arrow-down-rounded]`}
					/>
				</span>
			</button>
			{showPriceSlider && (
				<div className="flex flex-col gap-4">
					<Slider
						range
						min={PRICE_RANGE[0]}
						max={PRICE_RANGE[1]}
						step={50}
						defaultValue={priceRange}
						allowCross={false}
						onChange={(value) => {
							setPriceRange(value as number[]);
						}}
					/>
					<div className="flex justify-between">
						<span>{DZD[locale].format(priceRange[0])}</span>
						<span>{DZD[locale].format(priceRange[1])}</span>
					</div>
				</div>
			)}
		</div>
	);
}
