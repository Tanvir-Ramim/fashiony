import { Button } from "antd";

import "../Dashboard/style.css";

import { Link } from "react-router-dom";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
const AdminProductLists = ({ product, handleDelete, index }) => {
  const {
    category,
    sku,
    title,
    brand,
    price,
    discount,
    _id,
    url,
    size,
    total_stock,
    tags,
    offer_price,
    subcategory,
  } = product;
  //
  console.log(tags);
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(!show);
  };

  return (
    <>
      <tr className={`${(index - 1) % 2 == 0 ? " bg-white  " : "bg-white  "} `}>
        <td className="px-2 py-2 text-xs text-black font-bold  capitalize whitespace-nowrap">
          {index}
        </td>
        <td className="px-2 py-2 text-xs text-black font-semibold  capitalize whitespace-nowrap">
          <div>
            <p className="flex items-center mb-1">
              Name <p className="font-bold">: {title}</p>{" "}
            </p>
            <p className="flex items-center mb-1">
              Category <span className="font-bold"> : {category}</span>{" "}
            </p>
          </div>
        </td>
        <td className="px-2 py-2 text-xs text-black font-bold  capitalize whitespace-nowrap">
          <img
            src={url[0]?.url}
            alt="product thumb.url"
            className="h-10 mx-auto"
          />
        </td>

        <td className="px-2 py-2 text-xs text-black font-bold  capitalize whitespace-nowrap">
          {brand}
        </td>
        <td className="px-2 py-2  text-xs text-black font-bold capitalize whitespace-nowrap">
          <div className="flex space-y-2 flex-col">
            {tags?.map((item, i) => (
              <span className="capitalize" key={i}>
                {item}
                {i !== tags?.length - 1 && ", "}
              </span>
            ))}
          </div>
        </td>
        <td className="px-2 py-2 text-xs text-black   capitalize whitespace-nowrap">
          <div className="w-full overflow-x-auto">
            <table className="border-collapse border border-gray-300 w-full text-left text-xs">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-1 py-[2px]">Name</th>
                  <th className="border border-gray-300 px-1 py-[2px]">
                    Stock
                  </th>
                </tr>
              </thead>
              <tbody>
                {size?.map((item, i) => (
                  <tr key={i}>
                    <td className="border border-gray-300 px-1 py-[2px]">
                      {item?.name}
                    </td>
                    <td className="border border-gray-300 px-1 py-[2px]">
                      {item?.stock}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-100 font-bold">
                  <td className="border border-gray-300 px-1 py-[2px] ">
                    Total Stock
                  </td>
                  <td className="border border-gray-300 px-1 py-[2px] ">
                    {total_stock}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </td>

        <td className="px-2 py-2 text-xs text-black font-bold  capitalize whitespace-nowrap">
          {sku}
        </td>
        <td className="px-2 py-2 text-xs text-black font-bold  capitalize whitespace-nowrap">
          <div className="space-y-2">
            <p>Regular Price : {price}</p>
            <p>Discount Price : {discount}</p>
            <p>Offer Price : {offer_price}</p>
          </div>
        </td>
        {/* <td className="px-2 py-2 text-xs text-black font-bold  capitalize whitespace-nowrap">
          {" "}
          {discount}tk
        </td> */}

        <td className="px-2 pt-2  text-xs text-black font-bold  capitalize whitespace-nowrap">
          <Link
            to={
              subcategory && subcategory !== ""
                ? `/edit-product/${brand}/${category}/${subcategory}/${title}`
                : `/edit-product/${brand}/${category}/${title}`
            }
          >
            <p className="flex items-center justify-center text-sm font-bold text-black text-primary_hov">
              {" "}
              <span className=" mb-1 text-sm  text-blue-600">
                <AiFillEdit></AiFillEdit>
              </span>
            </p>
          </Link>
          <hr />
          <p className="flex py-1 items-center justify-center text-sm font-bold text-black f  text-primary_hovz">
            <button onClick={handleShow}>
              <IoEyeOutline />
            </button>
          </p>
          <hr />
          <Button
            type="submit"
            className="flex items-center p-0 mx-auto text-sm  text-black font-bold  "
            onClick={() => handleDelete(_id)}
          >
            <span className=" text-sm text-red-500">
              <AiFillDelete></AiFillDelete>
            </span>
          </Button>
        </td>
      </tr>
      {show && (
        <div className="fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-75 flex">
          <div className="relative p-8 bg-white w-full max-w-2xl m-auto flex-col flex rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">{product?.title}</h2>

            {/* Product Images */}
            <div className="mb-4">
              <div className="flex space-x-2 overflow-x-auto">
                {product?.url?.map((image, index) => (
                  <img
                    key={index}
                    src={image?.url}
                    alt={`Product image ${index + 1}`}
                    className="w-24 h-24 object-cover rounded-lg shadow-md"
                  />
                ))}
              </div>
            </div>
            <div className="flex space-x-2 overflow-x-auto">
              <img
                src={product?.thumb?.url}
                alt={`thumb image`}
                className="w-24 h-24 object-cover rounded-lg shadow-md"
              />
            </div>
            {/* Product Information */}
            <div className="mb-4">
              <p>
                <strong>Category:</strong> {product?.category}
              </p>
              <p>
                <strong>Brand:</strong> {product?.brand}
              </p>
              <p>
                <strong>SKU:</strong> {product?.sku}
              </p>
              <p>
                <strong>Description:</strong>
                <div
                  className="md:mb-4 text-black"
                  dangerouslySetInnerHTML={{
                    __html: product?.description,
                  }}
                ></div>
              </p>
              <p>
                <strong>Price:</strong> {product?.price.toFixed(2)}tk
              </p>
              <p>
                <strong>Discount:</strong> {product?.discount}tk
              </p>
              {/* <p>
                <strong>Stock:</strong> {product?.stock}
              </p> */}
              {/* <p>
                <strong>Colors:</strong> {product?.color?.join(",")}
              </p> */}
              {/* <p>
                <strong>Sizes:</strong> {product?.size?.join(",")}
              </p> */}
              {/* <p>
                <strong>New Arrival:</strong> {product?.isNew ? "Yes" : "No"}
              </p> */}
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end">
              <Link
                to={
                  product?.subcategory && product?.subcategory !== ""
                    ? `/edit-product/${product?.brand}/${product?.category}/${product?.subcategory}/${product?.title}`
                    : `/edit-product/${product?.brand}/${product?.category}/${product?.title}`
                }
              >
                <button className="bg-white text-white font-bold py-2 px-4 rounded mr-2">
                  Edit
                </button>{" "}
              </Link>

              <button
                onClick={() => setShow(false)}
                className="bg-red-500 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminProductLists;
