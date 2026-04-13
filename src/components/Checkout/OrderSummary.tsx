'use client';
import ButtonPrimary from '#client/Buttons/ButtonPrimary';
import UpdateQuantity from '#client/UpdateQuantity';
import useCart from ':common/useCart';
import { useCallback, useEffect, useMemo, useState } from 'react';
import CartItem from '#client/CartItem';
import DZD from '@common/utils/frontend/Currency';
import { useLocale, useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';
import { useMutation } from '@tanstack/react-query';
import ButtonSecondary from '#client/Buttons/ButtonSecondary';
import toast from 'react-hot-toast';
import CheckoutFn from '@common/actions/client/CheckoutFn';
import Button from '#client/Buttons/Button';
import { cn } from '@common/utils/frontend/utils';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function OrderSummary({ freeOver, totalPoints }: { freeOver?: number; totalPoints: number | null }) {
	const t = useTranslations('Checkout');
	const deliveryTrad = useTranslations('ProductDetailsPage');
	const locale = useLocale() as LanguagesI;
	const session = useSession();
	const router = useRouter();
	const isCustomer = session.status === 'authenticated';
	const { mutate, isPending } = useMutation({
		mutationFn: CheckoutFn,
		onSuccess: () => {
			clearCart();
			const redirectUrl = `/${locale}/thank-you`;
			router.replace(redirectUrl);
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});
	const { delivery, products, totalPrice, subtotal, clearCart, guest, isValidGuest } = useCart();

	const [usePoints, setUsePoints] = useState(false);
	const [items, setItems] = useState<ProductsCartI<CartProductI>[]>([]);

	useEffect(() => {
		setItems(products);
	}, [products]);

	const confirmOrder = useCallback(() => {
		mutate(
			isCustomer
				? {
						isCustomer,
						checkout: {
							products: items.map((item) => ({
								product: item.product._id,
								count: item.count,
							})),
							delivery,
							usePoints,
						},
					}
				: {
						isCustomer,
						checkout: {
							products: items.map((item) => ({
								product: item.product._id,
								count: item.count,
							})),
							delivery,
						},
						guest: guest!,
					}
		);
	}, [delivery, guest, isCustomer, items, mutate, usePoints]);
	const shippingFee = freeOver && subtotal > freeOver ? 0 : delivery.cost;
	const discount = useMemo(() => Math.min(subtotal, totalPoints ? totalPoints : Infinity), [subtotal, totalPoints]);
	return (
		<div className="w-full">
			<h3 className="text-2xl font-semibold">{t('summary')}</h3>
			<ul className="mt-8">
				{items.map((item) => (
					<CartItem isDeletable key={item.product._id} product={item.product}>
						<UpdateQuantity quantity={item.count} product={item.product} />
					</CartItem>
				))}
			</ul>

			<div className="mt-4 pt-2 font-sans text-sm lg:text-base">
				{totalPoints ? (
					<div className="mt-1.5 flex justify-between gap-2">
						<p className="flex flex-col">
							<span className="font-bold">
								{t.rich('points', {
									points: DZD.fr.format(totalPoints),
									colored: (chunks) => <span className="text-primaryO">{chunks}</span>,
								})}
							</span>
							<span>Do you wanna use them?</span>
						</p>
						<Button
							onClick={() => setUsePoints((p) => !p)}
							type="button"
							className={cn(
								'ml-3 px-6',
								usePoints
									? 'bg-red-500 text-white hover:bg-red-500/65'
									: 'bg-secondaryB text-white hover:bg-secondaryB/65'
							)}
						>
							{usePoints ? 'cancel points' : 'use points'}
						</Button>
					</div>
				) : null}
				{usePoints && (
					<div className="flex justify-between py-4">
						<span>{t('discount')}</span>
						<span className="font-semibold">{DZD[locale].format(discount)}</span>
					</div>
				)}
				<div className="mt-4 flex justify-between pb-4">
					<span>{t('subtotal')}</span>
					<span className="font-semibold">
						{items.length > 0
							? DZD[locale].format(usePoints ? subtotal - discount : subtotal)
							: t('no-selected')}
					</span>
				</div>
				<div className="flex justify-between py-4">
					<span>{t('delivery')}</span>
					<span className="font-semibold">
						{items.length > 0 ? DZD[locale].format(shippingFee) : t('no-selected')}
					</span>
				</div>
				<div className="flex justify-between pt-4 text-sm font-bold lg:text-base">
					<span>{t('total')}</span>
					<span>{items.length > 0 ? DZD[locale].format(totalPrice) : t('no-selected')}</span>
				</div>
				{freeOver && (
					<div>
						<p className="flex items-center gap-2">
							<span className="icon-[iconoir--delivery-truck] h-8 w-8"></span>
							{deliveryTrad('delivery')} {DZD[locale].format(freeOver)}
						</p>
					</div>
				)}
			</div>

			<ButtonPrimary
				onClick={confirmOrder}
				className="mt-8 w-full bg-primary"
				fontSize="text-sm lg:text-lg"
				sizeClass="py-4"
				disabled={isPending || items.length === 0 || (!isCustomer && !isValidGuest)}
			>
				{isPending ? (
					<div className="flex items-center justify-center gap-2">
						<Loader2 className="h-4 w-4 animate-spin" />
						{t('processing')}
					</div>
				) : (
					t('confirm')
				)}
			</ButtonPrimary>
			{items.length === 0 && (
				<ButtonSecondary
					className="mt-4 flex w-full justify-center"
					sizeClass="py-4"
					fontSize="text-sm lg:text-lg"
					href={'/products'}
				>
					{t('shop')}
				</ButtonSecondary>
			)}
		</div>
	);
}
