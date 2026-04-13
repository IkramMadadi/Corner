import { NextRequest, NextResponse } from 'next/server';
import loadWebsiteData from '~common/websiteCache';
import crypto from 'node:crypto';

type BodyShape = {
	websiteId?: string;
	userData?: {
		client_name?: string;
		client_number?: string;
		email?: string;
	};
	customData?: Record<string, unknown>;
	url?: string;
	event_id?: string;
	test_event_code?: string;
};

interface FacebookCapiResponse {
	events_received: number;
	messages?: string[];
	fbtrace_id?: string;
}

function sha256(input?: string): string | undefined {
	if (!input) return undefined;
	return crypto.createHash('sha256').update(input.trim().toLowerCase(), 'utf8').digest('hex');
}

function normalizePhone(number?: string): string | undefined {
	if (!number) return undefined;
	return number.replace(/\D/g, '');
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
		const pixelId = website.integrations?.meta?.id;
		const accessToken = website.integrations?.meta?.access_token;

		if (!pixelId || !accessToken) {
			return NextResponse.json({ success: false, message: 'Meta integration not configured' }, { status: 400 });
		}

		if (!body.event_id) {
			console.warn('⚠️ Missing event_id => Deduplication will NOT work');
		}

		const fbp = request.cookies.get('_fbp')?.value;
		const fbc = request.cookies.get('_fbc')?.value;
		const client_ip_address = getIp(request);
		const client_user_agent = request.headers.get('user-agent') ?? undefined;

		const fullName = body.userData?.client_name?.trim().toLowerCase() || '';
		const [firstName, ...rest] = fullName.split(/\s+/);
		const lastName = rest.length > 0 ? rest[rest.length - 1] : '';

		const user_data: Record<string, unknown> = {
			ph: body.userData?.client_number ? [sha256(normalizePhone(body.userData.client_number))] : undefined,
			em: body.userData?.email ? [sha256(body.userData.email)] : undefined,
			fn: firstName ? [sha256(firstName)] : undefined,
			ln: lastName ? [sha256(lastName)] : undefined,
			fbp: fbp ?? undefined,
			fbc: fbc ?? undefined,
			client_ip_address,
			client_user_agent,
		};

		Object.keys(user_data).forEach((k) => user_data[k] === undefined && delete user_data[k]);

		const payload: { data: Array<Record<string, unknown>>; test_event_code?: string } = {
			data: [
				{
					event_name: event,
					event_time: Math.floor(Date.now() / 1000),
					action_source: 'website',
					event_source_url: body.url,
					user_data,
					custom_data: body.customData ?? {},
					event_id: body.event_id,
				},
			],
		};

		if (body.test_event_code) payload.test_event_code = body.test_event_code;

		const graphVersion = process.env.FB_GRAPH_VERSION || 'v18.0';
		const graphUrl =
			`https://graph.facebook.com/${graphVersion}/${encodeURIComponent(pixelId)}/events` +
			`?access_token=${encodeURIComponent(accessToken)}`;

		const fbRes = await fetch(graphUrl, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload),
		});

		const fbJson = (await fbRes.json()) as FacebookCapiResponse;

		if (!fbRes.ok) {
			console.error('Facebook CAPI error:', fbJson);
			return NextResponse.json({ success: false, error: fbJson }, { status: 500 });
		}

		return NextResponse.json({ success: true, response: fbJson }, { status: 200 });
	} catch (error) {
		console.error('Error handling Facebook CAPI event:', error);
		return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
	}
}
