'use client';
import { cartEventEmitter } from '@common/events/cart';
import React, { useState, useEffect } from 'react';
import ButtonPrimary from '../Buttons/ButtonPrimary';
import ButtonSecondary from '../Buttons/ButtonSecondary';
import ButtonCircle from '../Buttons/ButtonCircle';
import useCart from ':common/useCart';
import UpdateQuantity from '../UpdateQuantity';
import dynamic from 'next/dynamic';
import { cn } from '@common/utils/frontend/utils';
import { useLocale, useTranslations } from 'next-intl';
import DZD from '@common/utils/frontend/Currency';
const CartItem = dynamic(() => import('#client/CartItem'), { ssr: false });

export default function CartPopup() {
	const t = useTranslations('ShoppingCart');
	const { subtotal, products, clearCart } = useCart();
	const [items, setItems] = useState<ProductsCartI<CartProductI>[]>([]);
	
	useEffect(() => {
		if (JSON.stringify(items) !== JSON.stringify(products)) {
			setItems(products);
		}
	}, [products,items]);

	const [isOpen, setIsOpen] = useState(false);
	const locale = useLocale() as LanguagesI;

	useEffect(() => {
		const handleOpen = () => setIsOpen(true);
		const handleClose = () => setIsOpen(false);

		cartEventEmitter.on('cartOpen', handleOpen);
		cartEventEmitter.on('cartClose', handleClose);

		return () => {
			cartEventEmitter.off('cartOpen', handleOpen);
			cartEventEmitter.off('cartClose', handleClose);
		};
	}, []);

	const handleBackdropClick = () => {
		cartEventEmitter.emit('cartClose');
	};

	return (
		<>
			<div
				className={cn(
					'fixed right-0 top-0 z-[120] flex max-h-full w-full max-w-2xl flex-col bg-white transition-transform',
					isOpen ? 'translate-x-0' : 'translate-x-full'
				)}
			>
				<div className="flex items-center justify-between px-6 py-6">
					<h2 className="font-sans text-2xl font-semibold">{t('title')}</h2>
					<ButtonCircle onClick={() => cartEventEmitter.emit('cartClose')}>
						<span className="icon-[material-symbols--close-rounded] h-8 w-8" />
					</ButtonCircle>
				</div>
				<ul className="overflow-auto px-4 py-2">
					{items.length > 0 ? (
						items.map((item) => (
							<CartItem key={item.product._id} product={item.product} isDeletable>
								<UpdateQuantity quantity={item.count} product={item.product} />
							</CartItem>
						))
					) : (
						<p className="text-center text-lg">{t('empty')}</p>
					)}
				</ul>
				<div className="mt-auto bg-primary/10 px-6 py-4 font-sans">
					<div className="mt-8 flex justify-between font-semibold">
						<span>{t('subtotal')} </span>
						<span suppressHydrationWarning>{DZD[locale].format(subtotal)}</span>
					</div>
					<div>
						<p className="flex items-center gap-2">
							<span className="icon-[iconoir--delivery-truck] h-8 w-8" />
							{t('shipping')}
						</p>
					</div>
					<div className="mt-4 flex justify-center gap-6">
						{items.length > 0 && (
							<>
								<ButtonPrimary href="/checkout" onClick={() => cartEventEmitter.emit('cartClose')}>
									{t('checkout')}
								</ButtonPrimary>
								<ButtonSecondary
									className="border-0"
									onClick={() => {
										clearCart();
										cartEventEmitter.emit('cartClose');
									}}
								>
									{t('clear')}
								</ButtonSecondary>
							</>
						)}
					</div>
				</div>
			</div>
			<div
				className={cn(
					'fixed inset-0 z-[101] bg-black bg-opacity-50 transition-opacity',
					isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
				)}
				onClick={handleBackdropClick}
			/>
		</>
	);
}
