import Api from "../apiClient/ApiClient";

// Utility function to build query params
const buildQueryParams = (paramsObj) => {
  const params = new URLSearchParams();

  Object.keys(paramsObj).forEach((key) => {
    const value = paramsObj[key];

    if (Array.isArray(value)) {
      // Handle array values
      value.forEach((val) => {
        if (val !== undefined && val !== null) {
          params.append(key, val);
        }
      });
    } else if (typeof value === "string" && value) {
      // Handle string values
      params.append(key, value);
    } else if (typeof value === "number") {
      // Handle numeric values
      params.append(key, value);
    }
  });

  return params;
};

const getBanner = async (setBanner, asset_type, position) => {
  const params = buildQueryParams({ asset_type, position });

  try {
    const res = await Api.get(`/asset-local?${params.toString()}`);
    if (res.status === 200) {
      setBanner(res.data.data);
    }
  } catch (error) {
    console.error(error);
  }
};

const getProduct = async (
  setProduct,
  title,
  category,
  brand,
  fields,
  orderby,
  color,
  size,
  sku,
  limit,

  page
) => {
  const params = buildQueryParams({
    title,
    category,
    brand,
    sku,
    orderby,
    fields,
    color,
    size,
  });
  params.append("limit", limit);
  params.append("page", page);

  try {
    const res = await Api.get(`/products?${params.toString()}`);
    if (res.status === 200) {
      setProduct(res.data.data.productByquery);
    }
  } catch (error) {
    console.error(error);
  }
};

const getProducts = async (
  setProducts,
  title,
  category,
  brand,
  fields,
  orderby,
  color,
  size,
  sku,
  choice,
  isCombo,
  limit,
  page
) => {
  const params = buildQueryParams({
    title,
    category,
    choice,
    isCombo,
    brand,
    sku,
    orderby,
    fields,
    color,
    size,
  });
  params.append("limit", limit);
  params.append("page", page);

  try {
    const res = await Api.get(`/products?${params.toString()}`);
    if (res.status === 200) {
      setProducts(res.data.data.productByquery);
    }
  } catch (error) {
    console.error(error);
  }
};

const getCategory = async (setBar) => {
  try {
    const res = await Api.get(`/bar`);
    setBar(res);
    // console.log(res);
  } catch (error) {
    console.error(error);
  }
};

const getSearch = async (
  setProducts,
  category,
  subcategory,
  brand,
  title,
  fields,
  orderby,
  color,
  size,
  sku
) => {
  const params = buildQueryParams({
    category,
    subcategory,
    brand,
    title,
    fields,
    orderby,
    color,
    size,
    sku,
  });
  // console.log(params);
  try {
    const res = await Api.get(`/products/search?${params.toString()}`);
    if (res.status === 200) {
      setProducts(res.data);
    }
  } catch (error) {
    console.error(error);
  }
};

const getSingleDetails = async (
  setSingleData,
  brand,
  category,
  title,
  sub_category = ""
) => {
  try {
    const endpoint = sub_category
      ? `/product/${brand}/${category}/${sub_category}/${title}`
      : `/product/${brand}/${category}/${title}`;

    const res = await Api.get(endpoint);

    if (res.status === 200) {
      setSingleData(res.data.data);
    }
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
};

const productFilter = async (
  setFilter,
  setPagination,
  title,
  category,
  subcategory,
  brand,
  pricerange,
  fields,
  orderby,
  color,
  size,
  sku,
  page,
  limit
) => {
  const params = buildQueryParams({
    title,
    category,
    subcategory,
    brand,
    pricerange,
    fields,
    orderby,
    color,
    size,
    sku,
    page,
    limit,
    isCombo: false,
  });

  try {
    const res = await Api.get(`/products?${params.toString()}`);
    // console.log(res);
    if (res.status === 200) {
      setFilter(res.data.data.productByquery);
      setPagination(res.data.data.paginate);
      // console.log(res.data.data.productByquery);
    }
  } catch (error) {
    console.error(error);
  }
};
export default getBanner;
export {
  getProduct,
  getProducts,
  getCategory,
  getSearch,
  getSingleDetails,
  productFilter,
};
