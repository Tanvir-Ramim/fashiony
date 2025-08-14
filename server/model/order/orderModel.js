const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");
const mongoosePaginate = require("mongoose-paginate-v2");
const { Product } = require("../product/productModel");
const { Shipping } = require("../shipping/shipModel");
const { Coupon } = require("../coupon/couponModel");
// Sequence schema
const sequenceSchema = new Schema({
  name: { type: String, required: true, unique: true },
  seq: { type: Number, default: 10000 },
});

const Sequence = mongoose.model("Sequence", sequenceSchema);

const orderSchema = new Schema(
  {
    customer_ref: { type: Schema.Types.ObjectId, ref: "User" },
    product_list: [
      {
        p_ref: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
        color: { type: String, default: "" },
        size: { type: String, default: "" },
        sku: { type: String, default: "" },
      },
    ],
    order_type: {
      type: String,
      default: "regular",
      enum: ["regular", "combo"],
    },
    applied_coupon: {
      isAppied: { type: Boolean, default: false },
      code: { type: String, default: "" },
      discount: { type: Number, default: null },
    },
    regular_price: { type: Number, default: 0 },
    discount_price: { type: Number, default: 0 },
    offer_price: { type: Number, default: 0 },
    total_price: { type: Number, default: 0 },
    shipping: { type: Number, default: 0 },
    paid_amount: { type: Number, default: 0 },
    oder_status: {
      type: String,
      trim: true,
      default: "Placed",
      enum: ["Placed", "In-Progress", "Shifted", "Canceled"],
    },
    payment_status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Paid", "Transcation-Failed", "Canceled"],
    },
    quantity: { type: Number, default: 1 },
    payment_by: {
      type: String,
      default: "Cash On Delivery",
      enum: ["Online Banking", "Cash On Delivery"],
    },
    payment_institute: {
      type: String,
      default: "",
    },
    customer_name: {
      type: String,
      required: true,
      trim: true,
      // minLength: [0, "Name must at least 3 character"],
      // maxLength: [15, "name is too large"],
    },
    customer_eamil: {
      type: String,
      // required: true,
      // validate: {
      //   validator: validator.isEmail,
      //   message: "Invalid email format",
      // },
    },
    customer_phone: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return validator.isMobilePhone(value, "bn-BD");
        },
        message: "Invalid phone number for Bangladesh",
      },
    },

    city: {
      type: String,
      default: "",
    },

    country: {
      type: String,
      default: "",
    },

    area: {
      type: String,
      default: "",
    },
    house_nbr: {
      type: String,
      default: "",
    },
    road_nbr: {
      type: String,
      default: "",
    },
    post_code: {
      type: Number,
      default: 0,
    },
    address: {
      type: String,
      default: "",
    },
    tran_id: {
      type: String,
      default: "",
    },
    note: {
      type: String,
      default: "",
    },
    is_disable: { type: Boolean, default: false },

    invoice_id: { type: String, index: true },
    coupon_discount: { type: Number, default: 0 },
  },
  { timestamps: true }
);
// disable
// orderSchema.pre("save", function (next) {
//   console.log(this.oder_status);
//   if (this.oder_status === "Canceled") {
//     this.isDisable = true;
//   }

//   next();
// });
//?##### invoice id#####
orderSchema.pre("save", async function (next) {
  if (!this.invoice_id) {
    try {
      const sequenceDoc = await Sequence.findOneAndUpdate(
        { name: "invoice" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );

      if (!sequenceDoc || typeof sequenceDoc.seq !== "number") {
        throw new Error("Failed to generate a valid sequence.");
      }
      console.log("Sequence value used for invoice:", sequenceDoc.seq);
      // Generate the invoice_id
      // this.invoice_id = `PO-${sequenceDoc.seq}`;
      this.invoice_id = `PO-${sequenceDoc.seq.toString().padStart(4, "0")}`;
    } catch (err) {
      return next(err);
    }
  }
  next();
});

orderSchema.pre("save", function (next) {
  const totalQuantity = this.product_list.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  this.quantity = totalQuantity;

  next();
});
//?#####Shipping and Calculate Price #####

orderSchema.pre("save", async function (next) {
  try {
    const order = this;

    const shippingInfo = await Shipping.findById("66d6901edd7ae94ed1d08436");
    if (!shippingInfo) {
      return next(new Error("Shipping information not found."));
    }
    order.shipping =
      order.city === "Dhaka" ? shippingInfo.in_dhaka : shippingInfo.out_dhaka;

    // Calculate prices based on product list
    const productIds = order.product_list.map((item) => item.p_ref);
    const products = await Product.find({ _id: { $in: productIds } });
    console.log("Fetched Products:", products);
    if (!products || products.length === 0) {
      return next(new Error("No products found for the provided references."));
    }

    let totalRegularPrice = 0;
    let totalDiscountPrice = 0;
    let realDiscount = 0;
    order.product_list.forEach((item) => {
      const product = products.find((p) => p._id.equals(item.p_ref));
      if (product) {
        const regularPrice = product.price * item.quantity;
        const discountPrice =
          (product.price - product.discount) * item.quantity;

        totalRegularPrice += regularPrice;
        totalDiscountPrice += discountPrice;
        realDiscount += product.discount* item.quantity;
      }
    });

    // Set calculated prices
    order.regular_price = totalRegularPrice;

    if (order.applied_coupon?.isAppied) {
      const discountAmount =
        totalDiscountPrice * order.applied_coupon.discount || 0;

      order.discount_price = realDiscount + discountAmount;
      order.coupon_discount = discountAmount;
      order.offer_price = totalDiscountPrice - discountAmount;
      order.total_price = order.offer_price + order.shipping;
    } else {
      order.discount_price = totalRegularPrice - totalDiscountPrice;
      order.offer_price = totalDiscountPrice;
      order.total_price = totalDiscountPrice + order.shipping;
    }

    next();
  } catch (error) {
    next(error);
  }
});

//?######coupon valida########
orderSchema.pre("save", async function (next) {
  if (this.applied_coupon?.isAppied && this.applied_coupon?.code) {
    try {
      if (
        (this.payment_by === "Cash On Delivery" ||
          this.payment_by === "Online Banking") &&
        this.payment_status === "Paid"
      ) {
        const coupon = await Coupon.findOneAndUpdate(
          { code: this.applied_coupon.code, is_active: true },
          { $inc: { usage_count: 1 } },
          { new: true }
        );

        if (!coupon) {
          return next(new Error("Invalid or expired coupon applied."));
        }
      }
    } catch (error) {
      return next(error);
    }
  }

  next();
});
orderSchema.plugin(mongoosePaginate);

// disable

module.exports = {
  Order: mongoose.model("Order", orderSchema),
  Sequence,
};
