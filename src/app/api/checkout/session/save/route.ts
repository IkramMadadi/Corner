import { NextRequest, NextResponse } from 'next/server';
import { checkoutAsGuestWithSessionValidationSchema } from '^common/models/cart';
import Session from '&common/Session';
import connectToMongoDB from '~common/db';

export async function POST(req: NextRequest) {
	try {
		await connectToMongoDB();
		const body = await req.json();

		if (body.information && typeof body.information.phone === 'string') {
			body.information.phone = body.information.phone.replace(/\D/g, '');
		}

		const ip =
			req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown';

		const locale = (req.cookies.get('preferred-language')?.value as LanguagesI | undefined) || 'fr';

		const { information, products, sessionId } =
			await checkoutAsGuestWithSessionValidationSchema(locale).parseAsync(body);

		const sessionDataToSave = { information, products, ip };

		if (sessionId) {
			const existingSession = await Session.findOne({
				_id: sessionId,
				done: false,
			}).select('_id ip');

			if (existingSession) {
				await Session.findByIdAndUpdate(sessionId, { $set: sessionDataToSave }, { new: true });

				return NextResponse.json(
					{ sessionId: existingSession._id.toString(), status: 'updated' },
					{ status: 200 }
				);
			}
		}

		const existingByIpAndPhone = await Session.findOne({
			ip,
			'information.phone': information.phone,
			done: false,
		})
			.select('_id')
			.sort({ updatedAt: -1 });

		if (existingByIpAndPhone) {
			await Session.findByIdAndUpdate(existingByIpAndPhone._id, { $set: sessionDataToSave }, { new: true });

			return NextResponse.json(
				{
					sessionId: existingByIpAndPhone._id.toString(),
					status: 'found_and_updated',
				},
				{ status: 200 }
			);
		}

		const existingByIp = await Session.findOne({
			ip,
			done: false,
		})
			.select('_id')
			.sort({ updatedAt: -1 });

		if (existingByIp) {
			await Session.findByIdAndUpdate(existingByIp._id, { $set: sessionDataToSave }, { new: true });

			return NextResponse.json(
				{
					sessionId: existingByIp._id.toString(),
					status: 'ip_found_and_updated',
				},
				{ status: 200 }
			);
		}

		const session = await Session.create({
			...sessionDataToSave,
			done: false,
		});

		if (!session) {
			return new NextResponse('Failed to create session', { status: 500 });
		}

		return NextResponse.json({ sessionId: session._id.toString(), status: 'created' }, { status: 201 });
	} catch (error) {
		console.error('[Session Save]', error);
		return new NextResponse('Failed to save session.', { status: 500 });
	}
}
