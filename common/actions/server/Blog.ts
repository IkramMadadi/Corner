'use server';

import blogModel from '&common/Blog';
import categoryModel from '&common/Category';
import collectionModel from '&common/Collection';
import reviewModel from '&common/Review';
import { getSession } from '@client/auth.config';
import { blogMessages } from '@common/messages/Blog';
import { Types, isObjectIdOrHexString } from 'mongoose';
import loadWebsiteData from '~common/websiteCache';

// Publicly available blog-related actions, suitable for general users.
export async function loadBlogs(
	query: QuerySearchI<BlogSortableFields>,
	locale: LanguagesI
): Promise<ResponseI<ListOf<BlogTableDataI>>> {
	const website = await loadWebsiteData();

	try {
		const blogs = await blogModel.getBlogTableDataI(query, website._id, {}, false);
		return {
			success: true,
			message: blogMessages['blogs-loaded-successfully'][locale],
			data: JSON.parse(JSON.stringify(blogs)),
			statusCode: 200,
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: blogMessages['failed-to-load-blogs'][locale],
			data: null,
			statusCode: 500,
		};
	}
}
export async function loadPageBlogs(
	locale: LanguagesI,
	index = 0,
	page: MainPagesTypes = 'home'
): Promise<ResponseI<ListOf<BlogTableDataI>>> {
	try {
		const website = await loadWebsiteData();
		const collection = website.pagesContent[page]?.blogs.collections[index];
		if (!collection)
			return {
				success: true,
				message: blogMessages['category-not-found'][locale],
				data: { list: [], total: 0 },
				statusCode: 200,
			};
		const collectionM = await collectionModel.findById(collection);
		if (!collectionM || collectionM.publishables === undefined || collectionM.publishables.length === 0)
			return {
				success: true,
				message: blogMessages['no-blogs-found'][locale],
				data: { list: [], total: 0 },
				statusCode: 200,
			};

		const products = await blogModel.getBlogTableDataI(
			{ sort: 'createdAt' },
			website._id,
			{
				_id: { $in: collectionM.publishables.map(p => new Types.ObjectId(p)) },
			},
			false
		);
		//  .map((product) => ({ ...product, _id: product._id.toString() }));
		return {
			success: true,
			message: blogMessages['blogs-loaded-successfully'][locale],
			data: JSON.parse(JSON.stringify(products)),
			statusCode: 200,
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: blogMessages['failed-to-load-blogs'][locale],
			data: null,
			statusCode: 500,
		};
	}
}

export async function loadBlogBySlug(blogSlug: string, locale: LanguagesI): Promise<ResponseI<PublicBlogI>> {
	// can use react cache for this to use meta and page title
	try {
		const website = await loadWebsiteData();
		const blog = await blogModel
			.findOne({
				...(isObjectIdOrHexString(blogSlug) ? { _id: blogSlug } : { slug: blogSlug }),
				website: website._id,
			})
			.lean();
		if (!blog)
			return {
				success: false,
				message: blogMessages['blog-not-found'][locale],
				data: null,
				statusCode: 404,
			};

		return {
			success: true,
			message: blogMessages['blog-loaded-successfully'][locale],
			data: JSON.parse(JSON.stringify(blog)),
			statusCode: 200,
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: blogMessages['failed-to-load-blogs'][locale],
			data: null,
			statusCode: 500,
		};
	}
}
export async function loadBlogsByCategorySlug(
	categorySlug: string,
	query: QuerySearchI<BlogSortableFields>,
	locale: LanguagesI
): Promise<ResponseI<ListOf<BlogTableDataI>>> {
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
				message: blogMessages['category-not-found'][locale],
				data: null,
				statusCode: 400,
			};

		const blogs = await blogModel.getBlogTableDataI(query, website._id, { category: category._id }, false);
		return {
			success: true,
			message: blogMessages['blogs-loaded-successfully'][locale],
			data: JSON.parse(JSON.stringify(blogs)),
			statusCode: 200,
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: blogMessages['failed-to-load-blogs'][locale],
			data: null,
			statusCode: 500,
		};
	}
}
export async function loadBlogsByCollectionSlug(
	collectionSlug: string,
	query: QuerySearchI<BlogSortableFields>,
	locale: LanguagesI
): Promise<ResponseI<ListOf<BlogTableDataI>>> {
	try {
		const website = await loadWebsiteData();
		const collection = await collectionModel.findOne({
			slug: collectionSlug,
			website: website._id,
		});
		if (!collection)
			return {
				success: false,
				message: blogMessages['collection-not-found'][locale],
				data: null,
				statusCode: 400,
			};

		const blogs = await blogModel.getBlogTableDataI(
			query,
			website._id,
			{ _id: { $in: collection.publishables } },
			false
		);

		return {
			success: true,
			message: blogMessages['blogs-loaded-successfully'][locale],
			data: JSON.parse(JSON.stringify(blogs)),
			statusCode: 200,
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: blogMessages['failed-to-load-blogs'][locale],
			data: null,
			statusCode: 500,
		};
	}
}
export async function loadBlogReviews(
	blogId: string,
	locale: LanguagesI
): Promise<ResponseI<PublicReviewI<string, PublicPersonalInformationI>[]>> {
	try {
		const website = await loadWebsiteData();

		const reviews = await reviewModel.aggregate<
			PublicReviewI<Types.ObjectId, PublicPersonalInformationI<Types.ObjectId>>
		>([
			{
				$match: {
					'link.ref': new Types.ObjectId(blogId),
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
			message: blogMessages['reviews-loaded-successfully'][locale],
			data: JSON.parse(JSON.stringify(reviews)),
			statusCode: 200,
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: blogMessages['failed-to-load-reviews'][locale],
			data: null,
			statusCode: 500,
		};
	}
}

export async function removeBlogReview(blogSlug: string, reviewId: string, locale: LanguagesI): Promise<ResponseI> {
	try {
		const [website, session] = await Promise.all([loadWebsiteData(), getSession()]);
		if (!session)
			return {
				success: false,
				message: blogMessages['login-required-to-remove-review'][locale],
				data: null,
				statusCode: 401,
			};
		const user = session.user as NecessaryCustomerI;
		const [blog, review] = await Promise.all([
			blogModel.findOne({ slug: blogSlug, website: website._id }),
			reviewModel.findOne({
				_id: reviewId,
				website: website._id,
				createdBy: {
					ref: user._id,
				},
			}),
		] as const);
		if (!blog)
			return {
				success: false,
				message: blogMessages['blog-not-found'][locale],
				data: null,
				statusCode: 404,
			};

		if (!review)
			return {
				success: false,
				message: blogMessages['failed-to-remove-review'][locale],
				data: null,
				statusCode: 404,
			};

		blog.ratingAggregation.average =
			(blog.ratingAggregation.average * blog.ratingAggregation.count - review.rating) /
			(blog.ratingAggregation.count - 1);
		blog.ratingAggregation.count -= 1;
		blog.ratingAggregation.distribution[review.rating] -= 1;
		await Promise.all([blog.save(), review.deleteOne()]);
		return {
			success: true,
			message: blogMessages['review-removed-successfully'][locale],
			data: null,
			statusCode: 200,
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: blogMessages['failed-to-remove-review'][locale],
			data: null,
			statusCode: 500,
		};
	}
}
