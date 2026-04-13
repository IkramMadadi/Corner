import BlogItem from '#client/BlogItem';
import HorizontalSlider from '#client/Sliders/Horizontal';
import { loadPageBlogs } from '@common/actions/server/Blog';
import { getTranslations } from 'next-intl/server';
import React from 'react';

export default async function BlogsSection({ locale }: { locale: LanguagesI }) {
	const [t, response] = await Promise.all([
		getTranslations({ locale, namespace: 'DiscoverSection' }),
		loadPageBlogs(locale),
	]);
	if (!response.success) throw new Error(response.message);
	const { list: blogs, total } = response.data;
	if (!total) return null;
	return (
		<section className="container mx-auto flex flex-col items-center overflow-x-hidden px-4 py-20">
			{/* texts */}
			<div className="w-full text-center sm:max-w-[600px]">
				<h2 className="mb-4 text-2xl font-bold sm:text-3xl lg:text-4xl">{t('blogTitle')}</h2>
				<p className="text-xs text-blackN sm:text-sm lg:text-base">{t('blogDescription')}</p>
			</div>
			<HorizontalSlider RenderComponent={BlogItem} slides={blogs} />
		</section>
	);
}
