'use client';
import type React from 'react';
import { createContext } from 'react';

interface CartContextType extends CartI {
	productCount: number;
	addToCart: (product: PublicProductI, variants?: null | CartVariantI[], count?: number) => void;
	addUniqueToCart: (product: PublicProductI, variants?: null | CartVariantI[], count?: number) => void;
	removeFromCart: (productId: string, variants?: null | CartVariantI[]) => void;
	updateQuantity: (productId: string, quantity: number, variants?: null | CartVariantI[]) => void;
	clearCart: () => void;
	setDeliveryOption: (options: DeliveryI) => void;
	/* guest */
	guest: RegisterGuestI | null;
	setGuest: React.Dispatch<React.SetStateAction<RegisterGuestI | null>>;
	clearGuest: () => void;
	isValidGuest: boolean;
}
export const CartContext = createContext<CartContextType | null>(null);
