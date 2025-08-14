const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");
const mongoosePaginate = require("mongoose-paginate-v2");

const Size = new Schema(
  {
    name: { type: String, default: "" },
    stock: { type: Number, default: 0 },
  },
  { _id: false }
);

const productSchema = new Schema(
  {
    title: { type: String, required: true, index: true },
    category: { type: String, required: true, index: true },
    subcategory: { type: String, default: "" },
    brand: { type: String, default: "" },
    sku: { type: String, required: true, unique: true, index: true },
    description: { type: String, default: "" },
    url: {
      type: [
        {
          public_id: { type: String, default: "" },
          url: { type: String, default: "", validate: validator.isURL },
        },
      ],
      validate: {
        validator: function (value) {
          return value.length <= 6;
        },
        message: "You can only have up to 6 URLs.",
      },
    },
    thumb: {
      public_id: { type: String, required: false },
      url: {
        type: String,
        validate: {
          validator: (value) => (value ? validator.isURL(value) : true),
          message: "Invalid URL for thumb.",
        },
      },
    },
    price: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    offer_price: { type: Number, default: 0 },
    color: { type: [String], default: [] },
    size: {
      type: [Size],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
      enum: ["winter", "summer", "yearend", "offer", "new"],
      validate: {
        validator: function (value) {
          return value.length <= 3;
        },
        message: "You can only add up to 3 tags.",
      },
    },
    isCombo: { type: Boolean, default: false },
    choice: { type: String, default: null, enum: [null, "choice1", "choice2"] },
    total_stock: { type: Number, default: 0 },
  },
  { timestamps: true }
);

productSchema.pre("save", function (next) {
  if (this.discount > 0) {
    this.offer_price = this.price - this.discount;
  }
  // if (typeof this.isNew === "string") {
  //   this.isNew = this.isNew.toLowerCase() === "true";
  // }
  next();
});

productSchema.index({ title: "text", category: 1, sku: 1 });

productSchema.plugin(mongoosePaginate);

module.exports = {
  Product: mongoose.model("Product", productSchema),
};
