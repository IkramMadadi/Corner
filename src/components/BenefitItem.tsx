import Image from 'next/image';
import React from 'react';

export default async function BenefitItem({ benefit, locale }: { locale: LanguagesI; benefit: ServiceElementI }) {
	return (
		<div className="flex flex-col items-center gap-3">
			<Image
				width={benefit.image.width}
				height={benefit.image.height}
				className="mx-auto h-10 w-10"
				src={benefit.image.src}
				alt={benefit.image.alt}
				loading="lazy"
			/>

			<h3 className="font-sans text-base font-semibold leading-none sm:text-lg lg:text-xl">
				{benefit.title[locale]}
			</h3>
			<p className="font-serif text-xs">{benefit.description[locale]}</p>
		</div>
	);
}
