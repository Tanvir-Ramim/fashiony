import React from "react";
import TypeIcon from "../Icon/TypeIcon";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/reduxSlice";
import PropTypes from "prop-types";
import { AiOutlineWarning } from "react-icons/ai";
const ProductListView = ({ item, discountPercentage, discountedPrice }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <div
        className="flex gap-6 overflow-hidden border rounded  hover:-translate-y-2 
      transition-all cursor-pointer"
      >
        <div
          className=" relative  bg-gray-100 p-3 overflow-hidden 
        aspect-w-16 aspect-h-8 rounded-lg"
        >
          <Link
            to={
              item?.subcategory && item?.subcategory !== ""
                ? `/shop/${item?.brand}/${item?.category}/${item?.subcategory}/${item?.title}`
                : `/shop/${item?.brand}/${item?.category}/${item?.title}`
            }
          >
            <img
              className="h-72 w-72 object- top rounded-t-lg object-cover"
              src={item?.url?.[0]?.url}
              alt={item?.title}
              loading="lazy"
            />
          </Link>
          {item?.isNew === true && (
            <span className="absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 bg-black text-center text-sm text-white">
              New
            </span>
          )}
          {item?.discount > 0 && (
            <span className="absolute top-0 flex right-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
              <TypeIcon type="barrowDown" size={20} />
              {discountPercentage}% off
            </span>
          )}
        </div>

        <div>
          <div className="mt-4 px-2 lg:px-5 pb-5">
            <Link
              to={
                item?.subcategory && item?.subcategory !== ""
                  ? `/shop/${item?.brand}/${item?.category}/${item?.subcategory}/${item?.title}`
                  : `/shop/${item?.brand}/${item?.category}/${item?.title}`
              }
            >
              <h5 className="text-[20px] font-semibold tracking-tight text-slate-900">
                {item?.title}
              </h5>
            </Link>

            <div className="flex my-3 items-center justify-between">
              <p>
                {item?.discount > 0 ? (
                  <div className="flex">
                    <span className="text-xl  flex items-center justify-center font-bold text-slate-900">
                      <TypeIcon type="taka" />
                      {discountedPrice?.toFixed(0)}
                    </span>
                    <span className="text-sm flex items-center  text-slate-900 line-through ml-2">
                      <TypeIcon type="taka" /> {item.price.toFixed(0)}
                    </span>
                  </div>
                ) : (
                  <span className="text-xl flex items-center font-bold text-slate-900">
                    <TypeIcon type="taka" />
                    {item.price.toFixed(0)}
                  </span>
                )}
              </p>
            </div>
            <div>
              <p
                className="text-base flex flex-wrap text-start 
               text-lightash  "
              >
                <span>
                  <span className=""> Category:</span>
                  <span className="text-ash  px-2.5"> {item?.category} </span>
                </span>{" "}
                {/* <span className="text-ash ">
                  {" "}
                  {item?.stock > 1 ? (
                    <span
                      className="text-ash px-2.5 bg-[#dbdbdc] rounded-xl
                       text-secondary"
                    >
                      {" "}
                      In Stock
                    </span>
                  ) : (
                    <span
                      className="text-ash px-2.5 font-bold text-[12px] bg-[#dbdbdc] rounded-xl
                      text-secondary"
                    >
                      Out Of Stock
                    </span>
                  )}
                </span> */}
              </p>

              <p className="text-base text-start  text-lightash  py-1">
                <span className=""> Squ:</span>
                <span className="text-ash px-2.5"> {item?.sku}</span>
              </p>
              <p
                className="text-base text-start  text-lightash 
               py-1"
              >
                <span className=""> Brand:</span>
                <span className="text-ash px-2.5"> {item?.brand}</span>
              </p>
              <p
                className="text-base text-start flex gap-3 items-center
               text-lightash pb-1"
              >
                <span className=""> Colors:</span>
                <span className="text-ash  mt-1">
                  {item?.color?.map((color, index) => (
                    <span
                      key={index}
                      className="inline-block w-[1rem] h-[1rem]  rounded-[0.25rem] full  mr-2"
                      style={{ backgroundColor: color }}
                    ></span>
                  ))}
                </span>
              </p>
            </div>

            {/* <div className="w-40 mt-5 ">
              <button
                title={item?.stock > 1 ? `` : `Out of  Stock`}
                disabled={item?.stock > 1 ? false : true}
                onClick={() => dispatch(addToCart(item))}
                className="flex 
                items-center w-40 justify-center 
                 rounded-md text-black
                 bg-slate-300 lg:px-3 py-2
                  text-center text-sm font-medium hover:text-white
                  hover:bg-gray-700 "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Add to cart
              </button>
            </div> */}
            <div className="w-40 mt-3 ">
              {item?.stock > 1 ? (
                <Link
                  to={
                    item?.subcategory && item?.subcategory !== ""
                      ? `/shop/${item?.brand}/${item?.category}/${item?.subcategory}/${item?.title}`
                      : `/shop/${item?.brand}/${item?.category}/${item?.title}`
                  }
                  className="flex items-center w-40 justify-center 
               rounded-md hover:bg-gray-700  px-5 py-2 text-center 
               text-sm font-medium hover:text-white  bg-transparent transition duration-300 hover:duration-300 border-accent border-[1px]
               "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Add to cart
                </Link>
              ) : (
                <div
                  className="flex cursor-default items-center w-40 justify-center 
    rounded-md px-5 py-2 text-center text-sm font-medium 
    bg-transparent border-accent border-[1px] text-gray-500
    hover:bg-red-600 hover:text-white transition duration-300 hover:duration-300"
                >
                  <AiOutlineWarning className="mr-2 h-6 w-6" />
                  Out Of Stock
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListView;
