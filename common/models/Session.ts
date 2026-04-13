import mongoose, {
  PipelineStage,
  Schema,
  type Types,
  model,
} from "mongoose";
import { dateRangeMatch } from "./Order";
import type {
  SessionInstanceMethods,
  SessionModel,
  SessionQueryHelpers,
  SessionSchemaOptions,
  SessionStaticMethods,
  SessionVirtual,
} from "!common/generated/models/Session";

const required = true;

const SessionSchema = new Schema<
  SessionI<Types.ObjectId, Types.ObjectId>,
  SessionModel,
  SessionInstanceMethods,
  SessionQueryHelpers,
  SessionVirtual,
  SessionStaticMethods,
  SessionSchemaOptions
>(
  {
    information: {
      name: { type: String, required: false, default: '' },
      phone: { type: String, required },
    },
    ip: { type: String },
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product", required },
        count: { type: Number, required },
      },
    ],
    done: { type: Boolean, default: false },
    orderId: { type: Schema.Types.ObjectId, ref: "Order" },
  },
  { timestamps: true }
);

SessionSchema.statics.getSessionsTableData = async function (
  query,
  website,
  { additionalFilter = {}, productsPopulation = "display" } = {}
) {
  const {
    page = 1,
    limit = 100,
    sort = "createdAt",
    sortDir = "asc",
    endDate,
    startDate,
  } = query;

  const pipeline: PipelineStage[] = [
    {
      $match: {
        //website: website,
        ...additionalFilter,
        ...dateRangeMatch({ endDate, startDate }),
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "products.product",
        foreignField: "_id",
        as: "productDetails",
        pipeline: [
          {
            $project: {
              _id: 1,
              pricing: 1,
              name: 1,
            }
          }
        ]
      }
    },
    {
      $addFields: {
        subTotal: {
          $sum: {
            $map: {
              input: "$products",
              as: "item",
              in: {
                $let: {
                  vars: {
                    prod: {
                      $arrayElemAt: [
                        {
                          $filter: {
                            input: "$productDetails",
                            cond: { $eq: ["$$this._id", "$$item.product"] }
                          }
                        },
                        0
                      ]
                    }
                  },
                  in: {
                    $multiply: [
                      "$$item.count", 
                      { $ifNull: ["$$prod.pricing.current", 0] }
                    ]
                  }
                }
              }
            }
          }
        },
        productsCount: {
          $sum: "$products.count"
        },
        products: {
          $cond: {
            if: { $eq: [productsPopulation, "full"] },
            then: {
              $map: {
                input: "$products",
                as: "item",
                in: {
                  count: "$$item.count",
                  product: {
                    $let: {
                      vars: {
                        prod: {
                          $arrayElemAt: [
                            {
                              $filter: {
                                input: "$productDetails",
                                cond: { $eq: ["$$this._id", "$$item.product"] }
                              }
                            },
                            0
                          ]
                        }
                      },
                      in: {
                        _id: "$$prod._id",
                        name: "$$prod.name",
                      }
                    }
                  }
                }
              }
            },
            else: {
              $reduce: {
                input: {
                  $map: {
                    input: "$products",
                    as: "item",
                    in: {
                      $let: {
                        vars: {
                          prod: {
                            $arrayElemAt: [
                              {
                                $filter: {
                                  input: "$productDetails",
                                  cond: { $eq: ["$$this._id", "$$item.product"] }
                                }
                              },
                              0
                            ]
                          }
                        },
                        in: {
                          $ifNull: [
                            "$$prod.name.fr",
                            {
                              $ifNull: [
                                "$$prod.name.en",
                                {
                                  $ifNull: [
                                    "$$prod.name.ar",
                                    "Unknown Product"
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      }
                    }
                  }
                },
                initialValue: "",
                in: {
                  $concat: [
                    "$$value",
                    { $cond: [{ $eq: ["$$value", ""] }, "", ", "] },
                    "$$this"
                  ]
                }
              }
            }
          }
        }
      } 
    },
    {
      $project: {
        productDetails: 0
      }
    },
    {
      $facet: {
        list: [
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
          {
            $project: {
              _id: 1,
              createdAt: 1,
              done: 1,
              information: 1,
              ip: 1,
              orderId: 1,
              products: 1,
              productsCount: 1,
              subTotal: 1,
            }
          }
        ],
        total: [{ $count: "total" }],
      },
    },
    {
      $project: {
        list: 1,
        total: { $arrayElemAt: ["$total.total", 0] },
      },
    }
  ];

  const result = await this.aggregate(pipeline as PipelineStage[]);
  return result[0];
};

const Session =
  (mongoose.models.Session as SessionModel) ||
  model<
    SessionI<Types.ObjectId, Types.ObjectId>,
    SessionModel,
    SessionQueryHelpers
  >("Session", SessionSchema);

export default Session;