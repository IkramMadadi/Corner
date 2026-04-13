declare type BlogGlobalPermissionsIdsI = 'blog:all' | 'blog:view';

declare type BlogManagementPermissionsIdsI =
	| 'blog:create'
	| 'blog:edit'
	| 'blog:enable'
	| 'blog:publish'
	| 'blog:delete';
//| 'blog:export';
declare type BlogViewPermissionsIdsI = 'blog:view_enabled' | 'blog:view_disabled' | 'blog:view_draft';

declare type BlogPermissionsIdsI =
	/* all blogs */
	BlogGlobalPermissionsIdsI | BlogViewPermissionsIdsI | BlogManagementPermissionsIdsI;
