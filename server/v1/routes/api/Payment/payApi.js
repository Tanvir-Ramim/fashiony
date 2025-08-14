const express = require("express");
const {
  sslOrder,
  sslSuccess,
  sslCancel,
  sslfail,
  getMySSL,
} = require("../../../controller/payment/paymentController");
const _ = express.Router();
_.post("/:_id", sslOrder);
_.post("/success/:tran_id", sslSuccess);
_.post("/cancel/:tran_id", sslCancel);
_.post("/fail/:tran_id", sslfail);

module.exports = _;
