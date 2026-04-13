'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Gift, Truck, Shield, Star, RotateCcw } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

interface UpsellBottomSheetProps {
	parentProduct: UpsellParentDataI;
	isOpen: boolean;
	onClose: () => void;
	onPermanentDismiss: () => void;
}

export function UpsellBottomSheet({ parentProduct, isOpen, onClose, onPermanentDismiss }: UpsellBottomSheetProps) {
	const locale = useLocale();
	const t = useTranslations('Upsell');

	const { name, thumbnail, pricing, landingPage } = parentProduct;
	const discount = pricing.original ? Math.round(((pricing.original - pricing.current) / pricing.original) * 100) : 0;

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
						className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm"
						onClick={onClose}
					/>

					<motion.div
						initial={{ y: '100%' }}
						animate={{ y: 0 }}
						exit={{ y: '100%' }}
						transition={{ type: 'spring', damping: 30, stiffness: 300 }}
						className="fixed inset-x-0 bottom-0 z-[9999] mx-auto max-w-lg"
					>
						<div className="relative overflow-hidden rounded-t-3xl bg-white shadow-2xl">
							<div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between p-4">
								<button
									onClick={onClose}
									className="flex h-10 w-10 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-sm transition-all hover:bg-black/30 active:scale-95"
									aria-label={t('close')}
								>
									<X className="h-5 w-5" />
								</button>

								{discount > 0 && (
									<motion.span
										initial={{ scale: 0 }}
										animate={{ scale: 1 }}
										transition={{ type: 'spring', delay: 0.2 }}
										className="rounded-full bg-red-500 px-3 py-1 text-sm font-bold text-white shadow-lg"
									>
										-{discount}%
									</motion.span>
								)}
							</div>

							<div className="relative h-48 bg-gradient-to-b from-gray-100 to-gray-200">
								<Image
									src={thumbnail.src}
									alt={name[locale as LanguagesI]}
									fill
									className="object-contain p-4"
									sizes="(max-width: 768px) 100vw, 512px"
								/>

								<motion.div
									initial={{ y: 20, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{ delay: 0.3 }}
									className="absolute bottom-4 left-1/2 -translate-x-1/2"
								>
									<span className="flex items-center gap-1 rounded-full bg-amber-500 px-4 py-1.5 text-sm font-bold text-white shadow-lg">
										<Gift className="h-4 w-4" />
										{t('exclusiveOffer')}
									</span>
								</motion.div>
							</div>

							<div className="space-y-4 p-6">
								<div className="text-center">
									<p className="mb-1 text-sm font-medium text-amber-600">{t('recommendedForYou')}</p>
									<h2 className="text-xl font-bold text-gray-900">{name[locale as LanguagesI]}</h2>
								</div>

								<div className="grid grid-cols-3 gap-2">
									<FeatureBadge icon={<Truck className="h-4 w-4" />} text={t('freeShipping')} />
									<FeatureBadge icon={<Shield className="h-4 w-4" />} text={t('guarantee')} />
									<FeatureBadge icon={<Star className="h-4 w-4" />} text={t('premium')} />
								</div>

								<div className="text-center">
									<div className="flex items-center justify-center gap-3">
										{pricing.original && (
											<span className="text-lg text-gray-400 line-through">
												{pricing.original.toLocaleString()} {t('currency')}
											</span>
										)}
										<span className="text-3xl font-bold text-primary">
											{pricing.current.toLocaleString()} {t('currency')}
										</span>
									</div>
									{discount > 0 && (
										<p className="mt-1 text-sm font-medium text-green-600">
											{t('youSave')} {(pricing.original! - pricing.current).toLocaleString()}{' '}
											{t('currency')}
										</p>
									)}
								</div>

								<div className="flex gap-3">
									<button
										onClick={onClose}
										className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-gray-200 py-3 font-semibold text-gray-600 transition-all hover:bg-gray-50 active:scale-[0.98]"
									>
										<RotateCcw className="h-4 w-4" />
										{t('maybeLater')}
									</button>

									<Link
										href={landingPage}
										onClick={onClose}
										className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-3 font-semibold text-white shadow-lg transition-all hover:bg-primary/90 active:scale-[0.98]"
									>
										{t('viewOffer')}
										<ExternalLink className="h-4 w-4" />
									</Link>
								</div>

								<button
									onClick={onPermanentDismiss}
									className="w-full py-2 text-center text-xs text-gray-400 transition-colors hover:text-gray-600"
								>
									{t('noThanks')} - {t('dontShowAgain')}
								</button>

								<p className="text-center text-xs text-gray-400">✓ {t('moneyBackGuarantee')}</p>
							</div>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}

function FeatureBadge({ icon, text }: { icon: React.ReactNode; text: string }) {
	return (
		<motion.div
			initial={{ scale: 0.8, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
			transition={{ delay: 0.4 }}
			className="flex flex-col items-center gap-1 rounded-lg bg-gray-50 p-2 text-center"
		>
			<span className="text-primary">{icon}</span>
			<span className="text-xs font-medium text-gray-600">{text}</span>
		</motion.div>
	);
}

export default UpsellBottomSheet;
