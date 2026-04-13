import { requestSupport } from '@common/actions/server/supportRequest';
import { requestSupportValidationSchema } from '^common/models/support';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	try {
		const body = (await request.json()) as RequestSupportI;
		// Validate the request body
		const locale = (request.cookies.get('preferred-language')?.value as LanguagesI | undefined | null) || 'fr';
		const validatedBody = await requestSupportValidationSchema(locale).parseAsync(body);
		if (!validatedBody) {
			return new NextResponse('Invalid request body', {
				status: 400,
			});
		}
		const res = await requestSupport(body, locale);
		return new NextResponse(res.message, {
			status: res.statusCode,
		});
	} catch (error) {
		return new NextResponse((error as Error).message, {
			status: 500,
		});
	}
}
