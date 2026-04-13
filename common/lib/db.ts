import type { Mongoose } from "mongoose";
import mongoose from "mongoose";

import { logSafeTime, setSafeTime } from "./utils";
declare global {
	// eslint-disable-next-line no-var
	var mongooseDB: { conn: Mongoose | null; promise: Promise<Mongoose> | null };
}

let cached = global.mongooseDB;

if (!cached) {
	cached = global.mongooseDB = { conn: null, promise: null };
}
let count = 0;
async function connectToMongoDB() {
	const countTxt = `${count}`;
	count++;
	setSafeTime(`DB-CONNECTION${countTxt}`);
	mongoose.set("debug", true);

	if (cached.conn) {
		logSafeTime(`DB-CONNECTION${countTxt}`, "CACHED");
		return cached.conn;
	}

	let conType = "SCHEDULED";

	if (!cached.promise) {
		conType = "NEW";
		cached.promise = mongoose.connect(process.env.FY_MONGODB_DB_URI_WITHOUT_CREDENTIALS, {
			auth: {
				username: process.env.FY_MONGODB_DB_USERNAME,
				password: process.env.FY_MONGODB_DB_PASSWORD,
			},
			dbName: process.env.FY_MONGODB_DB_DATABASE,
			bufferCommands: false,
			autoIndex: false,
			autoCreate: false,
		});
	}
	try {
		cached.conn = await cached.promise;
	} catch (e) {
		cached.promise = null;
		throw e;
	}
	logSafeTime(`DB-CONNECTION${countTxt}`, conType);
	return cached.conn;
}

export default connectToMongoDB;
