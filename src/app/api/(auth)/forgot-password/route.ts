import { createCustomerRecoverySession } from '@common/actions/server/customer';
import { NextRequest, NextResponse } from 'next/server';
// createForgotPasswordSession
export async function POST(request: NextRequest) {
	try {
		const { email } = (await request.json()) as OTPSessionI;
		const locale = (request.cookies.get('preferred-language')?.value as LanguagesI | undefined) || 'fr';
		const res = await createCustomerRecoverySession(email, locale);
		return new NextResponse(res.success ? res.data : res.message, {
			status: res.statusCode,
		});
	} catch (error) {
		return new NextResponse((error as Error).message, {
			status: 500,
		});
	}
}
