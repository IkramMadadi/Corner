'use client';
import { CartContext } from '@common/contexts/cart';
import { useContext, useMemo } from 'react';

export default function useCart() {
	const cartContext = useContext(CartContext);

	const { products, delivery } = cartContext || { products: [], delivery: { cost: 0 } };
	
	const subtotal = useMemo(() => {
		return products.reduce((acc, item) => acc + item.product.pricing.current * item.count, 0);
	}, [products]);

	const totalPrice = subtotal + delivery.cost;
	if (!cartContext) {
		throw new Error('useCart must be used within a CartProvider');
	}
	return { ...cartContext, totalPrice, subtotal };
}
