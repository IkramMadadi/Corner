import { checkoutAsGuest } from '@common/actions/server/checkout';
import { checkoutAsGuestValidationSchema } from '^common/models/cart';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		const sessionId: string | undefined = body.sessionId;
		const checkoutWithoutSession = { ...body };
		delete checkoutWithoutSession.sessionId;

		if (!checkoutWithoutSession?.guest || typeof checkoutWithoutSession.guest !== 'object') {
			return new NextResponse('Missing or invalid guest data', { status: 400 });
		}

		if (!checkoutWithoutSession?.checkout || typeof checkoutWithoutSession.checkout !== 'object') {
			return new NextResponse('Missing or invalid checkout data', { status: 400 });
		}

		const locale = (request.cookies.get('preferred-language')?.value as LanguagesI | undefined) || 'fr';

		const parsedCheckout = await checkoutAsGuestValidationSchema(locale).parseAsync(checkoutWithoutSession);

		const res = await checkoutAsGuest(parsedCheckout.guest, parsedCheckout.checkout, locale, sessionId);

		return new NextResponse(res.success ? res.data._id : res.message, {
			status: res.statusCode,
		});
	} catch (error) {
		return new NextResponse((error as Error).message, {
			status: 500,
		});
	}
}
