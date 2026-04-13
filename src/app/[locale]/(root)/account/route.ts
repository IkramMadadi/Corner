import { NextRequest, NextResponse } from 'next/server';

export function GET(request: NextRequest) {
	const url = new URL(request.url);
	const path = url.pathname[url.pathname.length - 1] === '/' ? url.pathname.slice(0, -1) : url.pathname;

	// Construct the redirect URL with the locale
	const redirectUrl = new URL(`${path}/profile`, request.url);
	return NextResponse.redirect(redirectUrl);
}
