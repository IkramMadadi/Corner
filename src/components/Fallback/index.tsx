import React from 'react';
import './style.css';
export default function Fallback({ className }: { className?: 'f-full' }) {
	return (
		<div className={'fallback' + (className ? ` ${className}` : '')}>
			<div className="f-loader" />
		</div>
	);
}
