declare type CategoryGlobalPermissionsIdsI = 'category:all' | 'category:view';

declare type CategoryManagementPermissionsIdsI =
	| 'category:create'
	| 'category:edit'
	| 'category:enable'
	| 'category:publish'
	| 'category:delete';
//| 'category:export';
declare type CategoryViewPermissionsIdsI = 'category:view_enabled' | 'category:view_disabled' | 'category:view_draft';

declare type CategoryPermissionsIdsI =
	/* all categories */
	CategoryGlobalPermissionsIdsI | CategoryViewPermissionsIdsI | CategoryManagementPermissionsIdsI;
