import mongoose, { type AnyExpression, type Expression, model, Schema, type Types } from 'mongoose';

import type {
	BaseCustomerInstanceMethods,
	BaseCustomerModel,
	BaseCustomerQueryHelpers,
	BaseCustomerSchemaOptions,
	BaseCustomerStaticMethods,
	BaseCustomerVirtual,
} from '!common/generated/models/BaseCustomer';
import { personalInformationSchema } from '$common/PersonalInformation';

const required = true;
/* --------------------- Schema --------------------- */
const BaseCustomerSchema = new Schema<
	BaseCustomerI<Types.ObjectId>,
	BaseCustomerModel,
	BaseCustomerInstanceMethods,
	BaseCustomerQueryHelpers,
	BaseCustomerVirtual,
	BaseCustomerStaticMethods,
	BaseCustomerSchemaOptions
>(
	{
		personalInformation: {
			type: personalInformationSchema,
			required,
		},
		phone: {
			type: String,
			required,
			trim: true,
		},
		website: {
			type: Schema.Types.ObjectId,
			required,
		},
		kind: {
			type: String,
			required,
		},
	},
	{ timestamps: true, discriminatorKey: 'kind', collection: 'Customers' }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */

/* --------------------- Methods ---------------------  */
BaseCustomerSchema.methods.toOptimizedObject = function () {
	const customer = this.toObject();
	return {
		...customer,
		_id: customer._id.toString(),
		website: customer.website.toString(),
		createdAt: customer.createdAt.toString(),
		updatedAt: customer.updatedAt.toString(),
	};
};
/* --------------------- Query Helpers --------------------- */

/* --------------------- static methods --------------------- */
const CustomerTableProjection: Record<keyof CustomerTableDataI, AnyExpression | Expression> = {
	_id: 1,
	createdAt: 1,
	updatedAt: 1,
	website: 1,
	kind: 1,
	personalInformation: 1,
	phone: 1,
	enabled: 1,
	email: 1,
	orders: 1,
};
BaseCustomerSchema.statics.getBaseCustomersTableData = async function (
	query,
	website,
	{ additionalFilter = {}, kind } = { additionalFilter: {} }
) {
	const { page = 1, limit = 100, sort = 'createdAt', sortDir = 'asc' } = query;

	return (
		await this.aggregate<ListOf<CustomerTableDataI>>([
			{
				$match: {
					website: website,
					...additionalFilter,
					...(kind ? { kind } : {}),
				},
			},
			{
				$facet: {
					list: [
						{
							$lookup: {
								from: 'orders',
								localField: '_id',
								foreignField: 'customer',
								as: 'orders',
								pipeline: [{ $project: { _id: 1 } }],
							},
						},
						{ $set: { orders: { $size: '$orders' } } },
						{ $sort: { [sort]: sortDir === 'asc' ? 1 : -1 } },
						{ $skip: (Number(page) - 1) * Number(limit) },
						{ $limit: Number(limit) },
						{ $project: CustomerTableProjection },
					],
					total: [{ $count: 'total' }],
				},
			},
			{
				$project: {
					list: 1,
					total: { $arrayElemAt: ['$total.total', 0] }, // Extract the total number from the array
				},
			},
		])
	)[0];
};
/* --------------------- Generate Model --------------------- */
const baseCustomerModel =
	(mongoose.models.BaseCustomer as BaseCustomerModel) ||
	model<BaseCustomerI<Types.ObjectId>, BaseCustomerModel, BaseCustomerQueryHelpers>(
		'BaseCustomer',
		BaseCustomerSchema,
		'customers'
	);
export default baseCustomerModel;
