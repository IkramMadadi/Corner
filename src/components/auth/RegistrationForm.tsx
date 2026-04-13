'use client';

import { Form, FormikProvider, useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { customerRegisterSchema } from '^common/models/customer';
import { useRouter } from 'next/navigation';
import { Link } from '@client/i18n/routing';
import Button from '#client/Buttons/Button';
import Input from '#client/FormikInputs/Input';
import { useMutation } from '@tanstack/react-query';
import { doCredentialLogin, register } from '@common/actions/client/auth';
import PasswordInput from '#client/FormikInputs/PasswordInput';
import toast from 'react-hot-toast';
import { useLocale, useTranslations } from 'next-intl';
import { useMemo } from 'react';
//import ButtonSecondary from '#client/Buttons/ButtonSecondary';

const RegistrationForm = () => {
	const t = useTranslations('Auth');
	const locale = useLocale() as LanguagesI;
	const validationSchema = useMemo(() => toFormikValidationSchema(customerRegisterSchema(locale)), [locale]);
	const router = useRouter();
	const { mutate: Login, isPending: isLoginIn } = useMutation({
		mutationFn: async (values: UserLogInI) => {
			const response = await doCredentialLogin({ ...values, locale });
			if (response.error) {
				throw new Error(response.error);
			}
			return response.ok;
		},
		onError(error) {
			toast.error(error.message);
		},
		onSuccess() {
			router.push('/');
		},
	});

	const formik = useFormik({
		initialValues: {
			personalInformation: {
				firstName: '',
				lastName: '',
			},
			email: '',
			password: '',
			phone: '',
		},
		validationSchema,
		onSubmit: (values) => {
			mutate(values);
		},
	});
	const { mutate, isPending } = useMutation({
		mutationFn: register,
		onError(e) {
			toast.error(e.message);
		},
		onSuccess(message) {
			toast.success(message);
			Login({
				email: formik.values.email,
				password: formik.values.password,
			});
		},
	});
	const isLoading = isPending || isLoginIn;
	return (
		<div className="container mx-auto my-auto flex flex-col items-center">
			<h2 className="text-3xl font-semibold md:text-5xl">{t('title')}</h2>
			<p className="text-m my-4">
				{t('already')}{' '}
				<Link locale={locale} href="/auth/login" className="text-secondaryB">
					{t('login')}
				</Link>
			</p>
			<div className="flex w-full flex-col gap-4">
				<FormikProvider value={formik}>
					<Form className="flex w-full flex-col gap-6 font-sans">
						{/* First Name */}
						<Input
							name="personalInformation.firstName"
							label={t('firstName')}
							placeholder={t('firstNamePlaceholder')}
						/>

						{/* Last Name */}
						<Input
							name="personalInformation.lastName"
							label={t('lastName')}
							placeholder={t('lastNamePlaceholder')}
						/>

						{/* Email */}
						<Input name="email" label={t('email')} type="email" placeholder={t('emailPlaceholder')} />

						{/* Phone */}
						<Input name="phone" label={t('phone')} type="tel" placeholder={t('phonePlaceholder')} />

						{/* Password */}
						<PasswordInput name="password" label={t('psw')} placeholder={t('placeholder')} />

						{/* Submit Button */}
						<Button
							sizeClass="py-3"
							fontSize="text-lg"
							radius="rounded-xl"
							type="submit"
							className="bg-primary text-white disabled:bg-gray-300 disabled:text-gray-500"
							disabled={isLoading || !formik.isValid}
						>
							{isLoading ? (
								<>
									<span className="spinner w-4" />
									{t('creating')}
								</>
							) : (
								t('signUp')
							)}
						</Button>
					</Form>
				</FormikProvider>
				{/* <div className="relative text-center">
					<div className="absolute left-0 top-1/2 w-1/3 -translate-y-1/2 border border-blackN" />
					<span className="bg-gray relative z-10 inline-block rounded-full px-4 text-sm font-medium">
						Or login with
					</span>
					<div className="absolute right-0 top-1/2 w-1/3 -translate-y-1/2 border border-blackN" />
				</div>
				<ButtonSecondary
					sizeClass="py-3"
					fontSize="text-lg"
					radius="rounded-xl"
					className="flex w-full items-center gap-3 border-2 font-medium"
				>
					Google
				</ButtonSecondary> */}
			</div>
		</div>
	);
};

export default RegistrationForm;
