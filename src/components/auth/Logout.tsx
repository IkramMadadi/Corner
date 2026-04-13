'use client';
import { doLogout } from '@common/actions/client/auth';
import { cn } from '@common/utils/frontend/utils';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';

const Logout = ({
	iconSizing = 'w-6 h-6',
	className = 'px-14 text-xl font-medium text-red-600 transition-colors hover:text-red-800',
}: {
	iconSizing?: string;
	className?: string;
}) => {
	const t = useTranslations('Auth');
	const { mutate, isPending } = useMutation({
		mutationFn: doLogout,
		onError: (error) => {
			toast.error(error.message);
		},
	});
	return (
		<button
			className={cn('flex items-center gap-2 disabled:bg-gray-300 disabled:text-gray-500', className)}
			type="button"
			disabled={isPending}
			onClick={() => mutate()}
		>
			{isPending ? (
				<span className={cn('spinner', iconSizing)} />
			) : (
				<span className={cn('icon-[solar--logout-2-broken]', iconSizing)} />
			)}
			{t('logout')}
		</button>
	);
};

export default Logout;
