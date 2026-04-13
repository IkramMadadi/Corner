import React from 'react';

export interface ButtonCloseProps {
	className?: string;
	onClick?: () => void;
}

const ButtonClose: React.FC<ButtonCloseProps> = ({ className = '', onClick = () => {} }) => {
	return (
		<button
			className={`flex h-8 w-8 items-center justify-center rounded-full hover:bg-neutral-200 ${className}`}
			onClick={onClick}
			type="reset"
		>
			<span className="sr-only">Close</span>X
		</button>
	);
};

export default ButtonClose;
