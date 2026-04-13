'use client';

import { useState } from 'react';
import Image from 'next/image';
import LikeButton from './Buttons/LikeButton';
import CategoryTag from './CategoryTag';
import { Link } from '@client/i18n/routing';
import ActionButtons from './Buttons/ActionButtons';
import DZD from '@common/utils/frontend/Currency';
import { productTableDataToCart } from '~common/products';
import NumbersFormatter from '@common/utils/frontend/NumbersFormatter';
interface ProductCardProps {
	product: ProductTableDataI;
	locale: LanguagesI;
}
const review: LanguagesContentI = {
	en: 'Reviews',
	fr: 'Avis',
	ar: 'تقييما',
};
function ProductCard({ product, locale }: ProductCardProps) {
	const [imgSrc, setImgSrc] = useState(product.thumbnail?.src || '/images/placeholder.png');

	return (
		<div
			dir={locale === 'ar' ? 'rtl' : 'ltr'}
			className={
				'flex h-full min-h-[420px] w-full max-w-sm select-none flex-col gap-3 rounded-xl border border-productB border-opacity-60 p-3 font-sans shadow-lg md:p-4'
			}
		>
			<div className={'relative flex w-full items-center justify-center'}>
				<Link
					locale={locale}
					href={`/products/${product.slug}`}
					className="mb-auto flex w-full flex-1 flex-col gap-2 font-serif"
				>
					<Image
						className={`h-52 w-auto object-contain md:h-60`}
						src={imgSrc}
						alt={product.thumbnail?.alt || ''}
						width={product.thumbnail?.width || 600}
						height={product.thumbnail?.height || 600}
						loading="lazy"
						onError={() => setImgSrc('/images/placeholder.png')}
						unoptimized={true}
					/>
				</Link>
				<LikeButton
					productId={product._id}
					className="absolute top-0 z-10 ltr:right-0 rtl:left-0 rtl:right-auto"
				/>
			</div>

			<div className="-mt-8 flex w-full grow-0 items-start justify-between">
				{product.category && (
					<CategoryTag
						href={`/products/?categories=${product.category._id}`}
						categoryTag="default"
						label={product.category.name[locale]!}
					/>
				)}
			</div>
			<Link
				locale={locale}
				href={`/products/${product.slug}`}
				className="mb-auto flex w-full flex-1 flex-col gap-2 font-serif"
			>
				<h3 className="text-primaryO text-lg font-medium md:text-xl">{product.name[locale]}</h3>
				<div className="mt-auto flex w-full flex-wrap items-center justify-between gap-2 font-medium">
					<div className="flex shrink-0 items-baseline gap-1">
						<p className="text-base text-secondaryO md:text-lg">
							{DZD[locale].format(product.pricing.current)}
						</p>
						{product.pricing.original ? (
							<p className="text-xs text-secondaryB line-through">
								{DZD[locale].format(product.pricing.original)}
							</p>
						) : null}
					</div>
					<div className="flex items-center gap-2">
						<div className="flex items-center gap-1">
							<span className={'icon-[solar--star-bold] h-4 w-4 text-secondaryY'} />
							<p className="font-noto-serif my-auto font-medium">
								{NumbersFormatter.format(product.ratingAggregation.average)}
							</p>
						</div>
						<div className="mt-1 flex items-center gap-1 text-xs font-normal">
							<p>{product.ratingAggregation.count}</p>
							<p>{review[locale]}</p>
						</div>
					</div>
				</div>
				{/* <p className="text-xs">{product.summary[locale]}</p> */}
			</Link>
			<ActionButtons product={productTableDataToCart(product)} />
		</div>
	);
}

export default ProductCard;
