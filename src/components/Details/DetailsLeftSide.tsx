'use client';
import useProductDetails from ':common/useProductDetails';
import type { ReactNode } from 'react';

export default function DetailsLeftSide({
	imageShowCase,
	orderInformation,
}: {
	orderInformation: ReactNode;
	imageShowCase: ReactNode;
}) {
	const { isCheckout } = useProductDetails();
	return <div className="basis-[52%]">{isCheckout ? orderInformation : imageShowCase}</div>;
}
