import { NextRequest, NextResponse } from 'next/server';
import loadWebsiteData from '~common/websiteCache';
import crypto from 'node:crypto';

type BodyShape = {
	websiteId?: string;
	userData?: {
		phone_number?: string;
		external_id?: string;
	};
	properties?: Record<string, unknown>;
	url?: string;
	event_id?: string;
	test_event_code?: string;
	ttclid?: string;
};

function sha256(input?: string): string | undefined {
	if (!input) return undefined;
	return crypto.createHash('sha256').update(input.trim().toLowerCase(), 'utf8').digest('hex');
}

function getIp(req: NextRequest): string | undefined {
	const xff = req.headers.get('x-forwarded-for');
	if (xff) return xff.split(',')[0]?.trim();
	return req.headers.get('x-real-ip') ?? undefined;
}

export async function POST(request: NextRequest, ctx: { params: Promise<{ event: string }> }) {
	try {
		const { event } = await ctx.params;
		const body = (await request.json()) as BodyShape;

		const website = await loadWebsiteData();
		const pixelCode = website.integrations?.tiktok?.id;
		const accessToken = website.integrations?.tiktok?.access_token;

		if (!pixelCode || !accessToken) {
			console.warn('TikTok integration is not configured (pixelCode or accessToken missing).');
			return NextResponse.json({ success: false, message: 'TikTok integration not configured' }, { status: 200 });
		}

		const ttp = request.cookies.get('_ttp')?.value;
		const cookieTtclid = request.cookies.get('ttclid')?.value;
		const client_ip_address = getIp(request);
		const client_user_agent = request.headers.get('user-agent') ?? undefined;

		const hashedPhone = sha256(body.userData?.phone_number);
		const hashedExternalId = hashedPhone;

		const user: Record<string, unknown> = {
			phone_number: hashedPhone,
			email: undefined,
			external_id: hashedExternalId,
			ttp: ttp ?? undefined,
			ip: client_ip_address,
			user_agent: client_user_agent,
		};

		Object.keys(user).forEach((k) => user[k] === undefined && delete user[k]);

		const payload = {
			pixel_code: pixelCode,
			event: event,
			event_id: body.event_id,
			timestamp: new Date().toISOString(),
			context: {
				ad: body.ttclid || cookieTtclid ? { callback: body.ttclid || cookieTtclid } : undefined,
				page: { url: body.url },
				user,
			},
			properties: body.properties ?? {},
			test_event_code: body.test_event_code,
		};

		const apiUrl = 'https://business-api.tiktok.com/open_api/v1.3/event/track/';
		const res = await fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Access-Token': accessToken,
			},
			body: JSON.stringify(payload),
		});

		const json = await res.json();

		if (json.code !== 0) {
			console.error('TikTok EAPI error:', json);
		}

		return NextResponse.json({ success: true, response: json }, { status: 200 });
	} catch (error) {
		console.error('Error handling TikTok EAPI event:', error);
		return NextResponse.json({ success: false, error: (error as Error).message }, { status: 200 });
	}
}
