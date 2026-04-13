declare namespace NodeJS {
	interface ProcessEnv {
		readonly NEXT_PUBLIC_API_URL: string;
		readonly FY_MONGODB_DB_URI_WITHOUT_CREDENTIALS: string;
		readonly FY_MONGODB_DB_USERNAME: string;
		readonly FY_MONGODB_DB_PASSWORD: string;
		readonly FY_MONGODB_DB_DATABASE: string;
		readonly FY_WEBSITE_NAME: string;
		readonly FY_APP_NAME: string;
		readonly NODE_ENV: 'development' | 'production' | 'test';
		readonly FY_EMAIL_HOST: string;
		readonly FY_EMAIL_PORT: string;
		readonly FY_EMAIL_SECURE: string;
		readonly FY_EMAIL_USERNAME: string;
		readonly FY_DOMAIN_LOGO: string;
		readonly FY_EMAIL_PASSWORD: string;
		readonly FY_DOMAIN: string;
		// Add other environment variables here
	}
}
