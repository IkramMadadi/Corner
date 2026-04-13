'use client';
import React from 'react';
import ButtonSecondary from '../ButtonSecondary';
import useCart from ':common/useCart';
import { useTranslations } from 'next-intl';
import Button from '../Button';

export default function ActionButtons({ product }: { product: CartProductI }) {
	const t = useTranslations('ProductDetailsPage');
	const { addToCart } = useCart();

	const handleAddToCart = () => {
		addToCart(product as unknown as PublicProductI, undefined);
	};

	return (
		/* Actions section */
		<div className="flex w-full flex-wrap justify-between gap-4">
			<ButtonSecondary
				sizeClass="py-1.5 flex flex-1 grow-1"
				className="min-button flex shrink-0 gap-2 shadow-lg shadow-black/10"
				onClick={handleAddToCart}
			>
				<span className="icon-[mage--basket] h-6 w-6 shrink-0" />{' '}
				<span className="shrink-0 text-nowrap text-center">{t('add')}</span>
			</ButtonSecondary>
			<Button
				href="/checkout"
				className="bg-primary text-white"
				sizeClass="py-1.5 flex shrink-0 min-button flex-1 grow-1"
				onClick={handleAddToCart}
			>
				<span className="shrink-0 text-nowrap text-center">{t('buy')}</span>
			</Button>
		</div>
	);
}
