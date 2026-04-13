'use client';
import React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ProductDetailsContext } from '@common/contexts/productDetails';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import CheckoutFn from '@common/actions/client/CheckoutFn';
import useCart from ':common/useCart';
import CalculateProductPrice from '@common/utils/global/CalculateProductPrice';
import { useRouter } from 'next/navigation';
import { getBestOffer, VolumeOfferResult } from '@common/utils/frontend/volumePricing';

function getDefaultVariants(additional: ProductAdditionalI): CartVariantI[] | null {
	let x: CartVariantI[] | null = null;
	if (additional.colors && additional.colors.length > 0) {
		x = [...(x || []), { type: 'colors', id: additional.colors[0]._id, label: additional.colors[0].label }];
	}
	if (additional.sizes && additional.sizes.length > 0) {
		x = [...(x || []), { type: 'sizes', id: additional.sizes[0]._id, label: additional.sizes[0].label }];
	}
	if (additional.variants && additional.variants.length > 0) {
		x = [...(x || []), { type: 'variants', id: additional.variants[0]._id, label: additional.variants[0].label }];
	}
	return x;
}

export default function ProductInfosLayout({
	product,
	children,
	freeOver,
	locale,
	pricePriority,
}: {
	product: PublicProductI<string, string, BasicPublishableInformationWithIdI>;
	children: React.ReactNode;
	locale: LanguagesI;
	freeOver?: number;
	pricePriority: ProductAdditionalVariantKeys[];
}) {
	const [isCheckout, setIsCheckout] = useState<boolean>(false);
	const [variants, setVariants] = useState<CartVariantI[] | null>(() => getDefaultVariants(product.additional));
	const [quantity, setQuantityState] = useState<number>(1);
	const [selectedVolumeOffer, setSelectedVolumeOffer] = useState<VolumeOfferResult | null>(null);

	const [colorSelections, setColorSelections] = useState<string[]>(() => {
		const firstColor = product.additional?.colors?.find((c) => c.available !== false);
		return firstColor ? [firstColor._id] : [];
	});

	useEffect(() => {
		const colors = product.additional?.colors;
		if (!colors || colors.length === 0) return;

		const firstAvailable = colors.find((c) => c.available !== false) ?? colors[0];

		setColorSelections((prev) => {
			if (prev.length === quantity) return prev;

			if (prev.length < quantity) {
				return [
					...prev,
					...Array.from({ length: quantity - prev.length }, () => firstAvailable._id),
				];
			}
			return prev.slice(0, quantity);
		});
	}, [quantity, product.additional?.colors]);

	useEffect(() => {
		setQuantityState(1);
		setVariants(getDefaultVariants(product.additional));
		setSelectedVolumeOffer(null);

		const firstColor = product.additional?.colors?.find((c) => c.available !== false);
		setColorSelections(firstColor ? [firstColor._id] : []);
	}, [product._id, product.additional]);

	const pricing = useMemo(() => {
		if (selectedVolumeOffer && selectedVolumeOffer.variant) {
			return {
				current: selectedVolumeOffer.unitPrice,
				original: product.pricing.original ?? product.pricing.current,
			};
		}

		return CalculateProductPrice(
			product.pricing,
			product.additional,
			variants,
			product.pricePriority && product.pricePriority.length > 0 ? product.pricePriority : pricePriority || []
		);
	}, [pricePriority, product, variants, selectedVolumeOffer]);
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>

	useEffect(() => {
		setQuantityState(1);
		setVariants(getDefaultVariants(product.additional));
		setSelectedVolumeOffer(null);
	}, [product._id, product.additional]);

	useEffect(() => {
		const volumeVariants = product.additional?.variants ?? [];
		if (volumeVariants.length > 0) {
			const offer = getBestOffer(product.pricing.current, volumeVariants, quantity);
			setSelectedVolumeOffer(offer);
		}
	}, [quantity, product._id, product.pricing.current, product.additional?.variants]);

	const setQuantity = useCallback((value: number | ((prev: number) => number)) => {
		setQuantityState(prev => {
			const newValue = typeof value === 'function' ? value(prev) : value;
			return Math.max(1, newValue);
		});
	}, []);

	const router = useRouter();

	const { mutateAsync, isPending } = useMutation({
		mutationFn: CheckoutFn,
		onSuccess: res => {
			setQuantity(1);
			setIsCheckout(false);
			const redirectUrl = `/${locale}/thank-you`;
			router.replace(redirectUrl);
		},
		onError: error => {
			toast.error(error.message);
		},
	});

	const session = useSession();
	const { delivery, guest, isValidGuest } = useCart();

	const isCustomer = session.status === 'authenticated';

	const confirmOrder = useCallback(async (params?: { sessionId?: string | null }) => {
		const sessionId = params?.sessionId;
		const colors = product.additional?.colors;

		let orderItems: ProductsCartI<string>[];

		if (colors && colors.length > 0 && colorSelections.length > 0) {
			const colorCountMap = new Map<string, number>();
			for (const colorId of colorSelections) {
				colorCountMap.set(colorId, (colorCountMap.get(colorId) || 0) + 1);
			}

			orderItems = Array.from(colorCountMap.entries()).map(([colorId, count]) => {
				const color = colors.find((c) => c._id === colorId)!;
				const otherVariants = variants?.filter((v) => v.type !== 'colors') ?? [];

				return {
					product: product._id,
					variants: [
						...otherVariants,
						{ type: 'colors' as const, id: color._id, label: color.label },
					],
					count,
				};
			});
		} else {
			orderItems = [
				{
					product: product._id,
					variants: variants ? variants : undefined,
					count: quantity,
				},
			];
		}

		await mutateAsync(
			isCustomer
				? { isCustomer, checkout: { products: orderItems, delivery }, sessionId }
				: { isCustomer, checkout: { products: orderItems, delivery }, guest: guest!, sessionId }
		);
	},
		[delivery, guest, isCustomer, mutateAsync, product, quantity, variants, colorSelections]
	);

	const subTotal = useMemo(() => {
		if (selectedVolumeOffer && selectedVolumeOffer.variant) {
			return selectedVolumeOffer.totalPrice;
		}

		return product.pricing.current * quantity;
	}, [product.pricing.current, quantity, selectedVolumeOffer]);
	return (
		<ProductDetailsContext.Provider
			value={{
				isCheckout,
				product,
				locale,
				quantity,
				isValidGuest: isCustomer || isValidGuest,
				isSubmitting: isPending,
				deliveryCost: freeOver && subTotal > freeOver ? 0 : delivery.cost,
				subTotal,
				variants,
				pricing,
				selectedVolumeOffer,
				colorSelections,
				setColorSelections,
				setVariants,
				setIsCheckout,
				setQuantity,
				setSelectedVolumeOffer,
				submit: confirmOrder,
			}}
		>
			{children}
		</ProductDetailsContext.Provider>
	);
}
