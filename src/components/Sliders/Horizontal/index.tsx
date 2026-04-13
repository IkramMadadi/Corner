'use client';
import React, { type ComponentType, useCallback } from 'react';
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel';
import { DotButton, useDotButton } from './EmblaCarouselDotButton';
import { PrevButton, NextButton, usePrevNextButtons } from './EmblaCarouselArrowButtons';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';

import './style.css';
import { cn } from '@common/utils/frontend/utils';

interface PropType<T extends { _id: string }> {
	slides: T[];
	RenderComponent?: ComponentType<{ item: T; index: number }>;
	options?: EmblaOptionsType;
	showDots?: boolean;
	showControl?: boolean;
}

function HorizontalSlider<T extends { _id: string }>({
	slides,
	options = { align: 'center', dragFree: true, loop: true },
	showDots = true,
	showControl = true,
	RenderComponent,
}: PropType<T>) {
	const [emblaRef, emblaApi] = useEmblaCarousel(options, [
		Autoplay({
			delay: 3000,
			stopOnInteraction: false,
		}),
	]);

	const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
		const autoplay = emblaApi?.plugins()?.autoplay;
		if (!autoplay) return;

		const resetOrStop = autoplay.options.stopOnInteraction === false ? autoplay.reset : autoplay.stop;

		resetOrStop();
	}, []);

	const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi, onNavButtonClick);

	const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(
		emblaApi,
		onNavButtonClick
	);
	if (!slides || slides.length === 0) return null;
	return (
		<section className="slider product-slider" dir="ltr">
			<div className="slider__viewport" ref={emblaRef}>
				<div className="slider__container">
					{slides.map((item, index) => (
						<div className="slider__slide product-slider__slide" key={item._id || `slide-${index}`}>
							{RenderComponent ? (
								<RenderComponent item={item} index={slides.indexOf(item)} />
							) : (
								// Default rendering if no custom component is provided
								<div className="rounded-lg border border-gray-200 p-4">
									<p className="text-center text-gray-500">No custom render component provided.</p>
								</div>
							)}
						</div>
					))}
				</div>
			</div>

			{showControl && (
				<div className="product-slider__buttons slider__buttons">
					<PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
					{showDots && (
						<div className="slider__dots">
							{scrollSnaps.map((_, index) => (
								<DotButton
									key={index}
									onClick={() => onDotButtonClick(index)}
									className={cn('slider__dot', {
										'slider__dot--selected': index === selectedIndex,
									})}
									style={
										{
											'--dot-order': index / scrollSnaps.length,
										} as React.CSSProperties
									}
								/>
							))}
						</div>
					)}
					<NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
				</div>
			)}
		</section>
	);
}

export default HorizontalSlider;
