'use server';

import productModel from '&common/Product';
import landingPageModel from '&common/LandingPage';
import { Types } from 'mongoose';
import connectToMongoDB from '~common/db';

export interface UpsellParentDataI {
    _id: string;
    name: LanguagesContentI;
    thumbnail: ImageI;
    pricing: PricingI;
    landingPage: string;
    summary?: LanguagesContentI;
}

export async function getUpsellParentData(
    productId: string,
    locale: LanguagesI
): Promise<UpsellParentDataI | null> {
    try {
        await connectToMongoDB();

        if (!productId || !Types.ObjectId.isValid(productId)) {
            return null;
        }

        const product = await productModel
            .findById(productId)
            .select('upsell')
            .lean();

        if (!product?.upsell?.enabled || !product?.upsell?.parent) {
            return null;
        }

        const parentProduct = await productModel
            .findById(product.upsell.parent)
            .select('name thumbnail pricing slug summary')
            .lean();

        if (!parentProduct) {
            return null;
        }

        let landingPage = product.upsell.landingPage;

        if (landingPage) {
            if (landingPage.startsWith('lp_')) {
                landingPage = `/${locale}/landingpage/${landingPage}`;
            }
        } else {
            const landing = await landingPageModel
                .findOne({ ProductId: parentProduct.slug })
                .select('landingPageID')
                .lean();

            if (landing) {
                landingPage = `/${locale}/landingpage/${landing.landingPageID}`;
            }
        }

        if (!landingPage) {
            return null;
        }

        return {
            _id: parentProduct._id.toString(),
            name: parentProduct.name,
            thumbnail: {
                src: parentProduct.thumbnail.src,
                width: parentProduct.thumbnail.width,
                height: parentProduct.thumbnail.height,
            },
            pricing: parentProduct.pricing,
            landingPage,
            summary: parentProduct.summary,
        };
    } catch (error) {
        console.error('Error fetching upsell parent:', error);
        return null;
    }
}