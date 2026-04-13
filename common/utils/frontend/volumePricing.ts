
export interface VolumeOfferResult {
    variant: VariantI | null;
    index: number;
    quantity: number;
    unitPrice: number;
    originalUnitPrice: number;
    totalPrice: number;
    originalTotal: number;
    savings: number;
    savingsPercentage: number;
}


function getValidVariants(variants: VariantI[]): (VariantI & { index: number })[] {
    return variants
        .map((v, index) => ({ ...v, index }))
        .filter(v => v.available);
}

export function getAllOffers(
    basePrice: number,
    variants: VariantI[]
): VolumeOfferResult[] {
    const validVariants = getValidVariants(variants);

    return validVariants.map((variant) => {
        const quantity = variant.index + 1;
        const totalPrice = variant.price?.current ?? basePrice * quantity;
        const unitPrice = totalPrice / quantity;
        const originalTotal = basePrice * quantity;
        const originalUnitPrice = basePrice;
        const savings = originalTotal - totalPrice;

        const savingsPercentage = originalTotal > 0
            ? (savings / originalTotal) * 100
            : 0;

        return {
            variant,
            index: variant.index,
            quantity,
            unitPrice: round(unitPrice),
            originalUnitPrice,
            totalPrice: round(totalPrice),
            originalTotal,
            savings: round(savings),
            savingsPercentage: round(savingsPercentage, 1),
        };
    });
}

export function getBestOffer(
    basePrice: number,
    variants: VariantI[],
    quantity: number
): VolumeOfferResult {
    const allOffers = getAllOffers(basePrice, variants);

    const matchingOffer = [...allOffers]
        .reverse()
        .find(o => quantity >= o.quantity);

    if (matchingOffer) {
        return {
            ...matchingOffer,
            quantity,
            totalPrice: round(matchingOffer.unitPrice * quantity),
            originalTotal: basePrice * quantity,
            savings: round((basePrice - matchingOffer.unitPrice) * quantity),
            savingsPercentage: matchingOffer.savingsPercentage,
        };
    }

    return {
        variant: null,
        index: -1,
        quantity,
        unitPrice: basePrice,
        originalUnitPrice: basePrice,
        totalPrice: basePrice * quantity,
        originalTotal: basePrice * quantity,
        savings: 0,
        savingsPercentage: 0,
    };
}

export function getNextBetterOffer(
    basePrice: number,
    variants: VariantI[],
    currentQuantity: number
): { offer: VolumeOfferResult; additionalNeeded: number } | null {
    const allOffers = getAllOffers(basePrice, variants);

    const nextOffer = allOffers.find(o => o.quantity > currentQuantity);

    if (!nextOffer) return null;

    return {
        offer: nextOffer,
        additionalNeeded: nextOffer.quantity - currentQuantity,
    };
}

function round(num: number, decimals = 2): number {
    return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
}