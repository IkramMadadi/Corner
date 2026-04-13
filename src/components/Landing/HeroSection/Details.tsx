import Image from 'next/image';
import React from 'react';

export default async function Details({ description }: { description: string }) {
	return (
		<div className="hidden flex-col items-center gap-6 xl:col-span-4 xl:row-span-full xl:flex">
			<div
				className="w-[70%]"
				/* 	style={{
					clipPath:
						"path('M71.75 0C32.1236 0 0 32.1236 0 71.75C0 111.377 32.1236 143.5 71.75 143.5C32.1236 143.5 0 175.623 0 215.25C0 254.877 32.1236 287 71.75 287C111.377 287 143.5 254.877 143.5 215.25C143.5 254.877 175.623 287 215.25 287C254.877 287 287 254.877 287 215.25C287 175.623 254.877 143.5 215.25 143.5C254.877 143.5 287 111.377 287 71.75C287 32.1236 254.877 0 215.25 0C175.623 0 143.5 32.1236 143.5 71.75C143.5 32.1236 111.377 0 71.75 0Z')",
				}} */
			>
				<Image
					className="w-full"
					src="/images/micellaire2.png"
					alt="Doriane micellaire"
					width={560}
					height={680}
				/>
			</div>
			<p className="text-sm text-blackN sm:text-base xl:text-lg">{description}</p>
			<Image
				src={'/images/box-2.png'}
				width={857}
				height={730}
				alt="Doriane details"
				className="aspect-[10/3] w-[100px] rounded-full object-cover object-center ltr:mr-auto rtl:ml-auto"
			/>
		</div>
	);
}
