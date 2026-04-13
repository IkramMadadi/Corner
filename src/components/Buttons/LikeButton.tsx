'use client';

import useWishlist from ':common/useWishlist';
import {
	addToCustomerWishlistRequest,
	removeFromCustomerWishlistRequest,
} from '@common/actions/client/profile/wishlist';
import { cn } from '@common/utils/frontend/utils';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import React, { useMemo } from 'react';
import toast from 'react-hot-toast';

export interface LikeButtonProps {
	className?: string;
	productId: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ className = '', productId }) => {
	const t = useTranslations('Wishlist');
	const session = useSession();
	const { isIn, addItem, removeItem } = useWishlist();
	const { mutate, isPending } = useMutation({
		mutationFn: async ({ productId, method = 'a' }: { productId: string; method?: 'a' | 'd' }) => {
			return (method === 'a' ? addToCustomerWishlistRequest : removeFromCustomerWishlistRequest)(productId);
		},
		onSuccess(message, { productId, method = 'a' }) {
			toast.success(message);
			if (method === 'a') {
				addItem(productId);
			} else {
				removeItem(productId);
			}
		},
		onError(error) {
			if (error instanceof Error) {
				if (error.message.includes('Product already in wishlist.')) {
					toast.error(t('exist'));
					addItem(productId);
					return;
				}
			} else toast.error(t('error'));
		},
	});

	const inWishlist = useMemo(() => isIn(productId), [isIn, productId]);

	const handleToggleLike = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		event.stopPropagation();

		if (session.data) {
			mutate({ productId, method: inWishlist ? 'd' : 'a' });
		} else {
			toast.error(t('connected'));
			// popup to login
		}
	};

	return (
		<button
			type="button"
			className={cn(
				`flex flex-grow-0 items-center justify-center rounded-full border border-primary p-1 md:p-2`,
				inWishlist ? 'bg-white text-primary' : 'bg-primary text-white',
				'disabled:border-black disabled:bg-black disabled:bg-opacity-50 disabled:text-black',
				className
			)}
			disabled={isPending}
			onClick={handleToggleLike}
		>
			<span className={'icon-[fe--heart] h-4 w-4 md:h-5 md:w-5'} />
		</button>
	);
};

export default LikeButton;
