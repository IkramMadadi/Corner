declare type IntegrationFlagsT = 'order' | 'add-product' | 'remove-product' | 'increment-product' | 'decrement-product';

declare interface IntegrationI {
	id: string;
	access_token?: string; // Here
	flags: Record<IntegrationFlagsT, boolean>;
}

declare interface googleIntegration {
	property_id : string,
	measurement_id : string
	client_email : string
	private_key :string
}

declare interface AnalyticsIntegrationI {
	meta?: IntegrationI;
	google_analytics?: IntegrationI;
	tiktok?: IntegrationI;
}
