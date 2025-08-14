const { Coupon } = require("../../../model/coupon/couponModel");
const { tryCatch } = require("../../../utils/tryCatch");
// add new coupon ((POST))
const newCoupon = tryCatch(async (req, res, next) => {
  const { code, title, discount, max_usage } = req.body;

  const couponCheck = await Coupon.findOne({ code });

  if (couponCheck) {
    return res.status(400).json({
      status: 400,
      error: "Already Coupon Code Exist",
    });
  }
      const couponPercentage= discount/100
  const coupon = new Coupon({
    code,
    title,
    discount:couponPercentage,
    max_usage,
  });
  const mx = await coupon.save();

  if (!mx) {
    return res.status(400).json({
      error: "Data not Saved",
      status: 400,
    });
  }
  return res.status(201).json({ status: 201, message: "Coupon Created" });
});

// update coupon ((PATCH))
const updateCoupon = tryCatch(async (req, res, next) => {
  const { id } = req.params; // Coupon ID from route params
  const { discount, max_usage, is_active } = req.body;
  // console.log( discount, max_usage, is_active )
  const updatedCoupon = await Coupon.findByIdAndUpdate(
    id,
    { discount, max_usage, is_active },
    { new: true, runValidators: true }
  );

  if (!updatedCoupon) {
    return res.status(404).json({
      status: 404,
      error: "Coupon not found",
    });
  }

  return res.status(200).json({
    status: 200,
    message: "Coupon updated successfully",
    data: updatedCoupon,
  });
});

// delete coupon ((DELETE))
const deleteCoupon = tryCatch(async (req, res, next) => {
  const { id } = req.params;

  const deletedCoupon = await Coupon.findByIdAndDelete(id);

  if (!deletedCoupon) {
    return res.status(404).json({
      status: 404,
      error: "Coupon not found",
    });
  }

  return res.status(200).json({
    status: 200,
    message: "Coupon deleted successfully",
    data: deletedCoupon,
  });
});

// apply coupon ((GET))
const applyCoupon = tryCatch(async (req, res, next) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({
      status: 400,
      error: "Coupon code is required",
    });
  }

  const coupon = await Coupon.findOne({ code });

  if (!coupon) {
    return res.status(404).json({
      status: 404,
      error: "Coupon not found",
    });
  }

  // Check if the coupon is active and within the usage limits
  if (!coupon.is_active || coupon.usage_count >= coupon.max_usage) {
    return res.status(400).json({
      status: 400,
      error: "Coupon has expired or reached its usage limit",
    });
  }

  return res.status(200).json({
    status: 200,
    message: "Coupon applied successfully",
    discount: coupon.discount,
    code: coupon.code,
  });
});

// fetch ((GET))
const getCoupons = tryCatch(async (req, res, next) => {
  const { code } = req.query;

  if (code) {
    const coupon = await Coupon.findOne({ code });

    if (!coupon) {
      return res.status(404).json({
        status: 404,
        error: "Coupon not found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Coupon retrieved successfully",
      data: coupon,
    });
  }

  // Fetch all coupons
  const coupons = await Coupon.find();

  return res.status(200).json({
    status: 200,
    message: "All coupons retrieved successfully",
    data: coupons,
  });
});
module.exports = {
  newCoupon,
  updateCoupon,
  deleteCoupon,
  applyCoupon,
  getCoupons,
};
