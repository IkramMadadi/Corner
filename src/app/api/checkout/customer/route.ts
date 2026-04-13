import { checkoutAsCustomer } from '@common/actions/server/checkout';
import { getSession } from '@client/auth.config';
import { checkoutCartValidationSchema } from '^common/models/cart';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	try {
        const [checkout, session] = await Promise.all([request.json() as Promise<CartI<SimpleProductI>>, getSession()]);
		if (!session?.user) {
			return new NextResponse('Unauthorized', {
				status: 401,
			});
		}
		const locale = (request.cookies.get('preferred-language')?.value as LanguagesI | undefined) || 'fr';
		const parsedCheckout = await checkoutCartValidationSchema(locale).parseAsync(checkout);
		const res = await checkoutAsCustomer(session.user._id, parsedCheckout, locale);
		return new NextResponse(res.success ? res.data._id : res.message, {
			status: res.statusCode,
		});
	} catch (error) {
		return new NextResponse((error as Error).message, {
			status: 500,
		});
	}
}
