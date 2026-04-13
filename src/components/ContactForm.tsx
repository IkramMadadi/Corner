'use client';
import React, { useMemo } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import ButtonPrimary from './Buttons/ButtonPrimary';
import Radio from './Radio';
import { CreateSupportRequest } from '@common/actions/client/supportRequest';
import { useMutation } from '@tanstack/react-query';
import { requestSupportValidationSchema } from '^common/models/support';
import Input from './FormikInputs/Input';
import Textarea from './FormikInputs/Textarea';
import toast from 'react-hot-toast';
import { useLocale, useTranslations } from 'next-intl';

// Validation Schema avec Zod
const initialValues: RequestSupportI = {
	customerName: '',
	email: '',
	subject: 'Product Inquiry', // Par défaut
	report: '',
};

const ContactForm: React.FC = () => {
	const contact = useTranslations('Contact');
	const locale = useLocale() as LanguagesI;
	const validationSchema = useMemo(() => toFormikValidationSchema(requestSupportValidationSchema(locale)), [locale]);
	const { mutate: CreateSupport, isPending } = useMutation({
		mutationFn: CreateSupportRequest,
		onSuccess: (message) => {
			toast.success(message);
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});
	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: (values) => {
			CreateSupport(values);
		},
	});

	return (
		<FormikProvider value={formik}>
			<Form onSubmit={formik.handleSubmit} className="flex w-full flex-col gap-5 font-sans">
				{/* Résumé des erreurs */}
				{Object.keys(formik.errors).length > 0 && formik.submitCount > 0 && (
					<div className="rounded-lg bg-red-100 p-4 text-red-600">{contact('error')}</div>
				)}

				{/* Nom */}
				<Input name="customerName" autoComplete="name" label={contact('nameTitle')} placeholder="John Doe" />

				{/* Email */}
				<Input name="email" label={contact('email')} placeholder="example@example.com" />

				{/* Sujet */}
				<div>
					<label className="font-medium">{contact('subjectTitle')}</label>
					<div
						className={`flex flex-wrap gap-4 rounded-lg p-4 ${
							formik.touched.subject && formik.errors.subject ? 'border border-red-500' : ''
						}`}
					>
						<Radio
							id="product-inquiry"
							name="subject"
							label={contact('subjectInquiry')}
							value="Product Inquiry"
							checked={formik.values.subject === 'Product Inquiry'}
							onChange={formik.handleChange}
						/>
						<Radio
							id="order-support"
							name="subject"
							label={contact('subjectOrder')}
							value="Order Support"
							checked={formik.values.subject === 'Order Support'}
							onChange={formik.handleChange}
						/>
						<Radio
							id="business-collaboration"
							name="subject"
							label={contact('subjectBusiness')}
							value="Business Collaboration"
							checked={formik.values.subject === 'Business Collaboration'}
							onChange={formik.handleChange}
						/>
					</div>
					{formik.touched.subject && formik.errors.subject && (
						<p className="mt-1 text-sm text-red-500">{formik.errors.subject}</p>
					)}
				</div>

				{/* Message */}
				<Textarea
					name="report"
					label={contact('inquiryTitle')}
					placeholder={contact('inquiryPlaceholder')}
					rows={6}
				/>

				{/* Bouton d'envoi */}
				<ButtonPrimary
					type="submit"
					className="w-full self-center"
					sizeClass="px-12 py-3"
					fontSize="text-lg md:text-xl "
					radius="rounded-xl"
					loading={isPending}
					disabled={isPending}
				>
					{contact('sendButton')}
				</ButtonPrimary>
			</Form>
		</FormikProvider>
	);
};

export default ContactForm;
