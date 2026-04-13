import type { FC } from 'react';
import React from 'react';

interface ProgressBarProps {
	value: number;
}

const ProgressBar: FC<ProgressBarProps> = ({ value }) => {
	return (
		<div className="relative flex h-4 w-full overflow-hidden rounded-md bg-grayN/25">
			<div style={{ width: `${value}%` }} className="flex h-full rounded-md bg-secondaryY" />
		</div>
	);
};

export default ProgressBar;
