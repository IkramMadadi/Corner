import EjsTemplate from '@common/utils/backend/EjsTemplate';
import { logSafeTime, setSafeTime } from '~common/utils';
import defaultContext from './emailAdditional';
import loadWebsiteData from './websiteCache';

declare global {
	// eslint-disable-next-line no-var
	var welcomeCustomerMail: {
		conn: EjsTemplate<'welcomeCustomer'> | null;
		promise: Promise<EjsTemplate<'welcomeCustomer'>> | null;
	};
}

let cached = global.welcomeCustomerMail;

if (!cached) {
	cached = global.welcomeCustomerMail = { conn: null, promise: null };
}
let count = 0;
async function loadWelcomeCustomerEmail() {
	const countTxt = `${count}`;
	count++;
	setSafeTime(`RESET-EMAIL-${countTxt}`);

	if (cached.conn) {
		logSafeTime(`RESET-EMAIL-${countTxt}`, 'CACHED');
		return cached.conn;
	}

	let conType = 'SCHEDULED';

	if (!cached.promise) {
		conType = 'NEW';
		const website = await loadWebsiteData();
		const template = new EjsTemplate('welcomeCustomer', {
			WebsiteName: website.websiteInformation.name.en,
			...defaultContext,
		});
		cached.promise = template.template.then(() => {
			return template;
		});
	}
	try {
		cached.conn = await cached.promise;
	} catch (e) {
		cached.promise = null;
		throw e;
	}
	logSafeTime(`RESET-EMAIL-${countTxt}`, conType);
	return cached.conn;
}

export default loadWelcomeCustomerEmail;
