'use client';

export async function checkoutAsGuest(body: CheckoutAsGuestI) {
	try {
		const response = await fetch('/api/checkout/guest', {
			method: 'POST',
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

export async function checkoutAsCustomer(body: CartI<string>) {
	try {
		const response = await fetch('/api/checkout/customer', {
			method: 'POST',
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
