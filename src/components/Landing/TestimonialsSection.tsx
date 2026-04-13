import HorizontalSlider from '#client/Sliders/Horizontal';
import TestimonialItem from '#client/Sliders/TestimonialItem';
import { getTranslations } from 'next-intl/server';
/* import Image from 'next/image'; */
import React from 'react';

export default async function TestimonialsSection({
	locale,
	testimonials,
}: {
	locale: LanguagesI;
	testimonials: PublicRatedServiceElementI[];
}) {
	const t = await getTranslations({ locale, namespace: 'HomePage' });
	const data = testimonials || [];

	return (
		<section
			className="gap-18 relative flex select-none flex-col items-center overflow-x-hidden py-32"
			id="testimonials"
		>
			{/* texts */}
			<div className="px-4 text-center sm:max-w-[600px]">
				<h2 className="mb-4 select-none text-2xl font-bold sm:text-3xl lg:text-4xl">
					{t('testimonialsTitle')}
				</h2>
				<p className="select-none text-xs sm:text-sm lg:text-base">{t('testimonialsDescription')}</p>
			</div>
			<HorizontalSlider RenderComponent={TestimonialItem} slides={data} showControl={false} />

			{/* <Image
				className="absolute -left-[5%] top-[15%] z-[-20]"
				src={'/images/Hope.png'}
				width={161}
				height={250}
				alt="Doriane micellaire"
			/>
			<Image
				className="absolute -right-[5%] top-[15%] z-[-20]"
				src={'/images/Hope.png'}
				width={161}
				height={250}
				alt="Doriane micellaire"
			/> */}
		</section>
	);
}
