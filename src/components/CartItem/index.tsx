'use client';
import Image from 'next/image';
import Status from '../Status';
import LikeButton from '../Buttons/LikeButton';
import ButtonCircle from '../Buttons/ButtonCircle';
import { useLocale, useTranslations } from 'next-intl';
import StarRating from '../StarRating';
import useCart from ':common/useCart';
import ActionButtons from '#client/Buttons/ActionButtons';
import { productLabelsMap } from '@common/data/enums/generalEnums';
import { Link } from '@client/i18n/routing';
import NumbersFormatter from '@common/utils/frontend/NumbersFormatter';
import DZD from '@common/utils/frontend/Currency';
import { cn } from '@common/utils/frontend/utils';
import { type ReactNode } from 'react';

export default function CartItem({
	product,
	children,
	isDeletable = false,
	hasActions = false,
}: {
	product: CartProductI;
	children?: ReactNode;
	isDeletable?: boolean;
	hasActions?: boolean;
}) {
	const t = useTranslations('ProductDetailsPage');
	const locale = useLocale() as LanguagesI;
	const { removeFromCart } = useCart();

	const handleRemoveFromCart = () => {
		removeFromCart(product._id);
	};

	return (
		<div className={'grid auto-rows-auto grid-cols-12 gap-4 border-b-2 border-zinc-200 py-4'}>
			{product.thumbnail ? (
				<Image
					className={cn(
						'col-span-4 row-span-2 aspect-square rounded-3xl object-contain lg:col-span-3',
						hasActions ? 'lg:row-span-3' : ''
					)}
					src={product.thumbnail.src}
					alt={product.thumbnail.alt}
					width={product.thumbnail.width}
					height={product.thumbnail.height}
				/>
			) : (
				<div className="col-span-4 lg:col-span-3" />
			)}
			<div className="col-span-8 flex items-start justify-between lg:col-span-9">
				<div className="flex w-full flex-col gap-2">
					<div className="flex w-full flex-wrap justify-between gap-2">
						<Link
							locale={locale}
							href={'/products/' + product.slug}
							className="text-wrap text-lg font-semibold md:text-xl lg:text-2xl"
						>
							{product.name[locale]}
						</Link>
					</div>
					<div className="flex flex-col flex-wrap gap-2">
						<div className="flex items-center gap-2">
							<StarRating average={product.ratingAggregation.average} />
							<p className="text-xl font-medium">
								{NumbersFormatter.format(product.ratingAggregation.average)}
							</p>
							{product.label && (
								<Status
									status={product.label}
									label={
										productLabelsMap[product.label]
											? productLabelsMap[product.label][locale]
											: product.label
									}
									classname="self-end ms-auto text-xl"
								/>
							)}
						</div>
						<p className="text-nowrap text-grayN">
							{product.ratingAggregation.count} {t('reviews')}
						</p>
					</div>
				</div>
			</div>
			<div className="col-span-8 mt-auto grid grid-cols-8 gap-4 sm:grid-cols-11 lg:col-span-9">
				<div className="col-span-3 flex items-center gap-1">
					<LikeButton productId={product._id} className="md:p-1" />
					{isDeletable && (
						<ButtonCircle onClick={handleRemoveFromCart}>
							<span className="icon-[mage--trash] h-8 w-8 text-primary" />
						</ButtonCircle>
					)}
				</div>
				<p className="col-span-5 text-lg font-bold text-primary sm:text-xl lg:text-xl xl:text-2xl">
					{DZD[locale].format(product.pricing.current)}
				</p>
				<div className="col-span-8 sm:col-span-3">{children}</div>
			</div>
			{hasActions && (
				<div className="col-span-12 mt-4 lg:col-span-9">
					<ActionButtons product={product} />
				</div>
			)}
		</div>
	);
}
