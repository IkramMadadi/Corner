import { NextResponse } from 'next/server';
import type { NextFetchEvent, NextRequest } from 'next/server';

import { defaultLocale, locales } from '@common/i18n/languages';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import type { CustomMiddleware } from './chain';

function getLocale(request: NextRequest) {
	const cookieLocale = request.cookies.get('preferred-language')?.value;
	if (cookieLocale) return matchLocale([cookieLocale], locales, defaultLocale);
	const negotiatorHeaders: Record<string, string> = {};
	request.headers.forEach((value, key) => {
		negotiatorHeaders[key] = value;
	});

	const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

	const locale = matchLocale(languages, locales, defaultLocale);
	return locale;
}
const maxAge = 60 * 60 * 24 * 365; // 1 year

export function withI18nMiddleware(middleware: CustomMiddleware) {
	return async (request: NextRequest, event: NextFetchEvent, response: NextResponse) => {
		// do i18n stuff
		const pathname = request.nextUrl.pathname;
		const searchParams = request.nextUrl.searchParams;
		const pathnameIsMissingLocale = locales.every(
			locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
		);

		// Redirect if there is no locale
		if (pathnameIsMissingLocale) {
			// Check for language preference in cookies
			const locale = getLocale(request);

			// Redirect to the URL with the locale in the path
			const urlWithLocale = new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url);
			// Append search parameters to the new URL
			searchParams.forEach((value, key) => {
				urlWithLocale.searchParams.append(key, value);
			});

			const response = NextResponse.redirect(urlWithLocale);

			// Set a cookie to remember the user's preferred language
			response.cookies.set('preferred-language', locale, {
				maxAge,
				path: '/',
			});
			return response;
		}
		// Set a cookie to remember the user's preferred language
		const locale = pathname.split('/')[1];

		response.cookies.set('preferred-language', locale, {
			maxAge,
			path: '/',
		});

		return middleware(request, event, response);
	};
}
