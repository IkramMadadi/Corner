'use client';
import { WishlistContext } from '@common/contexts/wishlist';
import { useContext } from 'react';

export default function useWishlist() {
	const wishlistContext = useContext(WishlistContext);
	if (!wishlistContext) {
		throw new Error('useWishlist must be used within a WishlistProvider');
	}
	return wishlistContext;
}
