/* import Image from 'next/image'; */
import React from 'react';
import BenefitItem from '#client/BenefitItem';
import { getTranslations } from 'next-intl/server';
/* import { cn } from '@common/utils/frontend/utils';
import { truncateText } from '@common/utils/frontend/truncate';
import BlobImage from '#client/BlobImage'; */

export default async function BenefitsSection({
	locale,
	services,
	/* testimonials, */
}: {
	locale: LanguagesI;
	/* testimonials: RatedServiceElementI[]; */
	services: ServiceElementI[];
}) {
	const t = await getTranslations({ locale, namespace: 'BenefitSection' });
	if (!services || !services.length) return null;
	return (
		<section
			id="benefits"
			className="container mx-auto flex flex-col justify-between gap-4 px-4 py-16 text-center sm:text-start lg:gap-24"
		>
			{/* Benefits */}
			<div className="flex w-full flex-col items-center gap-6 text-center">
				<h2 className="text-3xl font-bold sm:text-3xl lg:text-5xl">{t('title')}</h2>
				<p className="w-full max-w-3xl text-sm sm:text-sm lg:text-base">{t('description')}</p>
				<div className="mt-16 grid grid-cols-2 justify-center gap-10 md:grid-cols-4">
					{services.map((benefit, i) => (
						<BenefitItem key={i} benefit={benefit} locale={locale} />
					))}
				</div>
			</div>
			{/* Image */}
			{/* <TestimonialImages testimonials={testimonials} locale={locale} /> */}
		</section>
	);
}
/* function TestimonialImages({ testimonials, locale }: { testimonials: RatedServiceElementI[]; locale: LanguagesI }) {
	return (
		<div className="relative flex w-full items-center justify-center gap-12 overflow-hidden pb-20 sm:gap-20 lg:order-first lg:basis-[40%] lg:overflow-visible">
			<Image
				src={'/images/ear.svg'}
				width={112}
				height={396}
				alt="bottle image"
				quality={100}
				className="-z-10 aspect-[2/7] h-full max-h-32 w-auto -scale-x-100 sm:max-h-64 lg:hidden"
				priority
			/>
			<div className="relative h-full w-full">
				<Image
					src={'/images/spiral-2.png'}
					width={407}
					height={409}
					alt="bottle image"
					quality={100}
					className="absolute left-1/2 top-1/2 -z-10 aspect-square h-full -translate-x-1/2 -translate-y-1/2 scale-x-[1.6] lg:left-[45%]"
					priority
				/>

				<div className="aspect-[4/7] h-full w-full xl:absolute xl:-bottom-[40%] xl:-left-[25%] xl:h-[710px]">
					<BlobImage
						baseId="cream"
						image={'/images/cream.webp'}
						className="h-full w-full object-cover object-center"
					/>
				</div>

				<div
					className="absolute bottom-0 right-0 aspect-[4/7] h-60 w-60 md:-right-[10%] md:h-80 md:w-80 xl:-bottom-[30%] xl:right-0 xl:h-96 xl:w-96"
					// style={{
					// 	clipPath:
					// 		'path("M242.975 48.6762C197.99 50.9967 185.649 11.4973 147.749 2.2497C107.388 -7.60313 89.1711 16.9103 84.8576 36.953C81.5325 52.4032 74.5435 59.1097 56.1236 63.4057C42.9946 65.8179 31.3612 72.6508 34.4083 91.393C37.4555 110.135 31.2791 121.326 22.0848 128.03C12.8905 134.736 4.31258 144.255 1.29562 156.657C-3.81441 177.649 6.57359 199.638 25.7191 209.386C47.2335 220.108 58.7881 231.845 57.277 256.189C56.8993 262.273 59.4345 294.643 90.195 284.858C97.964 282.387 130.103 265.722 149.606 296.652C154.462 304.354 166.487 311.932 177.476 314.617C206.943 321.809 237.07 300.054 240.062 270.099C243.307 247.934 247.333 237.541 271.258 245.283C294.931 252.943 309.097 219.945 295.852 203.017C277.468 183.938 299.404 149.626 306.371 120.996C315.893 81.8616 282.241 44.4141 242.975 48.6762Z")',
					// }}
				>
					<BlobImage
						baseId="bottle"
						image={'/images/huile.webp'}
						className="h-full w-full object-cover object-center"
					/>
				</div>
				{testimonials[0] ? (
					<TestimonialItem
						item={testimonials[0]}
						locale={locale}
						className="left-1/4 top-[20%] -translate-x-1/3 translate-y-1/2 xl:-top-[5%] xl:left-[20%]"
					/>
				) : null}
				{testimonials[1] ? (
					<TestimonialItem
						item={testimonials[1]}
						locale={locale}
						className="bottom-[10%] left-1/4 -translate-x-1/3 -translate-y-1/2 xl:-bottom-[10%] xl:left-[20%]"
					/>
				) : null}
				{testimonials[2] ? (
					<TestimonialItem
						item={testimonials[2]}
						locale={locale}
						className="right-0 top-1/2 -translate-y-1/2 translate-x-1/2 xl:right-[15%] xl:top-1/2"
					/>
				) : null}
			</div>
			<Image
				src={'/images/ear.svg'}
				width={112}
				height={396}
				alt="bottle image"
				quality={100}
				className="-z-10 aspect-[2/7] h-full max-h-32 w-auto sm:max-h-64 lg:hidden"
				priority
			/>
		</div>
	);
} */
/* function TestimonialItem({
	item,
	locale,
	className,
}: {
	item: RatedServiceElementI;
	className: string;
	locale: LanguagesI;
}) {
	return (
		<div
			className={cn('absolute hidden max-w-64 items-center gap-2 rounded-2xl bg-slate-50 p-2 lg:flex', className)}
		>
			<Image
				className="h-10 w-10 rounded-full"
				src={item.image.src}
				alt={item.title[locale]}
				width={item.image.width}
				height={item.image.height}
				quality={80}
				loading="lazy"
			/>
			<p className="font-sans text-xs">{truncateText(item.description[locale], 48)}</p>
		</div>
	);
}
 */
