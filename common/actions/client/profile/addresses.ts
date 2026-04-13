'use client';

export async function addToCustomerAddresses(body: AddressI) {
	try {
		const response = await fetch('/api/profile/addresses', {
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

export async function removeFromCustomerAddresses(addressId: string) {
	try {
		const response = await fetch('/api/profile/addresses', {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ addressId }),
		});
		const message = await response.text();
		if (response.status === 200) return message;

		throw new Error(message);
	} catch (error) {
		throw new Error((error as Error).message);
	}
}
