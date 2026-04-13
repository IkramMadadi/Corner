import React from 'react';
import ButtonSecondary from '#client/Buttons/ButtonSecondary';
import HorizontalSlider from '#client/Sliders/Horizontal';

import { loadPageProducts } from '@common/actions/server/Product';
import { getTranslations } from 'next-intl/server';
import ProductItem from '#client/Sliders/ProductItem';

export default async function DiscoverSection({ locale }: { locale: LanguagesI }) {
	const [t, productsResponse] = await Promise.all([
		getTranslations({ locale, namespace: 'DiscoverSection' }),
		loadPageProducts(locale),
	]);
	// Nettoyage des produits
	if (!productsResponse.success) throw new Error(productsResponse.message);
	const { list: products, total } = productsResponse.data;
	if (!products || products.length === 0) return null;
	if (!total) return null;

	return (
		<section className="relative flex w-full flex-col">
			{/* <div className="container mx-auto w-full text-center text-3xl font-bold md:text-4xl lg:text-start lg:text-5xl">
				<h2 className="lg:max-w-[24ch]">{t('title')}</h2>
			</div> */}
			<div className="container mx-auto flex flex-col items-center justify-center gap-6 overflow-visible px-4">
				<h3 className="text-3xl font-bold lg:text-5xl">{t('featuring')}</h3>
				<p className="max-w-2xl text-center text-sm">{t('description')}</p>
				{/* <hr className="hidden h-[32rem] border border-grayN lg:block" /> */}
				<div className="flex w-full flex-col items-center gap-6 px-4">
					<HorizontalSlider RenderComponent={ProductItem} slides={products} />
				</div>
				<ButtonSecondary href={'/products'} fontSize="text-lg xl:text-xl">
					{t('button')}
				</ButtonSecondary>
			</div>
			{/* 	<Image
				className="absolute -bottom-[15%] left-[20%] -z-20"
				src={'/images/star.png'}
				alt="star decoration image"
				width={189}
				height={189}
			/>
			<Image
				className="absolute right-0 top-0 -z-20 translate-x-1/2 transform"
				src={'/images/star.png'}
				alt="star decoration image"
				width={189}
				height={189}
			/> */}
		</section>
	);
}
