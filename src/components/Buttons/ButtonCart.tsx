'use client';
import useCart from ':common/useCart';
import { cartEventEmitter } from '@common/events/cart';
import dynamic from 'next/dynamic';
import React from 'react';
const Indicator = dynamic(() => import('./Indicator'), { ssr: false });
export default function ButtonCart() {
	const { productCount } = useCart();

	const handleOpenCart = () => {
		cartEventEmitter.emit('cartOpen'); // Ouvre le cart
	};
	return (
		<button
			className="relative flex flex-shrink-0 items-center justify-center rounded-full border-[1px] border-blackN p-2 !leading-none text-blackN focus:ring-transparent disabled:bg-opacity-70"
			onClick={handleOpenCart}
		>
			<span className="icon-[mage--basket] relative text-lg md:text-2xl" />
			<Indicator count={productCount} />
		</button>
	);
}
