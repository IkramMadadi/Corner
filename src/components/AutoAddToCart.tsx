'use client';

import useCart from ':common/useCart';
import useProductDetails from ':common/useProductDetails';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function AutoAddToCart() {
	const { addUniqueToCart, clearCart } = useCart();
	const { product, quantity, variants } = useProductDetails();
	const { products } = useCart();
	const router = useRouter();

	const hasTriedToAdd = useRef(false);
	const refreshAttempts = useRef(0);
	const maxRefreshAttempts = 3;
	const [isInitialized, setIsInitialized] = useState(false);

	useEffect(() => {
		setIsInitialized(true);
	}, []);

	useEffect(() => {
		if (!isInitialized) return;

		if (!product || !product._id) {
			if (refreshAttempts.current === 0) {
				setTimeout(() => {
					if (!product || !product._id) {
						refreshAttempts.current += 1;
						router.refresh();
					}
				}, 3000);
			}
			return;
		}

		if (!hasTriedToAdd.current) {
			try {
				addUniqueToCart(product as unknown as PublicProductI, variants, quantity);
				hasTriedToAdd.current = true;
			} catch (error) {
				console.error('❌ Error adding product to cart:', error);
			}

			setTimeout(() => {
				if (products.length === 0) {
					if (refreshAttempts.current < maxRefreshAttempts) {
						refreshAttempts.current += 1;
						hasTriedToAdd.current = false;
						router.refresh();
					}
				}
			}, 2000);
			return;
		}
	}, [isInitialized, product, variants, quantity, addUniqueToCart, products.length, router]);

	useEffect(() => {
		return () => {
			clearCart();
		};
	}, [clearCart]);

	return null;
}
