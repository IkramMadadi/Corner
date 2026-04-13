import newsLetterModel from '&common/NewsLetter';
import { newsLetterMessages } from '@common/messages/newsletter';
import loadWebsiteData from '~common/websiteCache';

export async function createNewsLetter(
	request: CreateNewsLetterI,
	locale: LanguagesI
): Promise<ResponseI<NewsLetterI>> {
	try {
		const website = await loadWebsiteData();
		const newsLetter = await newsLetterModel.findOne({
			website: website._id,
			email: request.email,
		});
		if (newsLetter) {
			if (newsLetter.subscribed) {
				return {
					success: false,
					message: newsLetterMessages['already-subscribed'][locale],
					data: null,
					statusCode: 400,
				};
			}
			await newsLetterModel.findByIdAndUpdate(newsLetter._id, {
				subscribed: true,
			});
			return {
				success: true,
				message: newsLetterMessages['subscribed-successfully'][locale],
				data: newsLetter.toOptimizedObject(),
				statusCode: 200,
			};
		}
		const createdRequest = await newsLetterModel.create({ ...request, website: website._id });
		return {
			success: true,
			message: newsLetterMessages['subscribed-successfully'][locale],
			data: createdRequest.toOptimizedObject(),
			statusCode: 200,
		};
	} catch (error) {
		if ((error as Error).message.includes('duplicate key error')) {
			return {
				success: false,
				message: newsLetterMessages['already-subscribed'][locale],
				data: null,
				statusCode: 400,
			};
		}
		return {
			success: false,
			message: newsLetterMessages['failed-to-subscribe'][locale],
			data: null,
			statusCode: 500,
		};
	}
}
