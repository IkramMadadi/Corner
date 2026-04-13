import ButtonPrimary from '#client/Buttons/ButtonPrimary';
import { loadCategoriesByIds } from '@common/actions/server/Category';
import { getTranslations } from 'next-intl/server';
import React from 'react';
import CTA from './CTA';
import MainImages from './MainImages';
import Details from './Details';
import CategorySlider from '#client/Sliders/CategorySlider';
import CategoryItem from '#client/CategoryItem';

export default async function BaseHero({
	locale,
	websiteInformation,
}: {
	locale: LanguagesI;
	websiteInformation: WebsiteInformationI;
}) {
	const [t, response] = await Promise.all([
		getTranslations({ locale, namespace: 'HeroSection' }),
		loadCategoriesByIds(locale),
	]);

	if (!response.success) {
		throw new Error(response.message);
	}
	const categories = response.data;
	return (
		<div className="container relative z-10 mx-auto grid grid-cols-1 gap-x-4 px-4 md:grid-cols-12 lg:py-10 xl:grid-rows-4 xl:justify-between">
			{/* Description & Call to Action */}
			<div className="col-span-1 flex w-full flex-col gap-6 py-8 text-center md:col-[1/span_6] xl:col-[1/span_5] xl:row-[1/span_3] xl:text-start">
				<div className="text-center lg:text-start">
					<div className="flex flex-wrap items-center justify-center gap-5 lg:justify-start">
						<p className="text-sm lg:text-base">
							<span className="icon-[meteocons--star-fill] h-5 w-5 text-yellow-500" />
							{t('discover')}
						</p>
						<ButtonPrimary
							fontSize="text-sm"
							className="flex gap-2 shadow-lg shadow-primary/30 sm:px-6 md:px-2 2xl:px-6"
							href={'/products'}
						>
							<span className="flex md:hidden 2xl:flex">{t('available')}</span>
							<span className="icon-[iconoir--nav-arrow-right] h-5 w-5 rtl:rotate-180" />
						</ButtonPrimary>
					</div>
					{/* Title */}
					<h1 className="mt-6 text-3xl font-bold lg:text-5xl lg:leading-snug">{t('title')}</h1>
				</div>

				{/* CTA Buttons */}
				<CTA locale={locale} />
			</div>

			{/* Product Showcase with superimposed images */}
			<MainImages />
			{/* Brand details */}
			<Details description={websiteInformation.description[locale]} />
			{/* Browse Categories */}
			{categories.length > 0 && (
				<div className="col-span-1 flex flex-col gap-10 md:col-span-12 xl:col-span-5 xl:col-start-1 xl:row-span-1">
					<h2 className="text-center text-lg font-semibold lg:text-start lg:text-2xl">{t('category')}</h2>
					<CategorySlider RenderComponent={CategoryItem} slides={categories} />
				</div>
			)}
		</div>
	);
}
