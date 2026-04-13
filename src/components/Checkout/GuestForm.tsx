'use client';

import Input from '#client/FormikInputs/Input';
import useCart from ':common/useCart';
import { Form, FormikProvider, useFormik } from 'formik';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useMemo, useRef } from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useDebounce } from '@uidotdev/usehooks';
import { useAutoSaveSession } from '#client/useAutoSaveSession';

import { phoneSchema } from '^common/elements';
import z from 'zod';

const defaultGuest: RegisterGuestI = { name: '', phone: '' };

export function GuestForm() {
	const locale = useLocale() as LanguagesI;

	const validationSchema = useMemo(() => {
		const localSchema = z.object({
			name: z.string().optional().or(z.literal('')).default(''),
			phone: phoneSchema(locale),
		});
		return toFormikValidationSchema(localSchema);
	}, [locale]);

	const form = useTranslations('Checkout');
	const { guest, setGuest, products } = useCart();

	const formik = useFormik({
		initialValues: guest || defaultGuest,
		validationSchema,
		enableReinitialize: false,
		onSubmit: (values) => {
			setGuest(values);
		},
	});

	const debouncedValues = useDebounce(formik.values, 800);

	const lastSetGuestRef = useRef<string>('');

	const simplifiedProducts = useMemo(
		() =>
			products?.map((item) => ({
				product: item.product._id,
				count: item.count,
			})) ?? [],
		[products]
	);

	useAutoSaveSession({
		information: debouncedValues,
		products: simplifiedProducts,
	});

	useEffect(() => {
		const fingerprint = `${debouncedValues.name}|${debouncedValues.phone}`;

		if (fingerprint === lastSetGuestRef.current) return;

		if (!guest || guest.name !== debouncedValues.name || guest.phone !== debouncedValues.phone) {
			lastSetGuestRef.current = fingerprint;
			setGuest(debouncedValues);
		}
	}, [debouncedValues, guest, setGuest]);

	return (
		<FormikProvider value={formik}>
			<Form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
				<Input name="name" label={form('nameTitle')} placeholder={form('placeholder')} />
				<Input name="phone" type="tel" label={form('phone')} placeholder="0550000000" />
			</Form>
		</FormikProvider>
	);
}
