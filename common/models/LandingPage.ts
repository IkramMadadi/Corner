import mongoose, { type Schema, type Model, model, type Document } from "mongoose";
import ImageSchema from "$common/Image";

const required = true;
const unique = true;

interface ImageI {
	src: string;
	alt?: string;
	width?: number;
	height?: number;
}
export interface LandingPageI {
	landingPageID: string;
	ProductId: string;
	title: string;
	images: ImageI[];
	createdAt: string;
}

export interface LandingPageOptimizedI {
	_id: string;
	landingPageID: string;
	ProductId: string;
	title: string;
	images: ImageI[];
	createdAt: string;
}

export interface LandingPageDocument extends LandingPageI, Document {
	_id: mongoose.Types.ObjectId;
	toOptimizedObject(): LandingPageOptimizedI;
}

export interface LandingPageModel extends Model<LandingPageDocument> {
	// هنا يمكنك إضافة Static Methods مستقبلاً مثل getTableData
}

/* --------------------- Schema --------------------- */
const LandingPageSchema = new mongoose.Schema<LandingPageDocument, LandingPageModel>(
	{
		landingPageID: { type: String, required, unique },
		ProductId: { type: String, required },
		title: { type: String, required },
		images: { type: [{ type: ImageSchema, required }], required },
	},
	{
		timestamps: true,
		bufferCommands: true,
		autoCreate: false,
	},
);

/* --------------------- Methods --------------------- */
LandingPageSchema.methods.toOptimizedObject = function (): LandingPageOptimizedI {
	const obj = this.toObject();
	return {
		_id: obj._id.toString(),
		landingPageID: obj.landingPageID,
		ProductId: obj.ProductId,
		title: obj.title,
		images: obj.images,
		createdAt: obj.createdAt ? obj.createdAt.toISOString() : new Date().toISOString(),
	};
};

/* --------------------- Generate Model --------------------- */

const landingPageModel =
	(mongoose.models.LandingPage as LandingPageModel) || model<LandingPageDocument, LandingPageModel>("LandingPage", LandingPageSchema);

export default landingPageModel;
