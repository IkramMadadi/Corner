interface RoleI<ID = string, P = PermissionsIdsI> extends Optional<WebsiteLinkedI<ID>> {
	name: string;
	permissions: P[];
	description: string;
}

declare interface PublicRoleI<ID = string, P = PermissionsIdsI> extends RoleI<ID, P> {
	_id: ID;
}

declare interface CreateRoleI<ID = string> extends Omit<RoleI<ID>, 'permissions'> {}
declare interface BaseRoleI<ID = string> extends Omit<RoleI<ID>, 'permissions'> {
	_id: ID;
}
declare interface SimpleRoleI<ID = string> extends Omit<RoleI<ID>, 'permissions' | 'description'> {
	_id: ID;
}
declare interface FormRoleI<ID = string> extends BaseRoleI<ID> {
	permissions: Record<BasePermissionsIdsI, boolean>;
}
