/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { locales } from '@common/i18n/languages';
import { getToken } from 'next-auth/jwt';
import type { CustomMiddleware } from './chain';

const protectedPaths = new RegExp(`(${locales.join('|')})/account(.*)`);
const authPaths = new RegExp(`(${locales.join('|')})/auth(.*)`);

export function withAuthMiddleware(middleware: CustomMiddleware) {
	return async (request: NextRequest, event: NextFetchEvent) => {
		// Create a response object to pass down the chain
		const response = NextResponse.next();

		const token = await getToken({ req: request });
		// @ts-ignore
		request.nextauth = request.nextauth || {};
		// @ts-ignore
		request.nextauth.token = token;
		const pathname = request.nextUrl.pathname;

		if (!token && protectedPaths.test(pathname)) {
			const signInUrl = new URL('/auth/login', request.url);
			signInUrl.searchParams.set('callbackUrl', pathname);
			return NextResponse.redirect(signInUrl);
		}
		if (token && authPaths.test(pathname)) {
			const signInUrl = new URL('/', request.url);
			return NextResponse.redirect(signInUrl);
		}

		return middleware(request, event, response);
	};
}
