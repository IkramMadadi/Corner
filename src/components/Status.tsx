'use client';
import { cn } from '@common/utils/frontend/utils';
import React from 'react';
const statusMap: Record<OrderStatusTypes | ProductLabelsT | 'default', string> = {
	/* order */
	cancelled: 'bg-blackN',
	confirmed: 'bg-secondary',
	delivered: 'bg-[#A0D6B4]',
	shipped: 'bg-cyan-400',
	pending: 'bg-primary',
	returned: 'bg-red-500',
	/* product */
	bestSeller: 'bg-primary',
	new: 'bg-secondary',
	onSale: 'bg-secondaryB',
	outOfStock: 'bg-blackN',
	lowInStock: 'bg-secondaryO',
	featured: 'bg-secondaryY',
	/* 
	Articles: 'bg-primary text-primary',
	Interviews: 'bg-primary text-primary',
	News: 'bg-secondary text-secondary',
	Other: 'bg-secondaryB text-secondaryB',
	Reviews: 'bg-secondaryP text-secondaryP',
	Tips: 'bg-secondaryO text-secondaryO',
	Tutorials: 'bg-secondaryY text-secondaryY',
	*/
	/* default */
	default: 'bg-blackN',
};
export default function Status({ status, label, classname }: { status?: string; label: string; classname?: string }) {
	return (
		<div
			className={cn(
				'z-20 flex grow-0 px-6 py-2 text-white',
				status ? statusMap[status as keyof typeof statusMap] || statusMap['default'] : statusMap['default'],
				'rounded-ee-3xl rounded-ss-3xl',
				classname
			)}
		>
			<span className="my-auto text-center text-xs leading-none first-letter:uppercase">{label}</span>
		</div>
	);
}
