const { Order } = require("../../../model/order/orderModel");
const { Product } = require("../../../model/product/productModel");
const { User } = require("../../../model/user/userModel");
const appStatus = require("../../../utils/appStatus");
const { tryCatch } = require("../../../utils/tryCatch");

const dashBoard = tryCatch(async (req, res, next) => {
  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);
  const endDate = new Date();
  endDate.setHours(23, 59, 59, 999);
  /#### view user #####/;
  /#### view product #####/;
  const [order, allOrder, user, product] = await Promise.all([
    // Fetch orders created within the current day
    Order.find({
      createdAt: { $gte: startDate, $lte: endDate },
    })
      .populate({
        path: "product_list.p_ref",
        model: "Product",
        select: "title sku brand category price discount thumb",
      })
      .exec(),
    Order.find({}).exec(),

    // Aggregate users by role
    User.find({}).exec(),

    // Aggregate products by category
    Product.aggregate([
      {
        $group: {
          _id: "$category",
          totalProducts: { $sum: 1 },
          averagePrice: { $avg: "$price" },
          totalStock: { $sum: "$stock" },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          totalProducts: 1,
          averagePrice: { $round: ["$averagePrice", 2] },
          totalStock: 1,
        },
      },
      {
        $sort: { totalProducts: -1 },
      },
    ]).exec(),
  ]);

  appStatus(200, { order, allOrder, user, product }, req, res, next);
});
module.exports = { dashBoard };
