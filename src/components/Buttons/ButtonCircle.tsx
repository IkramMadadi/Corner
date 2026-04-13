import { cn } from '@common/utils/frontend/utils';
import type { ButtonHTMLAttributes } from 'react';
import React from 'react';

export interface ButtonCircleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	size?: string;
	href?: string;
}

const ButtonCircle: React.FC<ButtonCircleProps> = ({ className = '', size = 'w-6 h-6 lg:w-7 lg:h-7', ...args }) => {
	return (
		<button
			type="button"
			className={cn(
				'flex items-center justify-center rounded-full !leading-none focus:ring-transparent disabled:bg-opacity-70',
				className,
				size
			)}
			{...args}
		/>
	);
};

export default ButtonCircle;
