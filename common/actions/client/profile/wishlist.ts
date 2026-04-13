// post and delete for wishlist
export const addToCustomerWishlistRequest = async (productId: string) => {
	try {
		const response = await fetch('/api/profile/wishlist', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ productId }),
		});
		const message = await response.text();
		if (response.status === 200) return message;

		throw new Error(message);
	} catch (error) {
		throw new Error((error as Error).message);
	}
};

export const removeFromCustomerWishlistRequest = async (productId: string) => {
	try {
		const response = await fetch('/api/profile/wishlist', {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ productId }),
		});
		const message = await response.text();
		if (response.status === 200) return message;

		throw new Error(message);
	} catch (error) {
		throw new Error((error as Error).message);
	}
};
