'use client';

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaCarouselType } from 'embla-carousel';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import SimilarProductCard from './SimilarProductCard';

interface SimilarProduct {
	_id: string;
	name: LanguagesContentI;
	thumbnail: ImageI;
	slug: string;
	pricing: PricingI;
	label?: string;
	ratingAggregation?: RatingAggregationI;
}

interface SimilarProductsCarouselProps {
	products: SimilarProduct[];
	locale: LanguagesI;
	title?: string;
}

export default function SimilarProductsCarousel({ products, locale, title }: SimilarProductsCarouselProps) {
	const isRTL = locale === 'ar';

	const [emblaRef, emblaApi] = useEmblaCarousel({
		loop: true,
		direction: isRTL ? 'rtl' : 'ltr',
		align: 'start',
		skipSnaps: false,
	});

	const [isScrollable, setIsScrollable] = useState(false);

	const updateScrollable = useCallback((api: EmblaCarouselType | undefined | null) => {
		if (!api) return;
		setIsScrollable(api.scrollSnapList().length > 1);
	}, []);

	useEffect(() => {
		if (!emblaApi) return;
		updateScrollable(emblaApi);
		emblaApi.on('reInit', updateScrollable);
	}, [emblaApi, updateScrollable]);

	const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
	const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

	if (!products?.length) return null;

	return (
		<section className="w-full bg-white py-12">
			<div className="container mx-auto px-4">
				{/* Header Section */}
				<div className="mb-8 flex items-end justify-between">
					<div className="space-y-1">
						<h2 className="text-2xl font-black text-gray-900 sm:text-4xl">
							{title || (isRTL ? 'منتجات مشابهة' : 'Similar Selection')}
						</h2>
					</div>

					{isScrollable && (
						<div className="hidden gap-2 sm:flex">
							<button
								onClick={isRTL ? scrollNext : scrollPrev}
								className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white transition-all hover:bg-black hover:text-white active:scale-95"
							>
								<ArrowLeft size={20} className={isRTL ? 'rotate-180' : ''} />
							</button>
							<button
								onClick={isRTL ? scrollPrev : scrollNext}
								className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white transition-all hover:bg-black hover:text-white active:scale-95"
							>
								<ArrowRight size={20} className={isRTL ? 'rotate-180' : ''} />
							</button>
						</div>
					)}
				</div>

				<div className="relative overflow-hidden" ref={emblaRef}>
					<div className="-ml-4 flex touch-pan-y">
						{products.map((product, index) => (
							<div
								key={`${product._id}-${index}`}
								className="min-w-0 flex-[0_0_50%] pl-4 sm:flex-[0_0_33.33%] md:flex-[0_0_25%] lg:flex-[0_0_20%]"
							>
								<SimilarProductCard product={product} locale={locale} />
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
