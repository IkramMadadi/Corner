'use client';

import { useState, useMemo } from 'react';
import { Check, Flame, Star, TrendingUp, Gift, Sparkles, ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { getAllOffers, getNextBetterOffer, VolumeOfferResult } from '@common/utils/frontend/volumePricing';
import { cn } from '@common/utils/frontend/utils';

interface VolumeOfferSelectorProps {
	basePrice: number;
	variants: VariantI[];
	currency?: string;
	onSelect: (result: VolumeOfferResult) => void;
	defaultVariantId?: string;
}

interface OfferCardProps {
	offer: VolumeOfferResult;
	isSelected: boolean;
	isBest: boolean;
	isPopular: boolean;
	currency: string;
	onSelect: () => void;
}

interface NextOfferHintProps {
	nextOffer: { offer: VolumeOfferResult; additionalNeeded: number };
	currentSavings: number;
	onUpgrade: () => void;
}

export function VolumeOfferSelector({
	basePrice,
	variants,
	currency = 'DZD',
	onSelect,
	defaultVariantId,
}: VolumeOfferSelectorProps) {
	const [selectedId, setSelectedId] = useState<string | null>(defaultVariantId ?? null);
	const t = useTranslations('VolumeOffer');

	const allOffers = useMemo(() => getAllOffers(basePrice, variants), [basePrice, variants]);

	const selectedOffer = useMemo(
		() => allOffers.find((o) => o.variant?._id === selectedId) ?? allOffers[0],
		[allOffers, selectedId]
	);

	const nextOffer = useMemo(
		() => (selectedOffer ? getNextBetterOffer(basePrice, variants, selectedOffer.quantity) : null),
		[basePrice, variants, selectedOffer]
	);

	const bestOfferId = useMemo(() => {
		const best = [...allOffers].sort((a, b) => b.savingsPercentage - a.savingsPercentage)[0];
		return best?.variant?._id;
	}, [allOffers]);

	const popularOfferId = useMemo(() => {
		if (allOffers.length >= 3) {
			return allOffers[Math.floor(allOffers.length / 2)]?.variant?._id;
		}
		return null;
	}, [allOffers]);

	const handleSelect = (offer: VolumeOfferResult) => {
		if (!offer.variant) return;
		setSelectedId(offer.variant._id);
		onSelect(offer);
	};

	if (allOffers.length === 0) return null;

	return (
		<div className="w-full space-y-5">
			{/* Header */}
			<div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 p-4">
				<div className="flex items-center gap-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
						<Gift className="h-5 w-5 text-primary" />
					</div>
					<h3 className="text-lg font-bold text-gray-900">{t('title')}</h3>
				</div>
				<Sparkles className="h-5 w-5 text-primary" />
			</div>

			{/* Offers Grid */}
			<div className="space-y-3">
				{allOffers.map((offer) => {
					const isSelected = selectedId === offer.variant?._id;
					const isBest = offer.variant?._id === bestOfferId;
					const isPopular = offer.variant?._id === popularOfferId;

					return (
						<OfferCard
							key={offer.variant?._id}
							offer={offer}
							isSelected={isSelected}
							isBest={isBest}
							isPopular={isPopular}
							currency={currency}
							onSelect={() => handleSelect(offer)}
						/>
					);
				})}
			</div>

			{/* Next Offer Hint */}
			{nextOffer && selectedOffer && (
				<NextOfferHint
					nextOffer={nextOffer}
					currentSavings={selectedOffer.savingsPercentage}
					onUpgrade={() => handleSelect(nextOffer.offer)}
				/>
			)}
		</div>
	);
}

function OfferCard({ offer, isSelected, isBest, isPopular, currency, onSelect }: OfferCardProps) {
	const t = useTranslations('VolumeOffer');
	const { variant, quantity, unitPrice, totalPrice, originalTotal, savingsPercentage } = offer;

	if (!variant) return null;

	return (
		<div
			onClick={onSelect}
			className={cn(
				'group relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-300',
				'hover:scale-[1.02] active:scale-[0.98]',
				isSelected
					? 'bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 shadow-lg shadow-primary/20'
					: 'bg-white shadow-md hover:shadow-xl'
			)}
		>
			{/* Border Animation */}
			<div
				className={cn(
					'absolute inset-0 rounded-2xl transition-all duration-300',
					isSelected
						? 'bg-gradient-to-r from-primary via-primary/80 to-primary p-[2px]'
						: 'bg-gradient-to-r from-gray-200 to-gray-300 p-[1px] group-hover:from-primary/50 group-hover:to-primary/30'
				)}
			>
				<div className="h-full w-full rounded-2xl bg-white"></div>
			</div>

			{/* Content */}
			<div className="relative p-3.5">
				{/* Top Section: Badges & Quantity */}
				<div className="mb-2.5 flex items-center justify-between">
					{/* Left: Badges */}
					<div className="flex gap-1.5">
						{isBest && (
							<span className="flex items-center gap-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-md">
								<Flame className="h-3 w-3" />
								{t('bestValue')}
							</span>
						)}
						{isPopular && !isBest && (
							<span className="flex items-center gap-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-md">
								<Star className="h-3 w-3" />
								{t('popular')}
							</span>
						)}
					</div>

					{/* Right: Quantity Badge */}
					<div className="flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-0.5">
						<span className="text-base font-black text-primary">{quantity}</span>
						<span className="text-[10px] font-semibold text-gray-600">{t('pieces')}</span>
					</div>
				</div>

				{/* Main Content Section */}
				<div className="flex items-center gap-3">
					{/* Checkbox */}
					<div
						className={cn(
							'flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300',
							isSelected
								? 'border-primary bg-primary shadow-md shadow-primary/30'
								: 'border-gray-300 bg-white group-hover:border-primary/50'
						)}
					>
						{isSelected && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
					</div>

					{/* Product & Pricing */}
					<div className="flex flex-1 items-center justify-between gap-2">
						{/* Product Name */}
						<p className="text-xs font-medium text-gray-700">{variant.label.ar}</p>

						{/* Price Section */}
						<div className="text-left">
							<div className="flex items-baseline gap-1.5">
								{savingsPercentage > 0 && (
									<span className="text-[10px] text-gray-400 line-through">{originalTotal}</span>
								)}
								<span className="text-lg font-black text-gray-900">
									{totalPrice}
									<span className="mr-0.5 text-[10px] font-semibold text-gray-600">{currency}</span>
								</span>
							</div>
							<p className="text-[10px] text-gray-500">
								{unitPrice} {currency} / {t('unit')}
							</p>
						</div>
					</div>
				</div>

				{/* Savings Badge - Compact */}
				{savingsPercentage > 0 && (
					<div className="mt-2 flex items-center justify-between gap-2 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 px-2.5 py-1.5">
						<div className="flex items-center gap-1.5">
							<div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500">
								<TrendingUp className="h-3 w-3 text-white" strokeWidth={2.5} />
							</div>
							<span className="text-sm font-black text-green-600">{savingsPercentage}%</span>
						</div>
						<div className="text-left">
							<p className="text-[10px] font-bold text-green-700">
								{t('youSave')}: {offer.savings} {currency}
							</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

function NextOfferHint({ nextOffer, currentSavings, onUpgrade }: NextOfferHintProps) {
	const t = useTranslations('VolumeOffer');
	const extraSavings = nextOffer.offer.savingsPercentage - currentSavings;

	if (extraSavings <= 0) return null;

	return (
		<div
			onClick={onUpgrade}
			className="group relative cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 p-[2.5px] shadow-xl transition-all duration-300 hover:shadow-2xl active:scale-[0.97]"
		>
			{/* Inner Container */}
			<div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-amber-50/50 to-orange-50/30 px-4 py-3.5">
				{/* Animated Circles Background */}
				<div className="absolute inset-0 opacity-5">
					<div className="absolute -right-6 -top-6 h-20 w-20 animate-pulse rounded-full bg-orange-500"></div>
					<div className="absolute -bottom-6 -left-6 h-20 w-20 animate-pulse rounded-full bg-red-500 delay-700"></div>
				</div>

				{/* Content */}
				<div className="relative flex items-center gap-3">
					{/* Icon */}
					<div className="relative flex-shrink-0">
						<div className="absolute inset-0 animate-ping rounded-full bg-amber-400 opacity-20"></div>
						<div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-200 to-orange-200 shadow-lg">
							<span className="text-2xl">💡</span>
						</div>
					</div>

					{/* Text Content */}
					<div className="flex-1 space-y-1.5">
						{/* Badge */}
						<div className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 px-2.5 py-0.5 shadow-md">
							<Sparkles className="h-3 w-3 text-white" />
							<span className="text-[10px] font-black uppercase tracking-wide text-white">عرض خاص</span>
						</div>

						{/* Main Text */}
						<p className="text-sm font-black leading-tight text-gray-900">
							{t('addMore', { count: nextOffer.additionalNeeded })}
						</p>

						{/* Savings Badge */}
						<div className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 px-3 py-1 shadow-lg">
							<Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
							<span className="text-xs font-black text-white">
								وفّر {nextOffer.offer.savingsPercentage}%
							</span>
						</div>
					</div>

					{/* Arrow */}
					<div className="flex-shrink-0 transition-transform duration-300 group-hover:-translate-x-1">
						<div className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-lg">
							<ArrowLeft className="h-4 w-4 text-amber-600" strokeWidth={2.5} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
