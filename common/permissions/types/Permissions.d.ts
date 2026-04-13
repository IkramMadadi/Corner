declare interface PermissionsI<P = BasePermissionsIdsI> {
	id: P;
	name: string;
	description: string;
	requires: P[];
}

declare type DashboardPermissionsIdsI = /* dashboard */ 'dashboard:view';
declare type SettingsPermissionsIdsI = /* settings */ 'settings:view' | 'settings:edit_label' | 'settings:edit_landing';

declare type BasePermissionsIdsI =
	| 'admin:super'
	| CustomerPermissionsIdsI
	| OrdersPermissionsIdsI
	| ProductPermissionsIdsI
	| BlogPermissionsIdsI
	| CategoryPermissionsIdsI
	| CollectionPermissionsIdsI
	| AdminPermissionsIdsI
	| RolesPermissionsIdsI
	| DashboardPermissionsIdsI
	| SettingsPermissionsIdsI;
declare type PermissionsIdsI = 'dev:super' | BasePermissionsIdsI;
