import { loadProductReviews } from '@common/actions/server/Product';
import ReviewForm from './ReviewForm';
import ReviewsView from './ReviewsView';

export default async function ReviewsTab({
	product,
	locale,
}: {
	product: PublicProductI<string, string, BasicPublishableInformationWithIdI>;
	locale: LanguagesI;
}) {
	const reviewsResponse = await loadProductReviews(product._id, locale);
	const reviews = reviewsResponse.success ? reviewsResponse.data : [];

	return (
		<div className="border-neutral-300 py-2 font-sans">
			<ReviewsView reviews={reviews} />
			<ReviewForm reviews={reviews} productId={product._id} />
		</div>
	);
}
