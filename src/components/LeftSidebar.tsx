'use client';
import { Link, usePathname } from '@client/i18n/routing';
import React, { useEffect, useState } from 'react';

import Logo from './Logo';
import Logout from './auth/Logout';
import { cn } from '@common/utils/frontend/utils';
import { useLocale } from 'next-intl';
import { sidebarEventEmitter } from '@common/events/sidebar';

export default function LeftSidebar() {
	const [isSidebarOpen, setSidebarOpen] = useState(false);
	const pathname = usePathname();
	const locale = useLocale() as LanguagesI;

	const navLinks = [
		{ href: `/account/profile`, label: { en: 'My Profile', fr: 'Mon Profil', ar: 'ملفي الشخصي' } },
		{
			href: '/account/orders',
			label: { en: 'Order History', fr: 'Historique des Commandes', ar: 'تاريخ الطلبات' },
		},
		{ href: '/account/addresses', label: { en: 'Addresses', fr: 'Adresses', ar: 'العناوين' } },
		{ href: '/account/wishlist', label: { en: 'Wishlist', fr: 'Liste de Souhaits', ar: 'قائمة الرغبات' } },
	];

	useEffect(() => {
		function openSidebar() {
			setSidebarOpen(true);
		}
		function closeSidebar() {
			setSidebarOpen(false);
		}
		sidebarEventEmitter.on('sidebarOpen', openSidebar);
		sidebarEventEmitter.on('sidebarClose', closeSidebar);
		return () => {
			sidebarEventEmitter.off('sidebarOpen', openSidebar);
			sidebarEventEmitter.off('sidebarClose', closeSidebar);
		};
	}, []);

	return (
		<>
			{/* Sidebar */}
			<div
				className={cn(
					`top-0 z-[100] flex h-screen shrink-0 flex-col bg-neutral-100 py-8 font-sans transition-transform max-md:fixed ltr:left-0 rtl:right-0`,
					isSidebarOpen
						? 'ltr:translate-x-0 rtl:-translate-x-0'
						: 'max-md:ltr:-translate-x-full max-md:rtl:translate-x-full',
					`lg:relative lg:translate-x-0`
				)}
			>
				{/* Logo */}
				<div className="flex w-full px-14 text-2xl font-bold">
					<Logo className="w-full" />
				</div>

				{/* Navigation Links */}
				<ul className="mt-16 flex h-full w-full flex-col gap-4">
					{navLinks.map((link) => {
						const isActive = pathname === link.href;
						return (
							<li key={link.href} className="relative w-full py-2">
								<div
									className={cn(
										'absolute top-0 h-full w-1.5 bg-secondaryB transition-all duration-300 ltr:left-0 ltr:rounded-r-xl rtl:right-0 rtl:rounded-l-xl',
										isActive
											? 'translate-x-0 opacity-100'
											: 'opacity-0 ltr:-translate-x-full rtl:translate-x-full'
									)}
								/>

								<Link
									locale={locale}
									href={link.href}
									className={cn(
										'block px-14 text-xl text-secondaryB text-opacity-70 transition-colors',
										isActive ? 'font-bold text-opacity-100' : 'hover:text-gray-500'
									)}
								>
									{link.label[locale]}
								</Link>
							</li>
						);
					})}

					{/* Logout */}
					<li className="mt-auto">
						<Logout />
					</li>
				</ul>
			</div>
			{/* Sidebar backdrop */}
			<div
				className={cn(
					'fixed inset-0 z-[80] bg-black bg-opacity-50 transition-opacity lg:hidden',
					isSidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
				)}
				onClick={() => {
					sidebarEventEmitter.emit('sidebarClose');
				}}
			/>
		</>
	);
}
