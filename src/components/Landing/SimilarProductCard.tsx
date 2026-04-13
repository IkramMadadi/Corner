'use client';

import Image from 'next/image';
import Link from 'next/link';

interface SimilarProductCardProps {
	product: {
		_id: string;
		name: LanguagesContentI;
		thumbnail: ImageI;
		slug: string;
		pricing: PricingI;
		label?: string;
		ratingAggregation?: RatingAggregationI;
	};
	locale: LanguagesI;
}

export default function SimilarProductCard({ product, locale }: SimilarProductCardProps) {
	const isRTL = locale === 'ar';

	const hasDiscount =
		product.pricing.original && product.pricing.original > product.pricing.current && product.pricing.original > 0;

	const discountPercentage = hasDiscount
		? Math.round(((product.pricing.original! - product.pricing.current) / product.pricing.original!) * 100)
		: null;

	return (
		<Link
			href={`/${locale}/products/${product.slug}`}
			className="group block h-full flex-none transition-all duration-500 hover:-translate-y-1"
		>
			<div className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-white transition-shadow duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
				<div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-gray-50">
					<Image
						src={product.thumbnail.src}
						alt={product.name[locale] || 'Product'}
						fill
						className="object-cover transition-transform duration-1000 group-hover:scale-110"
						sizes="(max-width: 768px) 50vw, 20vw"
					/>

					<div className={`absolute top-3 flex flex-col gap-2 ${isRTL ? 'right-3' : 'left-3'}`}>
						{hasDiscount && (
							<span className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-lg ring-4 ring-white">
								-{discountPercentage}%
							</span>
						)}
						{product.label && (
							<span className="rounded-full bg-black/70 px-3 py-1 text-[9px] font-bold uppercase tracking-tighter text-white backdrop-blur-md">
								{product.label}
							</span>
						)}
					</div>
				</div>

				<div className="flex flex-grow flex-col p-4">
					<h3 className="line-clamp-2 min-h-[40px] text-sm font-semibold leading-snug text-gray-800 transition-colors group-hover:text-primary">
						{product.name[locale]}
					</h3>

					<div className="mt-auto pt-3">
						<div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
							<span className="text-lg font-black tracking-tight text-gray-900">
								{product.pricing.current.toLocaleString()}
								<span className="mr-1 text-[11px] font-bold uppercase text-gray-400"> Da</span>
							</span>

							{hasDiscount && product.pricing.original! > 0 && (
								<span className="text-xs text-gray-400 line-through decoration-red-400/50 opacity-70">
									{product.pricing.original!.toLocaleString()}
								</span>
							)}
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
}
