import { EventEmitter } from 'node:events';
import type { RoleHydratedDocument } from '!common/generated/models/Role';
import type { Types } from 'mongoose';
interface RolesManagerServiceEvents {
	roleCreated: [role: RoleHydratedDocument];
	roleUpdated: [role: RoleHydratedDocument];
	roleDeleted: [roleId: string | Types.ObjectId];
}
export const rolesEmitter = new EventEmitter<RolesManagerServiceEvents>();
