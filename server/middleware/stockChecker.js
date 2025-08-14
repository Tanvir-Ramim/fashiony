const { Product } = require("../model/product/productModel");

const stockChecker = async (req, res, next) => {
  const { products } = req.body;
  // console.log({ products });
  if (!Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ message: "Invalid or empty products list." });
  }

  try {
    // Collect all product checks in a single batch query
    const outStock = [];

    for (const { id, size, quantity } of products) {
      const product = await Product.findOne({
        _id: id,
        size: {
          $elemMatch: { name: size, stock: { $lt: quantity } },
        },
      });

      if (product) {
        outStock.push({ id, size });
      }
    }
    // console.log(outStock);
    // Respond if there are any out-of-stock items
    if (outStock.length > 0) {
      return res.status(400).json({
        message: "Some products are out of stock.",
        outStock,
      });
    }

    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = { stockChecker };
