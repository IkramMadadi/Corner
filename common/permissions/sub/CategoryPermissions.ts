export const CategoryGlobalPermissions: Record<CategoryGlobalPermissionsIdsI, PermissionsI> = {
	'category:all': {
		id: 'category:all',
		name: 'Category All',
		description: 'Category All',
		requires: ['category:view', 'category:create', 'category:edit', 'category:delete'],
	},
	'category:view': {
		id: 'category:view',
		name: 'Category View',
		description: 'Category View',
		requires: [],
	},
};

export const CategoryManagementPermissions: Record<CategoryManagementPermissionsIdsI, PermissionsI> = {
	'category:create': {
		id: 'category:create',
		name: 'Category Create',
		description: 'Category Create',
		requires: ['category:view'],
	},
	'category:edit': {
		id: 'category:edit',
		name: 'Category Edit',
		description: 'Category Edit',
		requires: ['category:view'],
	},

	'category:delete': {
		id: 'category:delete',
		name: 'Category Delete',
		description: 'Category Delete',
		requires: ['category:view'],
	},
	'category:enable': {
		id: 'category:enable',
		name: 'Enable Category',
		description: 'Enable Category',
		requires: ['category:view'],
	},
	'category:publish': {
		id: 'category:publish',
		name: 'Publish Category',
		description: 'Publish Category',
		requires: ['category:view'],
	},
	/* 'category:export': {
		id: 'category:export',
		name: 'Category Export',
		description: 'Category Export',
		requires: ['category:view'],
	}, */
};

export const CategoryViewPermissions: Record<CategoryViewPermissionsIdsI, PermissionsI> = {
	'category:view_enabled': {
		id: 'category:view_enabled',
		name: 'View All enabled Categories',
		description: 'View all enabled Categories',
		requires: ['category:view'],
	},
	'category:view_disabled': {
		id: 'category:view_disabled',
		name: 'View All disabled Categories',
		description: 'View all disabled Categories',
		requires: ['category:view'],
	},
	'category:view_draft': {
		id: 'category:view_draft',
		name: 'View All drafted Categories',
		description: 'View all drafted Categories',
		requires: ['category:view', 'category:create'],
	},
};
export const CategoryPermissions: Record<CategoryPermissionsIdsI, PermissionsI> = {
	//Category Permissions:
	...CategoryGlobalPermissions,
	...CategoryViewPermissions,
	...CategoryManagementPermissions,
};
export const CategoryPermissionsD = Object.values(CategoryPermissions);
export const CategoryGlobalPermissionsD = Object.values(CategoryGlobalPermissions);
export const CategoryViewPermissionsD = Object.values(CategoryViewPermissions);
export const CategoryManagementPermissionsD = Object.values(CategoryManagementPermissions);
