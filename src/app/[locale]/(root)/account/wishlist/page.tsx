import { loadCustomerWishlist } from '@common/actions/server/customer';
import React from 'react';
import { getSession } from '@client/auth.config';
import { productTableDataToCart } from '~common/products';
import CartItem from '#client/CartItem';
import { getTranslations } from 'next-intl/server';

export default async function WishList({ params }: { params: Promise<{ locale: LanguagesI }> }) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: 'Wishlist' });
	const session = await getSession();
	const response = await loadCustomerWishlist(session!.user._id, locale);
	if (!response.success) {
		throw new Error(response.message);
	}
	const wishlist: ProductTableDataI[] = response.data.list;

	return (
		<div className="container mx-auto mt-8">
			<h2 className="text-3xl font-semibold">{t('title')}</h2>
			<div className="max-w-3xl">
				{wishlist.length > 0 ? (
					wishlist.map((product, i) => (
						<CartItem product={productTableDataToCart(product)} key={'wishlist' + i + i} hasActions />
					))
				) : (
					<p className="mt-8 text-lg">{t('empty')}</p>
				)}
			</div>
		</div>
	);
}
