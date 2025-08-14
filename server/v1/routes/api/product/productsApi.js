const express = require("express");
const {
  deleteManyProducts,
  getByViewSearch,
  guidedSearch,
} = require("../../../controller/product/productController");
const { ifCache, setCache } = require("../../../../middleware/cache");
const _ = express.Router();
_.get("/search", guidedSearch); //?query=title .category ,subcategory, brand ,price
_.delete("/", deleteManyProducts);
_.get("/", ifCache, getByViewSearch, setCache);
//? query: title, category,subcategory, brand, fields, color, size,orderby:[low_to_high,high_to_low,in_stock,out_stock ,latest,isNew,isOld]

/*
a. related products 
b. in slide product 
c. in shop page 
d. for filter

*/


/*
a. menu bar searching product
*/

module.exports = _;
