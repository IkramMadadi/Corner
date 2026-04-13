'use client';

import dynamic from 'next/dynamic';

const FloatingGiftButton = dynamic(() => import('./FloatingGiftButton').then((mod) => mod.FloatingGiftButton), {
	ssr: false,
	loading: () => null,
});

interface UpsellWrapperProps {
	upsellParent: UpsellParentDataI;
}

export function UpsellWrapper({ upsellParent }: UpsellWrapperProps) {
	if (!upsellParent) {
		console.log('UpsellWrapper - No upsell parent data');
		return null;
	}

	console.log('UpsellWrapper - Rendering with:', upsellParent._id);

	return <FloatingGiftButton parentProduct={upsellParent} delayMs={2000} />;
}
