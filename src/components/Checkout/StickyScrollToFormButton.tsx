'use client';

import { useEffect, useState } from 'react';
import { cn } from '@common/utils/frontend/utils';
import { ShoppingBag } from 'lucide-react';

export function StickyScrollToFormButton() {
	const [visible, setVisible] = useState(true);
	const [isAttentionPulse, setIsAttentionPulse] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const formElement = document.getElementById('order-section');
			if (!formElement) return;

			const rect = formElement.getBoundingClientRect();
			const inView = rect.top < window.innerHeight && rect.bottom > 0;
			setVisible(!inView);
		};

		window.addEventListener('scroll', handleScroll);
		handleScroll(); // initial check

		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// Attention pulse animation every 5 seconds
	useEffect(() => {
		const interval = setInterval(() => {
			setIsAttentionPulse(true);
			setTimeout(() => setIsAttentionPulse(false), 1200); // Duration of the pulse
		}, 5000); // Every 5 seconds

		return () => clearInterval(interval);
	}, []);

	const scrollToForm = () => {
		const formElement = document.getElementById('order-section');
		if (formElement) {
			formElement.scrollIntoView({ behavior: 'smooth' });
		}
	};

	if (!visible) return null;

	// Arrow Down Icon
	const ArrowIcon = () => (
		<svg 
			width="14" 
			height="14" 
			viewBox="0 0 24 24" 
			fill="currentColor"
			className="transition-transform duration-300 group-hover:translate-y-0.5"
		>
			<path d="M12 16l-6-6h12l-6 6z"/>
		</svg>
	);

	// Enhanced Shopping Bag Icon
	const EnhancedShoppingBag = () => (
		<div className="relative">
			<ShoppingBag 
				size={18} 
				className="transition-all duration-200 group-hover:scale-110 group-hover:rotate-3" 
			/>
			{/* Mini notification dot */}
			<div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
		</div>
	);

	return (
		<div className="fixed bottom-20 left-4 z-50">
			<div className="relative">
				{/* Soft multi-layer glow effects (premium black palette) */}
				<div className="absolute -inset-2 rounded-full bg-gradient-to-r from-neutral-800 via-zinc-900 to-black opacity-30 blur-lg"></div>
				<div className="absolute -inset-1 rounded-full bg-gradient-to-r from-neutral-700 via-neutral-900 to-black opacity-40 blur-md"></div>
				{/* Attention ring only when pulsing */}
				{isAttentionPulse && (
					<div className="absolute -inset-3 rounded-full border-2 border-amber-400/60 animate-ping" />
				)}
				
				<div className={`relative bg-white rounded-full p-1 shadow-2xl ${isAttentionPulse ? 'scale-[1.02] transition-transform duration-500' : ''}`}>
					<button
						onClick={scrollToForm}
						className={cn(
							'group relative flex items-center gap-2 px-4 py-3 rounded-full text-white transition-all duration-300 overflow-hidden border backdrop-blur-sm',
							'bg-gradient-to-r from-neutral-900 via-zinc-900 to-black',
							'border-white/10 shadow-xl shadow-black/30 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-105 active:scale-95'
						)}
						aria-label="الانتقال إلى قسم الطلب"
					>
						{/* Enhanced shimmer effect */}
						<div className="absolute inset-0 -top-full bg-gradient-to-b from-transparent via-white/20 to-transparent transform rotate-12 group-hover:top-full transition-all duration-700"></div>
						
						{/* Secondary shimmer for extra sparkle */}
						<div className="absolute inset-0 -left-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform skew-x-12 group-hover:left-full transition-all duration-500" style={{animationDelay: '0.2s'}}></div>
						
						{/* Icon container */}
						<div className="relative z-10 flex-shrink-0 transform transition-transform duration-300 group-hover:rotate-12">
							<EnhancedShoppingBag />
						</div>
						
						{/* Text with enhanced animation */}
						<span className="relative z-10 font-bold text-sm whitespace-nowrap transform transition-all duration-300 group-hover:scale-105">
							اطلب الآن
						</span>
						
						{/* Arrow with enhanced animation */}
						<div className="relative z-10 flex-shrink-0">
							<ArrowIcon />
						</div>
						
						{/* Hint tooltip on hover */}
						<div className="absolute left-full ml-4 px-4 py-2 bg-gradient-to-r from-neutral-900 to-black text-white text-xs font-medium rounded-lg opacity-0 pointer-events-none transition-all duration-300 group-hover:opacity-100 whitespace-nowrap translate-x-2 group-hover:translate-x-0 shadow-xl border border-white/10">
							🛒 انتقل إلى نموذج الطلب
							<div className="absolute right-full top-1/2 -translate-y-1/2 border-6 border-transparent border-l-neutral-900"></div>
						</div>

						{/* Floating particles effect on hover */}
						<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
							{[...Array(3)].map((_, i) => (
								<div 
									key={i}
									className="absolute w-1 h-1 bg-white rounded-full animate-ping"
									style={{
										top: `${20 + i * 20}%`,
										left: `${30 + i * 15}%`,
										animationDelay: `${i * 0.1}s`,
										animationDuration: '1s'
									}}
								></div>
							))}
						</div>
					</button>
				</div>

				{/* Floating call-to-action text (slides from above during pulse) */}
				<div className={cn(
					'absolute -top-14 left-1/2 -translate-x-1/2 transition-all duration-500',
					isAttentionPulse ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
				)}>
					<div className="relative bg-gradient-to-r from-neutral-900 to-black text-white px-3 py-2 rounded-xl text-xs font-bold shadow-xl border border-white/10">
						🔥 عرض محدود!
						<div className="absolute left-1/2 -bottom-2 -translate-x-1/2 border-8 border-transparent border-t-neutral-900" />
					</div>
				</div>
			</div>
		</div>
	);
}

export function WhatsAppFloatingButton() {
	const [show, setShow] = useState(true);
	const phone = '213781820706'
	const message = 'السلام عليكم، أود طلب هذا المنتج ✨'

	useEffect(() => {
		const target = document.getElementById('order-section');

		if (!target) return;

		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				setShow(!entry.isIntersecting);
			},
			{
				root: null,
				rootMargin: '0px',
				threshold: 0.3,
			}
		);

		observer.observe(target);

		return () => {
			observer.disconnect();
		};
	}, []);

	const handleClick = () => {
		const encodedMessage = encodeURIComponent(message);
		window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
	};

	if (!show) return null;

	const WhatsAppIcon = () => (
		<svg 
			width="28" 
			height="28" 
			viewBox="0 0 24 24" 
			fill="currentColor"
			className="drop-shadow-sm"
		>
			<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516"/>
		</svg>
	);

	return (
		<div className="fixed bottom-20 right-4 z-50">
			<div className="relative">
				<div className="absolute inset-0 rounded-full bg-green-400 opacity-30 animate-ping"></div>
				<div className="absolute inset-0 rounded-full bg-green-400 opacity-20 animate-pulse"></div>
				
				<button
					onClick={handleClick}
					className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white shadow-lg shadow-green-400/30 transition-all duration-300 hover:shadow-xl hover:shadow-green-400/40 hover:scale-105 active:scale-95 group"
					aria-label="تواصل عبر WhatsApp"
				>
					<div className="flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
						<WhatsAppIcon />
					</div>
					
					<div className="absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 pointer-events-none transition-opacity duration-200 group-hover:opacity-100 whitespace-nowrap">
						تواصل معنا الآن
						<div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
					</div>
				</button>
			</div>
		</div>
	);
}
