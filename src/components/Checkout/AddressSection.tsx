'use client';

//import useProvinces from ':common/useProvinces';
import { useLocale } from 'next-intl';
//import useCities from ':common/useCities';
import { cn } from '@common/utils/frontend/utils';
import { Section } from '#client/Section';
import DZD from '@common/utils/frontend/Currency';
import { removeFromCustomerAddresses } from '@common/actions/client/profile/addresses';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
//import { useMemo } from 'react';

export default function AddressSection({
	address,
	selectAddressAction,
	isSelected = false,
	fee,
}: {
	address: CreatedAddressI;
	selectAddressAction: () => void;
	isSelected?: boolean;
	fee?: number;
}) {
	const locale = useLocale() as LanguagesI;
	// const { provinces } = useProvinces(locale);
	// const { cities } = useCities(address.province, locale);
	// const city = useMemo(() => cities.find((c) => c.id === Number(address.city)), [address.city, cities]);
	const router = useRouter();
	const { mutate } = useMutation({
		mutationFn: removeFromCustomerAddresses,
		onSuccess(message) {
			toast.success(message);
			// refresh this page
			router.refresh();
		},
		onError(error) {
			toast.error(error.message);
		},
	});
	return (
		<Section
			className={cn('flex w-full items-center justify-between gap-4 py-4 font-sans hover:cursor-pointer', {
				'bg-slate-100': isSelected,
			})}
			onClick={selectAddressAction}
		>
			<div className="flex items-center gap-4">
				<span
					className={cn(
						'h-8 w-8 text-primary',
						isSelected ? 'icon-[hugeicons--location-check-01]' : 'icon-[hugeicons--location-01]'
					)}
				/>
				<div className="flex flex-col">
					<h4 className="flex flex-wrap gap-x-2 text-lg font-semibold">
						{/*
							<span>
								{provinces[address.province - 1]?.name[locale] ||
									provinces[address.province - 1]?.name['en']}{' '}
								/ {city?.name[locale]}
							</span>
						*/}
						{fee ? (
							<span
								className={isSelected ? 'text-primary' : 'text-secondaryB'}
							>{` ( ${DZD[locale].format(fee)} )`}</span>
						) : null}
					</h4>
					<p className="text-sm">{address.address}</p>
				</div>
			</div>
			<button
				className="rounded-lg p-2 hover:bg-slate-100 hover:text-red-500"
				type="button"
				onClick={(e) => {
					e.stopPropagation();
					mutate(address._id);
				}}
			>
				<span className="icon-[solar--trash-bin-2-bold-duotone] h-6 w-6" />
			</button>
		</Section>
	);
}
