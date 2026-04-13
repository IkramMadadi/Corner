import { verifyCustomerRecoverySession } from '@common/actions/server/customer';
import { NextRequest, NextResponse } from 'next/server';
// createForgotPasswordSession
export async function PUT(request: NextRequest) {
	try {
		const body = (await request.json()) as OTPSessionSendI;
		const locale = (request.cookies.get('preferred-language')?.value as LanguagesI | undefined) || 'fr';
		const res = await verifyCustomerRecoverySession(body.sessionId, body.otpCode, locale);
		return new NextResponse(res.message, {
			status: res.statusCode,
		});
	} catch (error) {
		return new NextResponse((error as Error).message, {
			status: 500,
		});
	}
}
