'use client';
import ButtonPrimary from '#client/Buttons/ButtonPrimary';
import ButtonSecondary from '#client/Buttons/ButtonSecondary';
import useCart from ':common/useCart';
import useProductDetails from ':common/useProductDetails';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';
import { trackEvent } from '~common/MetaPixel';
import { trackTikTokEvent } from '~common/TikTok';
import { v4 as uuidv4 } from 'uuid';

export default function DetailsActions({ websiteId }: { websiteId: string }) {
	const t = useTranslations('ProductDetailsPage');
	const { guest, products } = useCart();
	const { setIsCheckout, isCheckout, isValidGuest, submit, subTotal } = useProductDetails();

	const hasSentInitiateCheckout = useRef(false);

	const purchaseEventIdRef = useRef<string>('');
	const [isConfirming, setIsConfirming] = useState(false);
	const currency = 'DZD';

	const contents = products
		.filter((p) => p?.product?._id)
		.map((item) => ({
			id: String(item.product._id),
			quantity: Number(item.count),
		}));

	const content_ids = contents.map((c) => c.id);
	const value = Number(subTotal) || 0;

	const handleConfirm = async () => {
		if (isConfirming) return;
		setIsConfirming(true);

		if (!purchaseEventIdRef.current) purchaseEventIdRef.current = uuidv4();
		const eventId = purchaseEventIdRef.current;

		const fbPayload = { value, currency, content_ids, contents, content_type: 'product' };

		try {
			await Promise.allSettled([
				trackEvent(
					'Purchase',
					websiteId,
					fbPayload,
					true,
					{
						client_name: guest?.name ?? '',
						client_number: guest?.phone ?? '',
					},
					{ event_id: eventId }
				),

				trackTikTokEvent(
					'Purchase',
					websiteId,
					{
						value,
						currency,
						content_type: 'product',
						contents: contents.map((c) => ({ content_id: c.id, quantity: c.quantity })),
					},
					true,
					{ client_name: guest?.name ?? '', client_number: guest?.phone ?? '' },
					{ event_id: eventId }
				),
			]);

			await submit();
		} catch (e) {
			setIsConfirming(false);
			purchaseEventIdRef.current = '';
			throw e;
		}
	};

	const handleBuyClick = async () => {
		setIsCheckout(true);

		if (hasSentInitiateCheckout.current) return;
		hasSentInitiateCheckout.current = true;

		const fbPayload = { value, currency, content_ids, contents, content_type: 'product' };

		await trackEvent('InitiateCheckout', websiteId, fbPayload, true, undefined, { event_id: uuidv4() });

		await trackTikTokEvent('InitiateCheckout', websiteId, {
			value,
			currency,
			content_type: 'product',
			contents: contents.map((c) => ({ content_id: c.id, quantity: c.quantity })),
		});
	};

	return (
		<div className="mt-6 flex justify-between gap-8">
			{isCheckout ? (
				<>
					<ButtonSecondary
						sizeClass="py-1.5  sm:py-3 w-full"
						className="flex gap-2 shadow-lg shadow-blackN/10"
						onClick={() => {
							setIsCheckout(false);
						}}
					>
						<span className="icon-[mage--image]" /> <span>{t('view')}</span>
					</ButtonSecondary>
					<ButtonPrimary disabled={!isValidGuest} onClick={handleConfirm} sizeClass="py-1.5  sm:py-3 w-full">
						{t('confirm')}
					</ButtonPrimary>
				</>
			) : (
				<>
					<ButtonSecondary
						sizeClass="py-1.5  sm:py-3 w-full"
						className="flex gap-2 shadow-lg shadow-blackN/10"
					>
						<span className="icon-[mage--basket]" /> <span>{t('add')}</span>
					</ButtonSecondary>
					<ButtonPrimary onClick={handleBuyClick} sizeClass="py-1.5  sm:py-3 w-full">
						{t('buy')}
					</ButtonPrimary>
				</>
			)}
		</div>
	);
}
