'use client';
import { VolumeOfferResult } from '@common/utils/frontend/volumePricing';
import type React from 'react';
import { createContext } from 'react';
export interface ProductDetailsContextType {
	product: PublicProductI<string, string, BasicPublishableInformationWithIdI>;
	variants: CartVariantI[] | null;
	locale: LanguagesI;
	isCheckout: boolean;
	isValidGuest: boolean;
	quantity: number;
	isSubmitting: boolean;
	deliveryCost: number;
	subTotal: number;
	pricing: PricingI;
	selectedVolumeOffer: VolumeOfferResult | null;
	colorSelections: string[];
	setColorSelections: React.Dispatch<React.SetStateAction<string[]>>;
	setVariants: React.Dispatch<React.SetStateAction<CartVariantI[] | null>>;
	setIsCheckout: React.Dispatch<React.SetStateAction<boolean>>;
	setSelectedVolumeOffer: React.Dispatch<React.SetStateAction<VolumeOfferResult | null>>;
	setQuantity: (value: number | ((prev: number) => number)) => void;
	submit: (params?: { sessionId?: string | null }) => Promise<void>; 
}
export const ProductDetailsContext = createContext<ProductDetailsContextType | null>(null);
