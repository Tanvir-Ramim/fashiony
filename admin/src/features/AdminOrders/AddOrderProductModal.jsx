import React, { useEffect, useState } from "react";
import Api from "../../shared/Axios/axios";
import { useThrottle } from "@custom-react-hooks/use-throttle";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const AddOrderProductModal = ({ setModal, handleComboSubmit }) => {
  const [productAll, setProductAll] = useState([]);
  const [pagi, setPagi] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const handleSizeClick = (product, size) => {
    handleComboSubmit(product, size?.name);
    setModal(false);
  };
  console.log(pagi);
  const [limit] = useState(8);
  const [page, setPage] = useState(1);
  const [title, setTitle] = useState("");
  const [sku, setKu] = useState("");
  const titl = useThrottle(title, 1000);
  const sk = useThrottle(sku, 1000);

  const fetchData = async () => {
    const params = new URLSearchParams();
    if (titl) params.append("title", titl);
    if (sk !== "") params.append("sku", sk);

    // Pagination params
    params.append("limit", limit);
    params.append("page", page);

    try {
      const res = await Api.get(`/products?${params.toString()}&fields=`);
      if (res.status === 200) {
        setProductAll(res.data.data.productByquery);
        setPagi(res.data.data.paginate);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [page, limit, titl, sk]);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-2 relative">
        <div className="flex justify-between mb-3 mt-2 mr-8">
          <div className="flex gap-1 items-center">
            <h1>Search : </h1>
            <input
              className="px-1 py-1  mr-2 text-xs transition-all duration-300 border rounded outline-none focus:shadow text-black  border-black"
              type="text"
              placeholder="Search Name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className="px-1 py-1  mr-2 text-xs transition-all duration-300 border rounded outline-none focus:shadow text-black  border-black"
              type="text"
              placeholder="Search SKU"
              value={sku}
              onChange={(e) => setKu(e.target.value)}
            />
          </div>
          <div className="  flex justify-center items-center gap-4">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={!pagi?.hasPrevPage}
              className={`${
                pagi?.hasPrevPage
                  ? "bg-primary cursor-pointer"
                  : "bg-gray-300 cursor-not-allowed"
              } text-white px-4 py-[2px]  text-sm  rounded-md`}
            >
              Previous
            </button>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={!pagi?.hasNextPage} // Disable if there is no next page
              className={`${
                pagi?.hasNextPage
                  ? "bg-primary cursor-pointer"
                  : "bg-gray-300 cursor-not-allowed"
              } text-white px-4 py-[2px] text-sm  rounded-md`}
            >
              Next
            </button>
            <button
              onClick={() => setModal(false)}
              className="absolute text-red-600 top-4 right-4  hover:text-gray-800"
            >
              &#x2715;
            </button>
          </div>
        </div>

        {/* Product List */}
        <div className="grid text-sm grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {productAll?.length > 0
            ? productAll?.map((item, i) => (
                <div
                  key={i}
                  className={`bg-white rounded-lg shadow-md p-4 ${
                    selectedProduct?.id === item.id
                      ? "border-2 border-black"
                      : ""
                  }`}
                  onClick={() => setSelectedProduct(item)}
                >
                  <div className="relative">
                    <img
                      src={item?.url[0]?.url}
                      alt={item?.title}
                      className="rounded-lg w-full h-[130px]"
                      loading="lazy"
                    />
                  </div>
                  <h5 className="mt-4 text-sm font-semibold text-gray-800">
                    {item?.title?.slice(0, 50)}
                  </h5>
                  <div className="flex justify-between">
                    <h2 className=" md:text-base text-sm items-center">
                      <span className="lg:hidden">Price: </span>
                      {item?.discount > 0 && (
                        <span className="line-through text-xs ml-1 text-gray-500">
                          {" "}
                          ৳{item?.price}
                        </span>
                      )}
                      <span className="font-semibold">
                        {" "}
                        ৳{item?.offer_price}
                      </span>
                    </h2>
                    <p className="text-gray-600 flex items-center mt-2">
                      {item?.sku}
                    </p>
                  </div>

                  {/* Size Selection */}
                  {item?.size?.length > 0 && (
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2">
                        {item?.size?.map((size, index) => (
                          <button
                            key={index}
                            disabled={size?.stock < 1}
                            onClick={() => handleSizeClick(item, size)}
                            className={`px-3 capitalize text-xa rounded border transition-all duration-300 ${
                              size?.stock < 1
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:bg-gray-400"
                            } ${
                              selectedProduct?.id === item?.id &&
                              selectedProduct.size?.name === size?.name
                                ? "bg-black text-white"
                                : "bg-gray-200"
                            }`}
                          >
                            {size?.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            : [1, 2, 3, 4]?.map((_, index) => (
                <Skeleton count={5} key={index} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default AddOrderProductModal;
