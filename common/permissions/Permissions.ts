import { AdminPermissions } from './sub/AdminPermissions';
import { BlogPermissions } from './sub/BlogPermissions';
import { CategoryPermissions } from './sub/CategoryPermissions';
import { CollectionPermissions } from './sub/CollectionPermissions';
import { CustomerPermissions } from './sub/CustomerPermissions';
import { DashboardPermissions } from './sub/DashboardPermissions';
import { OrdersPermissions } from './sub/OrdersPermissions';
import { ProductPermissions } from './sub/ProductPermissions';
import { RolesPermissions } from './sub/RolesPermissions';
import { SettingsPermissions } from './sub/SettingsPermissions';
export const SuperAdminPermissions: Record<'admin:super', PermissionsI<BasePermissionsIdsI>> = {
	'admin:super': {
		id: 'admin:super',
		name: 'Super Admin',
		description: 'Super Admin',
		requires: [],
	},
};
export const SuperAdminPermissionsD = Object.values(SuperAdminPermissions);
export const Permissions: Record<BasePermissionsIdsI, PermissionsI> = {
	...SuperAdminPermissions,
	...OrdersPermissions,
	...CustomerPermissions,
	...AdminPermissions,
	...ProductPermissions,
	...CategoryPermissions,
	...CollectionPermissions,
	...BlogPermissions,
	...DashboardPermissions,
	...RolesPermissions,
	...SettingsPermissions,
};
export const PermissionsValues = Object.values(Permissions);
export const BasePermissionsIds = Object.keys(Permissions) as BasePermissionsIdsI[];
export const PermissionsIds: PermissionsIdsI[] = ['dev:super', ...BasePermissionsIds];
