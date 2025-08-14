const express = require("express");
const {
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
} = require("../../../controller/order/orderController");
const { isOurCustomer } = require("../../../../middleware/isUserExist");
const { ifCache, setCache } = require("../../../../middleware/cache");
const { stockChecker } = require("../../../../middleware/stockChecker");
const _ = express.Router();
_.post("/", stockChecker, isOurCustomer, newOrder);
_.post("/mail", confirmMail);
//?req.body=first_name last_name , other order fields
_.get("/:id", getInvoice);

_.get("/", ifCache, getOrderBy, setCache);

//? req.query=  customer_name, customer_eamil, customer_phone, payment_status, oder_status,date, fields,sortBy=last_two,latest,oldest
_.patch("/addProduct/:id", addProduct);
_.patch("/removeProduct/:id", removeProduct);
_.delete("/", deleteMany); //?req.body= idList of Order ids
_.patch("/:_id", oderUpdate);
_.post("/update-array", orderUPdateArray);
_.patch("/updateOrder/:_id", newOrderUpdate);

module.exports = _;
