import mongoose, {
  type AnyExpression,
  type Expression,
  type FilterQuery,
  type PipelineStage,
  Schema,
  type Types,
} from "mongoose";

import type {
  OrderInstanceMethods,
  OrderModel,
  OrderQueryHelpers,
  OrderSchemaOptions,
  OrderStaticMethods,
  OrderVirtual,
} from "!common/generated/models/Order";
import DeliverySchema from "$common/Delivery";
import OrderStatusHistorySchema from "$common/OrderStatusHistory";
import ProductsCartSchema from "$common/ProductsCart";

import { OrderStatusEnums } from "@common/data/enums/generalEnums";
import { model } from "mongoose";

const required = true;

/* --------------------- Schema --------------------- */
const OrderSchema = new Schema<
  OrderI<SimpleProductI<Types.ObjectId>, Types.ObjectId>,
  OrderModel,
  OrderInstanceMethods,
  OrderQueryHelpers,
  OrderVirtual,
  OrderStaticMethods,
  OrderSchemaOptions
>(
  {
    // schema here
    customer: {
      type: Schema.Types.ObjectId,
      ref: "BaseCustomer",
      required,
    },
    delivery: {
      type: DeliverySchema,
      required,
    },
    products: {
      type: [ProductsCartSchema],
      minlength: [1, "At least one product is required"],
      required,
    },
    totalPrice: {
      type: Number,
      required,
    },
    status: {
      type: String,
      required,
      enum: OrderStatusEnums,
    },
    statusHistory: {
      type: [OrderStatusHistorySchema],
      required,
    },
    website: {
      type: Schema.Types.ObjectId,
      required,
    },
    discount: {
      type: Number,
    },
  },
  { timestamps: true }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */
/* OrderSchema.pre('save', async function (next) {
	try {
	// hook here
		next();
	} catch (err) {
		next(err as Error);
	}
});
 */
/* --------------------- Methods ---------------------  */
OrderSchema.methods.toOptimizedObject = function () {
  const { statusHistory, website, ...order } = JSON.parse(
    JSON.stringify(this.toObject())
  ) as OrderI & TimeStampI & { _id: string };
  return order;
};
/* --------------------- Query Helpers --------------------- */

/* --------------------- static methods --------------------- */
const OrderTableProjection: Record<
  keyof Omit<OrderTableDataI, "createdBy"> | "score",
  AnyExpression | Expression
> = {
  _id: 1,
  createdAt: 1,
  updatedAt: 1,
  website: 1,
  customer: 1,
  delivery: 1,
  products: 1,
  score: 1,
  status: 1,
  totalPrice: 1,
  subTotal: 1,
  discount: 1,
};
export const customerOrderPipeline: PipelineStage.FacetPipelineStage[] = [
  {
    $lookup: {
      from: "customers",
      localField: "customer",
      foreignField: "_id",
      as: "customer",
      pipeline: [
        {
          $project: {
            _id: 1,
            firstName: "$personalInformation.firstName",
            lastName: "$personalInformation.lastName",
            phone: "$phone",
            kind: 1,
          },
        },
      ],
    },
  },
  {
    $unwind: {
      path: "$customer",
      preserveNullAndEmptyArrays: true,
    },
  },
];
export const adminOrderPipeline: PipelineStage.FacetPipelineStage[] = [
  {
    $addFields: {
      // Add a flag to track whether statusHistory was empty initially
      isStatusHistoryEmpty: {
        $cond: [
          {
            $eq: [{ $size: "$statusHistory" }, 0],
          },
          true,
          false,
        ],
      },
    },
  },
  {
    $unwind: {
      path: "$statusHistory",
      preserveNullAndEmptyArrays: true, // Preserve documents with empty statusHistory arrays
    },
  },
  {
    $lookup: {
      from: "users",
      localField: "statusHistory.changedBy",
      foreignField: "_id",
      as: "statusHistory.changedBy",
      pipeline: [
        {
          $project: {
            _id: 1,
            firstName: "$personalInformation.firstName",
            lastName: "$personalInformation.lastName",
            phone: "$phone",
            email: "$email",
          },
        },
      ],
    },
  },
  {
    $unwind: {
      path: "$statusHistory.changedBy",
      preserveNullAndEmptyArrays: true, // Preserve documents where changedBy doesn't exist
    },
  },
  {
    $group: {
      _id: "$_id",
      statusHistory: {
        $push: "$statusHistory", // Rebuild the statusHistory array
      },
      isStatusHistoryEmpty: {
        $first: "$isStatusHistoryEmpty",
      }, // Preserve the empty flag
      otherFields: { $first: "$$ROOT" }, // Preserve other fields
    },
  },
  {
    $replaceRoot: {
      newRoot: {
        $mergeObjects: ["$otherFields", { statusHistory: "$statusHistory" }],
      },
    },
  },
  {
    $addFields: {
      statusHistory: {
        $cond: [
          "$isStatusHistoryEmpty", // If the flag is true, set the array to empty
          [],
          "$statusHistory", // Otherwise, keep the processed array
        ],
      },
    },
  },
  {
    $project: {
      isStatusHistoryEmpty: 0, // Remove the helper field
    },
  },
];
export function dateRangeMatch<T>(
  { endDate, startDate }: DateIntervalQueryI,
  attr = "createdAt"
) {
  const dates = {
    ...(endDate ? { endDate: new Date(Number(endDate)) } : {}),
    ...(startDate ? { startDate: new Date(Number(startDate)) } : {}),
  };

  return (
    dates.startDate || dates.endDate
      ? {
          [attr]: {
            ...(dates.startDate ? { $gte: dates.startDate } : {}),
            ...(dates.endDate ? { $lte: dates.endDate } : {}),
          },
        }
      : {}
  ) as FilterQuery<T>;
}
OrderSchema.statics.getOrdersTableData = async function (
  query,
  website,
  { additionalFilter = {}, productsPopulation = "length" } = {
    additionalFilter: {},
    productsPopulation: "length",
  }
) {
  const {
    page = 1,
    limit = 100,
    sort = "createdAt",
    sortDir = "asc",
    endDate,
    startDate,
  } = query;

  const listPipeline: PipelineStage.FacetPipelineStage[] = [
    {
      $sort: {
        [sort]: sortDir === "asc" ? 1 : -1,
      },
    },
    {
      $skip: (Number(page) - 1) * Number(limit),
    },
    {
      $limit: Number(limit),
    },
    ...customerOrderPipeline,
  ];
  if (productsPopulation === "length")
    listPipeline.push({
      $set: {
        subTotal: {
          $sum: {
            $map: {
              input: "$products",
              as: "product",
              in: {
                $multiply: ["$$product.count", "$$product.product.price"],
              },
            },
          },
        },
        products: {
          $sum: "$products.count",
        },
      },
    });
  listPipeline.push({ $project: OrderTableProjection });

  return (
    await this.aggregate<ListOf<OrderTableDataI>>([
      {
        $match: {
          website: website,
          ...additionalFilter,
          ...dateRangeMatch({ endDate, startDate }),
        },
      },
      {
        $facet: {
          list: listPipeline,
          total: [{ $count: "total" }],
        },
      },
      {
        $project: {
          list: 1,
          total: { $arrayElemAt: ["$total.total", 0] }, // Extract the total number from the array
        },
      },
    ])
  )[0];
};
/* --------------------- Generate Model --------------------- */
const orderModel =
  (mongoose.models.Order as OrderModel) ||
  model<
    OrderI<SimpleProductI<Types.ObjectId>, Types.ObjectId>,
    OrderModel,
    OrderQueryHelpers
  >("Order", OrderSchema);
export default orderModel;
