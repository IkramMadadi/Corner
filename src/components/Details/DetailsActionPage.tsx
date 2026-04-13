'use client';
import Button from '#client/Buttons/Button';
import useCart from ':common/useCart';
import useProductDetails from ':common/useProductDetails';
import { useTranslations } from 'next-intl';
import { useRef, useState, useCallback, useEffect } from 'react';

import { trackEvent } from '~common/MetaPixel';
import { trackTikTokEvent } from '~common/TikTok';
import { v4 as uuidv4 } from 'uuid';

function ProcessingOverlay({ isVisible }: { isVisible: boolean }) {
	if (!isVisible) return null;
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
			<div className="animate-in fade-in-0 zoom-in-95 mx-4 max-w-md rounded-xl bg-white p-8 shadow-2xl duration-300">
				<div className="flex flex-col items-center text-center">
					<div className="mb-6">
						<svg className="h-12 w-12 animate-spin text-blue-600" viewBox="0 0 24 24">
							<circle
								className="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								strokeWidth="4"
								fill="none"
							/>
							<path
								className="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							/>
						</svg>
					</div>
					<h3 className="mb-3 text-xl font-bold text-slate-800">جاري معالجة طلبك</h3>
					<p className="mb-4 text-slate-600">يرجى عدم إغلاق النافذة أو مغادرة الصفحة</p>
					<div className="flex space-x-1">
						<div
							className="h-3 w-3 animate-bounce rounded-full bg-blue-500"
							style={{ animationDelay: '0ms' }}
						></div>
						<div
							className="h-3 w-3 animate-bounce rounded-full bg-blue-500"
							style={{ animationDelay: '200ms' }}
						></div>
						<div
							className="h-3 w-3 animate-bounce rounded-full bg-blue-500"
							style={{ animationDelay: '400ms' }}
						></div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default function DetailsActions({ websiteId }: { websiteId: string }) {
	const t = useTranslations('ProductDetailsPage');

	const { guest, products } = useCart();
	const { submit, subTotal, isSubmitting } = useProductDetails();

	const [showOverlay, setShowOverlay] = useState(false);
	const lastSubmitTime = useRef<number>(0);
	const SUBMIT_COOLDOWN = 10000;

	useEffect(() => {
		return () => {
			setShowOverlay(false);
		};
	}, []);

	const handleConfirm = useCallback(async () => {
		if (isSubmitting) return;

		const storedSessionId = localStorage.getItem('currentSessionId');

		const now = Date.now();
		const timeSinceLastSubmit = now - lastSubmitTime.current;
		if (timeSinceLastSubmit < SUBMIT_COOLDOWN) return;

		lastSubmitTime.current = Date.now();
		setShowOverlay(true);

		const eventId = uuidv4();

		try {
			const numericSubTotal = Number(subTotal);
			const value = isNaN(numericSubTotal) ? 0 : Number(numericSubTotal.toFixed(2));
			const currency = 'DZD';
			const contents = products
				.filter((p) => p?.product?._id)
				.map((item) => ({
					content_id: String(item.product._id),
					id: String(item.product._id),
					quantity: Number(item.count),
					price: Number(item.product.pricing?.current || 0),
				}));

			const fbContents = products
				.filter((p) => p?.product?._id)
				.map((item) => ({
					id: String(item.product._id),
					quantity: Number(item.count),
					item_price: Number(item.product.pricing?.current || 0),
				}));

			const tiktokContents = products
				.filter((p) => p?.product?._id)
				.map((item) => ({
					content_id: String(item.product._id),
					quantity: Number(item.count),
					price: Number(item.product.pricing?.current || 0),
				}));

			const content_ids = contents.map((c) => c.id);

			void Promise.allSettled([
				trackEvent(
					'Purchase',
					websiteId,
					{
						value: value,
						currency: currency,
						contents: fbContents,
						content_ids: content_ids,
						content_type: 'product',
					},
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
						value: value,
						currency: currency,
						contents: tiktokContents,
						content_type: 'product',
					},
					true,
					{
						client_name: guest?.name ?? '',
						client_number: guest?.phone ?? '',
					},
					{ event_id: eventId }
				),
			]).catch(() => {});

			await submit({ sessionId: storedSessionId });
		} catch (error) {
			console.error('Error submitting order:', error);
			setShowOverlay(false);
			lastSubmitTime.current = 0;
		}
	}, [isSubmitting, products, subTotal, websiteId, guest, submit]);

	return (
		<>
			<ProcessingOverlay isVisible={showOverlay} />

			<div className="mt-6 flex justify-between gap-8">
				<Button
					onClick={handleConfirm}
					loading={isSubmitting}
					disabled={isSubmitting}
					className={`w-full rounded-lg py-3 text-base font-medium transition-all duration-200 ${
						isSubmitting
							? 'cursor-not-allowed bg-slate-400 text-slate-300 opacity-70'
							: 'active:scale-98 bg-slate-700 text-white hover:bg-slate-800 hover:shadow-lg'
					}`}
					sizeClass="py-1.5 sm:py-3 w-full"
				>
					{isSubmitting ? (
						<span className="flex items-center justify-center gap-2">
							<svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"
									fill="none"
								/>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								/>
							</svg>
							{t('processing')}
						</span>
					) : (
						t('confirm')
					)}
				</Button>
			</div>
		</>
	);
}
