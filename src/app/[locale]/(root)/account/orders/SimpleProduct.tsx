import LikeButton from '#client/Buttons/LikeButton';
import DZD from '@common/utils/frontend/Currency';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { Link } from '@client/i18n/routing';

export default function SimpleProduct({ item }: { item: ProductsCartI<SimpleProductI> }) {
	const locale = useLocale() as LanguagesI;
	return (
		<Link
			locale={locale}
			href={`/products/${item.product.productId}`}
			className="flex justify-between gap-2 border-b pb-4 last-of-type:border-b-0"
		>
			<div className="flex justify-between gap-4">
				{item.product.thumbnail && (
					<Image
						src={item.product.thumbnail.src}
						alt={item.product.thumbnail.alt}
						className="h-20 w-20 rounded-xl object-contain sm:h-28 sm:w-28 md:h-40 md:w-40 lg:h-48 lg:w-48"
						width={item.product.thumbnail.width}
						height={item.product.thumbnail.height}
					/>
				)}
				<div className="flex flex-col items-start justify-between gap-2">
					<p className="break-words text-base font-semibold md:text-lg lg:text-3xl">
						{item.product.name[locale]}
					</p>
					<LikeButton productId={item.product.productId} />
				</div>
			</div>
			<div className="flex shrink-0 flex-col items-end justify-between gap-2">
				<p className="text-wrap text-sm font-bold text-primary sm:text-base md:text-xl lg:text-2xl xl:text-4xl">
					{DZD[locale].format(item.product.price * item.count)}
				</p>
				<p className="text-xs md:text-sm lg:text-lg xl:text-xl"> {item.count}</p>
				<p className="text-xs font-semibold text-secondaryB md:text-lg lg:text-xl">
					{DZD[locale].format(item.product.price)}
				</p>
			</div>
		</Link>
	);
}
