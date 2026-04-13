'use client';
import { WishlistContext } from '@common/contexts/wishlist';
import { type ReactNode, useCallback, useEffect, useState } from 'react';

export default function WishListProvider({ children, wishlist }: { children: ReactNode; wishlist: string[] }) {
	const [items, setItems] = useState<string[]>(wishlist);

	useEffect(() => {
		setItems(wishlist);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [wishlist]);
	const isIn = useCallback((item: string) => items.includes(item), [items]);
	const addItem = useCallback((item: string) => {
		setItems(prev => [...prev, item]);
	}, []);
	const removeItem = useCallback((item: string) => {
		setItems(prev => prev.filter(i => i !== item));
	}, []);
	return <WishlistContext.Provider value={{ items, addItem, removeItem, isIn }}>{children}</WishlistContext.Provider>;
}
