'use client';

import { Form, FormikProvider, useFormik } from 'formik';
import { verifyRecoverySession } from '@common/actions/client/auth';
import Button from '#client/Buttons/Button';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useMutation } from '@tanstack/react-query';
import { OTPSessionSendSchema } from '^common/models/otpSession';
import { Link, useRouter } from '@client/i18n/routing';
import ResendEmailButton from './ResendEmailButton';
import OTPInput from '#client/OtpInput';
import useReset from ':common/useReset';
import { useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import { useLocale, useTranslations } from 'next-intl';

export default function OTPForm() {
	const t = useTranslations('Auth');
	const locale = useLocale() as LanguagesI;
	const validationSchema = useMemo(() => toFormikValidationSchema(OTPSessionSendSchema(locale)), [locale]);

	const { customer, sessionId, setOtp } = useReset();
	const initialValues: OTPSessionSendI = {
		otpCode: '',
		sessionId: sessionId,
	};
	const router = useRouter();
	const { mutate: VerifyRecoverySession, isPending } = useMutation({
		mutationFn: verifyRecoverySession,
		onSuccess(message) {
			const url = '/auth/reset-password/' + sessionId + '/reset';
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
					<OTPInput onChange={(value) => formik.setFieldValue('otpCode', value)} />

					<Button
						disabled={isPending || !formik.isValid}
						type="submit"
						className="w-full gap-2 rounded-xl bg-primary text-lg text-white hover:cursor-pointer disabled:bg-gray-300 disabled:text-gray-500 sm:py-4"
					>
						{t('continue')}
					</Button>

					<p>
						{t('noEmail')} <ResendEmailButton />
					</p>
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
