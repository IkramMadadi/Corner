import React from 'react';
import Logo from '#client/Logo';
import Navbar from './Navbar';

export default async function Header({ locale }: { locale: LanguagesI }) {
	return (
		<div className="sticky inset-x-0 top-0 z-50 w-full border-b border-neutral-300 bg-white">
			<div className="container mx-auto flex h-20 items-center justify-between gap-4 px-4 py-0">
				<div className="hidden items-center lg:flex">
					<Logo />
				</div>
				<Navbar locale={locale} />
			</div>
		</div>
	);
}
