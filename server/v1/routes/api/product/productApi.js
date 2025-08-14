const express = require("express");
const { isUnique } = require("../../../../middleware/productUniqueCheck");
const {
  addProduct,
  updateProduct,
  delProductImg,
  singleProduct,
  delColSize,
  stockUpdate,
} = require("../../../controller/product/productController");
const { uploadCloudinary } = require("../../../../utils/cloudiNulter");
const { ifCache, setCache } = require("../../../../middleware/cache");
const _ = express.Router();
//### single ####
_.post(
  "/",
  uploadCloudinary.fields([
    { name: "url", maxCount: 5 },
    { name: "thumb", maxCount: 1 },
  ]),
  isUnique,
  addProduct
);
_.patch(
  "/:id",
  uploadCloudinary.fields([
    { name: "url", maxCount: 5 },
    { name: "thumb", maxCount: 1 },
  ]),
  updateProduct
);
_.patch("/images/:id", delProductImg); //? pids= req.body.pids array of public_id
_.get(
  "/:brand/:category/:subcategory?/:title",
  ifCache,
  singleProduct,
  setCache
); //? single product get
_.patch("/:pid/:mx", delColSize);
//? stock update
_.post("/:id/stock", stockUpdate);
module.exports = _;
