import CategorySlider from '#client/Sliders/CategorySlider';
import { loadCategoriesByIds } from '@common/actions/server/Category';
import { getTranslations } from 'next-intl/server';
import React from 'react';
import CategoryItem from '#client/CategoryItem';

export default async function CategoriesSection({ locale }: { locale: LanguagesI }) {
	const [t, response] = await Promise.all([
		getTranslations({ locale, namespace: 'HeroSection' }),
		loadCategoriesByIds(locale),
	]);

	if (!response.success) {
		throw new Error(response.message);
	}
	const categories = response.data;
	if (!categories.length) return null;
	return (
		<section className="container mx-auto mt-8 flex flex-col items-center overflow-x-hidden px-4">
			<div className="flex w-full max-w-2xl flex-col gap-10">
				<h2 className="text-center text-lg font-semibold md:text-xl lg:text-2xl xl:text-3xl">
					{t('category')}
				</h2>
				<CategorySlider RenderComponent={CategoryItem} slides={categories} />
			</div>
		</section>
	);
}
