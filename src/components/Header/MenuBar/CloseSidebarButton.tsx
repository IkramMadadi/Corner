'use client';
import ButtonCircle from '#client/Buttons/ButtonCircle';
import { sidebarEventEmitter } from '@common/events/sidebar';
import React from 'react';

export default function CloseSidebarButton() {
	return (
		<ButtonCircle onClick={() => sidebarEventEmitter.emit('sidebarClose')}>
			<span className="icon-[material-symbols--close-rounded] h-8 w-8" />
		</ButtonCircle>
	);
}
