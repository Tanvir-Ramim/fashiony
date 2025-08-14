const mongoose = require("mongoose");
const { Schema } = mongoose;
const mongoosePaginate = require("mongoose-paginate-v2");

const couponSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    discount: {
      type: Number,
      required: true,
      min: 0,
      max: 100, // Assuming the discount is a percentage (0-100)
    },
    usage_count: {
      type: Number,
      default: 0,
      min: 0,
    },
    max_usage: {
      type: Number,
      required: true,
      min: 1, // Ensures there's at least one allowed usage
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Auto-disable coupon when usage_count reaches max_usage
couponSchema.pre("save", function (next) {
  if (this.usage_count >= this.max_usage) {
    this.is_active = false;
  }
  next();
});

// Add pagination plugin
couponSchema.plugin(mongoosePaginate);

module.exports = { Coupon: mongoose.model("Coupon", couponSchema) };
