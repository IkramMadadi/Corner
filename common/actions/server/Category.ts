'use server';

import categoryModel from '&common/Category';
import { categoryMessages } from '@common/messages/Category';
import { Types } from 'mongoose';
import connectToMongoDB from '~common/db';
import loadWebsiteData from '~common/websiteCache';

// Publicly available category-related actions, suitable for general users.
export async function loadCategories(
	query: QuerySearchI<CategorySortableFields>,
	locale: LanguagesI,
	catFor: PublishableContentTypeI = 'p'
): Promise<ResponseI<ListOf<CategoryTableDataI>>> {
	try {
		await connectToMongoDB();

		const website = await loadWebsiteData();

		const categories = await categoryModel.getCategoriesTableDataI(query, website._id, { categoryType: catFor });
		return {
			success: true,
			message: categoryMessages['categories-loaded-successfully'][locale],
			data: JSON.parse(JSON.stringify(categories)),
			statusCode: 200,
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: categoryMessages['failed-to-load-categories'][locale],
			data: null,
			statusCode: 500,
		};
	}
}

export async function loadCategoryBySlug<T extends PublishableContentTypeI>(
	categorySlug: string,
	locale: LanguagesI
): Promise<
	ResponseI<PublicCategoryI<string, string, OptimizedCategoryI, T extends 'p' ? PublicProductI : PublicBlogI>>
> {
	// can use react cache for this to use meta and page title
	try {
		await connectToMongoDB();

		const website = await loadWebsiteData();

		const category = (
			await categoryModel.aggregate([
				{
					$match: {
						slug: categorySlug,
						website: website._id,
					},
				},
				{
					$unset: ['description_fuzzy', 'name_fuzzy'],
				},
				{
					$lookup: {
						from: 'categories',
						localField: '_id',
						foreignField: 'parentCategory',
						as: 'subCategories',
						pipeline: [
							{
								$unset: ['description_fuzzy', 'name_fuzzy'],
							},
						],
					},
				},
				{
					$facet: {
						// Only include results from "products" if "for" is "p"
						productResults: [
							{
								$match: {
									for: 'p',
								},
							},
							{
								$lookup: {
									from: 'products',
									localField: '_id',
									foreignField: 'category',
									as: 'publishables',
									pipeline: [
										{
											$unset: ['description_fuzzy', 'name_fuzzy'],
										},
									],
								},
							},
						],
						// Only include results from "blogs" if "for" is "b"
						blogResults: [
							{
								$match: {
									for: 'b',
								},
							},
							{
								$lookup: {
									from: 'blogs',
									localField: '_id',
									foreignField: 'category',
									as: 'publishables',
									pipeline: [
										{
											$unset: ['description_fuzzy', 'name_fuzzy'],
										},
									],
								},
							},
						],
					},
				},
				{
					$project: {
						publishableResults: {
							$cond: {
								if: {
									$gt: [
										{
											$size: '$productResults',
										},
										0,
									],
								},
								// biome-ignore lint/suspicious/noThenProperty: its a mongodb default
								then: '$productResults',
								else: '$blogResults',
							},
						},
					},
				},
				{
					$unwind: '$publishableResults',
				},
				{
					$replaceRoot: {
						newRoot: '$publishableResults',
					},
				},
			])
		)[0] as
			| PublicCategoryI<string, string, OptimizedCategoryI, T extends 'p' ? PublicProductI : PublicBlogI>
			| null
			| undefined;
		//const category = await categoryModel.findOne({ slug: categorySlug, website: website._id }).lean();
		if (!category)
			return {
				success: false,
				message: categoryMessages['category-not-found'][locale],
				data: null,
				statusCode: 404,
			};

		return {
			success: true,
			message: categoryMessages['category-loaded-successfully'][locale],
			data: JSON.parse(JSON.stringify(category)),
			statusCode: 200,
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: categoryMessages['failed-to-load-category'][locale],
			data: null,
			statusCode: 500,
		};
	}
}

export async function loadCategoriesByIds(locale: LanguagesI): Promise<ResponseI<SimpleCategoryI[]>> {
	try {
		await connectToMongoDB();
		
		const website = await loadWebsiteData();
		const categories = await categoryModel.aggregate<SimpleCategoryI<Types.ObjectId>>([
			{
				$match: {
					_id: { $in: website.pagesContent.home?.products.categories.map(cat => new Types.ObjectId(cat)) },
					website: website._id,
				},
			},
			{
				$lookup: {
					from: 'products',
					localField: '_id',
					foreignField: 'category',
					as: 'productsCount',
				},
			},
			{
				$project: {
					name: 1,
					avatar: 1,
					_id: 1,
					slug: 1,
					label: 1,
					productsCount: {
						$size: '$productsCount',
					},
				},
			},
		]);

		return {
			success: true,
			message: categoryMessages['categories-loaded-successfully'][locale],
			data: JSON.parse(JSON.stringify(categories)),
			statusCode: 200,
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: categoryMessages['failed-to-load-categories'][locale],
			data: null,
			statusCode: 500,
		};
	}
}
