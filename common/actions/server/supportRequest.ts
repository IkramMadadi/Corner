import supportRequestModel from '&common/SupportRequest';
import { supportRequestMessages } from '@common/messages/supportRequest';
import loadWebsiteData from '~common/websiteCache';

export async function requestSupport(
	request: RequestSupportI,
	locale: LanguagesI
): Promise<ResponseI<PublicSupportRequestI>> {
	try {
		const website = await loadWebsiteData();
		const createdRequest = await supportRequestModel.create({ ...request, website: website._id });
		return {
			success: true,
			message: supportRequestMessages['created-successfully'][locale],
			data: createdRequest.toOptimizedObject(),
			statusCode: 200,
		};
	} catch (error) {
		return {
			success: false,
			message: (error as Error)?.message || supportRequestMessages.supportRequestError[locale],
			data: null,
			statusCode: 500,
		};
	}
}
