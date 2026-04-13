'use client';
import React, { useMemo } from 'react';

import { useLocale, useTranslations } from 'next-intl';

import Button from '#client/Buttons/Button';
import { Field, Form, FormikProvider, useFormik } from 'formik';
import { useMutation } from '@tanstack/react-query';
import { SubscribeToNewsletter } from '@common/actions/client/newsletter';
import toast from 'react-hot-toast';
import { cn } from '@common/utils/frontend/utils';
import { createNewsLetterValidationSchema } from '^common/models/newsletter';
import { toFormikValidationSchema } from 'zod-formik-adapter';

export default function Newsletter() {
	const newsletter = useTranslations('Newsletter');
	const locale = useLocale() as LanguagesI;
	const validationSchema = useMemo(
		() => toFormikValidationSchema(createNewsLetterValidationSchema(locale)),
		[locale]
	);
	const { mutate: Subscribe, isPending } = useMutation({
		mutationFn: SubscribeToNewsletter,
		onSuccess: (data) => {
			toast.success(data);
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});
	const formik = useFormik({
		initialValues: {
			email: '',
		},
		validationSchema,
		onSubmit: async (values) => {
			Subscribe(values);
		},
	});

	return (
		<FormikProvider value={formik}>
			<Form
				className="bg-cover bg-repeat-x"
				style={{ backgroundImage: `url(/images/bg-pattern.svg)`, backgroundSize: 'auto 100%' }}
			>
				<div className="flex flex-col items-center gap-6 px-6 py-16 text-center lg:gap-8 lg:px-20 lg:py-28">
					<h2 className="w-full text-3xl font-medium lg:w-3/4 lg:text-5xl xl:w-1/2">{newsletter('title')}</h2>
					<p className="text-sm text-blackN lg:text-base">{newsletter('description')}</p>
					<div dir="ltr" className="flex w-full items-center sm:justify-center lg:w-auto">
						<Field
							className={cn(
								'w-full max-w-xs rounded-l-3xl rounded-r-none border bg-white px-4 py-2 text-sm placeholder:text-sm placeholder:text-grayN focus:outline-none sm:w-80 sm:py-4 sm:text-xl',
								formik.touched.email
									? formik.errors.email
										? 'border-red-500'
										: 'border-green-400'
									: 'border-blackN'
							)}
							name={'email'}
							placeholder="email@email.com"
						/>
						<Button
							className="w-full border border-primary bg-primary font-serif text-sm text-white sm:w-auto sm:text-xl"
							sizeClass="px-2 py-2 sm:py-4 md:px-8"
							radius="rounded-e-3xl"
							type="submit"
							loading={isPending}
							disabled={!formik.isValid}
						>
							{newsletter('button')}
						</Button>
					</div>
				</div>
			</Form>
		</FormikProvider>
	);
}
