// lib/websiteCache.js
import webSiteModel from "&common/WebSite";
import type { Types } from "mongoose";
import { unstable_cache } from "next/cache";

import connectToMongoDB from "./db";
import { logSafeTime, setSafeTime } from "./utils";
declare global {
	// eslint-disable-next-line no-var
	var websiteDataCache: {
		data: PublicWebSiteI<Types.ObjectId> | null;
		promise: Promise<PublicWebSiteI<Types.ObjectId>> | null;
	};
}

let cached = global.websiteDataCache;

if (!cached) {
	cached = global.websiteDataCache = { data: null, promise: null };
}

const websiteName = process.env.FY_WEBSITE_NAME;

const getWebsiteDataFromDB = async () => {
	await connectToMongoDB();
	const websiteData = await webSiteModel.findOne({
		FY_ID: websiteName,
	});

	if (!websiteData) throw new Error("Website data not found");

	return websiteData.toOptimizedObject();
};

const getCachedWebsiteData = unstable_cache(async () => getWebsiteDataFromDB(), [`website-data-${websiteName}`], {
	revalidate: 3600,
	tags: ["website-data"],
});

let count = 0;

async function loadWebsiteData() {
	const countTxt = `${count}`;
	count++;
	setSafeTime(`LOADING-WEBSITE-DATA-${countTxt}`);

	try {
		const data = await getCachedWebsiteData();

		logSafeTime(`LOADING-WEBSITE-DATA-${countTxt}`, "SERVED-FROM-CACHE");
		return data;
	} catch (e) {
		console.error("Error loading website data:", e);
		throw e;
	}
}

/*

let count = 0;

async function loadWebsiteData() {
	const countTxt = `${count}`;
	count++;
	setSafeTime(`LOADING-WEBSITE-DATA-${countTxt}`);

	if (cached.data) {
		logSafeTime(`LOADING-WEBSITE-DATA-${countTxt}`, 'CACHED');
		return cached.data; // Return cached data if already loaded
	}

	let conType = 'SCHEDULED';

	if (!cached.promise) {
		conType = 'NEW';
		cached.promise = connectToMongoDB().then(async () => {
			const websiteData = await webSiteModel.findOne({
				FY_ID: websiteName,
			});
			if (!websiteData) throw new Error('Website data not found');
			startChangeStream(websiteData._id);

			return websiteData.toOptimizedObject(); // Cache the data
		});
	}

	try {
		cached.data = await cached.promise;
	} catch (e) {
		cached.promise = null;
		throw e;
	}
	logSafeTime(`LOADING-WEBSITE-DATA-${countTxt}`, conType);
	return cached.data;
}

// Setup change stream watcher
async function startChangeStream(websiteId: Types.ObjectId) {
	await connectToMongoDB(); // Ensure DB connection
	const changeStream = webSiteModel.watch();

	console.info(`Starting change stream watcher... over website ${websiteName}`);

	changeStream.on('change', async change => {
		try {
			console.info('Change detected:', change);

			// Update the cache on any relevant change
			if (['insert', 'update', 'replace'].includes(change.operationType)) {
				const updatedWebsiteData = await webSiteModel.findById(websiteId);
				if (updatedWebsiteData) {
					cached.data = updatedWebsiteData.toOptimizedObject();
					console.info('Website Cache updated');
				}
			} else if (change.operationType === 'delete') {
				// Handle deletions if necessary
				cached.data = null;
				cached.promise = null;
				console.info('Cache cleared due to deletion');
			}
		} catch (error) {
			console.error('Error updating cache from change stream:', error);
		}
	});

	changeStream.on('error', error => {
		console.error('Change stream error:', error);
	});

	changeStream.on('end', () => {
		console.info('Change stream closed.');
	});
}
*/
export default loadWebsiteData;
