import { checkoutAsCustomer, checkoutAsGuest } from '@common/actions/client/checkout';

export default function CheckoutFn(
	params:
		| {
				isCustomer: true;
				checkout: CartI<string>;
				sessionId?: string | null
		  }
		| {
				isCustomer: false;
				checkout: CartI<string>;
				guest: RegisterGuestI;
				sessionId?: string | null
		  }
) {
	if (params.isCustomer) return checkoutAsCustomer(params.checkout);
	return checkoutAsGuest({ guest: params.guest, checkout: params.checkout, sessionId: params.sessionId });
}
