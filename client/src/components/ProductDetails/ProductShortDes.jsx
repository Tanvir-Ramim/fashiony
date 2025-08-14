import React from "react";
import TypeIcon from "../Icon/TypeIcon";
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { LuPackageOpen } from "react-icons/lu";
const ProductShortDes = ({
  data,
  truncated,
  quantity,
  handleAddToCart,
  handleDecrease,
  handleIncrease,
  handleSizeClick,
  error,
  setError,
  selectedSize,
  activeColorSize,
  handleView,
}) => {
  return (
    <div>
      {" "}
      {data && (
        <div className="  lg:p-5 ">
          <h2 className="md:text-4xl sm:text-2xl text-[18px] text-ash font-medium first-letter:capitalize py-2.5">
            {data?.title}
          </h2>
          <p className="text-justify py-5">
            <span className="font-bold">Description:</span>
            <div>{truncated}..</div>

            {/* <div
        className="md:mb-4 text-black"
        dangerouslySetInnerHTML={{
          __html: data?.description,
        }}
      ></div> */}
            {/* <span> {data?.description?.slice(0, 500)}</span> <br /> */}
            {data?.description?.length > 500 && (
              <span
                onClick={handleView}
                className="text-primary cursor-pointer"
              >
                View More
              </span>
            )}
          </p>
          <p className="py-5">
            {data?.discount > 0 ? (
              <div className="flex">
                <span
                  className="text-xl 
           flex items-center justify-center  text-slate-900"
                >
                  Price:
                  <TypeIcon type="taka" />
                  <span className="font-bold">
                    {" "}
                    {data?.price - data?.discount}
                  </span>
                </span>
                <span className="text-sm flex items-center   text-slate-900 line-through ml-2">
                  <TypeIcon type="taka" /> {data?.price}
                </span>
              </div>
            ) : (
              <span className="text-xl flex items-center font-bold text-slate-900">
                Price: <TypeIcon type="taka" />
                {data?.price}
              </span>
            )}
          </p>{" "}
          <p
            className="text-base flex flex-wrap text-start 
     text-lightash  "
          >
            <span>
              <span className=""> Category:</span>
              <span className="text-ash font-bold px-2.5">
                {" "}
                {data?.category}{" "}
              </span>
            </span>{" "}
          </p>
          <p className="pt-1">
            <span className=""> Status:</span>
            <span className="text-ash ">
              {" "}
              {data?.total_stock >= 1 ? (
                <span
                  className="text-ash px-2.5 font-semibold bg-[#dbdbdc] rounded-xl
             text-secondary"
                >
                  {" "}
                  In Stock
                </span>
              ) : (
                <span
                  className="text-ash px-2.5 font-semibold bg-[#dbdbdc] rounded-xl
            text-secondary"
                >
                  Out Of Stock
                </span>
              )}
            </span>
          </p>
          <p className="text-base text-start  text-lightash  py-1">
            <span className=""> SKU:</span>
            <span className="text-ash px-2.5"> {data?.sku}</span>
          </p>
          <div className="flex">
            <p className="text-base text-start  text-lightash  py-1">
              Brand:
              <span className="text-ash px-2.5 capitalize"> {data?.brand}</span>
            </p>
          </div>
          {/* {data?.color?.length > 0 && (
      <p
        className="text-base text-start flex flex-col
     text-lightash py-1"
      >
        <span className=""> Colors:</span>
        <span className="text-ash pt-2">
          {data?.color?.map((color, index) => (
            <span
              key={index}
              // onClick={() => handleSizeClick(color, "color")}
              className={`inline-block w-[2rem] h-[2rem]  rounded-[0.25rem] mr-2 ${
                activeColorSize === color
                  ? `border-4 ${
                      activeColorSize === "black"
                        ? "border-green-500"
                        : "border-black"
                    } `
                  : ""
              }`}
              style={{ backgroundColor: color }}
            ></span>
          ))}
        </span>
      </p>
    )} */}
          <div className="fl ex  py-2 gap-2 lg:px-0 items-center">
            <p className="pb-2"> Quantity:</p>
            <div className="flex  py-2 gap-2 lg:px-0 items-center">
              <button
                onClick={handleDecrease}
                className="px-2  md:py-[5px] py-[1px] bg-white text-gray-700 font-bold rounded-md hover:bg-slate-50"
              >
                <FaMinus></FaMinus>
              </button>
              <input
                type="text"
                value={quantity}
                readOnly
                className="md:w-20 w-14 md:py-[1.5px] md:h-full h-[20px] text-center rounded-md border  border-gray-200 focus:outline-none"
              />
              <button
                onClick={handleIncrease}
                className="px-2 md:py-[5px] py-[1px] bg-white text-gray-700 font-bold rounded-md hover:bg-slate-50"
              >
                <FaPlus></FaPlus>
              </button>
            </div>
          </div>
          {data?.size?.length > 0 && (
            <div className="flex items-center justify-between">
              <div className="py-4">
                <h6 className="mb-2 text-sm font-semibold uppercase">
                  Choose a size :
                </h6>
                <div className="space-x-2 space-y-1">
                  {data?.size?.map((size, index) => (
                    <button
                      title={
                        size?.stock >= 1 ? `${size?.stock}` : `Out of stock`
                      }
                      disabled={size?.stock < 1}
                      key={index}
                      onClick={() => handleSizeClick(size?.name, "size")}
                      className={`px-2 py-1 font-bold
                 uppercase rounded lg:px-3 lg:py-2  ${
                   size.stock < 1
                     ? `bg-red-300 text-white`
                     : ` hover:text-white hover:bg-gray-400`
                 }
                  
                   border-[1px] border-[#ccc]
                    cursor-pointer transition-all 
                    duration-300 ${
                      selectedSize?.includes(size?.name)
                        ? "bg-gray-900 border-2 border-red-600 text-white"
                        : `bg-gray-300 dark:bg-gray-700  text-gray-700
                         dark:text-white   font-bold mr-2 `
                    }`}
                    >
                      {size?.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
          {/* <div>
        {error && selectedSize.length <= 0 ? (
          <p className="my-2 text-xs font-semibold text-red-600 uppercase">
            {error}
          </p>
        ) : (
          ""
        )}
      </div>
      <div className="flex flex-col gap-6 lg:flex-row lg:px-10 justify-center items-center mx-auto py-5">
        <div className="w-full lg:w-1/2 px-2">
          <button
            disabled={data?.stock < 1}
            title={data?.stock > 1 ? `${data.stock}` : `Out of stock`}
            className={`w-full md:w-52 lg:w-48 text-sm lg:text-base text-black py-2 hover px-2 rounded border border-accent font-bold ${
              selectedSize.length>0 || activeColorSize
                ? "bg-transparent text-black"
                : "text-black"
            }`}
            onClick={() => {
             
              if (
                selectedSize?.length <= 0 &&
                data?.color?.length <= 0
              ) {
                handleAddToCart(); 
                return;
              }


              if (data?.size?.length > 0 &&   selectedSize?.length <= 0) {
                setError("Choose a size first");
                return;
              }

              
              if (
                data?.size?.length > 0 &&
                selectedSize?.length <= 0
                 ||
                (data?.color?.length > 0 && !activeColorSize)
              ) {
                setError("Choose a size  first");
                return;
              }

            
              handleAddToCart();
            }}
          >
        
            {data?.size?.length <= 0 && data?.color?.length <= 0
              ? "Add to Cart"
              :   selectedSize?.length <= 0 && data?.size?.length > 0
              ? ||
                  (!activeColorSize && data?.color?.length > 0)
                "Choose a size "
              : "Add to Cart"}
          </button>
        </div>
      </div> */}
          <div>
            {error !== "" && (
              <p className="my-2 text-xs font-semibold text-red-600 uppercase">
                {error}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-6 lg:flex-row lg:px-10 justify-center items-center mx-auto py-5">
            <div className="w-full lg:w-1/2 px-2">
              <button
                disabled={data?.total_stock < 1}
                title={data?.total_stock > 1 ? `Stock ${data?.total_stock}` : `Out of stock`}
                className={`w-full md:w-52 lg:w-48 text-sm lg:text-base text-black py-2 hover:px-2 rounded border border-accent font-bold ${
                  selectedSize.length === 0 || activeColorSize
                    ? "bg-transparent text-black"
                    : "text-black"
                }`}
                onClick={() => {
                  if (selectedSize?.length === 0) {
                    // Ensure this sets the error state
                    setError("Choose a size first");
                    return;
                  }

                  // Clear the error if a size is selected
                  setError(null);

                  // Proceed with adding to cart if a size is selected
                  handleAddToCart();
                }}
              >
                {selectedSize.length === 0 ? "Choose a size" : "Add to Cart"}
              </button>
            </div>
          </div>
          <div>
            <div>
              <h1 className="flex font-nunito text-[18px]  items-center gap-3">
                <span className="bg-[#dbdbdc] p-1 rounded-full">
                  {" "}
                  <LuPackageOpen />{" "}
                </span>
                7 days return package{" "}
                <div className="has-tooltip relative">
                  <HiMiniQuestionMarkCircle />
                  <span
                    className="tooltip  rounded shadow-xl p-1 w-52
             bg-gray-800 text-white mt-0 right-10 "
                  >
                    You can exchange your products. if you are not use and not
                    wash and crash and etc..
                  </span>
                </div>
              </h1>
            </div>
            {data?.thumb && (
              <div className="pt-10  ">
                <div className="has-tooltip z-1 relative">
                  <img
                    src={data?.thumb?.url}
                    alt="Size Chart"
                    className="object-cover w-full "
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductShortDes;
