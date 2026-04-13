import { z } from 'zod';
declare global {
	// eslint-disable-next-line no-var
	var validatedEnv: NodeJS.ProcessEnv | null;
}

let cached = global.validatedEnv;

if (!cached) {
	cached = global.validatedEnv = null;
}
export default function validateEnv() {
	if (cached) {
		return cached;
	}
	const envSchema = z.object({
		FY_MONGODB_DB_URI_WITHOUT_CREDENTIALS: z
			.string({
				required_error: 'MONGODB_URI is required',
				invalid_type_error: 'MONGODB should be a valid URI string',
				coerce: true,
				description: 'MONGODB is a URI needed to connect to MongoDB',
			})
			.url({
				message: 'MONGODB_URI uri should be a valid URI',
			}),
		FY_MONGODB_DB_DATABASE: z.string({
			required_error: 'FY_MONGODB_DB_DATABASE is required',
			invalid_type_error: 'FY_MONGODB_DB_DATABASE should be a valid string',
			coerce: true,
			description: 'FY_MONGODB_DB_DATABASE is the name of the database',
		}),
		FY_MONGODB_DB_USERNAME: z.string({
			required_error: 'MONGODB_DB_USERNAME is required',
			invalid_type_error: 'MONGODB_DB_USERNAME should be a valid string',
			coerce: true,
			description: 'MONGODB_DB_USERNAME is the username for the database',
		}),
		FY_MONGODB_DB_PASSWORD: z.string({
			required_error: 'MONGODB_DB_PASSWORD is required',
			invalid_type_error: 'MONGODB_DB_PASSWORD should be a valid string',
			coerce: true,
			description: 'MONGODB_DB_PASSWORD is the password for the database',
		}),
		NEXT_PUBLIC_DEFAULT_LANGUAGE: z.enum(['ar', 'en', 'fr'], {
			invalid_type_error: 'NEXT_PUBLIC_DEFAULT_LANGUAGE should be a valid language code (ar, en, fr)',
			description: 'NEXT_PUBLIC_DEFAULT_LANGUAGE is the default language code for the application',
		}),
		FY_WEBSITE_NAME: z.string({
			required_error: 'FY_WEBSITE_NAME is required',
			invalid_type_error: 'FY_WEBSITE_NAME should be a valid string',
			coerce: true,
			description: 'FY_WEBSITE_NAME is the name of the website',
		}),
		FY_EMAIL_HOST: z.string({
			required_error: 'FY_EMAIL_HOST is required',
			invalid_type_error: 'FY_EMAIL_HOST should be a valid string',
			coerce: true,
			description: 'FY_EMAIL_HOST is the host for the email service',
		}),
		FY_EMAIL_PORT: z.number({
			required_error: 'FY_EMAIL_PORT is required',
			invalid_type_error: 'FY_EMAIL_PORT should be a valid number',
			coerce: true,
			description: 'FY_EMAIL_PORT is the port for the email service',
		}),
		FY_EMAIL_SECURE: z.boolean({
			required_error: 'FY_EMAIL_SECURE is required',
			invalid_type_error: 'FY_EMAIL_SECURE should be a valid string',
			coerce: true,
			description: 'FY_EMAIL_SECURE is the secure for the email service',
		}),
		FY_EMAIL_USERNAME: z.string({
			required_error: 'FY_EMAIL_USERNAME is required',
			invalid_type_error: 'FY_EMAIL_USERNAME should be a valid string',
			coerce: true,
			description: 'FY_EMAIL_USERNAME is the username for the email service',
		}),
		FY_EMAIL_PASSWORD: z.string({
			required_error: 'FY_EMAIL_PASSWORD is required',
			invalid_type_error: 'FY_EMAIL_PASSWORD should be a valid string',
			coerce: true,
			description: 'FY_EMAIL_PASSWORD is the password for the email service',
		}),
		FY_DOMAIN: z
			.string({
				required_error: 'FY_DOMAIN is required',
				invalid_type_error: 'FY_DOMAIN should be a valid string',
				coerce: true,
				description: 'FY_DOMAIN is the domain for the website',
			})
			.url({
				message: 'FY_DOMAIN should be a valid URL',
			}),
		FY_DOMAIN_LOGO: z
			.string({
				required_error: 'FY_DOMAIN_LOGO is required',
				invalid_type_error: 'FY_DOMAIN_LOGO should be a valid string',
				coerce: true,
				description: 'FY_DOMAIN_LOGO is the path for the email templates',
			})
			.url('FY_DOMAIN_LOGO should be a valid url'),
	});

	const envResult = envSchema.safeParse(process.env);

	if (!envResult.success) {
		console.error('❌ Invalid environment variables:', envResult.error.errors);
		process.exit(1); // Exit the process if validation fails
	}
	console.info('✅ Environment variables are valid');
	cached = global.validatedEnv = envResult.data as unknown as NodeJS.ProcessEnv;
	return envResult.data;
}
