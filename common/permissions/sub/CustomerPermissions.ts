export const CustomerManagementPermissions: Record<CustomerManagementPermissionsIdsI, PermissionsI> = {
	'customer:create': {
		id: 'customer:create',
		name: 'Customer Create',
		description: 'Customer Create',
		requires: ['customer:view', 'customer:enable'],
	},
	'customer:enable': {
		id: 'customer:enable',
		name: 'Customer Enable',
		description: 'Customer Enable',
		requires: ['customer:view'],
	},
	'customer:edit': {
		id: 'customer:edit',
		name: 'Customer Edit',
		description: 'Customer Edit',
		requires: ['customer:view'],
	},
	'customer:edit_password': {
		id: 'customer:edit_password',
		name: 'Customer Password',
		description: 'Customer Password',
		requires: ['customer:view', 'customer:edit'],
	},
};

export const CustomerGlobalPermissions: Record<CustomerGlobalPermissionsIdsI, PermissionsI> = {
	// Customer Permissions:
	'customer:all': {
		id: 'customer:all',
		name: 'Customer All',
		description: 'Customer All',
		requires: ['customer:view', 'customer:create', 'customer:enable', 'customer:edit', 'customer:edit_password'],
	},
	'customer:view': {
		id: 'customer:view',
		name: 'Customer View',
		description: 'Customer View',
		requires: [],
	},

	'customer:view_all_customers': {
		id: 'customer:view_all_customers',
		name: 'Customer View All Customers',
		description: 'Customer View all Customers',
		requires: ['customer:view'],
	},
	'customer:view_enabled': {
		id: 'customer:view_enabled',
		name: 'Customer View All Customers',
		description: 'Customer View all Customers',
		requires: ['customer:view'],
	},
	'customer:view_disabled': {
		id: 'customer:view_disabled',
		name: 'Customer View All Customers',
		description: 'Customer View all Customers',
		requires: ['customer:view'],
	},
	'customer:view_guests': {
		id: 'customer:view_guests',
		name: 'View Guests customers',
		description: 'View Guests customers',
		requires: ['customer:view'],
	},
};

export const CustomerPermissions: Record<CustomerPermissionsIdsI, PermissionsI> = {
	...CustomerGlobalPermissions,
	...CustomerManagementPermissions,
};
export const CustomerPermissionsD = Object.values(CustomerPermissions);
export const CustomerGlobalPermissionsD = Object.values(CustomerGlobalPermissions);
export const CustomerManagementPermissionsD = Object.values(CustomerManagementPermissions);
