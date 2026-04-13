'use client';
import { Link, usePathname } from '@client/i18n/routing';
import { LanguagesMap } from '@common/data/languages';

export default function LanguageLink({ locale, className }: { locale: LanguagesI; className?: string }) {
	const pathName = usePathname();

	return (
		<Link
			key={locale}
			locale={locale}
			href={pathName}
			className={className}
			role="menuitem"
			tabIndex={-1}
			id={`language-${locale}`}
		>
			{LanguagesMap[locale]}
		</Link>
	);
}
