const { Product } = require("../../../model/product/productModel");
const appStatus = require("../../../utils/appStatus");
const { tryCatch } = require("../../../utils/tryCatch");

const categoryBar = tryCatch(async (req, res, next) => {
  const categories = await Product.aggregate([
    {
      $group: {
        _id: "$category",
        products: {
          $push: {
            name: "$title",
            brand: "$brand",
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        categoryName: "$_id",
        products: 1,
      },
    },
    {
      $sort: { categoryName: 1 },
    },
  ]);

  const navbar = categories.map((category) => {
    return {
      name: category.categoryName,
      link: `/shop/${category.categoryName.toLowerCase()}`,
      productList: category.products.map((product) => {
        return {
          name: product.name,
          link: `/${product.brand.toLowerCase()}/${category.categoryName.toLowerCase()}/${product.name
            .toLowerCase()
            .replace(/ /g, "-")}`,
        };
      }),
    };
  });
  // console.log(navbar);
  appStatus(200, navbar, req, res, next);
});

module.exports = { categoryBar };
