'use client';

import { Form, FormikProvider, useFormik } from 'formik';
import ButtonSecondary from '#client/Buttons/ButtonSecondary';
import ButtonPrimary from '#client/Buttons/ButtonPrimary';
import { useMemo, useState } from 'react';
import Input from '#client/FormikInputs/Input';
import { customerInformationSchema } from '^common/models/customer';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useMutation } from '@tanstack/react-query';
import { updateCustomerInformation } from '@common/actions/client/profile/information';
import ButtonClose from '../Buttons/ButtonClose';
import toast from 'react-hot-toast';
import { useLocale, useTranslations } from 'next-intl';

export default function PersonalInformationForm({
	customerInformation,
}: {
	customerInformation: CustomerInformationI;
}) {
	const profile = useTranslations('Profile');
	const locale = useLocale() as LanguagesI;
	const validationSchema = useMemo(() => toFormikValidationSchema(customerInformationSchema(locale)), [locale]);
	const [isEditable, setIsEditable] = useState(false);
	const { mutate: UpdateCustomerInformation, isPending } = useMutation({
		mutationFn: updateCustomerInformation,
		onSuccess: (message) => {
			toast.success(message);
			setIsEditable(false);
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const formik = useFormik({
		initialValues: customerInformation,
		validationSchema,
		onSubmit: (values) => {
			setIsEditable(false);
			UpdateCustomerInformation(values);
		},
	});

	return (
		<div className="">
			{/* Form Section */}
			<FormikProvider value={formik}>
				<Form
					className="flex w-full flex-col gap-8 rounded-md border p-8 shadow-sm"
					onSubmit={formik.handleSubmit}
					onReset={() => {
						formik.resetForm();
						setIsEditable(false);
					}}
				>
					{/* Header Section */}
					<div className="flex w-full items-center justify-between">
						<h2 className="flex items-center justify-between gap-6 text-3xl text-primary">
							<span className="icon-[hugeicons--user-status] hidden h-12 w-12 sm:block" />
							{profile('personal')}
						</h2>
						{isEditable ? (
							<div className="flex items-center gap-4">
								<ButtonPrimary
									fontSize="text-xl"
									sizeClass="px-3 md:px-10 py-3"
									type="submit"
									className="gap-2"
									disabled={isPending}
								>
									{isPending ? (
										<span className="spinner w-6" />
									) : (
										<span className="icon-[solar--bookmark-line-duotone]" />
									)}
									<span className="hidden md:flex">{profile('save')}</span>
								</ButtonPrimary>
								<ButtonClose />
							</div>
						) : (
							<ButtonSecondary
								sizeClass="py-2 md:py-3 px-2 md:px-5 gap-2"
								className="border-2 border-primary text-primary hover:bg-primary"
								fontSize="text-xl"
								radius="rounded-xl"
								onClick={() => setIsEditable(true)}
							>
								<span className="icon-[iconoir--edit-pencil]" />
								<span className="hidden md:flex">{profile('edit')}</span>
							</ButtonSecondary>
						)}
					</div>
					{/* First Name and Last Name */}
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<Input label={profile('firstName')} name="firstName" disabled={!isEditable || isPending} />
						<Input label={profile('lastName')} name="lastName" disabled={!isEditable || isPending} />
					</div>

					{/* Email and Phone */}
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<Input
							label={profile('email')}
							name="email"
							disabled={!isEditable || isPending}
							placeholder="example@example.com"
						/>
						<Input label={profile('phone')} name="phone" disabled={!isEditable || isPending} />
					</div>
				</Form>
			</FormikProvider>
		</div>
	);
}
