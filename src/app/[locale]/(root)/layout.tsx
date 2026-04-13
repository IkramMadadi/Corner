import { ReactNode, Suspense } from 'react';
import AuthProvider from '@common/providers/AuthProvider';
import WishListProvider from '@common/providers/WishListProvider';
import { getCustomerWishlist } from '@common/actions/server/customer';
import CartPopup from '#client/popup/CartPopup';
import { getSession } from '@client/auth.config';
import CartProvider from '@common/providers/CartProvider';
import Popup from '#client/popup/Popup';

export default async function layout({
	children,
	params,
}: {
	children: ReactNode;
	params: Promise<{ locale: LanguagesI }>;
}) {
	const [session, { locale }] = await Promise.all([getSession(), params]);

	let wishlist: string[] = [];
	if (session) {
		const w = await getCustomerWishlist(session?.user._id, locale);
		if (w.success) {
			wishlist = w.data;
		}
	}

	return (
		<AuthProvider session={session}>
			<WishListProvider wishlist={wishlist}>
				<CartProvider locale={locale}>
					<Suspense>
						{children}
						<Popup />
						<CartPopup />
					</Suspense>
				</CartProvider>
			</WishListProvider>
		</AuthProvider>
	);
}
