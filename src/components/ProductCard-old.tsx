import Image from 'next/image';
import LikeButton from './Buttons/LikeButton';
import Status from './Status';
import CategoryTag from './CategoryTag';
import { Link } from '@client/i18n/routing';
import ActionButtons from './Buttons/ActionButtons';
import { cn } from '@common/utils/frontend/utils';
import DZD from '@common/utils/frontend/Currency';
import { productTableDataToCart } from '~common/products';
import { productLabelsMap } from '@common/data/enums/generalEnums';
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
	return (
		<div
			dir={locale === 'ar' ? 'rtl' : 'ltr'}
			className={cn(
				'flex h-full min-h-[420px] w-full min-w-min max-w-sm flex-col gap-3 p-4 font-serif md:p-6 lg:max-w-md',
				'select-none rounded-xl font-sans'
			)}
		>
			<div className="relative mb-2 w-full">
				<div
					className={cn(
						'flex h-40 w-full items-center justify-center overflow-hidden bg-[#D95A820F] lg:h-48',
						'rounded-xl'
					)}
				>
					{product.thumbnail && (
						<Image
							src={product.thumbnail.src}
							alt={product.thumbnail.alt}
							className={`h-44 w-auto object-contain md:h-36`}
							width={product.thumbnail.width}
							height={product.thumbnail.height}
							loading="lazy"
						/>
					)}
					<LikeButton
						productId={product._id}
						className="absolute top-2 z-10 ltr:right-4 rtl:left-4 rtl:right-auto"
					/>
				</div>
			</div>
			<div className="flex w-full grow-0 flex-col items-end gap-1">
				{product.label ? (
					<Status
						status={product.label}
						label={
							productLabelsMap[product.label] ? productLabelsMap[product.label][locale] : product.label
						}
						classname="xl:text-xl max-w-fit"
					/>
				) : (
					<div className="h-9 xl:h-10" />
				)}
			</div>
			<div className="flex w-full grow-0 items-start justify-between gap-8">
				{product.category && (
					<CategoryTag
						href={`/products/?categories=${product.category._id}`}
						categoryTag="default"
						label={product.category.name[locale]!}
					/>
				)}
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
			<Link
				locale={locale}
				href={`/products/${product.slug}`}
				className="mb-auto flex w-full flex-1 flex-col gap-2"
			>
				<div className="flex w-full gap-2 font-medium">
					<div className="flex flex-1 flex-col">
						<h3 className="text-primaryO text-lg">{product.name[locale]}</h3>
					</div>
					<div className="flex shrink-0 flex-col items-end">
						<p className="text-base text-secondaryO">{DZD[locale].format(product.pricing.current)}</p>
						{product.pricing.original && (
							<p className="text-xs text-secondaryB line-through">
								{DZD[locale].format(product.pricing.original)}
							</p>
						)}
					</div>
				</div>
				<p className="text-xs">{product.summary[locale]}</p>
			</Link>
			<ActionButtons product={productTableDataToCart(product)} />
		</div>
	);
}

export default ProductCard;
