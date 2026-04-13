'use client';

import LikeButton from '#client/Buttons/LikeButton';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface ImageShowCaseProps {
	shots: PublicProductI['images'];
	id: string;
}

export default function ImageShowCase({ shots, id }: ImageShowCaseProps) {
	const containerRef = useRef<null | HTMLDivElement>(null);
	const imageRef = useRef<null | HTMLImageElement>(null);

	const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

	useEffect(() => {
		const image = imageRef.current;
		const container = containerRef.current;

		function handleMouseMove(this: HTMLDivElement, e: MouseEvent) {
			const { left, top, width, height } = container!.getBoundingClientRect();
			const x = ((e.clientX - left) / width) * 100;
			const y = ((e.clientY - top) / height) * 100;

			const zoomStyle = {
				transformOrigin: `${x}% ${y}%`,
				transform: 'scale(1.5)',
			};

			image!.style.transform = zoomStyle.transform;
			image!.style.transformOrigin = zoomStyle.transformOrigin;
		}

		function handleMouseLeave() {
			image!.style.transform = '';
			image!.style.transformOrigin = '';
		}

		if (image && container) {
			container.addEventListener('mousemove', handleMouseMove);
			container.addEventListener('mouseleave', handleMouseLeave);
		}

		return () => {
			if (image && container) {
				container.removeEventListener('mousemove', handleMouseMove);
				container.removeEventListener('mouseleave', handleMouseLeave);
			}
		};
	}, [containerRef, imageRef]);
	// Vérification si il y a des images

	return (
		<div className="rounded-2xl border border-neutral-300 p-2">
			<div className="relative mb-4 overflow-hidden rounded-2xl md:h-[480px]" ref={containerRef}>
				<Image
					loading="lazy"
					width={500}
					height={500}
					src={'/images/bg-pattern.svg'}
					alt={'pattern'}
					style={{ transition: 'transform 0.2s ease' }}
					className="absolute inset-0 -z-10 h-full w-full object-cover object-center opacity-30"
				/>
				<Image
					loading="eager"
					width={500}
					height={500}
					ref={imageRef}
					src={shots[activeImageIndex]?.src || 'https://placehold.co/500x500.png?text=No+images'}
					alt={shots[activeImageIndex]?.alt || 'placeholder'}
					style={{ transition: 'transform 0.2s ease' }}
					className="h-full w-full object-contain object-center"
				/>
				<LikeButton productId={id} className="absolute right-4 top-4 z-10" />
			</div>

			<div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
				{shots.map((shot, index) => (
					<div
						key={index}
						className={`${
							activeImageIndex === index ? 'border-2 border-primary' : ''
						} h-[100px] overflow-hidden rounded-lg`}
					>
						<button
							className="h-full w-full"
							type="button"
							onClick={() => {
								setActiveImageIndex(index);
							}}
						>
							<Image
								loading="lazy"
								src={shot.src}
								width={500}
								height={500}
								alt={shot.alt}
								className="h-full w-full object-contain object-center"
							/>
						</button>
					</div>
				))}
			</div>
		</div>
	);
}
