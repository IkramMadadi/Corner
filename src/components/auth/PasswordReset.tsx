'use client';

import { ErrorMessage, Form, FormikProvider, useFormik } from 'formik';
import { resetPassword } from '@common/actions/client/auth';
import Button from '#client/Buttons/Button';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useMutation } from '@tanstack/react-query';
import { ConfirmedResetPasswordSchema } from '^common/models/otpSession';
import { Link, useRouter } from '@client/i18n/routing';
import useReset from ':common/useReset';
import { useEffect, useMemo } from 'react';
import PasswordInput from '#client/FormikInputs/PasswordInput';
import toast from 'react-hot-toast';
import { useLocale, useTranslations } from 'next-intl';

export default function PasswordReset() {
	const t = useTranslations('Auth');
	const locale = useLocale() as LanguagesI;
	const validationSchema = useMemo(() => toFormikValidationSchema(ConfirmedResetPasswordSchema(locale)), [locale]);
	const { customer, sessionId, setOtp, otp } = useReset();
	const initialValues: ConfirmedResetPasswordI = {
		otpCode: otp,
		sessionId: sessionId,
		confirmPassword: '',
		password: '',
	};
	const router = useRouter();
	const { mutate: VerifyRecoverySession, isPending } = useMutation({
		mutationFn: resetPassword,
		onSuccess(message) {
			const url = '/auth/reset-password/done';
			toast.success(message);
			router.push(url, { locale: locale });
		},
		onError(error) {
			toast.error(error.message);
		},
	});

	const formik = useFormik({
		initialValues,
		validationSchema,
		enableReinitialize: true,
		onSubmit(values) {
			VerifyRecoverySession(values);
		},
	});
	useEffect(() => {
		setOtp(formik.values.otpCode);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik.values.otpCode]);
	return (
		<div className="container mx-auto my-auto flex flex-col items-center gap-8">
			<div className="flex items-center justify-center rounded-lg border p-2">
				<span className="icon-[hugeicons--mail-open] h-16 w-16" />
			</div>
			<h1 className="text-3xl font-semibold md:text-5xl">{t('reset')}</h1>
			<p className="max-w-sm text-center text-sm">
				{t('send')} {customer.email}
			</p>
			<FormikProvider value={formik}>
				<Form onSubmit={formik.handleSubmit} className="flex w-full flex-col gap-6 font-sans">
					<div className="text-xs text-red-500">
						<ErrorMessage name={'otpCode'} component="span" />
						<ErrorMessage name={'sessionId'} component="span" />
					</div>
					<PasswordInput
						name="password"
						label={t('psw')}
						placeholder={t('placeholder')}
						fcClassName="rounded-full"
					/>
					<PasswordInput
						name="confirmPassword"
						label={t('confirm')}
						placeholder={t('confirmPlaceholder')}
						fcClassName="rounded-full"
					/>
					<Button
						disabled={isPending || !formik.isValid}
						type="submit"
						className="w-full gap-2 rounded-xl bg-primary text-lg text-white hover:cursor-pointer disabled:bg-gray-300 disabled:text-gray-500 sm:py-4"
					>
						{t('continue')}
					</Button>

					<Link
						locale={locale}
						href="/auth/login"
						className="flex items-center justify-center gap-2 text-center text-sm"
					>
						<span className="icon-[solar--arrow-left-linear] h-4 w-4" />
						{t('backLogin')}
					</Link>
				</Form>
			</FormikProvider>
		</div>
	);
}
