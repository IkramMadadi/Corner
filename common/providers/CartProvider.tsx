'use client';
import { CartContext } from '@common/contexts/cart';
import CalculateProductPrice from '@common/utils/global/CalculateProductPrice';
import { hashProductCart } from '@common/utils/global/hasProductCart';
import { cartValidationSchema } from '^common/models/cart';
import { registerGuestValidationSchema } from '^common/models/guest';
import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { publicProductToCart } from '~common/products';
export const defaultCart: CartI = {
	products: [],
	delivery: {
		address: {
			province: 19,
			city: 0,
			address: '',
		},
		deliveryChoice: 'door',
		cost: 0,
	},
};
const isServer = typeof window === 'undefined';
const cartStorageKey = 'fy-cart';
const guestSessionKey = 'fy-cart';
function validateCart(cart: unknown, locale: LanguagesI): CartI | null {
	if (typeof cart === 'object' && cart !== null) {
		const parsedCart = cartValidationSchema(locale).safeParse(cart);
		if (parsedCart.success) return cart as CartI;

		console.error(parsedCart.error);
		return null;
	}
	return null;
}
function validateGuest(guest: unknown, locale: LanguagesI): RegisterGuestI | null {
	if (typeof guest === 'object' && guest !== null) {
		const parsedGuest = registerGuestValidationSchema(locale).safeParse(guest);
		if (parsedGuest.success) return guest as RegisterGuestI;
		console.error(parsedGuest.error);
		return null;
	}
	return null;
}
const initializeCart = (locale: LanguagesI) => {
	if (isServer) {
		return defaultCart;
	}
	try {
		// Get from local storage by key
		const item = window.localStorage.getItem(cartStorageKey);
		if (item) {
			const parsedCart = validateCart(JSON.parse(item), locale);
			if (parsedCart) return parsedCart;
		}

		// Parse stored json or if none return defaultCart
		return defaultCart;
	} catch (error) {
		// If error also return defaultCart
		console.error(error);
		return defaultCart;
	}
};
const initializeGuest = (locale: LanguagesI) => {
	if (isServer) {
		return null;
	}
	try {
		// Get from local storage by key
		const item = window.sessionStorage.getItem(guestSessionKey);
		if (item) {
			const parsedGuest = validateGuest(JSON.parse(item), locale);
			if (parsedGuest) return parsedGuest;
		}
		return null;
	} catch (error) {
		console.error(error);
		return null;
	}
};
/* function isEqualProducts(
	{ productId: productId1, variants: variants1 }: { productId: string; variants?: null | CartVariantI[] },
	{ productId: productId2, variants: variants2 }: { productId: string; variants?: null | CartVariantI[] }
): boolean {
	// Check if product IDs are equal
	if (productId1 !== productId2) return false;

	// Handle cases where one or both variants are null or undefined
	if (!variants1 && !variants2) return true;
	if (!variants1 || !variants2) return false;

	// Check if variants length matches
	if (variants1.length !== variants2.length) return false;

	// Compare each variant
	for (const variant1 of variants1) {
		const matchingVariant = variants2.find(
			variant2 => variant1.type === variant2.type && variant1.id === variant2.id
		);

		if (!matchingVariant) return false;
	}

	// If all checks pass, the products are equal
	return true;
} */
function isPublicProductI(p: PublicProductI | CartProductI): p is PublicProductI {
	return 'additional' in p;
}
export default function CartProvider({
	children,
	pricePriority,
	locale,
}: {
	children: ReactNode;
	pricePriority?: ProductAdditionalVariantKeys[];
	locale: LanguagesI;
}) {
	const [cart, setCart] = useState<CartI>(() => initializeCart(locale));
	const [guest, setGuest] = useState<RegisterGuestI | null>(() => initializeGuest(locale));

	const productCount = useMemo(
		() => cart.products.reduce((acc, item) => acc + item.count, 0),
		[cart.products]
	);

	useEffect(() => {
		if (typeof window !== 'undefined') {
		  const stored = localStorage.getItem(cartStorageKey);
		  const newCart = JSON.stringify(cart);
		  if (stored !== newCart) {
			localStorage.setItem(cartStorageKey, newCart);
		  }
		}
	  }, [cart]);

	const addToCart = useCallback(
		(product: PublicProductI | CartProductI, variants?: null | CartVariantI[], count?: number) => {
			setCart((prev) => {
				const cartProductsMap = new Map(
					prev.products.map((p) => [hashProductCart(p.product._id, p.variants), p])
				);
				const currentHash = hashProductCart(product._id, variants);
				const existingItem = cartProductsMap.get(currentHash);
				if (existingItem) {
					existingItem.count += count || 1;
				} else {
					cartProductsMap.set(currentHash, {
						product: isPublicProductI(product)
							? {
									...publicProductToCart(product),
									pricing: CalculateProductPrice(
										product.pricing,
										product.additional,
										variants,
										product.pricePriority || pricePriority || []
									),
								}
							: product,
						variants: variants ? variants : undefined,
						count: count || 1,
					});
				}
				return {
					...prev,
					products: [...cartProductsMap.values()],
				};
			});
		},
		[pricePriority]
	);

	const addUniqueToCart = useCallback(
		(product: PublicProductI | CartProductI, variants?: null | CartVariantI[], count?: number) => {
			setCart((prev) => {
				const newCartProduct = {
					product: isPublicProductI(product)
						? {
								...publicProductToCart(product),
								pricing: CalculateProductPrice(
									product.pricing,
									product.additional,
									variants,
									product.pricePriority || pricePriority || []
								),
							}
						: product,
					variants: variants ? variants : undefined,
					count: count || 1,
				};

				return {
					...prev,
					products: [newCartProduct],
				};
			});
		},
		[pricePriority]
	);

	const clearCart = useCallback(() => setCart(defaultCart), []);
	const removeFromCart = useCallback((productId: string, variants?: null | CartVariantI[]) => {
		setCart((prev) => {
			const cartProductsMap = new Map(prev.products.map((p) => [hashProductCart(p.product._id, p.variants), p]));
			const currentHash = hashProductCart(productId, variants);
			const existingItem = cartProductsMap.get(currentHash);
			if (existingItem) {
				if (existingItem.count > 1) {
					existingItem.count -= 1;
				} else {
					cartProductsMap.delete(currentHash);
				}
			}
			return {
				...prev,
				products: [...cartProductsMap.values()],
			};
		});
	}, []);
	const updateQuantity = useCallback((productId: string, quantity: number, variants?: null | CartVariantI[]) => {
		setCart((prev) => {
			const cartProductsMap = new Map(prev.products.map((p) => [hashProductCart(p.product._id, p.variants), p]));
			const currentHash = hashProductCart(productId, variants);
			const existingItem = cartProductsMap.get(currentHash);
			if (existingItem) {
				existingItem.count += quantity > 0 || existingItem.count > 1 ? quantity : 0;
				if (existingItem.count <= 0) {
					cartProductsMap.delete(currentHash);
				}
			}
			return {
				...prev,
				products: [...cartProductsMap.values()],
			};
		});
	}, []);
	const setDeliveryOption = useCallback((option: DeliveryI) => {
		setCart((prev) => {
			const copyCart = JSON.parse(JSON.stringify(prev)) as CartI;
			copyCart.delivery = option;
			return copyCart;
		});
	}, []);
	const clearGuest = useCallback(() => {
		setGuest(null);
	}, []);
	const isValidGuest = useMemo(() => {
		if (!guest) return false;
		return registerGuestValidationSchema(locale).safeParse(guest).success;
	}, [guest, locale]);
	return (
		<CartContext.Provider
			value={{
				...cart,
				productCount,
				addToCart,
				addUniqueToCart,
				clearCart,
				removeFromCart,
				setDeliveryOption,
				updateQuantity,
				guest,
				clearGuest,
				setGuest,
				isValidGuest,
			}}
		>
			{children}
		</CartContext.Provider>
	);
}
