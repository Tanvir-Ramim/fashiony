import { useEffect, useState } from "react";

import AdminProductLists from "./AdminProductLists";
import swal from "sweetalert";
import "./product.css";
import { useThrottle } from "@custom-react-hooks/use-throttle";
import Api from "../../shared/Axios/axios";
import { useNavigate, useParams } from "react-router-dom";
import { GrPowerReset } from "react-icons/gr";
const ProductList = () => {
  const [products, setProduct] = useState([]);
  console.log(products);
  const [paginateo, setPagi] = useState({});
  const [limit, setLimit] = useState(10);

  const [pag, setPag] = useState(1);

  const [title, setTitle] = useState("");
  const [sku, setKu] = useState("");
  const [categor, setCategory] = useState();
  const [brand, setBrand] = useState();
  const [fields, setFields] = useState("");
  const [color, setColor] = useState();
  const [size, setSize] = useState();
  const [orderby, setOrderby] = useState();
  const titl = useThrottle(title, 1000);
  const sk = useThrottle(sku, 1000);
  const col = useThrottle(color, 1000);
  const siz = useThrottle(size, 1000);

  const { category } = useParams();
  const navigate = useNavigate();

  const fetchData = async () => {
    const params = new URLSearchParams();

    // Adding dynamic parameters based on user input
    if (titl) params.append("title", titl);
    if (category || categor) {
      params.append("category", categor || category);
    }

    // if (brand) params.append("brand", brand);

    // if (col) params.append("color", col);
    // if (siz) params.append("size", siz);
    if (sk !== "") params.append("sku", sk);

    // Handling orderby options
    if (orderby) params.append("orderby", orderby);

    // Pagination params
    params.append("limit", limit);
    params.append("page", pag);

    try {
      const res = await Api.get(`/products?${params.toString()}&fields=`);
      if (res.status === 200) {
        setProduct(res.data.data.productByquery);
        setPagi(res.data.data.paginate);
      }
    } catch (error) {
      console.error(error);
    }
  };
  //######## reset######
  const resetFilters = () => {
    setTitle(undefined);

    setBrand(undefined);
    setFields(undefined);
    setColor(undefined);
    setSize(undefined);
    setOrderby(undefined);
    setPag(1);
    setLimit(10);
    if (category) {
      setCategory(undefined);
      navigate(`/admin/products-view/all`);
    } else {
      setCategory(undefined);
    }
    fetchData();
  };
  //data fecthing
  useEffect(() => {
    fetchData();
  }, [pag, limit, titl, category, brand, col, siz, orderby, categor, sk]);
  // ! ====> Delet Product
  useEffect(() => {
    setPag(1);
  }, [limit, titl, category, brand, col, siz, orderby, categor, sk]);
  const handleDelete = (id) => {
    //
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this product!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const res = await Api.delete(`/products`, {
            data: { pids: [id] },
          });
          resetFilters();
          if (res.status === 204) {
            swal("Your product item has been deleted !", {
              icon: "success",
            });
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        swal("Your product item is safe!");
      }
    });
  };
  const cat = [
    "Jeans",
    "T-Shirt",
    "Shirt",
    "Co-ords and Top",
    "Polo",
    "Jacket",
    "Hoodie",
    "Sweater",
    "Inner",
    "Saree",
    "Pants",
    "Dress",
  ];
  return (
    <div className="w-full ps-10  grid grid-cols-1  gap-5   justify-center  py-20   lg:py-20">
      <h3 className=" text-xl font-extrabold text-center uppercase md:text-4xl text-primary ">
        Products Details ({paginateo?.totalDocs})
      </h3>
      <div className=" w-full h-fit p-3 rounded-md shadow-md ">
        <h2 className="text-lg font-semibold mb-">Filters By</h2>
        <div className="">
          <div className="flex flex-col md:flex-row items-center mt-3 gap-5 w-full col-span-1">
            <div className="flex  items-center gap-2">
              <h2 className="text-sm flex gap-1 font-medium text-gray-700">
                Product <span>Name:</span>
              </h2>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full px-2 py-1 border rounded-md shadow-sm focus:outline-none sm:text-sm"
              />
            </div>
            <div className=" gap-2 flex items-center">
              <label className="block text-sm font-medium text-gray-700">
                SKU:
              </label>
              <input
                type="text"
                value={sku}
                onChange={(e) => setKu(e.target.value)}
                className="mt-1 block w-full px-2 py-1 border rounded-md shadow-sm focus:outline-none sm:text-sm"
              />
            </div>
            <div className=" gap-2 flex items-center ">
              <label className="block text-sm font-medium text-gray-700">
                Category:
              </label>
              <select
                value={categor}
                name="category"
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 block w-full px-2 py-1 border rounded-md shadow-sm focus:outline-none sm:text-sm"
              >
                <option value="">All Categories</option>
                {cat?.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="gap-2 flex items-center">
              <label className=" flex text-sm gap-1 font-medium text-gray-700">
                <span>Order</span> By:
              </label>
              <select
                value={orderby}
                onChange={(e) => setOrderby(e.target.value)}
                className="mt-1 block w-full px-2 py-1 border rounded-md shadow-sm focus:outline-none sm:text-sm"
              >
                <option value="">Select Order</option>
                <option value="latest">Latest</option>
                <option value="low_to_high">Price: Low to High</option>
                <option value="high_to_low">Price: High to Low</option>
                <option value="discount">Discount</option>
                <option value="in_stock">In Stock</option>
                <option value="out_stock">Out of Stock</option>
                <option value="offer">Tag : Offer </option>
                <option value="new">Tag : New </option>
                <option value="winter">Tag : Winter </option>
                <option value="summer">Tag : Summer </option>
                <option value="yearend">Tag : Year End </option>
              </select>
            </div>
            {/* <div className="gap-2 flex items-center">
              <label className=" text-sm font-medium flex gap-1 text-gray-700">
                <span>Items</span> <span>per</span> page :
              </label>
              <select
                value={limit}
                onChange={(e) => setLimit(parseInt(e.target.value))}
                className="mt-1 block w-full px-2 py-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={150}>150</option>
              </select>
            </div> */}
            <div className="">
              <button
                onClick={resetFilters}
                className="  bg-primary text-xs px-6 text-white  py-[5px] rounded-md hover:bg-red-600"
              >
                <GrPowerReset />
              </button>
            </div>
            {/* <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Size
              </label>
              <input
                type="text"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="mt-1 block w-full px-2 py-1 border rounded-md shadow-sm focus:outline-none sm:text-sm"
              />
            </div> */}
            {/* <div>
              <label className="block text-sm font-medium text-gray-700">
                Color
              </label>
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="mt-1 block w-full px-2 py-1 border rounded-md shadow-sm focus:outline-none sm:text-sm"
              />
            </div> */}
          </div>

          <div>
            {/* <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Brand
              </label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="mt-1 block w-full px-2 py-1 border rounded-md shadow-sm focus:outline-none sm:text-sm"
              >
                <option value="">All Brands</option>
                <option value="brand1">Brand 1</option>
                <option value="brand2">Brand 2</option>
              </select>
            </div> */}
          </div>
        </div>
      </div>

      <div className=" w-full ">
        <div className="w-full overflow-x-auto overflow-y-hidden ">
          <div className=" mx-auto divide-y divide-gray-200">
            <table className="  border border-gray-100 text-brand bg- ">
              <thead className="">
                <tr className="">
                  <th className="px-2 py-2 text-xs font-medium tracking-wider text-left uppercase whitespace-nowrap">
                    #SI
                  </th>
                  <th className="px-2 py-2 text-xs font-medium tracking-wider text-left uppercase whitespace-nowrap">
                    Product Info
                  </th>
                  <th className="px-2 py-2 text-xs font-medium tracking-wider text-left uppercase whitespace-nowrap">
                    Image
                  </th>
                  <th className="px-2 py-2 text-xs font-medium tracking-wider text-left uppercase whitespace-nowrap">
                    Brand
                  </th>
                  <th className="px-2 py-2 text-xs font-medium tracking-wider text-left uppercase whitespace-nowrap">
                    Tags
                  </th>
                  <th className="px-2 py-2 text-xs font-medium tracking-wider text-left uppercase whitespace-nowrap">
                    Sizes
                  </th>

                  <th className="px-2 py-2 text-xs font-medium tracking-wider text-left uppercase whitespace-nowrap">
                    SKU
                  </th>
                  <th className="px-2 py-2 text-xs font-medium tracking-wider text-left uppercase whitespace-nowrap">
                    Price
                  </th>
                  {/* <th className="px-2 py-2 text-xs font-medium tracking-wider text-left uppercase whitespace-nowrap">
                    Discount
                  </th> */}
                  <th className="px-2 py-2 text-xs font-medium tracking-wider text-left uppercase whitespace-nowrap">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {products?.map((product, index) => (
                  <AdminProductLists
                    key={product._id}
                    product={product}
                    index={index + 1}
                    handleDelete={handleDelete}
                  ></AdminProductLists>
                ))}
              </tbody>
            </table>
          </div>
        </div>{" "}
        <div className="mt-4 pagination">
          {" "}
          {/* <div className="flex justify-between mt-4">
            <button
              onClick={() => setPag((prev) => Math.max(prev - 1, 1))}
              className="bg-primary cursor-pointer text-white py-2 px-3 rounded-md"
            >
              Previous
            </button>
            <button
              onClick={() => setPag((prev) => prev + 1)}
              className="bg-primary cursor-pointer text-white py-2 px-3 rounded-md"
            >
              Next
            </button>
          </div> */}
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setPag((prev) => Math.max(prev - 1, 1))}
              disabled={!paginateo.hasPrevPage} // Disable if there is no previous page
              className={`${
                paginateo?.hasPrevPage
                  ? "bg-primary cursor-pointer"
                  : "bg-gray-300 cursor-not-allowed"
              } text-white py-1  px-3 rounded-md`}
            >
              Previous
            </button>
            <button
              onClick={() => setPag((prev) => prev + 1)}
              disabled={!paginateo?.hasNextPage} // Disable if there is no next page
              className={`${
                paginateo?.hasNextPage
                  ? "bg-primary cursor-pointer"
                  : "bg-gray-300 cursor-not-allowed"
              } text-white py-1 px-3  rounded-md`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
