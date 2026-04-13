import { v4 as uuidv4 } from 'uuid';

type MetaPixelEventParams = Record<string, any>;

function callFbq(method: string, ...args: any[]) {
	if (typeof window !== 'undefined' && window.fbq) {
		window.fbq(method, ...args);
	} else {
		if (process.env.NODE_ENV !== 'production') {
			console.warn('Meta Pixel is not initialized.');
		}
	}
}

export async function trackEvent(
	eventName: string,
	websiteId: string,
	params: MetaPixelEventParams = {},
	sendToCapi = false,
	userData?: {
		client_name: string;
		client_number: string;
	},
	options?: { test_event_code?: string; event_id?: string }
) {
	const eventID = options?.event_id || uuidv4();
	callFbq('track', eventName, params, { eventID } as any);

	if (sendToCapi && websiteId) {
		try {
			await fetch(`/api/facebook-event/${eventName}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				keepalive: true,
				body: JSON.stringify({
					websiteId,
					userData,
					customData: params,
					url: typeof window !== 'undefined' 
                        ? window.location.href 
                        : undefined,
					event_id: eventID,
					test_event_code: options?.test_event_code,
				}),
			});
		} catch (e) {
			console.error('Error sending event to Facebook CAPI:', e);
		}
	}
}
