export const BlogGlobalPermissions: Record<BlogGlobalPermissionsIdsI, PermissionsI> = {
	'blog:all': {
		id: 'blog:all',
		name: 'Blog All',
		description: 'Blog All',
		requires: ['blog:view', 'blog:create', 'blog:edit', 'blog:delete'],
	},
	'blog:view': {
		id: 'blog:view',
		name: 'Blog View',
		description: 'Blog View',
		requires: [],
	},
};

export const BlogManagementPermissions: Record<BlogManagementPermissionsIdsI, PermissionsI> = {
	'blog:create': {
		id: 'blog:create',
		name: 'Blog Create',
		description: 'Blog Create',
		requires: ['blog:view'],
	},
	'blog:edit': {
		id: 'blog:edit',
		name: 'Blog Edit',
		description: 'Blog Edit',
		requires: ['blog:view'],
	},

	'blog:delete': {
		id: 'blog:delete',
		name: 'Blog Delete',
		description: 'Blog Delete',
		requires: ['blog:view'],
	},
	'blog:enable': {
		id: 'blog:enable',
		name: 'Enable Blog',
		description: 'Enable Blog',
		requires: ['blog:view'],
	},
	'blog:publish': {
		id: 'blog:publish',
		name: 'Publish Blog',
		description: 'Publish Blog',
		requires: ['blog:view'],
	},
	/* 'blog:export': {
		id: 'blog:export',
		name: 'Blog Export',
		description: 'Blog Export',
		requires: ['blog:view'],
	}, */
};

export const BlogViewPermissions: Record<BlogViewPermissionsIdsI, PermissionsI> = {
	'blog:view_enabled': {
		id: 'blog:view_enabled',
		name: 'View All enabled Blogs',
		description: 'View all enabled Blogs',
		requires: ['blog:view'],
	},
	'blog:view_disabled': {
		id: 'blog:view_disabled',
		name: 'View All disabled Blogs',
		description: 'View all disabled Blogs',
		requires: ['blog:view'],
	},
	'blog:view_draft': {
		id: 'blog:view_draft',
		name: 'View All drafted Blogs',
		description: 'View all drafted Blogs',
		requires: ['blog:view', 'blog:create'],
	},
};
export const BlogPermissions: Record<BlogPermissionsIdsI, PermissionsI> = {
	//Blog Permissions:
	...BlogGlobalPermissions,
	...BlogViewPermissions,
	...BlogManagementPermissions,
};
export const BlogPermissionsD = Object.values(BlogPermissions);
export const BlogGlobalPermissionsD = Object.values(BlogGlobalPermissions);
export const BlogViewPermissionsD = Object.values(BlogViewPermissions);
export const BlogManagementPermissionsD = Object.values(BlogManagementPermissions);
