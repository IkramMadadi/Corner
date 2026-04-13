import { chain } from '@common/middlewares/chain';
import { withAuthMiddleware } from '@common/middlewares/middleware1';
import { withI18nMiddleware } from '@common/middlewares/middleware2';
import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { CustomMiddleware } from '@common/middlewares/chain';

function withTrackingAttribution(middleware: CustomMiddleware): CustomMiddleware {
	return async (request: NextRequest, event: NextFetchEvent) => {
		const url = new URL(request.url);
		const fbclid = url.searchParams.get('fbclid');
		const ttclid = url.searchParams.get('ttclid');

		const response = NextResponse.next();
		if (fbclid && !request.cookies.get('_fbc')) {
			const fbcVal = `fb.1.${Date.now()}.${fbclid}`;
			response.cookies.set('_fbc', fbcVal, { path: '/', httpOnly: false });
		}
		if (ttclid && !request.cookies.get('ttclid')) {
			response.cookies.set('ttclid', ttclid, { path: '/', httpOnly: false });
		}
		return middleware(request, event, response);
	};
}

export default chain([withAuthMiddleware, withI18nMiddleware, withTrackingAttribution]);

export const config = {
	matcher: [
		'/((?!api|_next/static|_next/image|images|icons|Algeria|favicon.ico|sitemap.xml|robots.txt|manifest.webmanifest|manifest.json|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|eot|otf|css|js|map|json)).*)',
	],
};
