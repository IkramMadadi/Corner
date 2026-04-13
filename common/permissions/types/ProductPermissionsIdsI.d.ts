declare type ProductGlobalPermissionsIdsI = 'product:all' | 'product:view';

declare type ProductManagementPermissionsIdsI =
	| 'product:create'
	| 'product:edit'
	| 'product:enable'
	| 'product:publish'
	| 'product:delete';
//| 'product:export';
declare type ProductViewPermissionsIdsI = 'product:view_enabled' | 'product:view_disabled' | 'product:view_draft';

declare type ProductPermissionsIdsI =
	/* all products */
	ProductGlobalPermissionsIdsI | ProductViewPermissionsIdsI | ProductManagementPermissionsIdsI;
