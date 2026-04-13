import NavigationItem from './NavItem';
import LanguageDropdown from '#client/LanguageDropdown';
import ButtonCart from '#client/Buttons/ButtonCart';
import NavbarAuthElement from './NavbarAuthElement';
import { Suspense } from 'react';
import Logo from '#client/Logo';
import { MenuButton } from './MenuButton';
import loadWebsiteData from '~common/websiteCache';

export default async function Navbar({ locale }: { locale: LanguagesI }) {
	const website = await loadWebsiteData();
	return (
		<>
			<ul className="hidden items-center gap-4 pt-1 text-base text-blackN lg:flex lg:gap-8">
				{website.navigations.navbar.left.map((item, i) => (
					<NavigationItem menuItem={item} key={'link-' + i} locale={locale} />
				))}
			</ul>
			<MenuButton />
			<div className="lg:hidden">
				<Logo mode="tall" className="max-h-24" />
			</div>

			<div className="flex items-center justify-end gap-2 md:gap-4">
				<div className="hidden md:flex">
					<LanguageDropdown />
				</div>
				<ButtonCart />
				<Suspense
					fallback={
						<div
							className="h-8 w-8 animate-spin rounded-full border-2 border-t-2 border-gray-900 border-t-white"
							style={{ animationDuration: '4s' }}
						/>
					}
				>
					<NavbarAuthElement locale={locale} />
				</Suspense>
			</div>
		</>
	);
}
