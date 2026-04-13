'use client';
import Status from '#client/Status';
// import useCities from ':common/useCities';
import useProvinces from ':common/useProvinces';
import DZD from '@common/utils/frontend/Currency';
import SimpleProduct from './SimpleProduct';
import { useLocale, useTranslations } from 'next-intl';
import { localesMap } from '@common/i18n/languages';
import { orderStatusMap } from '@common/data/enums/generalEnums';
// import { useMemo } from 'react';
const fullDay = 24 * 60 * 60 * 1000;

export default function OrderCard({ order, daysToDeliver }: { order: PublicOrderI; daysToDeliver: number }) {
	const orderT = useTranslations('Order');
	const locale = useLocale() as LanguagesI;
	const { provinces } = useProvinces(locale);
	const province = provinces[order.delivery.address.province - 1];
	/* 
	const { cities } = useCities(order.delivery.address.province, locale);
	const city = useMemo(
		() => cities.find((c) => c.id === Number(order.delivery.address.city)),
		[order.delivery.address.city, cities]
	);
	*/
	return (
		<div className="flex w-full border-b-2 border-b-black pb-8">
			<div className="flex w-full max-w-5xl flex-col gap-12">
				<div className="flex w-full items-start justify-between gap-4">
					<h3 className="flex items-center text-xl font-semibold lg:text-2xl xl:text-4xl">
						{orderT('order')} #<span className="text-sm text-primary lg:text-2xl">{order._id}</span>
					</h3>
					<div className="flex flex-col gap-2">
						<Status
							status={order.status}
							label={orderStatusMap[order.status] ? orderStatusMap[order.status][locale] : order.status}
							classname="self-end"
						/>
						<p className="text-sm md:hidden">
							{new Date(order.createdAt).toLocaleDateString(localesMap[locale], {
								day: 'numeric',
								weekday: 'short',
								month: 'short',
								year: 'numeric',
							})}
						</p>
					</div>
				</div>
				<div className="flex w-full flex-col gap-4">
					{order.products.map((item) => (
						<SimpleProduct key={item.product.productId} item={item} />
					))}
				</div>
				<div className="flex w-full flex-col gap-6 font-sans">
					<div className="flex w-full justify-between">
						<h4 className="text-lg md:text-xl">{orderT('deliveryTime')}</h4>
						<p className="text-lg md:text-xl">
							{new Date(new Date(order.createdAt).getTime() + fullDay * daysToDeliver).toLocaleDateString(
								localesMap[locale],
								{
									day: 'numeric',
									weekday: 'short',
									month: 'short',
									year: 'numeric',
								}
							)}
						</p>
					</div>
					<div className="flex w-full justify-between">
						<h4 className="text-lg md:text-xl">{orderT('address')}</h4>
						<p className="text-lg md:text-xl">
							{order.delivery.address.address && <span>{order.delivery.address.address}, </span>}
							<span>
								{province?.name[locale] || province?.name.en}({order.delivery.address.province}),
							</span>
							{/*
								<span> {city?.name[locale]}</span>
							*/}
						</p>
					</div>
					{order.discount ? (
						<div className="flex w-full justify-between">
							<h4 className="text-lg md:text-xl">{orderT('discount')}</h4>
							<p className="text-lg md:text-xl">{DZD[locale].format(order.discount)}</p>
						</div>
					) : null}
					<div className="flex w-full justify-between">
						<h4 className="text-lg md:text-xl">{orderT('deliveryCost')}</h4>
						<p className="text-lg md:text-xl">{DZD[locale].format(order.delivery.cost)}</p>
					</div>
					<div className="flex w-full justify-between">
						<h4 className="text-xl font-bold md:text-2xl">{orderT('total')}</h4>
						<p className="text-xl font-bold md:text-2xl">{DZD[locale].format(order.totalPrice)}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
