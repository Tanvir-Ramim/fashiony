import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const AddNewProduct = ({
  selectedProduct,
  handleQuantityChange,
  quantity,
  setQuantity,
  size,
}) => {
  console.log(selectedProduct);
  const isValid = selectedProduct && selectedProduct?.url?.length > 0;
  return (
    <div className="flex  gap-2">
      <div className="border w-[130px] h-[150px] cursor-pointer flex flex-col justify-center items-center rounded">
        {isValid && (
          <img
            src={selectedProduct?.url[0]?.url}
            alt={selectedProduct?.title}
            className="w-full h-full object-cover rounded"
          />
        )}
      </div>

      {selectedProduct && (
        <div className="">
          <h1 className="font-semibold">{selectedProduct?.title}</h1>
          <p>
            <span className="font-semibold">Size:</span> {size}
          </p>
          <p>
            <span className="font-semibold">SKU:</span> {selectedProduct?.sku}
          </p>
          <p>
            <span className="font-semibold">Price:</span>{" "}
          { selectedProduct?.discount>0&& <span className="line-through text-xs">{selectedProduct?.price}</span> }  { selectedProduct?.offer_price}
          </p>

          <div className="flex  gap-1  items-center">
            <p className=" font-semibold">Quantity :</p>
            <div className="flex shadow  py-[1px]  items-center gap-2">
              <button
                onClick={() =>
                  handleQuantityChange("decrease", quantity, setQuantity)
                }
                className="px-2 bg-white text-gray-700 font-bold rounded-md hover:bg-slate-50"
              >
                <FaMinus />
              </button>
              <input
                type="text"
                value={quantity}
                readOnly
                className="w-14 text-center rounded-md border border-gray-200 focus:outline-none"
              />
              <button
                onClick={() =>
                  handleQuantityChange("increase", quantity, setQuantity)
                }
                className="px-2 bg-white text-gray-700 font-bold rounded-md hover:bg-slate-50"
              >
                <FaPlus />
              </button>
            </div>
          </div>
          {
            <p>
              <span className="font-semibold">Total Price:</span>{" "}
              {selectedProduct?.offer_price * quantity}
            </p>
          }
        </div>
      )}
    </div>
  );
};

export default AddNewProduct;
