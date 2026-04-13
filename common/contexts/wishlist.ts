'use client';
import { createContext } from 'react';

interface WishlistContextType {
	items: string[];
	addItem: (item: string) => void;
	removeItem: (item: string) => void;
	isIn: (item: string) => boolean;
}
export const WishlistContext = createContext<WishlistContextType | null>(null);
