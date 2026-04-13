import webSiteModel from '&common/WebSite';

export async function getWebsiteMetaIntegration(websiteId: string) {
	const website = await webSiteModel.findById(websiteId).select('integrations.meta');
	return website?.integrations?.meta;
}
