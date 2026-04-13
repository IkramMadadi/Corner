import { addToCustomerWishlist, removeFromCustomerWishlist } from '@common/actions/server/customer';
import { getSession } from '@client/auth.config';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	try {
		const [{ productId }, session] = await Promise.all([
			request.json() as Promise<{ productId: string }>,
			getSession(),
		]);
		if (!session?.user) {
			return new NextResponse('Unauthorized', {
				status: 401,
			});
		}
		if (!productId) {
			return new NextResponse('Product id is required', {
				status: 400,
			});
		}
		const locale = (request.cookies.get('preferred-language')?.value as LanguagesI | undefined) || 'fr';

		const res = await addToCustomerWishlist(session.user._id, productId, locale);
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
		const [{ productId }, session] = await Promise.all([
			request.json() as Promise<{ productId: string }>,
			getSession(),
		]);
		if (!session?.user) {
			return new NextResponse('Unauthorized', {
				status: 401,
			});
		}
		const locale = (request.cookies.get('preferred-language')?.value as LanguagesI | undefined) || 'fr';
		const res = await removeFromCustomerWishlist(session.user._id, productId, locale);
		return new NextResponse(res.message, {
			status: res.statusCode,
		});
	} catch (error) {
		return new NextResponse((error as Error).message, {
			status: 500,
		});
	}
}
