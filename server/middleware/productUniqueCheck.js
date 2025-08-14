const { NotFoundError, NotAcceptable } = require("../error/customError");
const { Product } = require("../model/product/productModel");

const isUnique = async (req, res, next) => {
  try {
    const { brand, category, title, isCombo, choice, sku } = req.body;
    const iFSku = await Product.findOne({ sku });
    if (iFSku) {
      return next(new NotAcceptable("SKU  Already Exist"));
    }
    if (isCombo) {
      const ifThere = await Product.findOne({
        brand,
        category,
        title,
        isCombo,
        choice,
      });

      if (ifThere) {
        return next(new NotAcceptable("Combo Already Exist"));
      }
      return next();
    }
    const ifThere = await Product.findOne({
      brand,
      category,
      title,
    });

    if (ifThere) {
      return next(new NotAcceptable("Already Exist"));
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { isUnique };
