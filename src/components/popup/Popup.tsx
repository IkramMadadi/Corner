'use client';
import React, { useState, useEffect } from 'react';

import { popupEventEmitter } from '@common/events/popup';
import { cn } from '@common/utils/frontend/utils';
import ButtonCircle from '#client/Buttons/ButtonCircle';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function Popup() {
	const t = useTranslations('Popup');
	const [isOpen, setIsOpen] = useState(false);
	const [orderId, setOrderId] = useState<string>('');

	useEffect(() => {
		const handleOpen = (orderId: string) => {
			setIsOpen(true);
			setOrderId(orderId);
		};
		const handleClose = () => setIsOpen(false);

		popupEventEmitter.on('popupOpen', handleOpen);
		popupEventEmitter.on('popupClose', handleClose);

		return () => {
			popupEventEmitter.off('popupOpen', handleOpen);
			popupEventEmitter.off('popupClose', handleClose);
		};
	}, []);

	const handleBackdropClick = () => {
		popupEventEmitter.emit('popupClose');
	};

	return (
		<>
			<div
				className={cn(
					'fixed left-1/2 top-1/2 z-[125] flex max-h-full w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 flex-col gap-4 rounded-3xl bg-white pt-6 transition-transform',
					isOpen ? 'scale-100' : 'scale-0'
				)}
			>
				<div className="flex flex-col items-center gap-4 rounded-xl py-16">
					<ButtonCircle
						className="absolute right-6 top-3"
						onClick={() => popupEventEmitter.emit('popupClose')}
					>
						<span className="icon-[material-symbols--close-rounded] h-8 w-8" />
					</ButtonCircle>
					<Image src={'/images/bag.png'} alt="success bag picture" width={126} height={126} />
					<p className="text-xl">{t('amazing')}</p>
					<p className="text-2xl font-semibold">{t('description')}</p>
					<p className="text-xl">
						{t('orderNumber')}: <span className="font-bold">{orderId}</span>
					</p>
				</div>
			</div>
			<div
				className={cn(
					'fixed inset-0 z-[102] bg-black bg-opacity-50 transition-opacity',
					isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
				)}
				onClick={handleBackdropClick}
			/>
		</>
	);
}
