export const port = process.env.PORT || 3000;
export const host = process.env.FY_PROJECT_PRODUCTION_URL
	? `https://${process.env.FY_PROJECT_PRODUCTION_URL}`
	: `http://localhost:${port}`;
