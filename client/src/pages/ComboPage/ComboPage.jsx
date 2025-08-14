import React, { useEffect, useState } from "react";
import getBanner from "../../Context/ApiServices";
import ModalCombo from "./ModalCombo";
import { GoPlus } from "react-icons/go";
import { pushToDataLayer } from "../../Analytics/gtmUtils";
import ReactGA from "react-ga4";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/reduxSlice";
import { toast } from "react-toastify";
import ComboItem from "./ComboItem";
import { generateRandomCode } from "../../Utils/randomCode";

const ComboPage = () => {
  const [saleImage, setSaleImage] = useState([]);
  const [modal, setModal] = useState(false);
  const [combo, setCombo] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState({
    choice1: null,
    choice2: null,
  });
  const [quantities, setQuantities] = useState({
    choice1: { quantity: 1, totalPrice: 0 },
    choice2: { quantity: 1, totalPrice: 0 },
  });
  // console.log(saleImage[0]);
  useEffect(() => {
    getBanner(setSaleImage, "Image-Combo", "combo");
  }, []);

  const dispatch = useDispatch();

  const handleComboSubmit = (product, size) => {
    if (combo) {
      setSelectedProducts((prev) => {
        const currentProduct = prev[combo];

        // If the same product and size are selected, just update the quantity
        if (
          currentProduct &&
          currentProduct._id === product._id &&
          currentProduct.size === size
        ) {
          setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [combo]: {
              quantity: prevQuantities[combo].quantity + 1,
              totalPrice: (prevQuantities[combo].quantity + 1) * product.price,
            },
          }));
          return prev; // No need to change selectedProducts
        }

        // Otherwise, update selected product and reset the quantity
        setQuantities((prevQuantities) => ({
          ...prevQuantities,
          [combo]: {
            quantity: 1,
            totalPrice: product.price,
          },
        }));

        return {
          ...prev,
          [combo]: { ...product, size },
        };
      });
      setModal(false);
    }
  };

  const updateQuantity = (choiceKey, increment) => {
    setQuantities((prev) => {
      const newQuantity = Math.max(prev[choiceKey].quantity + increment, 1);
      const product = selectedProducts[choiceKey];
      const newTotalPrice = product ? newQuantity * product.price : 0;

      return {
        ...prev,
        [choiceKey]: {
          quantity: newQuantity,
          totalPrice: newTotalPrice,
        },
      };
    });
  };
  let isToastVisible = false;
  const handleAddToCart = () => {
    if (!selectedProducts.choice1 || !selectedProducts.choice2) {
      if (isToastVisible) return;
      isToastVisible = true;
      toast.error("Please select both Combo 1 and Combo 2 before adding to the cart.", {
        onClose: () => {
          isToastVisible = false;
        },
      });
    
      return;
    }

    if (!selectedProducts.choice1.size || !selectedProducts.choice2.size) {
      toast.error(
        "Please choose a size for both products before adding to the cart."
      );
      return;
    }
    const code = generateRandomCode("c1", 4);
    // console.log({ code });
    const cartItems = [
      {
        ...selectedProducts.choice1,
        quantity: quantities.choice1.quantity,
        total_price: quantities.choice1.totalPrice,
        selectedSize: selectedProducts.choice1.size,
        comb: code,
      },
      {
        ...selectedProducts.choice2,
        quantity: quantities.choice2.quantity,
        total_price: quantities.choice2.totalPrice,
        selectedSize: selectedProducts.choice2.size,
        comb: code,
      },
    ];

    cartItems.forEach((item) => dispatch(addToCart(item)));

    ReactGA.event("add_to_cart", {
      currency: "TK",
      items: cartItems.map((item) => ({
        item_id: item._id,
        item_name: item.title,
        price: item.total_price,
        quantity: item.quantity,
        item_category: item.category,
        item_brand: item.brand,
        item_variant: item.size,
      })),
    });

    pushToDataLayer("add_to_cart", {
      currencyCode: "TK",
      add: {
        products: cartItems.map((item) => ({
          id: item._id,
          name: item.title,
          price: item.total_price,
          quantity: item.quantity,
        })),
      },
    });
    setSelectedProducts({
      choice1: null,
      choice2: null,
    });
    toast.success("Combo added to the cart!");
  };

  return (
    <div className="py-20">
      <div>
        <img
          src={saleImage?.[0]?.url?.url}
          alt={saleImage?.[0]?.title}
          loading="lazy"
          className=" w-full object-center md:object-cover"
        />
      </div>

      <div className="py-10 container mx-auto px-5">
        <h1 className="text-[22px] pb-5 md:text-[26px] capitalize font-semibold lg:text-[30px]">
          Combo Offer
        </h1>
        <p className="text-justify">{saleImage?.[0]?.description}</p>

        <div className="py-10">
          <h1 className="text-[22px] pb-5 md:text-[26px] capitalize font-semibold lg:text-[30px]">
            Choose our Combo
          </h1>
          <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <ComboItem
                choiceKey="choice1"
                selectedProduct={selectedProducts.choice1}
                onSelect={() => {
                  setModal(true);
                  setCombo("choice1");
                }}
                onQuantityIncrease={() => updateQuantity("choice1", 1)}
                onQuantityDecrease={() => updateQuantity("choice1", -1)}
                quantity={quantities.choice1.quantity}
              />
              {selectedProducts.length > 0 && (
                <div className="text-center">
                  Total: TK {quantities.choice1.totalPrice.toFixed(2)}
                </div>
              )}
            </div>

            <div className="py-14 flex justify-center items-center">
              <GoPlus size={35} />
            </div>
            <div>
              <ComboItem
                choiceKey="choice2"
                selectedProduct={selectedProducts.choice2}
                onSelect={() => {
                  setModal(true);
                  setCombo("choice2");
                }}
                onQuantityIncrease={() => updateQuantity("choice2", 1)}
                onQuantityDecrease={() => updateQuantity("choice2", -1)}
                quantity={quantities.choice2.quantity}
              />
              {selectedProducts.length > 0 && (
                <div className="text-center">
                  Total: TK {quantities.choice2.totalPrice.toFixed(2)}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:flex-row justify-center items-center mx-auto py-5">
            <button
              onClick={handleAddToCart}
              className="w-full md:w-52 lg:w-48 text-sm lg:text-base text-black py-2 rounded border border-accent font-bold"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {modal && (
        <ModalCombo
          combo={combo}
          setModal={setModal}
          handleComboSubmit={handleComboSubmit}
        />
      )}
    </div>
  );
};

export default ComboPage;
