'use client';

export async function SubscribeToNewsletter(body: CreateNewsLetterI) {
	try {
		const response = await fetch('/api/newsletter', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body),
		});
		const message = await response.text();
		if (response.status === 200) return message;
		if (response.status === 400) return message;
		throw new Error(message);
	} catch (error) {
		throw new Error((error as Error).message);
	}
}
