const express = require("express");
const {
  newCoupon,
  updateCoupon,
  deleteCoupon,
  applyCoupon,
  getCoupons,
} = require("../../../controller/coupon/coupon.controller");
const _ = express.Router();

_.post("/", newCoupon);
_.patch("/:id", updateCoupon);
_.delete("/:id", deleteCoupon);
_.post("/apply", applyCoupon); //? code=
_.get("/", getCoupons); // ?code = [single or all]
module.exports = _;
