import { Link } from '@client/i18n/routing';
import type { FC, ReactNode } from 'react';

export interface NavigationItemProps {
	children?: ReactNode;
	menuItem: QuickLinkI;
	changeWidth?: boolean;
	locale: LanguagesI;
}

const NavigationItem: FC<NavigationItemProps> = ({ menuItem, locale }) => {
	return (
		<li className="menu-item shrink-0 list-none">
			<div className="flex shrink-0 items-center font-semibold leading-none hover:text-primary">
				{menuItem.href.startsWith('#') || menuItem.href.startsWith('/') ? (
					<Link locale={locale} className="list-none" href={menuItem.href}>
						{menuItem.label[locale]}
					</Link>
				) : (
					/* external menuItem */
					<a
						href={menuItem.href}
						className="list-none"
						target="_blank"
						rel="noopener noreferrer"
						title={menuItem.label[locale]}
					>
						{menuItem.label[locale]}
					</a>
				)}
			</div>
		</li>
	);
};

export default NavigationItem;
