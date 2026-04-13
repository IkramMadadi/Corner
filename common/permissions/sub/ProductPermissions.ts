export const ProductGlobalPermissions: Record<ProductGlobalPermissionsIdsI, PermissionsI> = {
	'product:all': {
		id: 'product:all',
		name: 'Product All',
		description: 'Product All',
		requires: ['product:view', 'product:create', 'product:edit', 'product:delete'],
	},
	'product:view': {
		id: 'product:view',
		name: 'Product View',
		description: 'Product View',
		requires: [],
	},
};

export const ProductManagementPermissions: Record<ProductManagementPermissionsIdsI, PermissionsI> = {
	'product:create': {
		id: 'product:create',
		name: 'Product Create',
		description: 'Product Create',
		requires: ['product:view'],
	},
	'product:edit': {
		id: 'product:edit',
		name: 'Product Edit',
		description: 'Product Edit',
		requires: ['product:view'],
	},

	'product:delete': {
		id: 'product:delete',
		name: 'Product Delete',
		description: 'Product Delete',
		requires: ['product:view'],
	},
	'product:enable': {
		id: 'product:enable',
		name: 'Enable Product',
		description: 'Enable Product',
		requires: ['product:view'],
	},
	'product:publish': {
		id: 'product:publish',
		name: 'Publish Product',
		description: 'Publish Product',
		requires: ['product:view'],
	},
	/* 'product:export': {
		id: 'product:export',
		name: 'Product Export',
		description: 'Product Export',
		requires: ['product:view'],
	}, */
};

export const ProductViewPermissions: Record<ProductViewPermissionsIdsI, PermissionsI> = {
	'product:view_enabled': {
		id: 'product:view_enabled',
		name: 'View All enabled Products',
		description: 'View all enabled Products',
		requires: ['product:view'],
	},
	'product:view_disabled': {
		id: 'product:view_disabled',
		name: 'View All disabled Products',
		description: 'View all disabled Products',
		requires: ['product:view'],
	},
	'product:view_draft': {
		id: 'product:view_draft',
		name: 'View All drafted Products',
		description: 'View all drafted Products',
		requires: ['product:view', 'product:create'],
	},
};
export const ProductPermissions: Record<ProductPermissionsIdsI, PermissionsI> = {
	//Product Permissions:
	...ProductGlobalPermissions,
	...ProductViewPermissions,
	...ProductManagementPermissions,
};
export const ProductPermissionsD = Object.values(ProductPermissions);
export const ProductGlobalPermissionsD = Object.values(ProductGlobalPermissions);
export const ProductViewPermissionsD = Object.values(ProductViewPermissions);
export const ProductManagementPermissionsD = Object.values(ProductManagementPermissions);
