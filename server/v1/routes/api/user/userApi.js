const express = require("express");
const {
  signUp,
  login,
  verifyUser,
  resetPasswordRequest,
  setNewPassword,
  loginSession,
  logout,
} = require("../../../controller/user/userController");
const { ifExist } = require("../../../../middleware/isUserExist");
const { emailVerificationLink } = require("../../../../utils/sendEamil");
const _ = express.Router();
_.get("/verify/:verificationToken", verifyUser);
_.get("/login-session/:token", loginSession);
_.post("/sign-up", ifExist, signUp, emailVerificationLink);
_.post("/login", login, emailVerificationLink);
_.patch("/:_id", logout);
_.post("/reset-password-request", resetPasswordRequest, emailVerificationLink);
_.post("/set-new-password/:token", setNewPassword);
module.exports = _;
