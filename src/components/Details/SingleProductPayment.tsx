'use client';
import useProductDetails from ':common/useProductDetails';
import DZD from '@common/utils/frontend/Currency';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { CartQuantity } from './CartQuantity';

export default function SingleProductPayment() {
	const { locale, isCheckout, deliveryCost, subTotal } = useProductDetails();
	const checkOut = useTranslations('Checkout');

	const [formattedSubtotal, setFormattedSubtotal] = useState('');
	const [formattedDelivery, setFormattedDelivery] = useState('');
	const [formattedTotal, setFormattedTotal] = useState('');

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setFormattedSubtotal(DZD[locale].format(subTotal));
			setFormattedDelivery(DZD[locale].format(deliveryCost));
			setFormattedTotal(DZD[locale].format(subTotal + deliveryCost));
		}
	}, [locale, subTotal, deliveryCost]);

	if (isCheckout)
		return (
			<div className="flex w-full flex-col gap-6 rounded-xl border bg-white p-4 shadow-sm">
				<div className="flex w-full items-center justify-between border-b border-gray-200 pb-4">
					<h3 className="text-lg font-semibold text-gray-900">{checkOut('qnt')}</h3>
					<div className="flex-shrink-0">
						<CartQuantity />
					</div>
				</div>

				<div className="space-y-3">
					<div className="flex items-center justify-between text-sm">
						<span className="text-gray-600">{checkOut('subtotal')}:</span>
						<span className="font-medium text-gray-600">{formattedSubtotal}</span>
					</div>
					<div className="flex items-center justify-between text-sm">
						<span className="text-gray-600">{checkOut('delivery')}:</span>
						<span className="font-medium text-gray-600">{formattedDelivery}</span>
					</div>
					<hr />
					<div className="flex items-center justify-between">
						<span className="text-lg font-semibold text-gray-900">{checkOut('total')}:</span>
						<span className="text-xl font-bold text-gray-900">{formattedTotal}</span>
					</div>
				</div>
			</div>
		);
	return null;
}
