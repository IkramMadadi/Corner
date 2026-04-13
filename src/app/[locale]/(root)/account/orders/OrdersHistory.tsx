'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useMemo, useRef, useState } from 'react';
import OrderCard from './OrderCard';
import { localesMap } from '@common/i18n/languages';

export default function OrdersHistory({ orders, daysToDeliver }: { orders: PublicOrderI[]; daysToDeliver: number }) {
	const order = useTranslations('Order');

	const locale = useLocale() as LanguagesI;
	const [oldestOrder, newestOrder] = useMemo(() => {
		return orders.reduce(
			(prev, current) => {
				return [
					new Date(prev[0].createdAt) < new Date(current.createdAt) ? prev[0] : current,
					new Date(prev[1].createdAt) > new Date(current.createdAt) ? prev[1] : current,
				];
			},
			[orders[0] || { createdAt: 0 }, orders[0] || { createdAt: 0 }]
		);
	}, [orders]);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const scrollRef = useRef<HTMLDivElement | null>(null);
	const scrollPathRef = useRef<HTMLDivElement | null>(null);

	const [scrollTop, setScrollTop] = useState(0); // Top position in percentage (0% to 100%)
	const [isDragging, setIsDragging] = useState(false);
	const isSyncingRef = useRef(false); // Flag to prevent recursive updates

	// Update container's scrollTop when `scrollTop` changes
	useEffect(() => {
		const container = containerRef.current;
		if (!container || isSyncingRef.current) return;

		// Prevent recursive updates
		isSyncingRef.current = true;

		const scrollHeight = container.scrollHeight - container.clientHeight;
		const newScrollTop = (scrollTop / 100) * scrollHeight;

		container.scrollTop = newScrollTop;

		// Delay clearing the sync flag
		requestAnimationFrame(() => (isSyncingRef.current = false));
	}, [scrollTop]);

	// Sync `scrollTop` when the container is scrolled manually
	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const handleScroll = () => {
			if (isSyncingRef.current) return;

			const scrollHeight = container.scrollHeight - container.clientHeight;
			const newScrollTop = (container.scrollTop / scrollHeight) * 100;

			// Prevent recursive updates
			isSyncingRef.current = true;

			setScrollTop(newScrollTop);

			// Delay clearing the sync flag
			requestAnimationFrame(() => (isSyncingRef.current = false));
		};

		container.addEventListener('scroll', handleScroll);

		return () => {
			container.removeEventListener('scroll', handleScroll);
		};
	}, []);
	useEffect(() => {
		if (isDragging) {
			document.body.style.userSelect = 'none'; // Disable text selection
		} else {
			document.body.style.userSelect = ''; // Re-enable text selection
		}
		return () => {
			document.body.style.userSelect = ''; // Ensure it's reset on cleanup
		};
	}, [isDragging]);
	// Handle mouse events for dragging
	useEffect(() => {
		const handleMouseUp = () => {
			setIsDragging(false);
		};
		const handleMouseMove = (e: MouseEvent) => {
			if (!isDragging) return;

			const path = scrollPathRef.current;
			if (!path) return;

			const rect = path.getBoundingClientRect();

			// Calculate new top position as a percentage
			let newTop = ((e.clientY - rect.top) / rect.height) * 100;
			newTop = Math.max(0, Math.min(newTop, 100)); // Clamp between 0% and 100%
			setScrollTop(newTop);
		};

		if (isDragging) {
			window.addEventListener('mousemove', handleMouseMove);
			window.addEventListener('mouseup', handleMouseUp);
		} else {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', handleMouseUp);
		}

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', handleMouseUp);
		};
	}, [isDragging]);
	if (orders.length < 1)
		return (
			<div className="flex h-full w-full flex-col items-center justify-center">
				<p className="text-2xl">{order('empty')}</p>
			</div>
		);
	return (
		<div className="grid h-full w-full grid-cols-12 gap-2 font-serif">
			<div
				ref={containerRef}
				className="no-scrollbar col-span-12 flex flex-col gap-8 overflow-auto pb-2 md:col-span-10 md:h-[calc(100vh-180px)]"
			>
				{orders.map((order) => (
					<OrderCard order={order} key={order._id} daysToDeliver={daysToDeliver} />
				))}
			</div>
			<div className="hidden flex-col items-center gap-4 md:col-span-2 md:flex">
				<p className="select-none">
					{new Date(newestOrder.createdAt).toLocaleDateString(localesMap[locale], {
						day: 'numeric',
						weekday: 'short',
						month: 'short',
						year: 'numeric',
						hour: 'numeric',
						minute: '2-digit',
					})}
				</p>
				<div
					ref={scrollPathRef}
					onClick={(e) => {
						const path = scrollPathRef.current;
						if (!path) return;
						const rect = path.getBoundingClientRect();

						// Calculate position based on click
						let newTop = ((e.clientY - rect.top) / rect.height) * 100;
						newTop = Math.max(0, Math.min(newTop, 100)); // Clamp between 0% and 100%
						setScrollTop(newTop);
					}}
					className="relative w-4 flex-1"
				>
					<div className="absolute left-0 top-0 h-full -translate-x-1/2 border-l-2 border-dashed" />
					<div
						ref={scrollRef}
						className="absolute left-0 h-4 w-4 translate-x-[-9px] rounded-full bg-black"
						style={{
							top: `${scrollTop}%`,
							cursor: isDragging ? 'grabbing' : 'grab',
						}}
						onMouseDown={() => setIsDragging(true)}
					/>
				</div>
				<p className="select-none">
					{new Date(oldestOrder.createdAt).toLocaleDateString(localesMap[locale], {
						day: 'numeric',
						weekday: 'short',
						month: 'short',
						year: 'numeric',
						hour: 'numeric',
						minute: '2-digit',
					})}
				</p>
			</div>
		</div>
	);
}
