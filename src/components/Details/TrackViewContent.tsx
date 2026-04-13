'use client';

import { useEffect, useRef } from 'react';
import { trackEvent } from '~common/MetaPixel';
import { trackTikTokEvent } from '~common/TikTok';

interface TrackViewContentProps {
	productId: string;
	productName: string;
	price: number;
	websiteId: string;
}

export default function TrackViewContent({ productId, productName, price, websiteId }: TrackViewContentProps) {
	const tracked = useRef(false);

	useEffect(() => {
		if (!productId || !websiteId) return;
		if (tracked.current) return;
		tracked.current = true;

		trackEvent(
			'ViewContent',
			websiteId,
			{
				value: price,
				currency: 'DZD',
				content_type: 'product',
				content_ids: [productId],
				content_name: productName,
				contents: [
					{
						id: productId,
						quantity: 1,
						item_price: price,
					},
				],
			},
			true
		);

		// TikTok ViewContent event
		trackTikTokEvent('ViewContent', websiteId, {
			content_type: 'product',
			contents: [{ content_id: productId }],
			currency: 'DZD',
			value: price,
		});
	}, [productId, productName, price, websiteId]);

	return null;
}
