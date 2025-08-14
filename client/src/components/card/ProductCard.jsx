import TypeIcon from "../Icon/TypeIcon";
import { Link } from "react-router-dom";
import { AiOutlineWarning } from "react-icons/ai";

const ProductCard = ({ item, discountPercentage }) => {
  // console.log(item);
  return (
    <div>
      <div
        className="relative w-[220px] sm:w-[260px] md:w-[240px] lg:w-[280px] 2xl:w-[300px] group hover:-translate-y-2 transition-all
       m -10 w- full overflow-hidden round ed-lg bg-white sha dow-md"
      >
        <Link
          to={
            item?.subcategory && item?.subcategory !== ""
              ? `/shop/${item?.brand}/${item?.category}/${item?.subcategory}/${item?.title}`
              : `/shop/${item?.brand}/${item?.category}/${item?.title}`
          }
        >
          <div className=" relative w-full ">
            <img
              className="  h-auto w-full   object -center round ed-t-lg object -cover"
              src={item?.url[0]?.url}
              alt={item?.title}
              loading="lazy"
            />
            {/* {item?.tags?.includes("new") && (
              <span className="absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 bg-black text-center text-sm text-white">
                New
              </span>
            )} */}
      {item?.tags?.length > 0 &&
  item.tags.map((tag, index) => {
    // Define fixed positions for each index
    const positions = [
      { bottom: "68px", left: "0px" }, // First tag position
      { bottom: "48px", left: "0px" }, // Second tag position
      { bottom: "48px", right: "1px" }, // Third tag position
    ];

    // Define a background color for each tag type
    const backgroundColors = {
      new: "black",
      offer: "#2D3896",
      summer: "#B9A36B",
    };

    return (
      <span
        key={index}
        className={`absolute px-2 rounded text-xs text-center text-white`}
        style={{
          ...positions[index],
          backgroundColor: backgroundColors[tag] || "gray", // Default color if tag is unknown
        }}
      >
        {tag?.charAt(0)?.toUpperCase() + tag?.slice(1)} {/* Capitalize first letter */}
      </span>
    );
  })}

            {/* {item?.tags?.includes("summer") && (
              <span className="absolute bottom-2 right-1 px-2 rounded   bg-[#B9A36B] text-center text-sm text-white">
                Summer
              </span>
            )} */}
            {item?.discount > 0 && (
              <span className="absolute top-0 flex right-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                <TypeIcon type="barrowDown" size={20} />
                {discountPercentage}% off
              </span>
            )}
            <div
              className="absolute inset-x-0  bottom-[0px] transform
         translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:bg-gray-700
          group-hover:opacity-100 transition-all duration-300"
            >
              {item?.total_stock >= 1 ? (
                <Link
                  to={
                    item?.subcategory && item?.subcategory !== ""
                      ? `/shop/${item?.brand}/${item?.category}/${item?.subcategory}/${item?.title}`
                      : `/shop/${item?.brand}/${item?.category}/${item?.title}`
                  }
                  className="flex items-center w- auto full justify-center 
               rounded-md  px-5 py-2.5 text-center 
               text-sm font-medium text-white 
                bg-transparent transition duration-300 hover:duration-300
                 b order -accent bord er-[1px]"
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
                  className="flex cursor-default items-center w- auto full justify-center 
                rounded-md px-5 py-2.5 text-center text-sm font-medium 
                bg-transparent border-accent border-[1px] text-gray-500
                hover:bg-red-600 hover:text-white transition duration-300 hover:duration-300"
                >
                  <AiOutlineWarning className="mr-2 h-6 w-6" />
                  Out Of Stock
                </div>
              )}
            </div>
          </div>
        </Link>

        {/* Hover Add to Cart Button */}

        <div className="mt-4 px -5 pb-5">
          <div className="">
            <Link
              to={
                item?.subcategory && item?.subcategory !== ""
                  ? `/shop/${item?.brand}/${item?.category}/${item?.subcategory}/${item?.title}`
                  : `/shop/${item?.brand}/${item?.category}/${item?.title}`
              }
            >
              <h5 className="text-[14px] font-semibold tracking-tight text-slate-900">
                {item?.title?.slice(0, 80)}
              </h5>
            </Link>
          </div>

          <div className="flex mt-5 mb-5 items-center justify-between">
            <p>
              {item?.discount > 0 ? (
                <div className="flex">
                  <span
                    className="text-xl flex items-center justify-center 
                   text-slate-900"
                  >
                    <TypeIcon type="taka" />
                    {item?.offer_price}
                  </span>
                  <span className="text-sm flex items-center text-slate-900 line-through ml-2">
                    <TypeIcon type="taka" /> {item?.price}
                  </span>
                </div>
              ) : (
                <span className="text-xl flex items-center  text-slate-900">
                  <TypeIcon type="taka" />
                  {item?.price}
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
