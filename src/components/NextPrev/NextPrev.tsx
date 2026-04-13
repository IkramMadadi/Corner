'use client';

import { cn } from '@common/utils/frontend/utils';
// import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import type { FC } from 'react';
import React from 'react';

export interface NextPrevProps {
	className?: string;
	btnClassName?: string;
	onClickNext?: () => void;
	onClickPrev?: () => void;
	disableNext?: boolean;
	disablePrev?: boolean;
}

const NextPrev: FC<NextPrevProps> = ({
	className = '',
	onClickNext = () => {},
	onClickPrev = () => {},
	btnClassName = 'w-12 h-12',
	disableNext,
	disablePrev,
}) => {
	const [focus, setFocus] = React.useState<'left' | 'right'>('right');

	return (
		<div className={cn('relative flex items-center', className)}>
			<button
				type="button"
				className={`${btnClassName} mr-2 flex items-center justify-center rounded-full border ${
					focus === 'left' ? 'border-primary bg-primary text-white' : 'border-slate-700'
				}`}
				onClick={(e) => {
					e.preventDefault();
					onClickPrev();
				}}
				title="Prev"
				disabled={disablePrev}
				onMouseEnter={() => setFocus('left')}
			>
				<span className="icon-[mdi--keyboard-arrow-left] h-5 w-5" />
			</button>
			<button
				type="button"
				className={`${btnClassName} flex items-center justify-center rounded-full border ${
					focus === 'right' ? 'border-primary bg-primary text-white' : 'border-slate-700'
				}`}
				onClick={(e) => {
					e.preventDefault();
					onClickNext();
				}}
				title="Next"
				disabled={disableNext}
				onMouseEnter={() => setFocus('right')}
			>
				<span className="icon-[mdi--keyboard-arrow-right] h-5 w-5" />
			</button>
		</div>
	);
};

export default NextPrev;
