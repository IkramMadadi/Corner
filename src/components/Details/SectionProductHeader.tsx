import StarRating from '#client/StarRating';
import DetailsLeftSide from './DetailsLeftSide';
import DetailsActions from './DetailsAction';
import ProductInfoTab from './ProductInfoTab';
import Status from '#client/Status';
import { Suspense } from 'react';
import OrderInformation from '#client/Checkout/OrderInformation';
import ImageShowCase from './ImageShowCase';
import DZD from '@common/utils/frontend/Currency';
import { Types } from 'mongoose';
import SingleProductPayment from './SingleProductPayment';
import { getTranslations } from 'next-intl/server';
import { productLabelsMap } from '@common/data/enums/generalEnums';
import NumbersFormatter from '@common/utils/frontend/NumbersFormatter';

export default async function SectionProductHeader({
	website,
	product,
	locale,
}: {
	product: PublicProductI<string, string, BasicPublishableInformationWithIdI>;
	locale: LanguagesI;
	website: PublicWebSiteI<Types.ObjectId>;
}) {
	const t = await getTranslations({ locale, namespace: 'ProductDetailsPage' });

	return (
		<div className="flex flex-col justify-between gap-16 lg:flex-row">
			<DetailsLeftSide
				orderInformation={
					<Suspense>
						<OrderInformation locale={locale} />
					</Suspense>
				}
				imageShowCase={<ImageShowCase id={product._id} shots={product.images} />}
			/>

			<div className="flex flex-col gap-4 lg:basis-[40%]">
				{/* infos */}
				<div className="flex items-start justify-between gap-4">
					<h3 className="text-3xl font-semibold">{product.name[locale]}</h3>
					{product.label ? (
						<Status
							status={product.label}
							label={
								productLabelsMap[product.label]
									? productLabelsMap[product.label][locale]
									: product.label
							}
							classname="xl:text-xl max-w-fit"
						/>
					) : (
						<div className="h-9 xl:h-10" />
					)}
				</div>

				<div className="my-4 flex items-center gap-4">
					<StarRating average={product.ratingAggregation.average} />
					<p className="text-lg font-medium">{NumbersFormatter.format(product.ratingAggregation.average)}</p>
					<p className="ml-4 text-grayN">
						{product.ratingAggregation.count} {t('reviews')}
					</p>
				</div>

				<div className="flex items-baseline gap-4">
					<p className="text-3xl font-semibold text-primary">{DZD[locale].format(product.pricing.current)}</p>
					{product.pricing.original && (
						<p className="text-xl text-neutral-500 line-through">
							{DZD[locale].format(product.pricing.original)}
						</p>
					)}
				</div>
				<ProductInfoTab
					tabs={[t('description')]}
					TabsContent={[<p key="tab-1">{product.description[locale]}</p>]}
				/>
				{/* update quantity */}
				<SingleProductPayment />
				{website.deliverySettings.freeOnOver && (
					<p className="flex items-center gap-2 font-medium">
						<span className="icon-[iconoir--delivery-truck] h-8 w-8 rtl:-scale-x-100" />
						{t('delivery')} {DZD[locale].format(website.deliverySettings.freeOnOver)}
					</p>
				)}
				<DetailsActions websiteId={website.FY_ID} />
			</div>
		</div>
	);
}
