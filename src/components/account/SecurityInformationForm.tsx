'use client';

import { Form, FormikProvider, useFormik } from 'formik';
import ButtonSecondary from '#client/Buttons/ButtonSecondary';
import ButtonPrimary from '#client/Buttons/ButtonPrimary';
import { useMemo, useState } from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useMutation } from '@tanstack/react-query';
import ButtonClose from '../Buttons/ButtonClose';
import { updateCustomerSecurity } from '@common/actions/client/profile/security';
import { changePasswordSchema } from '^common/models/user';
import PasswordInput from '#client/FormikInputs/PasswordInput';
import toast from 'react-hot-toast';
import { useLocale, useTranslations } from 'next-intl';

const initialValues: ChangePasswordI = {
	oldPassword: '',
	confirmPassword: '',
	newPassword: '',
};
export default function SecurityInformationForm() {
	const profile = useTranslations('Profile');
	const [isEditable, setIsEditable] = useState(false);
	const locale = useLocale() as LanguagesI;
	const validationSchema = useMemo(() => toFormikValidationSchema(changePasswordSchema(locale)), [locale]);
	const { mutate: UpdateCustomerSecurity, isPending } = useMutation({
		mutationFn: updateCustomerSecurity,
		onSuccess: (message) => {
			toast.success(message);
			setIsEditable(false);
			formik.resetForm();
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: (values) => {
			setIsEditable(false);
			UpdateCustomerSecurity(values);
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
							<span className="icon-[hugeicons--user-lock-01] hidden h-12 w-12 sm:block" />
							{profile('security')}
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
					{/* old password */}
					<div className="grid grid-cols-1 gap-4">
						<PasswordInput
							label={profile('current')}
							name="oldPassword"
							disabled={!isEditable || isPending}
						/>
					</div>
					<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
						<PasswordInput label={profile('new')} name="newPassword" disabled={!isEditable || isPending} />
						<PasswordInput
							label={profile('confirm')}
							name="confirmPassword"
							disabled={!isEditable || isPending}
						/>
					</div>
				</Form>
			</FormikProvider>
		</div>
	);
}
