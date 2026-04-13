'use client';
import React, { type ComponentType, useCallback } from 'react';
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel';
import { PrevButton, NextButton, usePrevNextButtons } from './EmblaCarouselArrowButtons';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';

import './style.css';

interface PropType<T extends { _id: string }> {
	slides: T[];
	RenderComponent?: ComponentType<{ item: T; index: number }>;
	options?: EmblaOptionsType;
	showControl?: boolean;
}

function BannerSlider<T extends { _id: string }>({
	slides,
	options = { loop: true },
	showControl = true,
	RenderComponent,
}: PropType<T>) {
	const [emblaRef, emblaApi] = useEmblaCarousel(options, [
		Autoplay({
			delay: 6000,
			stopOnInteraction: false,
		}),
	]);

	const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
		const autoplay = emblaApi?.plugins()?.autoplay;
		if (!autoplay) return;

		const resetOrStop = autoplay.options.stopOnInteraction === false ? autoplay.reset : autoplay.stop;

		resetOrStop();
	}, []);

	const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(
		emblaApi,
		onNavButtonClick
	);
	if (!slides || slides.length === 0) return null;
	return (
		<section className="banner-slider slider" dir="ltr">
			<div className="slider__viewport" ref={emblaRef}>
				<div className="slider__container">
					{slides.map((item, index) => (
						<div className="slider__slide" key={item._id || `slide-${index}`}>
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

			{showControl && slides.length > 1 && (
				<div className="slider__buttons">
					<PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
					<NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
				</div>
			)}
		</section>
	);
}

export default BannerSlider;
