const { cloudinary } = require("../../../config/cloudinary");
const {
  NotFoundError,
  NotAcceptable,
  BadRequestError,
} = require("../../../error/customError");
const { Product } = require("../../../model/product/productModel");
const appStatus = require("../../../utils/appStatus");

const { tryCatch } = require("../../../utils/tryCatch");
//? add product#####
const addProduct = tryCatch(async (req, res, next) => {
  const product = req.body;

  let color;
  let size;
  let tags;
  try {
    color = product.color;
    size = product.size;
    tags = product.tags;
  } catch (error) {
    return next(
      new Error("Invalid JSON format in color, size, or tag fields.")
    );
  }
  const options = {
    use_filename: true,
    unique_filename: true,
    overwrite: true,
  };
  const url = [];
  let thumb = {};

  //Upload product images to Cloudinary
  try {
    if (req?.files?.url) {
      for (const file of req.files.url) {
        const result = await cloudinary.uploader.upload(file.path, options);
        url.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    }

    if (req?.files?.thumb?.length > 0) {
      const thumbFile = req.files.thumb[0];
      const result = await cloudinary.uploader.upload(thumbFile.path, options);
      thumb = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }
  } catch (error) {
    return next(new Error("Error uploading files to Cloudinary."));
  }

  // Create new product
  const new_product = new Product({
    ...product,
    url,
    thumb,
    color,
    size,
    tags,
  });

  const save_product = await new_product.save();

  appStatus(201, save_product, req, res, next);
});
//? update product#####
const updateProduct = tryCatch(async (req, res, next) => {
  const { id } = req.params;
  const product = req.body;

  let url = [];
  let thumb = {};
  const options = {
    use_filename: true,
    unique_filename: true,
    overwrite: true,
  };

  // ####### Find the product#######
  const imageOfProduct = await Product.findById(id);

  if (!imageOfProduct) {
    return next(new NotFoundError("Not Found"));
  }
  //  existing product images
  if (imageOfProduct.url) {
    url = [...imageOfProduct.url];
  }
  //#############update product image###################
  if (req?.files?.url) {
    for (const file of req.files.url) {
      const result = await cloudinary.uploader.upload(file.path, options);
      url.push({
        url: result.url,
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
  }

  if (req?.files?.thumb && req.files.thumb[0]) {
    if (
      imageOfProduct.thumb.public_id &&
      imageOfProduct.thumb.public_id !== ""
    ) {
      await cloudinary.uploader.destroy(
        imageOfProduct.thumb.public_id,
        options
      );
    }

    const thumbFile = req.files.thumb[0];
    const result = await cloudinary.uploader.upload(thumbFile.path, options);
    thumb = {
      url: result.url,
      public_id: result.public_id,
      url: result.secure_url,
    };
  } else if (imageOfProduct.thumb.url) {
    thumb = imageOfProduct.thumb;
  }
  //############ color & size###############
  let color = [];
  let size = [];
  let tags = [];
  if (imageOfProduct.color) {
    color = [...imageOfProduct.color];
  }
  if (imageOfProduct.size) {
    size = [...imageOfProduct.size];
  }
  if (imageOfProduct.tags) {
    tags = [...imageOfProduct.tags];
  }
  if (imageOfProduct.size) {
    tags = [...imageOfProduct.tags];
  }
  //#########Construct the update object#######
  const updateObject = {
    color,
    size,
    tags,
    url,
    thumb,
    ...product,
  };

  //#######  Update the product#######
  const updatedProduct = await Product.findByIdAndUpdate(
    imageOfProduct._id,
    updateObject,
    { new: true }
  );

  if (!updatedProduct) {
    return next(new NotAcceptable("Not Updated"));
  }

  return appStatus(200, updatedProduct, req, res, next);
});

//? delete product image####
const delProductImg = tryCatch(async (req, res, next) => {
  const { id } = req.params;
  const { pids } = req.body;

  const options = {
    use_filename: true,
    unique_filename: true,
    overwrite: true,
  };
  // Find the product
  const imageOfProduct = await Product.findById(id);
  if (!Array.isArray(imageOfProduct.url)) {
    return next(new NotFoundError("No images found for this produc"));
  }

  const deletionPromises = imageOfProduct.url
    .filter(({ public_id }) => pids.includes(public_id))
    .map(({ public_id }) => cloudinary.uploader.destroy(public_id, options));
  await Promise.all(deletionPromises);
  // Update the product images
  await Product.findByIdAndUpdate(
    id,
    {
      $pull: { url: { public_id: { $in: pids } } },
    },
    { new: true }
  );

  appStatus(204, "", req, res, next);
});

//? delete product color size #######
const delColSize = tryCatch(async (req, res, next) => {
  const { pid, mx } = req.params;

  let up_pro;
  if (mx === "sz") {
    up_pro = await Product.findByIdAndUpdate(
      pid,
      {
        $set: { size: null },
      },
      { new: true }
    );
  }
  if (mx === "cl") {
    up_pro = await Product.findByIdAndUpdate(
      pid,
      {
        $set: { color: null },
      },
      { new: true }
    );
  }

  if (!up_pro) {
    return next(new NotFoundError("Try Again"));
  }

  appStatus(204, "", req, res, next);
});
//? single produtc get #####
const singleProduct = tryCatch(async (req, res, next) => {
  const { brand, category, title, subcategory } = req.params;

  // Validate required parameters
  if (!brand || !category || !title) {
    return next(
      new Error("Missing required parameters: brand, category, or title.")
    );
  }
  // Initialize query object with default fields
  let query = {
    brand: brand,
    category: category,
    title: title,
  };

  if (subcategory) {
    query.subcategory = subcategory;
  }

  const imageOfProduct = await Product.findOne(query);

  if (!imageOfProduct) {
    return next(new NotFoundError("Product not found"));
  }

  return appStatus(200, imageOfProduct, req, res, next);
});

//? delete products ############
const deleteManyProducts = tryCatch(async (req, res, next) => {
  const { pids } = req.body;

  for (const _id of pids) {
    await productDelete(_id, next);
  }
  return appStatus(204, "", req, res, next);
});

//? ## view pagi filter ####

const getByViewSearch = tryCatch(async (req, res, next) => {
  const {
    title,
    category,
    subcategory,
    brand,
    pricerange,
    fields,
    orderby,
    color,
    sku,
    choice,
    isCombo,
  } = req.query;


  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const math = fields
    ? fields
        .split(",")
        .map((field) => field.trim())
        .join(" ")
    : "";

  const searchQuery = {};

  // Construct search query with proper logging
  if (typeof title === "string" && title) {
    searchQuery.title = reg(title);
  }
  if (typeof sku === "string" && sku) {
    searchQuery.sku = reg(sku);
  }
  if (typeof choice === "string" && choice) {
    searchQuery.choice = reg(choice);
  }
  if (isCombo) {
    searchQuery.isCombo = Boolean(isCombo);
  }
  if (typeof category === "string" && category && category !== "all") {
    searchQuery.category = reg(category);
  }
  if (typeof brand === "string" && brand) {
    searchQuery.brand = reg(brand);
  }
  if (typeof subcategory === "string" && subcategory) {
    searchQuery.subcategory = reg(subcategory);
  }

  if (typeof color === "string" && color) {
    searchQuery.color = { $in: [reg(color)] };
  }
  if (Array.isArray(pricerange) && pricerange.length === 2) {
    const [minPrice, maxPrice] = pricerange.map(Number);

    if (!isNaN(minPrice) && !isNaN(maxPrice)) {
      searchQuery.price = { $gte: minPrice, $lte: maxPrice };
    }
  } else if (typeof pricerange === "string" && pricerange) {
    const [minPrice, maxPrice] = pricerange.split(",").map(Number);

    if (!isNaN(minPrice) && !isNaN(maxPrice)) {
      searchQuery.price = { $gte: minPrice, $lte: maxPrice };
    }
  }
  const sortOptions = {};
  // Filter by `isNew` or stock availability
  if (["winter", "summer", "yearend", "offer", "new"].includes(orderby)) {
    searchQuery.tags = { $in: [orderby] };
  } else if (orderby === "in_stock") {
    searchQuery.total_stock = { $gt: 0 };
  } else if (orderby === "out_stock") {
    searchQuery.total_stock = { $lte: 0 };
  } else if (orderby === "discount") {
    sortOptions.discount = -1;
  }

  if (orderby) {
    if (orderby === "low_to_high") {
      sortOptions.price = 1;
    } else if (orderby === "high_to_low") {
      sortOptions.price = -1;
    } else if (orderby === "latest") {
      sortOptions.createdAt = -1;
    }
  }

  const options = {
    page,
    limit,
    select: math,
    lean: true,
    sort: sortOptions,
  };

  // Query and handle results
  let productByquery = await Product.paginate(searchQuery, options);
  // Check if the category exists but has no products
  if (!productByquery || productByquery.docs.length === 0) {
    // If there are no products, return an empty array
    res.locals.data = { productByquery: [], paginate: {} };
    return next(); // Short-circuit and send empty array
  }
  // if (!productByquery || productByquery.docs.length === 0) {
  //   return next(appError(404, "Not Found"));
  // }

  // Map the results to add URLs
  productByquery.docs = productByquery.docs.map((category) => {
    const firstImageUrl =
      category.url && category.url.length > 0
        ? category.url[0].url
        : "No image available";
    return {
      ...category,
      card_url: firstImageUrl,
      link: {
        view: `/${category.brand}/${category.category}/${category.title}`,
        shop: `/shop/${category.brand}/${category.category}`,
      },
    };
  });

  // Correctly structure pagination data
  const paginate = {
    totalDocs: productByquery.totalDocs,
    limit: productByquery.limit,
    totalPages: productByquery.totalPages,
    page: productByquery.page,
    pagingCounter: productByquery.pagingCounter,
    hasPrevPage: productByquery.hasPrevPage,
    hasNextPage: productByquery.hasNextPage,
    prevPage: productByquery.prevPage,
    nextPage: productByquery.nextPage,
  };

  res.locals.data = { productByquery: productByquery.docs, paginate };

  next();
});

//?### menu bar search product ######

const guidedSearch = tryCatch(async (req, res, next) => {
  const { query } = req.query;

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const regex = new RegExp(query, "i");
  const options = {
    page: page,
    limit: limit,
    select: "-_id brand category title price",
  };
  let searchQuery;
  if (!parseInt(query)) {
    searchQuery = {
      $or: [
        { category: regex },
        { subcategory: regex },
        { title: regex },
        { brand: regex },
      ].filter((condition) => condition),
    };
  } else {
    searchQuery = {
      price: {
        $gte: parseInt(query),
        $lte: parseInt(query) + parseInt(query) * 0.4,
      },
    };
  }

  const products = await Product.paginate(searchQuery, options);
  const paginate = {
    totalDocs: products.totalDocs,
    limit: products.limit,
    totalPages: products.totalPages,
    page: products.page,
    pagingCounter: products.pagingCounter,
    hasPrevPage: products.hasPrevPage,
    hasNextPage: products.hasNextPage,
    prevPage: products.prevPage,
    nextPage: products.nextPage,
  };

  const suggestions = products.docs.map((product, index) => {
    if (parseInt(query)) {
      return {
        title: product.title,
        category: product.category,
        brand: product.brand,
        price: product.price,
        link: {
          shop: `/shop/${product.brandName}/${product.categoryName}`,
          view: `/product-details/${product.brandName}/${product.categoryName}/${product.productName}`,
        },
        rank: index,
      };
    } else {
      return {
        title: product.title,
        category: product.category,
        brand: product.brand,

        link: {
          shop: `/shop/${product.brand}/${product.category}`,
          view: `/${product.brand}/${product.category}/${product.title}`,
        },
        rank: index,
      };
    }
  });

  appStatus(200, { suggestions, paginate }, req, res, next);
});
//?### stock update #############
const stockUpdate = tryCatch(async (req, res, next) => {
  const { id } = req.params;
  const { size, quantity } = req.body;

  const stock_update = await Product.findOneAndUpdate(
    { _id: id, "size.name": size },
    { $set: { "size.$.stock": quantity } },
    { new: true }
  );

  if (!stock_update) {
    return next(
      new BadRequestError("Failed to update stock or size not found.")
    );
  }

  appStatus(204, "", req, res, next);
});

module.exports = {
  addProduct,
  updateProduct,
  delProductImg,
  singleProduct,
  deleteManyProducts,
  getByViewSearch,
  guidedSearch,
  delColSize,
  stockUpdate,
};
//? delete####
const productDelete = async (_id, next) => {
  try {
    // delete the product
    const dbDeleteProduct = await Product.findByIdAndDelete({ _id });
    if (!dbDeleteProduct) {
      return next(new NotFoundError("Not Found"));
    }

    // Delete from Cloudinary
    const options = {
      use_filename: true,
      unique_filename: true,
      overwrite: true,
    };
    for (const { public_id } of dbDeleteProduct.url) {
      await cloudinary.uploader.destroy(public_id, options);
    }
  } catch (error) {
    console.error("Error deleting product:", error.message);
  }
};

// regex
const reg = (shr) => {
  const regexQuery = new RegExp(shr, "i");

  return regexQuery;
};
