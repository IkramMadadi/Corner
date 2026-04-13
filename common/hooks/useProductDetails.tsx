'use client';
import { ProductDetailsContext } from '@common/contexts/productDetails';
import { useContext } from 'react';

export default function useProductDetails() {
	const productDetailsContext = useContext(ProductDetailsContext);
	if (!productDetailsContext) {
		throw new Error('useProductDetails must be used within a ProductDetailsProvider');
	}
	return productDetailsContext;
}
