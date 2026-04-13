import { createNewsLetter } from '@common/actions/server/newsletter';
import { createNewsLetterValidationSchema } from '^common/models/newsletter';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	try {
		const body = (await request.json()) as CreateNewsLetterI;
		const locale = (request.cookies.get('preferred-language')?.value as LanguagesI | undefined | null) || 'fr';
		const validatedBody = await createNewsLetterValidationSchema(locale).parseAsync(body);
		if (!validatedBody) {
			return new NextResponse('Invalid request body', {
				status: 400,
			});
		}
		const res = await createNewsLetter(body, locale);
		return new NextResponse(res.message, {
			status: res.statusCode,
		});
	} catch (error) {
		return new NextResponse((error as Error).message, {
			status: 500,
		});
	}
}
