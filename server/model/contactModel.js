const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactSchema = new Schema(
  {
    address: String,
    email: String,
    contact: String,
    map: String,
  },
  {
    timestamps: true,
  }
);

module.exports = { Contact: mongoose.model("Contact", contactSchema) };
