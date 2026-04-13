'use client';
import { Section } from '#client/Section';
import React, { useEffect, useState } from 'react';
import DeliveryForm from './DeliveryForm';
import AddressSection from './AddressSection';
import useCart from ':common/useCart';
import { useMutation } from '@tanstack/react-query';
import { addToCustomerAddresses } from '@common/actions/client/profile/addresses';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useTranslations } from 'next-intl';

export default function CustomerAddress({
	paymentsFees,
	addresses,
	editable = true,
}: {
	paymentsFees: PaymentFeeI[];
	editable?: boolean;
	addresses: CreatedAddressI[];
}) {
	const address = useTranslations('Addresses');

	const router = useRouter();
	const { setDeliveryOption } = useCart();
	const { mutate, isPending } = useMutation({
		mutationFn: addToCustomerAddresses,
		onSuccess(message) {
			toast.success(message);
			// refresh this page
			router.refresh();
		},
		onError(error) {
			toast.error(error.message);
		},
	});
	const [selectedAddress, setSelectedAddress] = useState<CreatedAddressI | null>(null);
	useEffect(() => {
		if (editable && selectedAddress) {
			const deliveryOp: DeliveryI = {
				address: selectedAddress,
				cost: paymentsFees[selectedAddress.province - 1].door,
				deliveryChoice: 'door',
			};
			setDeliveryOption(deliveryOp);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [paymentsFees, selectedAddress, editable]);
	return (
		<>
			{addresses.map((address) => (
				<AddressSection
					selectAddressAction={() => {
						setSelectedAddress(address);
					}}
					fee={paymentsFees[address.province - 1].door}
					key={address._id}
					address={address}
					isSelected={address._id === selectedAddress?._id}
				/>
			))}
			{selectedAddress ? (
				<Section
					className="flex items-center gap-4 py-4 font-sans hover:cursor-pointer"
					onClick={() => setSelectedAddress(null)}
				>
					<span className={'icon-[hugeicons--location-add-01] h-8 w-8 text-secondaryB'} />
					<div className="flex flex-col">
						<h4 className="text-lg font-semibold">{address('newAddress')}</h4>
					</div>
				</Section>
			) : (
				<Section>
					<DeliveryForm
						editable={editable}
						paymentsFees={paymentsFees}
						isSaving={isPending}
						saveAddress={(address) => {
							mutate(address);
						}}
					/>
				</Section>
			)}
		</>
	);
}
