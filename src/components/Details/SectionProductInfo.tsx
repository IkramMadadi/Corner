import React from 'react';

import Ratings from './Ratings';
import ProductInfoTab from './ProductInfoTab';
import ReviewsTab from './ReviewsTab';
import { getTranslations } from 'next-intl/server';

interface SectionProductInfoProps {
	product: PublicProductI<string, string, BasicPublishableInformationWithIdI>;
	locale: LanguagesI;
}

export default async function SectionProductInfo({ product, locale }: SectionProductInfoProps) {
	const t = await getTranslations({ locale, namespace: 'ProductDetailsPage' });

	return (
		<div className="grid gap-16 lg:grid-cols-6">
			<Ratings ratings={product.ratingAggregation} />
			<ProductInfoTab
				className="lg:col-span-4"
				tabs={[`${t('reviews')} (${product.ratingAggregation.count})`]}
				TabsContent={[<ReviewsTab locale={locale} key="tab-1" product={product} />]}
			/>
		</div>
	);
}
