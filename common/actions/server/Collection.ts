'use server';

import collectionModel from '&common/Collection';
import { collectionMessages } from '@common/messages/Collection';
import connectToMongoDB from '~common/db';
import loadWebsiteData from '~common/websiteCache';

// Publicly available collection-related actions, suitable for general users.
export async function loadCollections(
	query: QuerySearchI<CollectionSortableFields>,
	locale: LanguagesI,
	catFor: PublishableContentTypeI = 'p'
): Promise<ResponseI<ListOf<CollectionTableDataI>>> {
	try {
		await connectToMongoDB();

		const website = await loadWebsiteData();
		const collections = await collectionModel.getCollectionsTableDataI(query, website._id, {
			collectionType: catFor,
		});
		return {
			success: true,
			message: collectionMessages['collections-loaded-successfully'][locale],
			data: JSON.parse(JSON.stringify(collections)),
			statusCode: 200,
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: collectionMessages['failed-to-load-collections'][locale],
			data: null,
			statusCode: 500,
		};
	}
}

export async function loadCollectionBySlug<T extends PublicProductI | PublicBlogI>(
	collectionSlug: string,
	locale: LanguagesI
): Promise<ResponseI<PublicCollectionI<string, T>>> {
	// can use react cache for this to use meta and page title
	try {
		await connectToMongoDB();
		
		const website = await loadWebsiteData();
		const collection = (
			await collectionModel.aggregate([
				{
					$match: {
						slug: collectionSlug,
						website: website._id,
					},
				},
				{
					$unset: ['description_fuzzy', 'name_fuzzy'],
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
									localField: 'publishables',
									foreignField: '_id',
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
									localField: 'publishables',
									foreignField: '_id',
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
		)[0] as PublicCollectionI<string, T> | null | undefined;
		if (!collection) {
			return {
				success: false,
				message: collectionMessages['collection-not-found'][locale],
				data: null,
				statusCode: 404,
			};
		}
		return {
			success: true,
			message: collectionMessages['collection-loaded-successfully'][locale],
			data: JSON.parse(JSON.stringify(collection)),
			statusCode: 200,
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: collectionMessages['failed-to-load-collection'][locale],
			data: null,
			statusCode: 500,
		};
	}
}
