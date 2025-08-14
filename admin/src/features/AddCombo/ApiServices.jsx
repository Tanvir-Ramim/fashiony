import Api from "../../shared/Axios/axios";

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

const getProducts = async (
  setProducts,
  choice,
  isCombo,
  limit,
  page,
  setPageInfo
) => {
  const params = buildQueryParams({
    choice,
    isCombo,
  });
  params.append("limit", limit);
  params.append("page", page);

  try {
    const res = await Api.get(`/products?${params.toString()}`);
    if (res.status === 200) {
      setProducts(res.data.data.productByquery);
      setPageInfo(res.data.data.paginate);
    }
  } catch (error) {
    console.error(error);
  }
};
export { getProducts };
