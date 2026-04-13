import { rolesEmitter } from '@common/events/roles';
import mongoose, { model, Schema, type Types } from 'mongoose';

import type {
	RoleInstanceMethods,
	RoleModel,
	RoleQueryHelpers,
	RoleSchemaOptions,
	RoleStaticMethods,
	RoleVirtual,
} from '!common/generated/models/Role';

import { PermissionsIds } from '@common/permissions/Permissions';

const required = true;
const unique = true;

/* --------------------- Schema --------------------- */
const RoleSchema = new Schema<
	RoleI<Types.ObjectId>,
	RoleModel,
	RoleInstanceMethods,
	RoleQueryHelpers,
	RoleVirtual,
	RoleStaticMethods,
	RoleSchemaOptions
>(
	{
		// schema here
		name: { type: String, required, unique },
		description: { type: String, required },
		permissions: { type: [{ type: String, enum: PermissionsIds }], required },
		website: { type: Schema.Types.ObjectId, ref: 'Website' },
	},
	{ timestamps: true }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */
/* RoleSchema.pre('save', async function (next) {
	try {
	// hook here
		next();
	} catch (err) {
		next(err as Error);
	}
});
 */

RoleSchema.post('save', function (doc) {
	console.log(`role created event: ${doc}`);
	// Emit the role creation event
	if (this.isNew) rolesEmitter.emit('roleCreated', doc);
	else rolesEmitter.emit('roleUpdated', doc);
});

/* RoleSchema.post('deleteOne', { document: true, query: false }, doc => {
	// Emit an event after deleting a document
	rolesEmitter.emit('roleDeleted', doc._id.toString());
}); */
/* --------------------- Methods ---------------------  */
RoleSchema.methods.toOptimizedObject = function () {
	const obj = this.toObject();
	return {
		_id: obj._id.toString(),
		description: obj.description,
		name: obj.name,
		permissions: obj.permissions,
		website: obj.website?.toString(),
	};
};
RoleSchema.methods.toBaseObject = function () {
	const obj = this.toObject();
	return {
		_id: obj._id.toString(),
		description: obj.description,
		name: obj.name,
		website: obj.website?.toString(),
	};
};
RoleSchema.methods.toSimpleObject = function () {
	const obj = this.toObject();
	return {
		_id: obj._id.toString(),
		name: obj.name,
		website: obj.website?.toString(),
	};
};
/* --------------------- Query Helpers --------------------- */

/* --------------------- static methods --------------------- */

/* --------------------- Generate Model --------------------- */
const roleModel =
	(mongoose.models.Role as RoleModel) ||
	model<RoleI<Types.ObjectId>, RoleModel, RoleQueryHelpers>('Role', RoleSchema);
export default roleModel;
