import { cn } from '@common/utils/frontend/utils';
import type { FC, SelectHTMLAttributes } from 'react';
import React from 'react';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
	className?: string;
	sizeClass?: string;
}

const Select: FC<SelectProps> = ({ className = '', sizeClass = 'h-14', children, ...args }) => {
	return (
		<select
			className={cn(
				'bg-gray block w-full rounded-xl border border-neutral-200 text-sm focus:ring focus:ring-transparent focus:ring-opacity-50 disabled:text-neutral-300',
				sizeClass,
				className
			)}
			{...args}
		>
			{children}
		</select>
	);
};

export default Select;
