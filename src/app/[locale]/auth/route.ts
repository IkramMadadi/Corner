import { NextRequest, NextResponse } from 'next/server';

// app/routes/[locale]/auth/route.js
export function GET(request: NextRequest) {
	// Extract the locale from the URL pathname

	const url = new URL(request.url);
	const locale = url.pathname.split('/')[1]; // Assuming locale is the first segment in the path

	// Construct the redirect URL with the locale
	const redirectUrl = new URL(`/${locale}/auth/login`, request.url);
	return NextResponse.redirect(redirectUrl);
}
