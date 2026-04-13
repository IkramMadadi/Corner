import React from 'react';
import { loadProductBySlug } from '@common/actions/server/Product';
import { notFound } from 'next/navigation';
import SectionProductHeader from '#client/Details/SectionProductHeader';
import SectionProductInfo from '#client/Details/SectionProductInfo';
import loadWebsiteData from '~common/websiteCache';
import ProductInfosLayout from '@common/providers/ProductInfosLayout';
import TrackViewContent from '#client/Details/TrackViewContent';

export default async function ProductDetails({
	params,
}: {
	params: Promise<{ 'product-slug': string; locale: LanguagesI }>;
}) {
	const { 'product-slug': id, locale } = await params;
	const [response, website] = await Promise.all([loadProductBySlug(id, locale), loadWebsiteData()]);

	if (!response.success) {
		return notFound();
	}
	const selectedProduct = response.data;
	/* const reviewsResponse = await loadProductReviews(selectedProduct._id);

	const reviews = reviewsResponse.data || []; */
	return (
		<ProductInfosLayout
			pricePriority={website.pricePriority}
			product={selectedProduct}
			locale={locale}
			freeOver={website.deliverySettings.freeOnOver}
		>
			<TrackViewContent
				productId={selectedProduct._id}
				productName={selectedProduct.name[locale]}
				price={selectedProduct.pricing.current}
				websiteId={website.FY_ID}
			/>
			{/* <SectionNavigation /> */}
			<div className="container mx-auto flex flex-col gap-16 px-4 py-16">
				<SectionProductHeader locale={locale} product={selectedProduct} website={website} />
				<SectionProductInfo product={selectedProduct} locale={locale} />
			</div>
		</ProductInfosLayout>
	);
}
