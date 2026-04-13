import ImageSchema from '$common/Image';
import mongoose, { Schema, model } from 'mongoose';

const required = true;
const unique = true;

const LandingPageSchema = new Schema({
	landingPageID: { type: String, required, unique },
	ProductId: { type: String, required },
	title: { type: String, required },
	images: { type: [{ type: ImageSchema, required }], required },
	createdAt: { type: Date, default: Date.now },
});

const LandingPage = mongoose.models.LandingPage || model('LandingPage', LandingPageSchema);

export default LandingPage;
