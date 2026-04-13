'use client';
import StarRating from '#client/StarRating';
import { useLocale } from 'next-intl';
import Image from 'next/image';

export default function TestimonialItem({ item }: { item: PublicRatedServiceElementI; index: number }) {
	const locale = useLocale() as LanguagesI;
	return (
		<div className="relative flex h-full w-full flex-1 flex-col items-center px-2">
			{item.image && (
				<Image
					className="h-24 w-24 shrink-0 translate-y-1/2 transform rounded-full object-cover"
					src={item.image}
					alt={'testimonial profile pic'}
					width={96}
					height={96}
					/* style={{
                        clipPath:
                            'path("M48 0C35.2615 0 24.9351 10.3265 24.9351 23.0649C24.9351 24.0978 24.0978 24.9351 23.0649 24.9351C10.3265 24.9351 0 35.2615 0 48C0 60.7385 10.3265 71.0651 23.0649 71.0651C24.0978 71.0651 24.9351 71.9022 24.9351 72.9349C24.9351 85.6734 35.2615 96 48 96C60.7385 96 71.0651 85.6734 71.0651 72.9349C71.0651 71.9022 71.9022 71.0651 72.9349 71.0651C85.6734 71.0651 96 60.7385 96 48C96 35.2615 85.6734 24.9351 72.9349 24.9351C71.9022 24.9351 71.0651 24.0978 71.0651 23.0649C71.0651 10.3265 60.7385 0 48 0Z")',
                    }} */
				/>
			)}
			<div className="flex w-full flex-1 flex-col items-center gap-2 rounded-2xl bg-secondaryP bg-opacity-10 p-6 pt-14 text-center">
				<p className="my-auto">{item.description[locale]}</p>
				<h3 className="mt-auto font-sans font-medium">{item.title[locale]}</h3>
				<StarRating average={item.rating || 0} />
			</div>
		</div>
	);
}
