'use client';
import React, { useCallback } from 'react';
import useCart from ':common/useCart';
import BasicsUpdateQuantity from './BasicsUpdateQuantity';

export default function UpdateQuantity({ quantity, product }: { quantity: number; product: CartProductI }) {
	const { updateQuantity } = useCart();
	// Gérer les modifications de quantité
	const handleQuantityChange = useCallback(
		(count: number) => {
			updateQuantity(product._id, count);
		},
		[updateQuantity, product]
	);

	return (
		/* update quantity */
		<BasicsUpdateQuantity handleQuantityChange={handleQuantityChange} quantity={quantity} />
	);
}
