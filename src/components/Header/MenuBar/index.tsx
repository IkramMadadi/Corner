import LanguageDropdown from '#client/LanguageDropdown';
import Logo from '#client/Logo';
import NavigationItem from '../NavItem';
import Sidebar from './Sidebar';
import CloseSidebarButton from './CloseSidebarButton';
import loadWebsiteData from '~common/websiteCache';

export default async function MenuBar({ locale }: { locale: LanguagesI }) {
	const website = await loadWebsiteData();
	return (
		<Sidebar>
			<div className="flex w-full justify-between">
				<Logo />
				<CloseSidebarButton />
			</div>
			<ul className="flex w-full flex-col gap-6 text-base text-blackN">
				{website.navigations.navbar.left.map((item, i) => (
					<NavigationItem menuItem={item} key={'bar-link' + i} locale={locale} />
				))}
			</ul>
			<div className="flex justify-start md:hidden">
				<LanguageDropdown direction="l" />
			</div>
		</Sidebar>
	);
}
