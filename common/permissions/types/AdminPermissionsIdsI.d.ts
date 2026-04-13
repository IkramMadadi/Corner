declare type AdminGlobalPermissionsIdsI = 'admin:all' | 'admin:view';
declare type AdminManagementPermissionsIdsI = 'admin:create' | 'admin:enable' | 'admin:edit' | 'admin:edit_password';

declare type AdminPermissionsIdsI =
	/* admin */
	AdminGlobalPermissionsIdsI | AdminManagementPermissionsIdsI;
