'use client';

import { Form, useFormik, FormikProvider } from 'formik';
import { createForgotPasswordSession } from '@common/actions/client/auth';
import Button from '#client/Buttons/Button';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import Input from '#client/FormikInputs/Input';
import { useMutation } from '@tanstack/react-query';
import { OTPSessionSchema } from '^common/models/otpSession';
import { Link, useRouter } from '@client/i18n/routing';
import toast from 'react-hot-toast';
import { useLocale, useTranslations } from 'next-intl';
import { useMemo } from 'react';

const initialValues: OTPSessionI = {
	email: '',
};
export default function ForgotPasswordForm() {
	const locale = useLocale() as LanguagesI;
	const validationSchema = useMemo(() => toFormikValidationSchema(OTPSessionSchema(locale)), [locale]);
	const t = useTranslations('Auth');

	const router = useRouter();
	const { mutate: CreateForgotPasswordSession, isPending } = useMutation({
		mutationFn: createForgotPasswordSession,
		onError(error) {
			toast.error(error.message);
		},
		onSuccess(sessionId) {
			const url = '/auth/reset-password/' + sessionId;
			toast.success(t('success'));
			router.push(url, { locale: locale });
		},
	});

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit(values) {
			CreateForgotPasswordSession(values);
		},
	});

	return (
		<div className="container mx-auto my-auto flex flex-col items-center gap-8">
			<div className="flex items-center justify-center rounded-lg border p-2">
				<span className="icon-[mage--fingerprint] h-16 w-16" />
			</div>
			<h2 className="text-3xl font-semibold md:text-5xl">{t('forgot')}</h2>
			<p className="text-m my-4">{t('instructions')}</p>
			<FormikProvider value={formik}>
				<Form className="flex w-full flex-col gap-8 font-sans">
					<Input
						name="email"
						type="email"
						label={t('email')}
						placeholder="example@example.com"
						fcClassName="rounded-full"
					/>

					<Button
						type="submit"
						className="w-full gap-2 rounded-xl bg-primary text-lg text-white hover:cursor-pointer sm:py-4"
						disabled={isPending || !formik.isValid}
					>
						{isPending ? (
							<>
								<span className="spinner w-4" />
								{t('loading')}
							</>
						) : (
							t('request')
						)}
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
