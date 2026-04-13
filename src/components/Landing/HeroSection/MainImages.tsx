import Image from 'next/image';
import React from 'react';

export default function MainImages() {
	return (
		<div className="relative col-span-1 flex items-center justify-center md:col-[8/span_5] xl:col-[6/span_3] xl:row-[1/-1] xl:pt-12">
			{/* <Image
				src={'/images/spiral.png'}
				alt="Spiral design"
				width={812}
				height={812}
				className="absolute top-1/2 w-full -translate-y-[42%]"
			/> */}
			<Image
				src={'/images/the9er3a2.png'}
				width={549}
				height={1002}
				alt="The9er3a product"
				className="z-10 w-[90%] max-w-sm"
			/>
		</div>
	);
}
