import type { ButtonHTMLAttributes, FC } from 'react';
import React from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

const PrevBtn: FC<Props> = ({ className = 'w-10 h-10 text-lg', ...args }) => {
	return (
		<button
			type="button"
			className={`PrevBtn ${className} inline-flex items-center justify-center rounded-full border-2 border-[#d9e6ef] bg-[#c2d7e7] text-white opacity-60 hover:border-neutral-300`}
			{...args}
		>
			<span className="icon-[mdi--keyboard-arrow-left] text-2xl" />
		</button>
	);
};

export default PrevBtn;
