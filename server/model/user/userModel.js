const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");
const mongoosePaginate = require("mongoose-paginate-v2");
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    first_name: {
      type: String,
      required: false,
      trim: true,
      // minLength: [3, "Name must at least 3 character"],
      // maxLength: [15, "name is too large"],
    },
    last_name: {
      type: String,
      required: false,
      // trim: true,
      // minLength: [3, "Name must at least 3 character"],
      // maxLength: [15, "name is too large"],
    },
    email: {
      type: String,
      required: false,
      // unique: true,
      // validate: {
      //   validator: validator.isEmail,
      //   message: "Invalid email format",
      // },
    },
    address: { type: String, required: false, default: "" },
    phone: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return validator.isMobilePhone(value, "bn-BD");
        },
        message: "Invalid phone number for Bangladesh",
      },
    },
    password: { type: String, required: true },
    confirm_pass: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      default: "Customer",
      enum: ["Customer", "Admin", "Supper"],
    },
    order_list: [{ type: Schema.Types.ObjectId, ref: "Order" }],
    isActive: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    token: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);
userSchema.plugin(mongoosePaginate);

userSchema.pre("save", function (next) {
  if ((this.password = this.confirm_pass)) {
    const hashedPassword = bcrypt.hashSync(this.password);
    this.password = hashedPassword;
    this.confirm_pass = "";
    next();
  } else {
    next(new Error("Passwords do not match"));
  }
});
userSchema.methods.comparePassword = function (password, hash) {
  const isPasswordValid = bcrypt.compareSync(password, hash);
  return isPasswordValid;
};
userSchema.methods.createHashedPassword = function (password) {
  const hashedPassword = bcrypt.hashSync(password);
  return hashedPassword;
};
module.exports = {
  User: mongoose.model("User", userSchema),
};

// first_name,last_name,email,phone,password,role
