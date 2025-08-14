const express = require("express");
const { getShippingInfo, updateShippingInfo } = require("../../../controller/shipping/shippingController");

const _ = express.Router();
_.get("/", getShippingInfo);
_.patch("/", updateShippingInfo);


module.exports = _;