export const CollectionGlobalPermissions: Record<CollectionGlobalPermissionsIdsI, PermissionsI> = {
	'collection:all': {
		id: 'collection:all',
		name: 'Collection All',
		description: 'Collection All',
		requires: ['collection:view', 'collection:create', 'collection:edit', 'collection:delete'],
	},
	'collection:view': {
		id: 'collection:view',
		name: 'Collection View',
		description: 'Collection View',
		requires: [],
	},
};

export const CollectionManagementPermissions: Record<CollectionManagementPermissionsIdsI, PermissionsI> = {
	'collection:create': {
		id: 'collection:create',
		name: 'Collection Create',
		description: 'Collection Create',
		requires: ['collection:view'],
	},
	'collection:edit': {
		id: 'collection:edit',
		name: 'Collection Edit',
		description: 'Collection Edit',
		requires: ['collection:view'],
	},

	'collection:delete': {
		id: 'collection:delete',
		name: 'Collection Delete',
		description: 'Collection Delete',
		requires: ['collection:view'],
	},
	'collection:enable': {
		id: 'collection:enable',
		name: 'Enable Collection',
		description: 'Enable Collection',
		requires: ['collection:view'],
	},
	'collection:publish': {
		id: 'collection:publish',
		name: 'Publish Collection',
		description: 'Publish Collection',
		requires: ['collection:view'],
	},
	/* 'collection:export': {
		id: 'collection:export',
		name: 'Collection Export',
		description: 'Collection Export',
		requires: ['collection:view'],
	}, */
};

export const CollectionViewPermissions: Record<CollectionViewPermissionsIdsI, PermissionsI> = {
	'collection:view_enabled': {
		id: 'collection:view_enabled',
		name: 'View All enabled Collections',
		description: 'View all enabled Collections',
		requires: ['collection:view'],
	},
	'collection:view_disabled': {
		id: 'collection:view_disabled',
		name: 'View All disabled Collections',
		description: 'View all disabled Collections',
		requires: ['collection:view'],
	},
	'collection:view_draft': {
		id: 'collection:view_draft',
		name: 'View All drafted Collections',
		description: 'View all drafted Collections',
		requires: ['collection:view', 'collection:create'],
	},
};
export const CollectionPermissions: Record<CollectionPermissionsIdsI, PermissionsI> = {
	//Collection Permissions:
	...CollectionGlobalPermissions,
	...CollectionViewPermissions,
	...CollectionManagementPermissions,
};
export const CollectionPermissionsD = Object.values(CollectionPermissions);
export const CollectionGlobalPermissionsD = Object.values(CollectionGlobalPermissions);
export const CollectionViewPermissionsD = Object.values(CollectionViewPermissions);
export const CollectionManagementPermissionsD = Object.values(CollectionManagementPermissions);
