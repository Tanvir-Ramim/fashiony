const express = require("express");
const {
  singleUser,
  allUser,
  deleteUser,
  deleteMAnyUser,
  updateUser,
  roleUpdate,
} = require("../../../controller/user/userController");
const { ifCache, setCache } = require("../../../../middleware/cache");
const { authorized } = require("../../../../middleware/access");
const _ = express.Router();
_.get("/:_id", singleUser);
_.get("/", ifCache, allUser, setCache); //l?query=name ,email , order_list=>,<,0
_.delete("/:_id", deleteUser); // single user
_.delete("/", deleteMAnyUser); // many user
_.patch("/:_id/:role", roleUpdate); // role change by supper admin
_.patch("/:_id", updateUser); // address,phone
module.exports = _;
