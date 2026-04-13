'use client';
import ProductCard from '#client/ProductCard';
import { useLocale } from 'next-intl';
import React from 'react';

export default function ProductItem({ item }: { item: ProductTableDataI; index: number }) {
	const locale = useLocale() as LanguagesI;
	return <ProductCard product={item} locale={locale} />;
}
