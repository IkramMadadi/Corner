declare type CollectionGlobalPermissionsIdsI = 'collection:all' | 'collection:view';

declare type CollectionManagementPermissionsIdsI =
	| 'collection:create'
	| 'collection:edit'
	| 'collection:enable'
	| 'collection:publish'
	| 'collection:delete';
//| 'collection:export';
declare type CollectionViewPermissionsIdsI =
	| 'collection:view_enabled'
	| 'collection:view_disabled'
	| 'collection:view_draft';

declare type CollectionPermissionsIdsI =
	/* all categories */
	CollectionGlobalPermissionsIdsI | CollectionViewPermissionsIdsI | CollectionManagementPermissionsIdsI;
