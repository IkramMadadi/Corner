declare type OrdersGlobalPermissionsIdsI = 'orders:all' | 'orders:view';
declare type OrdersManagementPermissionsIdsI = 'orders:create' | 'orders:edit';
declare type OrdersDetailsPermissionsIdsI =
	| 'orders:view_all_details'
	| 'orders:view_history'
	| 'orders:view_products'
	| 'orders:view_delivery';
declare type OrdersViewsPermissionsIdsI =
	| 'orders:view_all'
	| 'orders:view_pending'
	| 'orders:view_preparation'
	| 'orders:view_shipped'
	| 'orders:view_delivered'
	| 'orders:view_cancelled'
	| 'orders:view_returned';

declare type OrdersActionsPermissionsIdsI =
	/* orders actions */
	| 'orders:assign_status_confirmed'
	| 'orders:assign_status_shipped'
	| 'orders:assign_status_delivered'
	| 'orders:assign_status_cancelled'
	| 'orders:assign_status_returned';
/* orders */
declare type OrdersPermissionsIdsI =
	| OrdersGlobalPermissionsIdsI
	| OrdersViewsPermissionsIdsI
	| OrdersActionsPermissionsIdsI
	| OrdersDetailsPermissionsIdsI
	| OrdersManagementPermissionsIdsI;
