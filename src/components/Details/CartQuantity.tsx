'use client';
import BasicsUpdateQuantity from '#client/UpdateQuantity/BasicsUpdateQuantity';
import useProductDetails from ':common/useProductDetails';

export function CartQuantity() {
	const { quantity, setQuantity } = useProductDetails();

	return (
		<BasicsUpdateQuantity
			quantity={quantity}
			handleQuantityChange={(q) => {
				setQuantity(quantity + q);
			}}
		/>
	);
}
