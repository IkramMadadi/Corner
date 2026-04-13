import { addToCustomerAddresses, removeFromCustomerAddresses } from '@common/actions/server/customer';
import { getSession } from '@client/auth.config';
import { AddressValidationSchema } from '^common/models/generals/Address';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest) {
	try {
		const [address, session] = await Promise.all([request.json() as Promise<AddressI>, getSession()]);
		if (!session?.user) {
			return new NextResponse('Unauthorized', {
				status: 401,
			});
		}
		const locale = (request.cookies.get('preferred-language')?.value as LanguagesI | undefined) || 'fr';
		const parsedAddress = await AddressValidationSchema(locale).parseAsync(address);
		const res = await addToCustomerAddresses(session.user._id, parsedAddress, locale);
		return new NextResponse(res.message, {
			status: res.statusCode,
		});
	} catch (error) {
		return new NextResponse((error as Error).message, {
			status: 500,
		});
	}
}

export async function DELETE(request: NextRequest) {
	try {
		const [{ addressId }, session] = await Promise.all([
			request.json() as Promise<{ addressId: string }>,
			getSession(),
		]);

		if (!session?.user)
			return new NextResponse('Unauthorized', {
				status: 401,
			});
		const locale = (request.cookies.get('preferred-language')?.value as LanguagesI | undefined) || 'fr';
		const res = await removeFromCustomerAddresses(session.user._id, addressId, locale);
		return new NextResponse(res.message, {
			status: res.statusCode,
		});
	} catch (error) {
		return new NextResponse((error as Error).message, {
			status: 500,
		});
	}
}
