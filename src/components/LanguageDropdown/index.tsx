import { languages } from '@common/i18n/languages';
import { cn } from '@common/utils/frontend/utils';
import LanguageLink from './LanguageLink';
const linkClassName = 'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full';

export default function LanguageDropdown({ direction = 'r' }: { direction?: 'l' | 'r' }) {
	return (
		<div className="group/language relative inline-block text-left">
			<button
				type="button"
				className="flex w-full items-center justify-center gap-1 rounded-lg px-2 py-2 text-sm font-semibold text-blackN hover:bg-gray-50 group-focus-within/language:text-primary"
				id="menu-button"
				aria-expanded="true"
				aria-haspopup="true"
			>
				<span className="icon-[iconoir--language] relative text-2xl text-blackN" />
				<span
					className={
						'icon-[solar--alt-arrow-down-bold] h-4 w-4 origin-center transition-transform group-focus-within/language:rotate-180'
					}
				/>
			</button>

			<div
				className={cn(
					'absolute z-10 mt-2 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
					direction === 'r'
						? 'ltr:right-0 ltr:origin-top-right rtl:left-0 rtl:origin-top-left'
						: 'ltr:left-0 ltr:origin-top-left rtl:right-0 rtl:origin-top-right',
					'hidden flex-col group-focus-within/language:flex'
				)}
				role="menu"
				aria-orientation="vertical"
				aria-labelledby="menu-button"
				tabIndex={-1}
			>
				{languages.map((lang) => (
					<LanguageLink key={lang} locale={lang} className={linkClassName} />
				))}
			</div>
		</div>
	);
}
