const {
  Unauthorized,
  NotAcceptable,
  NotFoundError,
} = require("../../../error/customError");
const { Order } = require("../../../model/order/orderModel");
const { Product } = require("../../../model/product/productModel");
const appStatus = require("../../../utils/appStatus");
const { tryCatch } = require("../../../utils/tryCatch");
const { User } = require("../../../model/user/userModel");
const { Shipping } = require("../../../model/shipping/shipModel");
const { sendConfirmationEmail } = require("../../../utils/confirmMail");
const { Coupon } = require("../../../model/coupon/couponModel");
//### order Placed ###########
const newOrder = tryCatch(async (req, res, next) => {
  const customer_ref = req.customer_ref;

  if (!customer_ref) {
    return next(new NotAcceptable("Customer reference is required"));
  }

  const data = req.body;

  const new_order = new Order({
    ...data,
    customer_ref,
  });

  const save_order = await new_order.save();

  if (save_order.applied_coupon.isAppied) {
    await Coupon.findOneAndUpdate(
      { code: save_order.applied_coupon.code },
      { $inc: { usage_count: 1 } },
      { new: true }
    );
  }

  if (!save_order) {
    return next(new NotAcceptable("Order could not be saved"));
  }

  return appStatus(201, save_order, req, res, next);
});

//### order get ,filter ,search ###########

const getOrderBy = tryCatch(async (req, res, next) => {
  const {
    customer_name,
    customer_eamil,
    customer_phone,
    payment_status,
    oder_status,
    invoice_id,
    sortBy,
    date,
    fields,
    sku,
  } = req.query;
  console.log(sku);
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const math = fields
    ? fields
        .split(",")
        .map((field) => field.trim())
        .join(" ")
    : "";
  let searchQuery = {};
  if (sku !== undefined && sku !== "") {
    searchQuery["product_list.sku"] = reg(sku); // Use the nested path to search for sku
  }
  if (typeof date === "string" && date !== undefined && date !== "") {
    let startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    let endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);
    searchQuery = {
      createdAt: { $gte: startDate, $lte: endDate },
    };
  }
  if (customer_name !== undefined && customer_name !== "") {
    searchQuery.customer_name = reg(customer_name);
  }
  if (invoice_id !== undefined && invoice_id !== "") {
    searchQuery.invoice_id = reg(invoice_id);
  }
  if (customer_eamil !== undefined && customer_eamil !== "") {
    // console.log("customer_eamil");
    searchQuery.customer_eamil = reg(customer_eamil);
  }
  // console.log(customer_phone);
  if (customer_phone !== undefined && customer_phone !== "") {
    // console.log("customer_phone");
    searchQuery.customer_phone = reg(customer_phone);
  }
  if (oder_status !== undefined && oder_status !== "") {
    searchQuery.oder_status = reg(oder_status);
  }
  if (payment_status !== undefined && payment_status !== "") {
    searchQuery.payment_status = reg(payment_status);
  }

  const sortOptions = {};
  if (sortBy !== undefined && sortBy !== "") {
    if (sortOptions === "last_two") {
      const currentDate = new Date();
      const lastTwoDays = new Date();
      lastTwoDays.setDate(lastTwoDays.getDate() - 28);

      searchQuery = {
        createdAt: {
          $gte: lastTwoDays,
          $lte: currentDate,
        },
      };
    }
    if (sortBy === "latest") {
      sortOptions.createdAt = -1;
    }
    if (sortBy === "oldest") {
      sortOptions.createdAt = 1;
    }
  }

  const options = {
    page: page,
    limit: limit,
    select: math,
    lean: true,
    sort: sortOptions,

    populate: {
      path: "product_list.p_ref",
      model: "Product",
      select: "title sku brand category price discount url oder_status",
      lean: true,
    },
  };

  const orderByquery = await Order.paginate(searchQuery, options);
  const paginate = {
    totalDocs: orderByquery.totalDocs,
    limit: orderByquery.limit,
    totalPages: orderByquery.totalPages,
    page: orderByquery.page,
    pagingCounter: orderByquery.pagingCounter,
    hasPrevPage: orderByquery.hasPrevPage,
    hasNextPage: orderByquery.hasNextPage,
    prevPage: orderByquery.prevPage,
    nextPage: orderByquery.nextPage,
  };
  if (!orderByquery || orderByquery.length === 0) {
    return next(appError(404, "Not Found"));
  }
  res.locals.data = { orderByquery, paginate };
  next();
});

//### many delete ###########
const deleteMany = tryCatch(async (req, res, next) => {
  const { idList } = req.body;

  const result = await Order.deleteMany({ _id: { $in: idList } });

  if (result.deletedCount === 0) {
    return next(new NotFoundError("No orders found to delete."));
  }
  appStatus(204, "", req, res, next);
});

//### update order#####
const oderUpdate = tryCatch(async (req, res, next) => {
  const _id = req.params._id;
  const updateData = req.body;

  // Fetch the current order details
  const query = await Order.findById(_id);
  if (!query) {
    return next(appError(404, "Order not found"));
  }

  // Prevent redundant updates for the same status
  if (
    updateData.oder_status === query.oder_status ||
    updateData.payment_status === query.payment_status
  ) {
    return next(appError(400, "The same status already exists."));
  }

  // Update the order
  const checkOrder = await Order.findByIdAndUpdate(_id, updateData, {
    new: true,
  });
  if (!checkOrder) {
    return next(appError(404, "Order update failed."));
  }

  // ########## Update stock when order is shifted or payment is paid ##########
  // console.log(checkOrder);
  if (["Shifted"].includes(checkOrder.oder_status)) {
    // Check for transition to a valid state
    if (query.oder_status !== "Shifted") {
      console.log("2");
      for (const { p_ref, quantity, size } of checkOrder.product_list) {
        await Product.findOneAndUpdate(
          { _id: p_ref, "size.name": size },
          { $inc: { "size.$.stock": -quantity, total_stock: -quantity } },
          { new: true }
        );
      }
    }

    // Add the order to the user's order list
    await User.findByIdAndUpdate(
      checkOrder.customer_ref,
      {
        $push: { order_list: checkOrder._id },
      },
      { new: true }
    );
  }

  // ########## Handle order cancellation ##########

  if (
    ["Canceled"].includes(checkOrder.oder_status)
    // checkOrder.oder_status!=="Shifted" ||
  ) {
    // Restore stock when transitioning to "Canceled"
    if (query.oder_status === "Shifted") {
      for (const { p_ref, quantity, size } of checkOrder.product_list) {
        await Product.findOneAndUpdate(
          { _id: p_ref, "size.name": size },
          { $inc: { "size.$.stock": +quantity, total_stock: +quantity } }, // Increase stock
          { new: true }
        );
      }
      checkOrder.is_disable = true;
      await checkOrder.save();
    }
  }

  // Respond with success
  appStatus(204, "", req, res, next);
});

//newUpdate Order For  Customer Info
const newOrderUpdate = tryCatch(async (req, res, next) => {
  const _id = req.params._id;
  const updateData = req.body;
  const { customer_name, customer_phone, city, address } = updateData || {};
  const query = await Order.findById(_id);
  if (!query) {
    return next(appError(404, "Order not found"));
  }

  const lib = {};
  const shippingCost = await Shipping.findById("66d6901edd7ae94ed1d08436");

  if (query.city !== city) {
    if (city.toLowerCase() === "dhaka") {
      lib.shipping = shippingCost.in_dhaka;
      lib.total_price = query.offer_price + shippingCost.in_dhaka;
    } else {
      lib.shipping = shippingCost.out_dhaka;
      lib.total_price = query.offer_price + shippingCost.out_dhaka;
    }
  }

  if (customer_name !== "") {
    lib.customer_name = customer_name;
  }
  if (customer_phone !== "") {
    lib.customer_phone = customer_phone;
  }
  if (city !== "") {
    lib.city = city;
  }
  if (address !== "") {
    lib.address = address;
  }

  // Update the order
  const updateOrder = await Order.findByIdAndUpdate(_id, lib, {
    new: true,
  });
  if (!updateOrder) {
    return next(appError(404, "Order Update Failed"));
  }
  // Respond with success
  appStatus(204, updateOrder, req, res, next);
});

//##### invoice #########
const getInvoice = tryCatch(async (req, res, next) => {
  const { id } = req.params;
  const inv = await Order.findById(id).populate({
    path: "product_list.p_ref",
    model: "Product",
  });

  if (!inv) {
    return next(new NotFoundError("Try AGain"));
  }
  appStatus(200, inv, req, res, next);
});

const addProduct = tryCatch(async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  const { productId, size, quantity, sku } = data;
  const findProduct = await Product.findById(productId);
  if (!findProduct) {
    return next(new Error("Product not found"));
  }
  const regularPrice = findProduct.price;
  const discountPrice = findProduct.discount;
  const offerPrice = findProduct.offer_price;

  const updateOrder = await Order.findById(id);
  if (!updateOrder) {
    return next(new Error("Order not found"));
  }

  const existingProduct = updateOrder.product_list.find(
    (product) => product.size === size && product.p_ref.toString() === productId
  );

  if (existingProduct) {
    existingProduct.quantity += quantity;
    updateOrder.regular_price += regularPrice * quantity;
    updateOrder.discount_price += discountPrice * quantity;
    updateOrder.offer_price += offerPrice * quantity;
    updateOrder.total_price += offerPrice * quantity;
  } else {
    const newProduct = {
      p_ref: productId,
      quantity,
      size,
      sku,
      color: data.color || "",
    };
    updateOrder.product_list.push(newProduct);

    updateOrder.regular_price += regularPrice * quantity;
    updateOrder.discount_price += discountPrice * quantity;
    updateOrder.offer_price += offerPrice * quantity;
    updateOrder.total_price += offerPrice * quantity;
  }
  await updateOrder.save();
  if (updateOrder.oder_status === "Shifted") {
    for (const { p_ref, quantity, size } of updateOrder.product_list) {
      await Product.findOneAndUpdate(
        { _id: p_ref, "size.name": size },
        { $inc: { "size.$.stock": -quantity, total_stock: -quantity } },
        { new: true }
      );
    }
  }

  appStatus(204, updateOrder, req, res, next);
});
const removeProduct = tryCatch(async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  console.log({ id });
  console.log({ data });
  const updateOrder = await Order.findById(id);
  if (!updateOrder) {
    return next(new Error("Order not found"));
  }

  updateOrder.product_list = updateOrder.product_list.filter(
    (product) => product._id.toString() !== data._id
  );

  updateOrder.regular_price -= data.p_ref.price * data.quantity;
  updateOrder.discount_price -= data.p_ref.discount * data.quantity;
  updateOrder.offer_price -= data.p_ref.offer_price * data.quantity;
  updateOrder.total_price -= data.p_ref.offer_price * data.quantity;
  await updateOrder.save();
  if (updateOrder.oder_status === "Shifted") {
    for (const { p_ref, quantity, size } of updateOrder.product_list) {
      await Product.findOneAndUpdate(
        { _id: p_ref, "size.name": size },
        { $inc: { "size.$.stock": +quantity, total_stock: +quantity } },
        { new: true }
      );
    }
  }

  appStatus(204, updateOrder, req, res, next);
});

const confirmMail = tryCatch(async (req, res, next) => {
  const { email, orderId } = req.body;
  const order = await Order.findById(orderId)
    .populate({
      path: "product_list.p_ref",
      model: "Product",
    })
    .lean();
  if (!email || !order) {
    return res
      .status(400)
      .json({ error: "Email and order details are required." });
  }

  await sendConfirmationEmail(email, order);
  res.status(200).json({ message: "Confirmation email sent successfully." });
});

const orderUPdateArray = tryCatch(async (req, res, next) => {
  const { selectedOrders, status } = req.body;
  console.log(selectedOrders, status);

  for (const x of selectedOrders) {
    const query = await Order.findById(x);
    if (!query) {
      return next(appError(404, "Order not found"));
    }

    // Update the order
    const checkOrder = await Order.findByIdAndUpdate(
      x,
      { oder_status: status },
      {
        new: true,
      }
    );
    if (!checkOrder) {
      return next(appError(404, "Order update failed."));
    }

    // ########## Update stock when order is shifted or payment is paid ##########
    // console.log(checkOrder);
    if (["Shifted"].includes(checkOrder.oder_status)) {
      // Check for transition to a valid state
      if (query.oder_status !== "Shifted") {
        console.log("2");
        for (const { p_ref, quantity, size } of checkOrder.product_list) {
          await Product.findOneAndUpdate(
            { _id: p_ref, "size.name": size },
            { $inc: { "size.$.stock": -quantity, total_stock: -quantity } },
            { new: true }
          );
        }
      }

      // Add the order to the user's order list
      await User.findByIdAndUpdate(
        checkOrder.customer_ref,
        {
          $push: { order_list: checkOrder._id },
        },
        { new: true }
      );
    }

    // ########## Handle order cancellation ##########

    if (
      ["Canceled"].includes(checkOrder.oder_status)

      // checkOrder.oder_status!=="Shifted" ||
    ) {
      // Restore stock when transitioning to "Canceled"
      if (query.oder_status === "Shifted") {
        for (const { p_ref, quantity, size } of checkOrder.product_list) {
          await Product.findOneAndUpdate(
            { _id: p_ref, "size.name": size },
            {
              $inc: { "size.$.stock": +quantity, total_stock: +quantity },
            }, // Increase stock
            { new: true }
          );
        }
        checkOrder.is_disable = true;
        await checkOrder.save();
      }
    }
  }

  res.status(204).json({ message: "Successfully Update" });
});

module.exports = {
  newOrder,
  getOrderBy,
  deleteMany,
  oderUpdate,
  getInvoice,
  newOrderUpdate,
  orderUPdateArray,
  addProduct,
  removeProduct,
  confirmMail,
};

// regex
const reg = (shr) => {
  const regexQuery = new RegExp(shr, "i");

  return regexQuery;
};
