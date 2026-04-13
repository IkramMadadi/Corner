export const OrdersGlobalPermissions: Record<OrdersGlobalPermissionsIdsI, PermissionsI> = {
	'orders:all': {
		id: 'orders:all',
		name: 'Orders All',
		description: 'Orders All',
		requires: [
			'orders:view',
			'orders:create',
			'orders:edit',
			'orders:view_cancelled',
			'orders:view_delivered',
			'orders:view_pending',
			'orders:view_preparation',
			'orders:view_returned',
			'orders:view_shipped',
			'orders:view_delivery',
			'orders:view_history',
			'orders:view_products',
		],
	},
	'orders:view': {
		id: 'orders:view',
		name: 'Orders View',
		description: 'Orders View',
		requires: [],
	},
};
export const OrdersManagementPermissions: Record<OrdersManagementPermissionsIdsI, PermissionsI> = {
	'orders:create': {
		id: 'orders:create',
		name: 'Orders Create',
		description: 'Orders Create',
		requires: ['orders:view'],
	},

	'orders:edit': {
		id: 'orders:edit',
		name: 'Orders Edit',
		description: 'Orders Edit',
		requires: ['orders:view'],
	},
};
export const OrdersDetailsPermissions: Record<OrdersDetailsPermissionsIdsI, PermissionsI> = {
	'orders:view_all_details': {
		id: 'orders:view_all_details',
		name: "View Order's details",
		description: "View Order's details",
		requires: ['orders:view', 'orders:view_delivery', 'orders:view_history', 'orders:view_products'],
	},
	'orders:view_delivery': {
		id: 'orders:view_delivery',
		name: 'View Orders delivery information',
		description: 'View Orders delivery information',
		requires: ['orders:view'],
	},
	'orders:view_history': {
		id: 'orders:view_history',
		name: "View Order's history",
		description: "View Order's history",
		requires: ['orders:view'],
	},
	'orders:view_products': {
		id: 'orders:view_products',
		name: "View Order's products",
		description: "View Order's products",
		requires: ['orders:view'],
	},
};
export const OrdersActionsPermissions: Record<OrdersActionsPermissionsIdsI, PermissionsI> = {
	'orders:assign_status_cancelled': {
		id: 'orders:assign_status_cancelled',
		name: 'Assign cancelled status',
		description: 'Assign cancelled status',
		requires: ['orders:view'],
	},
	'orders:assign_status_confirmed': {
		id: 'orders:assign_status_confirmed',
		name: 'Assign cancelled status',
		description: 'Assign cancelled status',
		requires: ['orders:view'],
	},
	'orders:assign_status_delivered': {
		id: 'orders:assign_status_delivered',
		name: 'Assign cancelled status',
		description: 'Assign cancelled status',
		requires: ['orders:view'],
	},
	'orders:assign_status_returned': {
		id: 'orders:assign_status_returned',
		name: 'Assign cancelled status',
		description: 'Assign cancelled status',
		requires: ['orders:view'],
	},
	'orders:assign_status_shipped': {
		id: 'orders:assign_status_shipped',
		name: 'Assign cancelled status',
		description: 'Assign cancelled status',
		requires: ['orders:view'],
	},
};
export const OrdersViewsPermissions: Record<OrdersViewsPermissionsIdsI, PermissionsI> = {
	'orders:view_all': {
		id: 'orders:view_all',
		name: 'View all Orders',
		description: 'Can view all Orders no matter their status',
		requires: [
			'orders:view',
			'orders:view_cancelled',
			'orders:view_delivered',
			'orders:view_pending',
			'orders:view_preparation',
			'orders:view_returned',
			'orders:view_shipped',
		],
	},
	'orders:view_cancelled': {
		id: 'orders:view_cancelled',
		name: 'View cancelled orders',
		description: 'View cancelled orders',
		requires: ['orders:view'],
	},
	'orders:view_pending': {
		id: 'orders:view_pending',
		description: 'View pending orders',
		name: 'View pending orders',
		requires: ['orders:view'],
	},
	'orders:view_preparation': {
		id: 'orders:view_preparation',
		description: 'View in preparation orders',
		name: 'View delivered orders',
		requires: ['orders:view'],
	},
	'orders:view_returned': {
		id: 'orders:view_returned',
		description: 'View delivered orders',
		name: 'View delivered orders',
		requires: ['orders:view'],
	},
	'orders:view_shipped': {
		id: 'orders:view_shipped',
		description: 'View Shipped orders',
		name: 'View Shipped orders',
		requires: ['orders:view'],
	},
	'orders:view_delivered': {
		id: 'orders:view_delivered',
		description: 'View delivered orders',
		name: 'View delivered orders',
		requires: ['orders:view'],
	},
};

export const OrdersPermissions: Record<OrdersPermissionsIdsI, PermissionsI> = {
	//Orders Permissions:
	...OrdersGlobalPermissions,
	...OrdersViewsPermissions,
	...OrdersActionsPermissions,
	...OrdersDetailsPermissions,
	...OrdersManagementPermissions,
};
export const OrdersPermissionsD = Object.values(OrdersPermissions);
export const OrdersGlobalPermissionsD = Object.values(OrdersGlobalPermissions);
export const OrdersViewsPermissionsD = Object.values(OrdersViewsPermissions);
export const OrdersActionsPermissionsD = Object.values(OrdersActionsPermissions);
export const OrdersManagementPermissionsD = Object.values(OrdersManagementPermissions);
