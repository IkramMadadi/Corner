'use client';
import ButtonSecondary from '#client/Buttons/ButtonSecondary';
import StarRating from '#client/StarRating';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useMemo, useState } from 'react';

export default function ReviewsView({
	reviews,
}: {
	reviews: PublicReviewI<
		string,
		PersonalInformationI & {
			_id: string;
		}
	>[];
}) {
	const t = useTranslations('reviews');
	const [showMore, setShowMore] = useState(false);
	const slicedReviews = useMemo(() => reviews.slice(0, showMore ? reviews.length : 3), [showMore, reviews]);
	if (reviews.length === 0) return <p className="mb-4 py-2">{t('noReviews')}</p>;
	return (
		<>
			{slicedReviews.map((review) => (
				<div key={review._id} className="my-4 border-b border-neutral-300 py-2">
					<div className="flex gap-3">
						<div className="h-16 w-16 rounded-full bg-neutral-500">
							<Image
								className="rounded-full object-cover object-center"
								src={'/images/avatar.png'}
								alt="photo"
								width={64}
								height={64}
							/>
						</div>
						<div className="flex flex-col gap-2">
							<p className="font-medium">
								{review.createdBy.firstName} {review.createdBy.lastName}
							</p>
							<StarRating average={review.rating} />
							<p className="text-sm">{review.content}</p>
						</div>
					</div>
				</div>
			))}
			{showMore ? (
				<ButtonSecondary onClick={() => setShowMore(false)}>{t('less')}</ButtonSecondary>
			) : (
				<ButtonSecondary onClick={() => setShowMore(true)}>{t('more')}</ButtonSecondary>
			)}
		</>
	);
}
