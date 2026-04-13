import React from 'react';

import Button, { ButtonProps } from './Button';
import { cn } from '@common/utils/frontend/utils';

export interface ButtonSecondaryProps extends ButtonProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	href?: any;
}

const ButtonSecondary: React.FC<ButtonSecondaryProps> = ({ className = '', ...args }) => {
	return (
		<Button
			className={cn(
				'border border-blackN text-blackN ease-in hover:bg-blackN hover:text-white disabled:bg-black disabled:bg-opacity-20 disabled:hover:text-black',
				className
			)}
			{...args}
		/>
	);
};

export default ButtonSecondary;
