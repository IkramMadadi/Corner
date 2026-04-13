'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { UpsellBottomSheet } from './UpsellBottomSheet';

interface FloatingGiftButtonProps {
	parentProduct: UpsellParentDataI;
	delayMs?: number;
}

export function FloatingGiftButton({ parentProduct, delayMs = 2000 }: FloatingGiftButtonProps) {
	const [isButtonVisible, setIsButtonVisible] = useState(false);
	const [isSheetOpen, setIsSheetOpen] = useState(false);
	const [hasInteracted, setHasInteracted] = useState(false);
	const t = useTranslations('Upsell');

	useEffect(() => {
		if (typeof window === 'undefined') return;

		const storageKey = `upsell-dismissed-${parentProduct._id}`;
		const dismissed = sessionStorage.getItem(storageKey);

		if (dismissed === 'true') return;

		const timer = setTimeout(() => {
			setIsButtonVisible(true);
		}, delayMs);

		return () => clearTimeout(timer);
	}, [delayMs, parentProduct._id]);

	const handleButtonClick = () => {
		setIsSheetOpen(true);
		setHasInteracted(true);
	};

	const handleSheetClose = () => {
		setIsSheetOpen(false);
	};

	const handlePermanentDismiss = () => {
		setIsSheetOpen(false);
		setIsButtonVisible(false);
		sessionStorage.setItem(`upsell-dismissed-${parentProduct._id}`, 'true');
	};

	if (!parentProduct) return null;

	return (
		<>
			<AnimatePresence>
				{isButtonVisible && (
					<motion.div
						initial={{ scale: 0, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0, opacity: 0 }}
						transition={{ type: 'spring', stiffness: 260, damping: 20 }}
						className="fixed right-4 top-24 z-[9999]"
					>
						<motion.div
							animate={{ y: [0, -6, 0] }}
							transition={{
								duration: 2.5,
								repeat: Infinity,
								ease: 'easeInOut',
							}}
						>
							<button
								onClick={handleButtonClick}
								className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-500 shadow-lg transition-all duration-200 hover:scale-110 hover:shadow-xl active:scale-95"
							>
								<span className="absolute inset-0 animate-ping rounded-full bg-amber-400 opacity-40" />

								<span className="absolute inset-0 animate-pulse rounded-full bg-amber-300 opacity-20" />

								<Gift className="relative z-10 h-7 w-7 text-white" />

								{!hasInteracted && (
									<span className="absolute -right-1 -top-1 flex h-5 w-5">
										<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
										<span className="relative inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
											1
										</span>
									</span>
								)}
							</button>
						</motion.div>

						<div className="pointer-events-none absolute right-0 top-full mt-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
							<div className="whitespace-nowrap rounded-lg bg-gray-900 px-3 py-2 text-xs font-medium text-white shadow-lg">
								{hasInteracted ? t('viewOfferAgain') : t('specialOfferForYou')} 🎁
								<div className="absolute -top-1 right-4 h-2 w-2 rotate-45 bg-gray-900" />
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			<UpsellBottomSheet
				parentProduct={parentProduct}
				isOpen={isSheetOpen}
				onClose={handleSheetClose}
				onPermanentDismiss={handlePermanentDismiss}
			/>
		</>
	);
}

export default FloatingGiftButton;
