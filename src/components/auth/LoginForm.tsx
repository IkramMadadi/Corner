'use client';

import { Form, useFormik, FormikProvider } from 'formik';
import { doCredentialLogin } from '@common/actions/client/auth';
import { Link, useRouter } from '@client/i18n/routing';
import Button from '#client/Buttons/Button';
// import ButtonSecondary from '#client/Buttons/ButtonSecondary';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { customerLoginSchema } from '^common/models/customer';
import Input from '#client/FormikInputs/Input';
import { useMutation } from '@tanstack/react-query';
import PasswordInput from '#client/FormikInputs/PasswordInput';
import toast from 'react-hot-toast';
import { useLocale, useTranslations } from 'next-intl';
import { useMemo } from 'react';

const LoginForm = () => {
	const t = useTranslations('Auth');
	const router = useRouter();
	const locale = useLocale() as LanguagesI;
	const validationSchema = useMemo(() => toFormikValidationSchema(customerLoginSchema(locale)), [locale]);
	const { mutate: Login, isPending } = useMutation({
		mutationFn: async (values: UserLogInI) => {
			const response = await doCredentialLogin({ ...values, locale });
			if (response.error) {
				throw new Error(response.error);
			}
			return response.ok;
		},
		onError(error) {
			console.log(error);
			toast.error(error.message);
		},
		onSuccess() {
			router.push('/home', { locale: locale });
		},
	});
	const initialValues: UserLogInI = {
		email: '',
		password: '',
	};

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit(values) {
			Login(values);
		},
	});

	return (
		<div className="container mx-auto my-auto flex flex-col items-center">
			<h2 className="text-3xl font-semibold md:text-5xl">{t('loginTitle')}</h2>
			<p className="text-m my-4">
				{t('noAccount')}{' '}
				<Link locale={locale} href="/auth/register" className="text-secondaryB">
					{t('register')}
				</Link>
			</p>

			<FormikProvider value={formik}>
				<Form className="flex w-full flex-col gap-6 font-sans">
					<Input
						name="email"
						type="email"
						label={t('email')}
						placeholder="example@example.com"
						fcClassName="rounded-full"
					/>
					<PasswordInput
						name="password"
						label={t('psw')}
						placeholder={t('placeholder')}
						fcClassName="rounded-full"
					/>
					<p className="flex gap-2 text-sm">
						<span>{t('forgot')}</span>
						<Link locale={locale} href="/auth/forgot-password" className="text-primary">
							{t('resetPassword')}
						</Link>
					</p>

					<Button
						type="submit"
						className="mt-6 w-full gap-2 rounded-lg bg-primary text-lg text-white disabled:bg-gray-300 disabled:text-gray-500"
						disabled={isPending || !formik.isValid}
					>
						{isPending ? (
							<>
								<span className="spinner w-4" />
								{t('loading')}
							</>
						) : (
							t('login')
						)}
					</Button>
				</Form>
			</FormikProvider>

			{/* <div className="relative mt-8 max-w-lg text-center">
				<div className="absolute left-0 top-1/2 w-1/3 -translate-y-1/2 border border-blackN" />
				<span className="bg-gray relative z-10 inline-block rounded-full px-4 text-sm font-medium">
					Or login with
				</span>
				<div className="absolute right-0 top-1/2 w-1/3 -translate-y-1/2 border border-blackN" />
			</div>

			<ButtonSecondary className="mt-6 flex w-full items-center gap-3 rounded-xl border-2 py-3 text-lg font-medium">
				Google
			</ButtonSecondary> */}
		</div>
	);
};

export default LoginForm;
