declare interface OrderStatusHistoryI<ADMIN = string> {
	changedBy: ADMIN;
	status: OrderStatusTypes;
}
