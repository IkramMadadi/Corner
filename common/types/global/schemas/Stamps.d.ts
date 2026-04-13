declare interface TimeStampI<T extends string | Date | number = string> {
	createdAt: T;
	updatedAt: T;
}
declare interface ExpireStampI {
	deleteAt: Date;
}
