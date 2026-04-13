import customerModel from '&common/Customer';
import { registerErrors } from '@common/messages/auth';
import { type NextRequest, NextResponse } from 'next/server';
import loadWebsiteData from '~common/websiteCache';
import { sendWelcomeEmail } from './emails';

export const register = async (request: NextRequest) => {
	try {
		const locale = (request.cookies.get('preferred-language')?.value as LanguagesI | undefined) || 'fr';
		const [credentials, website] = await Promise.all([
			request.json() as Promise<CustomerRegisterI>,
			loadWebsiteData(),
		]);
		credentials.email = credentials.email?.toLocaleLowerCase();
		const { personalInformation, phone, email, password } = credentials;

		const customerFound = await customerModel.exists({ email, website: website._id });
		if (customerFound)
			return new NextResponse(registerErrors['email-already-in-use'][locale], {
				status: 400,
			});

		// Form a DB payload
		const newCustomer: CustomerRegisterI = {
			personalInformation,
			phone,
			email,
			password,
		};
		// Update the DB
		const customer = await customerModel.create({ ...newCustomer, website: website._id });
		await sendWelcomeEmail(
			customer.email,
			{
				name: `${customer.personalInformation.firstName} ${customer.personalInformation.lastName}`,
				email: customer.email,
			},
			locale
		);
		return new NextResponse(registerErrors['created-successfully'][locale], {
			status: 201,
		});
	} catch (err) {
		return new NextResponse((err as Error).message, {
			status: 500,
		});
	}
};
