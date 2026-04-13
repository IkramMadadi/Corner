import { cn } from '@common/utils/frontend/utils';
import Logout from './auth/Logout';
import { Link } from '@client/i18n/routing';
const linkClassName = 'flex px-4 py-4 py-4 gap-6 text-base text-gray-700 hover:bg-gray-100 w-full items-center';

export default function UserDropdown({
	personalInformation,
	email,
	locale,
}: NecessaryCustomerI & { locale: LanguagesI }) {
	return (
		<div className="group/user-drop relative inline-block text-left font-sans">
			<button
				type="button"
				className={cn(
					'flex w-full items-center justify-center gap-1 rounded-full py-2 text-sm font-semibold hover:bg-gray-50',
					'text-blackN group-focus-within/user-drop:text-primary'
				)}
				id="menu-button"
				aria-expanded="true"
				aria-haspopup="true"
			>
				<span className="icon-[hugeicons--user-status] h-10 w-10" />
			</button>
			<div
				className={cn(
					'absolute z-10 mt-2 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
					'ltr:right-0 ltr:origin-top-right rtl:left-0 rtl:origin-top-left',
					'hidden flex-col group-focus-within/user-drop:flex'
				)}
				role="menu"
				aria-orientation="vertical"
				aria-labelledby="menu-button"
				tabIndex={-1}
			>
				<Link
					locale={locale}
					href="/account"
					className={linkClassName}
					role="menuitem"
					tabIndex={-1}
					id="menu-item-0"
				>
					<span className="icon-[solar--user-id-line-duotone] h-10 w-10" />
					<div className="flex flex-col">
						<span className="text-nowrap">
							{personalInformation.firstName} {personalInformation.lastName}
						</span>

						<span className="text-nowrap text-xs">{email}</span>
					</div>
				</Link>
				<Logout className={linkClassName} iconSizing="w-6 h-6 " />
			</div>
		</div>
	);
}
