const mongoose = require("mongoose");
const { Schema } = mongoose;

const shipSchema = new Schema(
  {
    in_dhaka: { type: Number, default: 0 },
    out_dhaka: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = {
  Shipping: mongoose.model("Shipping", shipSchema),
};
