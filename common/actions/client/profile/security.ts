'use client';

export async function updateCustomerSecurity(body: ChangePasswordI) {
	try {
		const response = await fetch('/api/profile/security', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body),
		});

		const message = await response.text();
		if (response.status === 200) return message;

		throw new Error(message);
	} catch (error) {
		throw new Error((error as Error).message);
	}
}
