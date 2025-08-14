import { FaMinus, FaPlus } from "react-icons/fa";
import { GoPlus } from "react-icons/go";

const ComboItem = ({
  choiceKey,
  selectedProduct,
  onSelect,
  onQuantityIncrease,
  onQuantityDecrease,
  quantity,
}) => (
  <div>
    <div
      onClick={onSelect}
      className="border md:max-w-72 h-72 cursor-pointer flex flex-col justify-center items-center rounded"
    >
      {selectedProduct ? (
        <img
          src={selectedProduct.url[0]?.url}
          alt={selectedProduct.title}
          className="w-full h-72 object-cover object-top rounded"
        />
      ) : (
        <>
          <div className="bg-black w-7 h-7 mb-2 mx-auto flex justify-center items-center rounded-full text-white">
            <GoPlus size={25} />
          </div>
          <h5>{`Add Your ${
            choiceKey === "choice1" ? "Combo 1" : "Combo 2"
          }`}</h5>
        </>
      )}
    </div>

    {selectedProduct && (
      <div className="py-2">
        <h1 className="font-semibold">{selectedProduct.title}</h1>
        <p>
          <span className="font-semibold">Size:</span> {selectedProduct.size}
        </p>
        <p>
          <span className="font-semibold">SKU:</span> {selectedProduct.sku}
        </p>
        <p>
          <span className="font-semibold">Price:</span> {selectedProduct.price}
        </p>
        <div className="flex py-2 gap-2 items-center">
          <p className="pb-2">Quantity:</p>
          <div className="flex items-center gap-2">
            <button
              onClick={onQuantityDecrease}
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
              onClick={onQuantityIncrease}
              className="px-2 bg-white text-gray-700 font-bold rounded-md hover:bg-slate-50"
            >
              <FaPlus />
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);

export default ComboItem;
