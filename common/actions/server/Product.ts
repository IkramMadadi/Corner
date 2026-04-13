'use server';

import categoryModel from '&common/Category';
import collectionModel from '&common/Collection';
import landingPageModel, { LandingPageOptimizedI } from '&common/LandingPage';
import productModel from '&common/Product';
import reviewModel from '&common/Review';
import { getSession } from '@client/auth.config';
import { productsMessages } from '@common/messages/Product';
import { Types, isObjectIdOrHexString } from 'mongoose';
import connectToMongoDB from '~common/db';
import loadWebsiteData from '~common/websiteCache';

export async function loadProducts(	
	query: QuerySearchI<ProductSortableFields> & {
		categories?: string[];
		maxPrice?: number;
		minPrice?: number;
		minRating?: number;
		label?: string;
	},
	locale: LanguagesI,
): Promise<ResponseI<ListOf<ProductTableDataI>>> {
	try {
		const website = await loadWebsiteData();
		const priceRange: {
			'pricing.current'?: {
				$lte?: number;
				$gte?: number;
			};
		} = {};
		if (query.maxPrice)
			priceRange['pricing.current'] = {
				$lte: query.maxPrice,
			};
		if (query.minPrice) {
			if (priceRange['pricing.current']) priceRange['pricing.current'].$gte = query.minPrice;
			else
				priceRange['pricing.current'] = {
					$gte: query.minPrice,
				};
		}

		const products = await productModel.getProductTableDataI(
			query,
			website._id,
			{
				...(query.categories
					? {
							category: {
								$in: query.categories.map((cat) => new Types.ObjectId(cat)),
							},
						}
					: {}),
				...priceRange,
				...(query.minRating ? { 'ratingAggregation.average': { $gte: query.minRating } } : {}),
				...(query.label ? { label: { $regex: query.label, $options: 'i' } } : {}),
			},
			false,
		);
		//  .map((product) => ({ ...product, _id: product._id.toString() }));
		return {
			success: true,
			message: productsMessages['products-loaded-successfully'][locale],
			data: JSON.parse(JSON.stringify(products)),
			statusCode: 200,
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: productsMessages['failed-to-load-products'][locale],
			data: null,
			statusCode: 500,
		};
	}
}

export async function getLandingData(landingId: string): Promise<ResponseI<LandingPageOptimizedI>> {
	try {
		await connectToMongoDB();

		const doc = await landingPageModel.findOne({ landingPageID: landingId });

		if (!doc) {
			return {
				success: false,
				message: 'Landing page not found',
				data: null,
				statusCode: 404,
			};
		}

		const data = doc.toOptimizedObject();

		return {
			success: true,
			message: 'Landing page loaded successfully',
			data: data,
			statusCode: 200,
		};
	} catch (error) {
		console.error('loadLandingById server error:', error);
		return {
			success: false,
			message: 'Server error while loading landing page',
			data: null,
			statusCode: 500,
		};
	}
}

export async function loadProductBySlug(
	productSlug: string,
	locale: LanguagesI,
): Promise<ResponseI<PublicProductI<string, string, BasicPublishableInformationWithIdI>>> {
	// can use react cache for this to use meta and page title
	try {
		const website = await loadWebsiteData();
		const product = await productModel
			.findOne({
				website: website._id,
				...(isObjectIdOrHexString(productSlug) ? { _id: productSlug } : { slug: productSlug }),
			})
			.populate({
				path: 'category',
				select: {
					_id: 1,
					name: 1,
					slug: 1,
					summary: 1,
				},
			})
			.lean();
		if (!product)
			return {
				success: false,
				message: productsMessages['product-not-found'][locale],
				data: null,
				statusCode: 404,
			};

		return {
			success: true,
			message: productsMessages['product-loaded-successfully'][locale],
			data: JSON.parse(JSON.stringify(product)),
			statusCode: 200,
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: productsMessages['failed-to-load-product'][locale],
			data: null,
			statusCode: 500,
		};
	}
}

export async function loadProductsByCategorySlug(
	categorySlug: string,
	query: QuerySearchI<ProductSortableFields>,
	locale: LanguagesI,
): Promise<ResponseI<ListOf<ProductTableDataI>>> {
	try {
		const website = await loadWebsiteData();
		const category = await categoryModel.findOne({
			slug: categorySlug,
			website: website._id,
			for: 'b' satisfies PublishableContentTypeI,
		});
		if (!category)
			return {
				success: false,
				message: productsMessages['category-not-found'][locale],
				data: null,
				statusCode: 400,
			};

		const products = await productModel.getProductTableDataI(query, website._id, { category: category._id }, false);
		return {
			success: true,
			message: productsMessages['products-loaded-successfully'][locale],
			data: JSON.parse(JSON.stringify(products)),
			statusCode: 200,
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: productsMessages['failed-to-load-products'][locale],
			data: null,
			statusCode: 500,
		};
	}
}

export async function loadProductsByCollectionSlug(
	collectionSlug: string,
	query: QuerySearchI<ProductSortableFields>,
	locale: LanguagesI,
): Promise<ResponseI<ListOf<ProductTableDataI>>> {
	try {
		const website = await loadWebsiteData();
		const collection = await collectionModel.findOne({
			slug: collectionSlug,
			website: website._id,
		});
		if (!collection)
			return {
				success: false,
				message: productsMessages['collection-not-found'][locale],
				data: null,
				statusCode: 400,
			};

		const products = await productModel.getProductTableDataI(query, website._id, { _id: { $in: collection.publishables } }, false);

		return {
			success: true,
			message: productsMessages['products-loaded-successfully'][locale],
			data: JSON.parse(JSON.stringify(products)),
			statusCode: 200,
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: productsMessages['failed-to-load-products'][locale],
			data: null,
			statusCode: 500,
		};
	}
}

export async function loadProductReviews(
	productId: string,
	locale: LanguagesI,
): Promise<ResponseI<PublicReviewI<string, PublicPersonalInformationI>[]>> {
	try {
		const website = await loadWebsiteData();

		const reviews = await reviewModel.aggregate<PublicReviewI<Types.ObjectId, PublicPersonalInformationI<Types.ObjectId>>>([
			{
				$match: {
					'link.ref': new Types.ObjectId(productId),
					website: website._id,
					enabled: true,
				},
			},
			{
				$lookup: {
					from: 'users',
					localField: 'createdBy',
					foreignField: '_id',
					as: 'createdBy',
					pipeline: [
						{
							$project: {
								_id: 1,
								firstName: '$personalInformation.firstName',
								lastName: '$personalInformation.lastName',
								//phone: '$phone',
								kind: 1,
							},
						},
					],
				},
			},
			{
				$unwind: {
					path: '$createdBy',
					preserveNullAndEmptyArrays: false,
				},
			},
			{
				$sort: {
					createdAt: -1,
				},
			},
		]);

		return {
			success: true,
			message: productsMessages['reviews-loaded-successfully'][locale],
			data: JSON.parse(JSON.stringify(reviews)),
			statusCode: 200,
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: productsMessages['failed-to-load-reviews'][locale],
			data: null,
			statusCode: 500,
		};
	}
}

export async function loadPageProducts(
	locale: LanguagesI,
	index = 0,
	page: MainPagesTypes = 'home',
): Promise<ResponseI<ListOf<ProductTableDataI>>> {
	try {
		const website = await loadWebsiteData();
		const collection = website.pagesContent[page]?.products.collections[index];
		if (!collection)
			return {
				success: true,
				message: `${productsMessages['no-products-found-in'][locale]} ${page}.`,
				data: { list: [], total: 0 },
				statusCode: 200,
			};
		const collectionM = await collectionModel.findById(collection);
		if (!collectionM || collectionM.publishables === undefined || collectionM.publishables.length === 0)
			return {
				success: true,
				message: `${productsMessages['no-products-found-in'][locale]} ${page}.`,
				data: { list: [], total: 0 },
				statusCode: 200,
			};

		const products = await productModel.getProductTableDataI(
			{ sort: 'createdAt' },
			website._id,
			{
				_id: { $in: collectionM.publishables },
			},
			false,
		);
		//  .map((product) => ({ ...product, _id: product._id.toString() }));
		return {
			success: true,
			message: productsMessages['products-loaded-successfully'][locale],
			data: JSON.parse(JSON.stringify(products)),
			statusCode: 200,
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: productsMessages['failed-to-load-products'][locale],
			data: null,
			statusCode: 500,
		};
	}
}

export async function removeProductReview(productSlug: string, reviewId: string, locale: LanguagesI): Promise<ResponseI> {
	try {	
		const [website, session] = await Promise.all([loadWebsiteData(), getSession()]);
		if (!session)
			return {
				success: false,
				message: productsMessages['you-have-to-login'][locale],
				data: null,
				statusCode: 401,
			};
		const user = session.user as NecessaryCustomerI;
		const [product, review] = await Promise.all([
			productModel.findOne({ slug: productSlug, website: website._id }),
			reviewModel.findOne({
				_id: reviewId,
				website: website._id,
				createdBy: {
					ref: user._id,
				},
			}),
		] as const);
		if (!product)
			return {
				success: false,
				message: productsMessages['product-not-found'][locale],
				data: null,
				statusCode: 404,
			};

		if (!review)
			return {
				success: false,
				message: productsMessages['review-not-found'][locale],
				data: null,
				statusCode: 404,
			};

		product.ratingAggregation.average =
			(product.ratingAggregation.average * product.ratingAggregation.count - review.rating) / (product.ratingAggregation.count - 1);
		product.ratingAggregation.count -= 1;
		product.ratingAggregation.distribution[review.rating] -= 1;
		await Promise.all([product.save(), review.deleteOne()]);
		return {
			success: true,
			message: productsMessages['review-deleted-successfully'][locale],
			data: null,
			statusCode: 200,
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: productsMessages['failed-to-delete-review'][locale],
			data: null,
			statusCode: 500,
		};
	}
}

export async function loadSimilarProducts(
	categoryId: string,
	currentProductId: string,
	locale: LanguagesI,
	limit = 10
): Promise<ResponseI<{
	_id: string;
	name: LanguagesContentI;
	thumbnail: ImageI;
	slug: string;
	pricing: PricingI;
	label?: string;
	ratingAggregation?: RatingAggregationI;
}[]>> {
	try {
		await connectToMongoDB();
		const website = await loadWebsiteData();

		if (!categoryId) {
			return {
				success: true,
				message: 'No category provided',
				data: [],
				statusCode: 200,
			};
		}

		const products = await productModel
			.find({
				website: website._id,
				category: new Types.ObjectId(categoryId),
				_id: { $ne: new Types.ObjectId(currentProductId) },
				enabled: true,
				isPublished: true,
			})
			.limit(limit)
			.select({
				_id: 1,
				name: 1,
				thumbnail: 1,
				slug: 1,
				pricing: 1,
				ratingAggregation: 1,
				label: 1,
			})
			.lean();

		return {
			success: true,
			message: productsMessages['products-loaded-successfully'][locale],
			data: JSON.parse(JSON.stringify(products)),
			statusCode: 200,
		};
	} catch (error) {
		console.error('loadSimilarProducts error:', error);
		return {
			success: false,
			message: productsMessages['failed-to-load-products'][locale],
			data: null,
			statusCode: 500,
		};
	}
}