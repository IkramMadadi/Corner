'use client';
import { sidebarEventEmitter } from '@common/events/sidebar';

export function MenuButton() {
	return (
		<button
			type="button"
			onClick={() => {
				sidebarEventEmitter.emit('sidebarOpen');
			}}
			className="my-auto flex shrink-0 rounded-lg border border-transparent p-2 hover:cursor-pointer hover:border-gray-200 hover:bg-gray-200 lg:hidden"
		>
			<span className="icon-[solar--hamburger-menu-line-duotone] h-6 w-6" />
		</button>
	);
}
