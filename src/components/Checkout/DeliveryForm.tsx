'use client';
import ButtonSecondary from '#client/Buttons/ButtonSecondary';
// import Input from '#client/FormikInputs/Input';
import Radio from '#client/FormikInputs/Radio';
import Select from '#client/FormikInputs/Select';
import useCart from ':common/useCart';
import useCities from ':common/useCities';
import useProvinces from ':common/useProvinces';
import DZD from '@common/utils/frontend/Currency';
import { DeliveryChoiceEnums, DeliveryChoiceMap } from '@common/data/enums/generalEnums';
import { deliveryOptionsValidationSchema } from '^common/models/cart';
import { Form, FormikProvider, useFormik } from 'formik';
import { useLocale, useTranslations } from 'next-intl';
import React, { useEffect, useState, useMemo } from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';

interface DeliveryFormProps {
	paymentsFees: PaymentFeeI[];
	saveAddress?: (address: AddressI) => void;
	isSaving?: boolean;
	editable?: boolean;
}

function getDeliveryOption(values: DeliverOptionsI, paymentsFees: PaymentFeeI[]): DeliveryI | undefined {
	const province = Number(values.address.province);
	if (Number.isInteger(province)) {
		if (paymentsFees[province]) {
			const cost = paymentsFees[province - 1][values.deliveryChoice];
			return {
				address: {
					address: values.address.address,
					province,
					city: values.address.city ? Number(values.address.city) : undefined,
				},
				deliveryChoice: values.deliveryChoice,
				cost,
			};
		}
	}
}

export default function DeliveryForm({
	paymentsFees,
	saveAddress,
	isSaving = false,
	editable = true,
}: DeliveryFormProps) {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const AddressesTrans = useTranslations('Addresses');
	const locale = useLocale() as LanguagesI;
	const { provinces } = useProvinces(locale);
	const validationSchema = useMemo(() => {
		return toFormikValidationSchema(deliveryOptionsValidationSchema(locale));
	}, [locale]);
	const { delivery, setDeliveryOption } = useCart();

	const initialValues: DeliverOptionsI = {
		address: delivery.address,
		deliveryChoice: delivery.deliveryChoice,
	};

	const formik = useFormik({
		initialValues,
		onSubmit: (values) => {
			if (editable) {
				const dOp = getDeliveryOption(values, paymentsFees);
				if (dOp) {
					setDeliveryOption(dOp);
				}
			}
			if (saveAddress) {
				saveAddress(values.address);
			}
		},
		validationSchema,
		enableReinitialize: true,
	});

	const { cities } = useCities(Number(formik.values.address.province), locale);
	// const deliveryAddressOpen = useMemo(() => formik.values.deliveryChoice === 'door', [formik.values.deliveryChoice]);
	// const shouldShowAddressField = !editable || (editable && deliveryAddressOpen);

	useEffect(() => {
		if (formik.isValid) {
			if (editable) {
				const dOp = getDeliveryOption(formik.values, paymentsFees);
				if (dOp) {
					setDeliveryOption(dOp);
				}
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik.values, formik.isValid]);

	useEffect(() => {
		formik.setFieldValue('address.city', 1);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cities]);

	if (!isMounted) {
		return null;
	}

	return (
		<div className="space-y-6">
			<FormikProvider value={formik}>
				<Form onSubmit={formik.handleSubmit} className="flex flex-col items-center gap-4">
					{/* Location Selection */}
					<div className="w-full">
						<div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
							<Select
								name="address.province"
								options={provinces.map((province) => ({
									label: province.name[locale] || province.name.en,
									value: province.id,
								}))}
								id="provinces"
								label={AddressesTrans('provinces')}
								className="w-full rounded-md border border-gray-300 bg-white shadow-sm"
							/>

							{formik.values.deliveryChoice === 'door' && (
								<Select
									name="address.city"
									options={[
										{
											label: AddressesTrans('selectCity'),
											value: 1,
										},
										...cities.map((city) => ({
											label: city.name[locale] || city.name.en,
											value: city.id,
										})),
									]}
									id="city"
									label={AddressesTrans('city')}
									className="w-full rounded-md border border-gray-300 bg-white shadow-sm"
								/>
							)}
						</div>
					</div>

					{/* Delivery Method */}

					<div className="w-full">
						<h4 className="mb-4 flex items-center gap-2 font-medium text-gray-900">
							<span className="icon-[solar--delivery-bold] h-4 w-4" />
							{AddressesTrans('deliveryMethod')}
						</h4>
						<div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-2">
							<Radio
								name="deliveryChoice"
								id="deliveryChoice"
								rcClassName="grid grid-cols-1 gap-3 sm:grid-cols-2"
								options={DeliveryChoiceEnums.map((option) => ({
									label: `${DeliveryChoiceMap[option][locale]} ( ${DZD[locale].format(paymentsFees[Number(formik.values.address.province) - 1][option])} )`,
									value: option,
								}))}
							/>
						</div>
					</div>

					{/* Address Input */}
					{/*
					shouldShowAddressField && (
						<div className="w-full">
							<h4 className="mb-4 flex items-center gap-2 font-medium text-gray-900">
								<span className="icon-[solar--delivery-bold] h-4 w-4" />
								{AddressesTrans('address')}
							</h4>
							<div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-2">
								<Input
									key={'delivery-address'}
									name="address.address"
									id="address"
									placeholder={AddressesTrans('addressPlaceholder')}
								/>
							</div>
						</div>
					)
					*/}

					{/* Save Button */}
					{saveAddress && (
						<ButtonSecondary
							type="submit"
							className="mx-auto max-w-fit gap-2 border-primary text-primary hover:bg-primary disabled:bg-white disabled:text-gray-500"
							disabled={isSaving || !formik.isValid}
						>
							{isSaving ? (
								<>
									<span className="spinner h-4 w-4" />
									<span>{AddressesTrans('saving')}</span>
								</>
							) : (
								<>
									<span className="icon-[solar--archive-bold] h-4 w-4" />
									<span>{AddressesTrans('save')}</span>
								</>
							)}
						</ButtonSecondary>
					)}
				</Form>
			</FormikProvider>
		</div>
	);
}
