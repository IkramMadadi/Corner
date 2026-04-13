'use client';
import { cn } from '@common/utils/frontend/utils';
import { sidebarEventEmitter } from '@common/events/sidebar';
import { ReactNode, useEffect, useState } from 'react';

export default function Sidebar({ children }: { children: ReactNode }) {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const handleOpen = () => setIsOpen(true);
		const handleClose = () => setIsOpen(false);

		sidebarEventEmitter.on('sidebarOpen', handleOpen);
		sidebarEventEmitter.on('sidebarClose', handleClose);

		return () => {
			sidebarEventEmitter.off('sidebarOpen', handleOpen);
			sidebarEventEmitter.off('sidebarClose', handleClose);
		};
	}, []);

	const handleBackdropClick = () => {
		sidebarEventEmitter.emit('sidebarClose');
	};

	return (
		<div
			/* className= */
			className={cn(
				'fixed inset-0 z-50 flex items-start justify-start bg-black lg:hidden',
				isOpen ? 'bg-opacity-50' : 'pointer-events-none bg-opacity-0'
			)}
			onClick={handleBackdropClick}
		>
			<div
				id="menubar"
				className={cn(
					'flex h-full w-full max-w-xs flex-col justify-start gap-6 bg-white p-6 transition-all duration-300',
					isOpen ? 'translate-x-0' : 'ltr:-translate-x-full rtl:translate-x-full'
				)}
				onClick={(e) => e.stopPropagation()}
			>
				{children}
			</div>
		</div>
	);
}
