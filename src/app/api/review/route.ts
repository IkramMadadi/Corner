import { createReview } from '@common/actions/server/review';
import { getSession } from '@client/auth.config';
import { createRevireValidationSchema } from '^common/models/review';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	try {
		const [review, session] = await Promise.all([request.json() as Promise<CreateReviewI>, getSession()]);
		if (!session?.user) {
			return new NextResponse('Unauthorized', {
				status: 401,
			});
		}
		const locale = (request.cookies.get('preferred-language')?.value as LanguagesI | undefined) || 'fr';
		const parsedCheckout = await createRevireValidationSchema(locale).parseAsync(review);
		const res = await createReview(session.user._id, parsedCheckout, locale);
		return new NextResponse(res.message, {
			status: res.statusCode,
		});
	} catch (error) {
		return new NextResponse((error as Error).message, {
			status: 500,
		});
	}
}
