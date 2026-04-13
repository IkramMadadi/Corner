declare type CustomerGlobalPermissionsIdsI =
	/* customers permissions */
	| 'customer:all'
	| 'customer:view'
	| 'customer:view_all_customers'
	| 'customer:view_guests'
	| 'customer:view_enabled'
	| 'customer:view_disabled';
declare type CustomerManagementPermissionsIdsI =
	/* customer management */
	'customer:create' | 'customer:enable' | 'customer:edit' | 'customer:edit_password';

declare type CustomerPermissionsIdsI = CustomerGlobalPermissionsIdsI | CustomerManagementPermissionsIdsI;
