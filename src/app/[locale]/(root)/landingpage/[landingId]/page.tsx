import dynamicImport from 'next/dynamic';
import { Suspense } from 'react';
import DeliveryForm from '#client/Checkout/DeliveryForm';
import GuestInfo from '#client/Checkout/GuestInfo';
import DetailsActions from '#client/Details/DetailsActionPage';
import SingleProductPayment from '#client/Details/SingleProductPaymentLandingPage';
import { Section } from '#client/Section';
import { getLandingData, loadProductBySlug, loadSimilarProducts } from '@common/actions/server/Product';
import { getUpsellParentData } from '@common/actions/server/Upsell';
import ProductInfosLayout from '@common/providers/ProductInfosLayout';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import loadWebsiteData from '~common/websiteCache';
import { unstable_cache as unstableCache } from 'next/cache';
import { LandingPageOptimizedI } from '&common/LandingPage';
import { LandingVolumeOffer } from '#client/Landing/LandingVolumeOffer';
import SimilarProductsCarousel from '#client/Landing/SimilarProductsCarousel';
import { UpsellWrapper } from '#client/upsell/UpsellWrapper';
import ColorSelector from '#client/Landing/ColorSelector';

export const runtime = 'nodejs';
export const revalidate = 3600;

const AutoAddToCart = dynamicImport(() => import('#client/AutoAddToCart'));
const TrackViewContent = dynamicImport(() => import('#client/Details/TrackViewContent'));

const StickyScrollToFormButton = dynamicImport(() =>
	import('#client/Checkout/StickyScrollToFormButton').then((m) => m.StickyScrollToFormButton)
);
const WhatsAppFloatingButton = dynamicImport(() =>
	import('#client/Checkout/StickyScrollToFormButton').then((m) => m.WhatsAppFloatingButton)
);

const getLandingDataCached = (landingId: string) =>
	unstableCache(
		async () => {
			return getLandingData(landingId);
		},
		['landing-data', landingId],
		{ revalidate: 3600 }
	)();

const loadProductBySlugCached = (slug: string, locale: LanguagesI) =>
	unstableCache(
		async () => {
			return loadProductBySlug(slug, locale);
		},
		['product-by-slug', slug],
		{ revalidate: 900 }
	)();

const loadSimilarProductsCached = (categoryId: string, productId: string, locale: LanguagesI) =>
	unstableCache(
		async () => {
			return loadSimilarProducts(categoryId, productId, locale, 10);
		},
		['similar-products', categoryId, productId],
		{ revalidate: 1800 }
	)();

const getUpsellParentDataCached = (productId: string, locale: LanguagesI) =>
	unstableCache(
		async () => {
			return getUpsellParentData(productId, locale);
		},
		['upsell-parent', productId, locale],
		{ revalidate: 3600 }
	)();

export default async function LandingPage({ params }: { params: Promise<{ landingId: string; locale: LanguagesI }> }) {
	const { landingId, locale } = await params;

	const [response, website] = await Promise.all([getLandingDataCached(landingId), loadWebsiteData()]);

	if (!response.success || !response.data) {
		return notFound();
	}

	const data = response.data as LandingPageOptimizedI;

	const product = await loadProductBySlugCached(data.ProductId, locale);

	if (!product || !product.data || 'error' in product.data) {
		return notFound();
	}

	const selectedProduct = product.data;

	const categoryId =
		typeof selectedProduct.category === 'string' ? selectedProduct.category : selectedProduct.category?._id;

	const [similarProductsResponse, upsellParent] = await Promise.all([
		categoryId ? loadSimilarProductsCached(categoryId, selectedProduct._id, locale) : null,
		getUpsellParentDataCached(selectedProduct._id, locale),
	]);

	const similarProducts = similarProductsResponse?.success ? similarProductsResponse.data : [];

	const [firstImage, ...otherImages] = [...data.images].sort((a, b) => {
		const ap = a.src.includes('main') || a.src.includes('hero') ? -1 : 0;
		const bp = b.src.includes('main') || b.src.includes('hero') ? -1 : 0;
		return ap - bp;
	});

	return (
		<ProductInfosLayout
			pricePriority={website.pricePriority}
			product={selectedProduct}
			locale={locale}
			freeOver={website.deliverySettings.freeOnOver}
		>
			<Suspense fallback={null}>
				<TrackViewContent
					productId={selectedProduct._id}
					productName={selectedProduct.name[locale]}
					price={selectedProduct.pricing.current}
					websiteId={website.FY_ID}
				/>
			</Suspense>

			<Suspense fallback={null}>
				<AutoAddToCart />
			</Suspense>

			<div className="w-full">
				<Image
					src={firstImage.src}
					alt={firstImage.alt || ''}
					width={firstImage.width}
					height={firstImage.height}
					loading="eager"
					priority
					sizes="100vw"
					className="h-auto w-full object-contain"
				/>
			</div>

			<div className="p-4" id="order-section">
				<Section className="border-2">
					<LandingVolumeOffer />
					<GuestInfo />
					<Section>
						<DeliveryForm paymentsFees={website.PaymentFees} editable />
						<ColorSelector />
					</Section>
					<SingleProductPayment />
					<DetailsActions websiteId={website.FY_ID} />
				</Section>
			</div>

			<div className="w-full">
				{otherImages.map((image) => (
					<div key={image.src} className="w-full">
						<Image
							src={image.src}
							alt={image.alt || ''}
							width={image.width}
							height={image.height}
							loading="lazy"
							sizes="100vw"
							className="h-auto w-full object-contain"
						/>
					</div>
				))}
			</div>

			{similarProducts && similarProducts.length > 0 && (
				<SimilarProductsCarousel products={similarProducts} locale={locale} />
			)}

			{upsellParent && <UpsellWrapper upsellParent={upsellParent} />}
			<Suspense fallback={null}>
				<StickyScrollToFormButton />
			</Suspense>
			<Suspense fallback={null}>
				<WhatsAppFloatingButton />
			</Suspense>
		</ProductInfosLayout>
	);
}
