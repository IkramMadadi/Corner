import { updateCustomerPersonalInformation } from '@common/actions/server/customer';
import { getSession } from '@client/auth.config';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest) {
	try {
		const [customerInformation, session] = await Promise.all([
			request.json() as Promise<CustomerInformationI>,
			getSession(),
		]);
		if (!session?.user) {
			return new NextResponse('Unauthorized', {
				status: 401,
			});
		}
		const locale = (request.cookies.get('preferred-language')?.value as LanguagesI | undefined) || 'fr';
		const res = await updateCustomerPersonalInformation(session.user._id, customerInformation, locale);
		return new NextResponse(res.message, {
			status: res.statusCode,
		});
	} catch (error) {
		return new NextResponse((error as Error).message, {
			status: 500,
		});
	}
}
