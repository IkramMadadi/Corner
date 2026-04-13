'use client';
import { cn } from '@common/utils/frontend/utils';
import { ReactNode } from 'react';

export function Section({
	className = 'w-full',
	children,
	onClick,
}: {
	className?: string;
	children?: ReactNode;
	onClick?: () => void;
}) {
	return (
		<section onClick={onClick} className={cn('border-t border-neutral-300 p-4 first:border-t-0 md:p-8', className)}>
			{children}
		</section>
	);
}
