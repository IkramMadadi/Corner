import EmailService from '@common/services/Email';
import { logSafeTime, setSafeTime } from '~common/utils';

declare global {
	// eslint-disable-next-line no-var
	var emailService: { conn: EmailService | null; promise: Promise<EmailService> | null };
}

let cached = global.emailService;

if (!cached) {
	cached = global.emailService = { conn: null, promise: null };
}
let count = 0;
async function loadEmailService() {
	const countTxt = `${count}`;
	count++;
	setSafeTime(`EMAIL-Service-${countTxt}`);

	if (cached.conn) {
		logSafeTime(`EMAIL-Service-${countTxt}`, 'CACHED');
		return cached.conn;
	}

	let conType = 'SCHEDULED';

	if (!cached.promise) {
		conType = 'NEW';
		const emailS = new EmailService();
		cached.promise = emailS.Connection.then(() => {
			return emailS;
		});
	}
	try {
		cached.conn = await cached.promise;
	} catch (e) {
		cached.promise = null;
		throw e;
	}
	logSafeTime(`EMAIL-Service-${countTxt}`, conType);
	return cached.conn;
}

export default loadEmailService;
