import type { BlogHydratedDocument } from '!common/generated/models/Blog';
import type { ProductHydratedDocument } from '!common/generated/models/Product';
import blogModel from '&common/Blog';
import customerModel from '&common/Customer';
import productModel from '&common/Product';
import reviewModel from '&common/Review';
import { reviewMessages } from '@common/messages/reviews';
import { Types } from 'mongoose';
import loadWebsiteData from '~common/websiteCache';

export async function createReview(
	customerId: string | Types.ObjectId,
	reviewForm: CreateReviewI,
	locale: LanguagesI
): Promise<ResponseI<PublicReviewI>> {
	try {
		const [website, customer, alreadyReview] = await Promise.all([
			loadWebsiteData(),
			customerModel.findById(customerId),
			reviewModel.findOne({
				link: {
					ref: reviewForm.link.ref,
					refCollection: reviewForm.link.refCollection,
				},
				createdBy: customerId,
			}),
		]);
		if (alreadyReview)
			return {
				success: false,
				message: reviewMessages['already-reviewed'][locale],
				data: null,
				statusCode: 400,
			};

		if (!customer)
			return {
				success: false,
				message: 'Customer not found.',
				data: null,
				statusCode: 400,
			};

		const link: LinkI<Types.ObjectId> = {
			ref: new Types.ObjectId(reviewForm.link.ref),
			refCollection: reviewForm.link.refCollection,
		};
		let document: ProductHydratedDocument | BlogHydratedDocument | null = null;
		let message = reviewMessages['document-not-found'][locale];
		switch (link.refCollection) {
			case 'Product': {
				document = await productModel.findById(link.ref);
				message = reviewMessages['product-not-found'][locale];
				break;
			}
			case 'Blog': {
				document = await blogModel.findById(link.ref);
				message = reviewMessages['blog-not-found'][locale];
				break;
			}
			default: {
				return {
					success: false,
					message: reviewMessages['invalid-link'][locale],
					data: null,
					statusCode: 400,
				};
			}
		}
		if (!document) return { success: false, message, data: null, statusCode: 400 };

		const review: ReviewI<Types.ObjectId> = {
			...reviewForm,
			enabled: true,
			website: website._id,
			createdBy: customer._id,
			link,
		};
		const reviewD = await reviewModel.create(review);
		document.ratingAggregation.average =
			(document.ratingAggregation.average * document.ratingAggregation.count + review.rating) /
			(document.ratingAggregation.count + 1);
		document.ratingAggregation.count++;
		document.ratingAggregation.distribution[review.rating - 1]++;

		await document.save();
		return {
			success: true,
			message: reviewMessages['review-created-successfully'][locale],
			data: JSON.parse(JSON.stringify(reviewD)),
			statusCode: 200,
		};
	} catch (error) {
		if ((error as Error).message.includes('duplicate key error'))
			return {
				success: false,
				message: reviewMessages['already-reviewed'][locale],
				data: null,
				statusCode: 400,
			};

		return {
			success: false,
			message: (error as Error)?.message || reviewMessages['failed-to-create-review'][locale],
			data: null,
			statusCode: 500,
		};
	}
}
