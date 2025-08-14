const { BadRequestError } = require("../../../error/customError");
const { Shipping } = require("../../../model/shipping/shipModel");
const appStatus = require("../../../utils/appStatus");
const { tryCatch } = require("../../../utils/tryCatch");

const getShippingInfo = tryCatch(async (req, res, next) => {
  const meow = await Shipping.findById("66d6901edd7ae94ed1d08436");

  if (!meow) {
    return next(new BadRequestError("Try Again"));
  }

  appStatus(200, meow, req, res, next);
});

const updateShippingInfo = tryCatch(async (req, res, next) => {
  const { in_dhaka, out_dhaka } = req.body;

  let lib = {};
  if (in_dhaka) {
    lib.in_dhaka = in_dhaka;
  }
  if (out_dhaka) {
    lib.out_dhaka = out_dhaka;
  }

  const new_con = await Shipping.findByIdAndUpdate(
    "66d6901edd7ae94ed1d08436",
    { $set: lib },
    { new: true }
  );

  if (!new_con) {
    throw new BadRequestError("Try Again");
  }
  appStatus(201, new_con, req, res, next);
});

module.exports = { getShippingInfo, updateShippingInfo };
