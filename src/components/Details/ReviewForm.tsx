'use client';
import ButtonPrimary from '#client/Buttons/ButtonPrimary';
import Textarea from '#client/FormikInputs/Textarea';
import { createReview } from '@common/actions/client/review';
import { cn } from '@common/utils/frontend/utils';
import { useMutation } from '@tanstack/react-query';
import { createRevireValidationSchema } from '^common/models/review';
import { Form, FormikProvider, useFormik } from 'formik';
import { useSession } from 'next-auth/react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React, { useMemo } from 'react';
import toast from 'react-hot-toast';
import { toFormikValidationSchema } from 'zod-formik-adapter';

export default function ReviewForm({
	productId,
	reviews,
}: {
	productId: string;
	reviews: PublicReviewI<
		string,
		PersonalInformationI & {
			_id: string;
		}
	>[];
}) {
	const session = useSession();
	const locale = useLocale() as LanguagesI;
	const validationSchema = useMemo(() => toFormikValidationSchema(createRevireValidationSchema(locale)), [locale]);
	const user = session.data?.user || undefined;
	const router = useRouter();
	const t = useTranslations('ProductDetailsPage');
	const hasReviewed = useMemo(() => reviews.some((review) => review.createdBy._id === user?._id), [reviews, user]);

	const initialValues: CreateReviewI = {
		rating: 0,
		content: '',
		link: {
			ref: productId,
			refCollection: 'Product',
		},
	};
	const { mutate: CreateReview, isPending } = useMutation({
		mutationFn: createReview,
		onSuccess(message) {
			toast.success(message);
			router.refresh();
		},
		onError(error) {
			toast.error(error.message);
		},
	});
	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit(values) {
			CreateReview(values);
		},
	});
	if (hasReviewed || !session.data) return null;

	return (
		<FormikProvider value={formik}>
			<Form className="flex w-full flex-col gap-2 border-b">
				<div className="flex justify-between">
					<div className="flex items-center gap-2">
						<span className="icon-[hugeicons--user-status] h-6 w-6 shrink-0" />
						<p className="font-medium">
							{user
								? user.personalInformation.firstName + ' ' + user.personalInformation.lastName
								: 'Guest'}
						</p>
					</div>

					<div className="flex items-center">
						{[...Array(5)].map((_, i) => (
							<label key={'rating' + i} className="relative cursor-pointer">
								<input
									id={'rating' + i}
									type="radio"
									name="rating"
									className="sr-only"
									onChange={() => formik.setFieldValue('rating', i + 1)} // Met à jour la valeur `review` dans Formik
									aria-checked={formik.values.rating === i + 1}
								/>
								<span
									className={cn(
										formik.values.rating > i
											? 'icon-[solar--star-bold]' // Étoile pleine
											: 'icon-[solar--star-broken] opacity-35', // Étoile vide
										'h-6 w-6 text-secondaryY' // hover:icon-[solar--star-bold] hover:h-6 hover:w-6 hover:opacity-50
									)}
								/>
							</label>
						))}
					</div>
				</div>

				<Textarea
					rows={2}
					name="content"
					placeholder="Express your thoughts about this product"
					className="border-none text-sm"
				/>
				<ButtonPrimary
					type="submit"
					className="mb-3 max-w-fit self-end"
					disabled={isPending || !formik.isValid}
					loading={isPending}
				>
					{t('submitReview')}
				</ButtonPrimary>
			</Form>
		</FormikProvider>
	);
}
