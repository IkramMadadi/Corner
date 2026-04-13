'use client';

import { VolumeOfferSelector } from '#client/Landing/VolumeOfferSelector';
import { VolumeOfferResult } from '@common/utils/frontend/volumePricing';
import useProductDetails from '@common/hooks/useProductDetails';

interface LandingVolumeOfferProps {
	currency?: string;
}

export function LandingVolumeOffer({ currency = 'DZD' }: LandingVolumeOfferProps) {
	const { product, setQuantity, setVariants, setSelectedVolumeOffer, variants, selectedVolumeOffer } =
		useProductDetails();

	const volumeVariants = product.additional?.variants ?? [];

	if (volumeVariants.length === 0) {
		console.log('❌ No variants found, returning null');
		return null;
	}

	const handleOfferSelect = (result: VolumeOfferResult) => {
		setSelectedVolumeOffer(result);
		setQuantity(result.quantity);

		if (result.variant) {
			const newVariants: CartVariantI[] = [
				...(variants?.filter((v) => v.type !== 'variants') ?? []),
				{
					type: 'variants',
					id: result.variant._id,
					label: result.variant.label,
				},
			];
			setVariants(newVariants);
		}
	};

	const defaultVariantId = selectedVolumeOffer?.variant?._id ?? variants?.find((v) => v.type === 'variants')?.id;

	return (
		<VolumeOfferSelector
			basePrice={product.pricing.current}
			variants={volumeVariants}
			currency={currency}
			onSelect={handleOfferSelect}
			defaultVariantId={defaultVariantId}
		/>
	);
}
