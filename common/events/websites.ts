import { EventEmitter } from 'node:events';

import type { WebSettingsHydratedDocument } from '!common/generated/models/WebSite';
import type { Types } from 'mongoose';
interface WebsitesManagerServiceEvents {
	websiteCreated: [website: WebSettingsHydratedDocument];
	websiteUpdated: [website: WebSettingsHydratedDocument];
	websiteDeleted: [websiteId: string | Types.ObjectId];
}
export const websitesEmitter = new EventEmitter<WebsitesManagerServiceEvents>();
