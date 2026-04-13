import React from 'react';

import Button, { ButtonProps } from './Button';
import { cn } from '@common/utils/frontend/utils';

export interface Buttonprimaryrops extends ButtonProps {
	href?: string;
}

const ButtonPrimary: React.FC<Buttonprimaryrops> = ({ className = '', ...args }) => {
	return (
		<Button
			className={cn(
				'border border-primary bg-primary text-white shadow-lg shadow-primary/35 hover:bg-white hover:text-primary',
				'disabled:bg-opacity-50 disabled:hover:bg-gray-300 disabled:hover:text-black',
				className
			)}
			{...args}
		/>
	);
};

export default ButtonPrimary;
