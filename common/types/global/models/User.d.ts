declare interface UserI {
	//profilePicture?: string;
	personalInformation: PersonalInformationI;
	//username: string;
	email: string;
	phone: string;
	password: string;
}
declare interface OptimizedUserI extends Omit<UserI, 'password'> {
	_id: string;
	emailValidated: boolean;
}
declare interface PublicUserI<WEBSITE = string> extends OptimizedUserI {
	websitesPermissions: WebSitePermissionsI<WEBSITE>[];
}
declare interface NecessaryUserI extends Omit<UserI, 'password'> {
	_id: string;
}
declare interface AppDetailsI {
	id: string;
	username?: string;
}
declare type EnabledUserAppsEnum = 'google';
declare type DisabledUserAppsEnum = 'facebook' | 'twitter' | 'github';
declare type UserAppsEnum = EnabledUserAppsEnum | DisabledUserAppsEnum;
declare type EnabledUserAppsI<T = string> = Record<EnabledUserAppsEnum, T>;
declare type DisabledUserAppsI<T = string> = Record<DisabledUserAppsEnum, T>;
declare type UserAppsI<T = string> = EnabledUserAppsI<T> & DisabledUserAppsI<T>;
declare interface UserDocumentI<ID = string> extends UserI {
	contactInformation: ContactInformationI;
	enabled: boolean;
	lastLogin?: Date | string;
	/* apps: Partial<EnabledUserAppsI<AppDetailsI>>; */
	roles: ID[];
}
declare interface AdminDocumentI<ID = string, ROLES = ID> extends UserDocumentI<ROLES>, TimeStampI {
	_id: ID;
}
declare interface PublicAdminI<ID = string, ROLES = ID> extends Omit<AdminDocumentI<ID, ROLES>, 'password'> {}
declare interface AdminTableDataI
	extends Omit<AdminDocumentI, 'password' | 'profilePicture' | 'roles' | 'contactInformation'> {
	roles: SimpleRoleI[];
}
declare type UserSortableFields =
	| 'createdAt'
	| 'enabled'
	| 'personalInformation.firstName'
	| 'personalInformation.lastName'
	| 'lastLogin';
