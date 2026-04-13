import { updateCustomerPassword } from '@common/actions/server/customer';
import { getSession } from '@client/auth.config';
import { changePasswordSchema } from '^common/models/user';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest) {
	try {
		const [securityPasswords, session] = await Promise.all([
			request.json() as Promise<ChangePasswordI>,
			getSession(),
		]);
		if (!session?.user) {
			return new NextResponse('Unauthorized', {
				status: 401,
			});
		}
		const locale = (request.cookies.get('preferred-language')?.value as LanguagesI | undefined) || 'fr';
		const passwords = await changePasswordSchema(locale).parseAsync(securityPasswords);
		const res = await updateCustomerPassword(
			session.user._id,
			passwords.oldPassword,
			passwords.newPassword,
			locale
		);
		return new NextResponse(res.message, {
			status: res.statusCode,
		});
	} catch (error) {
		return new NextResponse((error as Error).message, {
			status: 500,
		});
	}
}
