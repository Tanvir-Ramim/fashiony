// import React, { useEffect, useState } from "react";
// import { getProducts } from "../../Context/ApiServices";
// import TypeIcon from "../../components/Icon/TypeIcon";

// const ModalCombo = ({ combo, setModal, handleComboSubmit }) => {
//   const [comboProduct, setComboProduct] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [limit, setLimit] = useState(10);
//   const [page, setPage] = useState(1);
//   // console.log(combo);
//   useEffect(() => {
//     if (loading) return;
//     setLoading(true);
//     getProducts(
//       setComboProduct,
//       "",
//       "",
//       "",
//       "",
//       "",
//       "",
//       "",
//       "",
//       combo,
//       true,
//       limit,
//       page
//     ).then(() => setLoading(false));
//   }, [combo, limit, page]);

//   const handleSizeClick = (product, size) => {
//     // Immediately update parent state and close modal
//     handleComboSubmit(product, size.name);
//     setModal(false);
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-5 relative">
//         {/* Close Button */}
//         <button
//           onClick={() => setModal(false)}
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
//         >
//           &#x2715;
//         </button>
//         <h1 className="text-2xl font-bold text-center mb-6">
//           Select Your {combo}
//         </h1>

//         {/* Product List */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {comboProduct?.map((item, i) => (
//             <div
//               key={i}
//               className={`bg-white w- 40 rounded-lg shadow-md p-3 ${
//                 selectedProduct?.id === item.id ? "border-2 border-black" : ""
//               }`}
//               onClick={() => setSelectedProduct(item)}
//             >
//               <div className="relative">
//                 <img
//                   src={item?.url[0]?.url}
//                   alt={item?.title}
//                   className="rounded-lg w-full object-cover"
//                   loading="lazy"
//                 />
//               </div>
//               <h5 className="mt-4 font-semibold text-gray-800">
//                 {item?.title?.slice(0, 50)}
//               </h5>
//               <p className="text-gray-600 flex items-center mt-2">
//                 <TypeIcon type="taka" /> {item?.price}
//               </p>

//               {/* Size Selection */}
//               {item?.size?.length > 0 && (
//                 <div className="mt-4">
//                   <div className="flex flex-wrap gap-2">
//                     {item?.size?.map((size, index) => (
//                       <button
//                         key={index}
//                         disabled={size.stock < 1}
//                         onClick={() => handleSizeClick(item, size)} // Update on size click
//                         className={`px-3 py-1 text-sm rounded border transition-all duration-300 ${
//                           size.stock < 1
//                             ? "opacity-50 cursor-not-allowed"
//                             : "hover:bg-gray-400"
//                         } ${
//                           selectedProduct?.id === item.id &&
//                           selectedProduct.size?.name === size.name
//                             ? "bg-black text-white"
//                             : "bg-gray-200"
//                         }`}
//                       >
//                         {size.name}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Pagination */}
//         <div className="mt-6 flex justify-center items-center gap-4">
//           <button
//             disabled={page <= 1}
//             onClick={() => setPage((prev) => prev - 1)}
//             className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50"
//           >
//             Previous
//           </button>
//           <button
//             onClick={() => setPage((prev) => prev + 1)}
//             className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ModalCombo;
import React, { useEffect, useState } from "react";
import { getProducts } from "../../Context/ApiServices";
import TypeIcon from "../../components/Icon/TypeIcon";

const ModalCombo = ({ combo, setModal, handleComboSubmit }) => {
  const [comboProduct, setComboProduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const [hasMore, setHasMore] = useState(true);


  useEffect(() => {
    if (loading) return;
    setLoading(true);

    getProducts(
      (products) => {
        setComboProduct(products);
        setHasMore(products.length === limit);
      },
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      combo,
      true,
      limit,
      page
    ).then(() => setLoading(false));
  }, [combo, limit, page]);

  const handleSizeClick = (product, size) => {
    handleComboSubmit(product, size.name);
    setModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-5 relative">
        {/* Close Button */}
        <button
          onClick={() => setModal(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          &#x2715;
        </button>
        <h1 className="text-[17px] lg:text-2xl font-bold text-center mb-6">
          Select Your {combo}
        </h1>

        {/* Product List */}
        <div
          className="grid grid-cols-1 overflow-hidden h-80 md:h-full 
        overflow-y-auto  sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-6"
        >
          {comboProduct?.map((item, i) => (
            <div
              key={i}
              className={`bg-white rounded-lg  shadow-md p-3 ${
                selectedProduct?.id === item.id ? "border-2 border-black" : ""
              }`}
              onClick={() => setSelectedProduct(item)}
            >
              <div className="relative ">
                <img
                  src={item?.url[0]?.url}
                  alt={item?.title}
                  className="rounded-lg lg:h-[106px] object-top h-[141px] md:h-[206px] w-full object-cover"
                  loading="lazy"
                />
              </div>
              <h5 className="mt-4 font-semibold text-gray-800">
                {item?.title?.slice(0, 50)}
              </h5>
              <p className="text-gray-600 flex items-center mt-2">
                <TypeIcon type="taka" /> {item?.price}
              </p>

              {/* Size Selection */}
              {item?.size?.length > 0 && (
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {item?.size?.map((size, index) => (
                      <button
                        key={index}
                        disabled={size.stock < 1}
                        onClick={() => handleSizeClick(item, size)} // Update on size click
                        className={`px-3 py-1 text-sm rounded border transition-all duration-300 ${
                          size.stock < 1
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-gray-400"
                        } ${
                          selectedProduct?.id === item.id &&
                          selectedProduct.size?.name === size.name
                            ? "bg-black text-white"
                            : "bg-gray-200"
                        }`}
                      >
                        {size.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-center items-center gap-4">
          <button
            disabled={page <= 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            disabled={!hasMore}
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalCombo;
