import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
import { defaultLocale, locales } from '../../common/i18n/languages';
export const routing = defineRouting({
	locales,
	defaultLocale,
});

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
