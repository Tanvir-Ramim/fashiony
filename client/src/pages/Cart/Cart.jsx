import { useEffect, useState } from "react";

import { FaPlus, FaMinus } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import "./Cart.css";

import nogod from "../../assets/payment/nogod.png";
import bkash from "../../assets/payment/bkash.png";
import visa from "../../assets/payment/visa.png";
import master from "../../assets/payment/master.png";
import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import ReactGA from "react-ga4";
import {
  decreaseQuantity,
  increaseQuantity,
  removeComboProduct,
  removeFromCart,
} from "../../redux/reduxSlice";
import { pushToDataLayer } from "../../Analytics/gtmUtils";
import { AiFillDelete } from "react-icons/ai";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartProducts = useSelector((state) => state?.reduxSlice?.product);
  const [totalQuant, setTotalQuantity] = useState(0);
  const [mainTotalPrice, setMainTotalPrice] = useState(0);
  const [mainDiscountTotalPrice, setMainDiscountTotalPrice] = useState(0);
  // console.log(cartProducts);
  useEffect(() => {
    if (!cartProducts || cartProducts.length <= 0) {
      navigate("/shop");
      return;
    }

    // Send view_cart event to GA4
    ReactGA.event("view_cart", {
      currency: "TK", // Set the currency
      value: mainTotalPrice - mainDiscountTotalPrice, // Total cart value
      items: cartProducts.map((item) => ({
        item_id: item._id, // Product ID
        item_name: item.title, // Product name
        price: item.price, // Product price
        quantity: item.quantity, // Quantity in cart
        item_category: item.category, // Optional: Category of the product
        item_brand: item.brand, // Optional: Brand of the product
        item_variant: item.selectedSize, // Optional: Size or variant
      })),
    });

    // Push event to GTM
    pushToDataLayer("view_cart", {
      currencyCode: "TK",
      totalProductQuantity: totalQuant,
      total_price: mainTotalPrice - mainDiscountTotalPrice,
      products: cartProducts.map((item) => ({
        id: item._id,
        name: item.title,
        price: item.price,
        quantity: item.quantity,
        category: item.category,
        brand: item.brand,
        variant: item.selectedSize,
      })),
    });
  }, [
    cartProducts,
    mainDiscountTotalPrice,
    mainTotalPrice,
    totalQuant,
    navigate,
  ]);
  useEffect(() => {
    const calculatedMainTotalPrice = cartProducts?.reduce((prev, item) => {
      return prev + item.price * item.quantity;
    }, 0);

    const calculatedMainDiscountTotalPrice = cartProducts?.reduce(
      (prev, item) => {
        return prev + item.discount * item.quantity;
      },
      0
    );
    const totalQuantity = cartProducts?.reduce((prev, item) => {
      return prev + item.quantity;
    }, 0);
    setTotalQuantity(totalQuantity);
    setMainTotalPrice(calculatedMainTotalPrice);
    setMainDiscountTotalPrice(calculatedMainDiscountTotalPrice);
  }, [cartProducts]);

  const handleClickEvent = () => {
    // Send begin_checkout event to GA4
    ReactGA.event("begin_checkout", {
      currency: "TK",
      value: mainTotalPrice - mainDiscountTotalPrice,
      items: cartProducts.map((item) => ({
        item_id: item._id,
        item_name: item.title,
        price: item.price,
        quantity: item.quantity,
        item_category: item.category,
        item_brand: item.brand,
        item_variant: item.selectedSize,
      })),
    });

    // Push event to GTM
    pushToDataLayer("begin_checkout", {
      currencyCode: "TK",
      totalProductQuantity: totalQuant,
      total_price: mainTotalPrice - mainDiscountTotalPrice,
      products: cartProducts.map((item) => ({
        id: item._id,
        name: item.title,
        price: item.price,
        quantity: item.quantity,
        category: item.category, // Optional
        brand: item.brand, // Optional
        variant: item.selectedSize, // Optional
      })),
    });
  };

  const comboProduct = cartProducts?.filter((item) => {
    if (item?.isCombo) {
      return item;
    }
    return null;
  });

  const regularProduct = cartProducts?.filter((item) => {
    if (!item?.isCombo) {
      return item;
    }
    return null;
  });
  const comboDelete = (combo) => {
    dispatch(
      removeComboProduct({
        combo,
      })
    );
  };

  return (
    <div className="bg-[#F7F5EF] pt-32 lg:pt-28 py-20 ">
      <div className="container mx-auto py-10 text-center underline">
        <h1 className="text-2xl font-bold">Cart</h1>
      </div>
      <div className=" flex justify-between xl:container  xl:px-10 px-4  mx-auto lg:flex-row flex-col gap-7 ">
        <div className="lg:w-[65%] w-full overflow-auto max-h-[600px] space-y-6">
          {comboProduct?.length > 0 && (
            <div className="shadow bg-gray-200 border-b-2 p-3 rounded">
              {/* <h1 className="capitalize text-black font-semibold pb-2">
                                    Combo Packages
                                  </h1> */}

              {comboProduct &&
                Object?.entries(
                  comboProduct?.reduce((acc, item) => {
                    if (!acc[item.comb]) {
                      acc[item.comb] = [];
                    }
                    acc[item.comb].push(item);
                    return acc;
                  }, {})
                ).map(([combKey, items], index) => (
                  <div key={combKey} className="mb-4">
                    <h2 className="capitalize text-black font-semibold pb-2">
                      Combo {index + 1}
                    </h2>
                    {items?.map((item, i) => (
                      <div key={i} className="element rounded-lg">
                        <div className="flex lg:gap-4 gap-3">
                          <div className="w-[14rem] lg:w-[16rem] md:gap-4 flex items-center md:h-[10rem] h-[13rem]">
                            <div className="lg:block hidden">
                              <AiFillDelete
                                onClick={() => comboDelete(item?.comb)}
                                className="text-2xl  text-red-500 cursor-pointer font-bold"
                              />
                            </div>
                            <div className="lg:w-[15rem]">
                              <img
                                className="w-full h-[12rem] lg:h-[10rem] object-contain md:rounded-none rounded-tl-lg"
                                src={item?.url?.[0]?.url}
                                alt={item?.title}
                              />
                            </div>
                          </div>
                          <div className="mt-1 w-full">
                            <h1 className="flex w-full gap-1 justify-between">
                              <h2 className="md:text-[18px] text-[15px] line-clamp-3 md:py- font-semibold">
                                {item?.title}
                              </h2>
                              <h2 className="py-1 px-2">
                                <RxCross1
                                  onClick={() => comboDelete(item?.comb)}
                                  className="text-sm lg:hidden block cursor-pointer font-bold"
                                />
                              </h2>
                            </h1>

                            <div className="flex gap-3">
                              <div>
                                {item?.selectedSize && (
                                  <p className="lg:pt-1.5 md:text-base text-sm">
                                    Size : {item?.selectedSize}
                                  </p>
                                )}
                                {item?.selectColor && (
                                  <p className="lg:pt-1 md:text-base text-sm">
                                    Color : {item?.selectColor}
                                  </p>
                                )}
                              </div>
                            </div>

                            <h2 className="flex py-2 gap-2 lg:px-0 items-center">
                              <button
                                onClick={() => dispatch(decreaseQuantity(item))}
                                className="px-2 md:py-[5px] py-[1px] bg-white text-gray-700 font-bold rounded-md hover:bg-slate-50"
                              >
                                <FaMinus />
                              </button>
                              <input
                                type="text"
                                value={item?.quantity}
                                readOnly
                                className="md:w-20 w-14 md:py-[1.5px] md:h-full h-[20px] text-center rounded-md border border-gray-200 focus:outline-none"
                              />
                              <button
                                onClick={() => dispatch(increaseQuantity(item))}
                                className="px-2 md:py-[5px] py-[1px] bg-white text-gray-700 font-bold rounded-md hover:bg-slate-50"
                              >
                                <FaPlus />
                              </button>
                            </h2>

                            <div className="flex justify-between md:gap-8 md:flex-row flex-col">
                              <p className="font-norma md:text-base text-sm">
                                Discount:{" "}
                                <span className="mr-2 font-medium">
                                  ৳{item?.discount}
                                </span>
                              </p>
                              <h2 className="md:pt-0 py-1 md:text-base text-sm items-center">
                                <span className="lg:hidden">Price: </span>
                                {item?.discount > 0 && (
                                  <span className="line-through ml-1 text-gray-500">
                                    {" "}
                                    ৳{item?.price}
                                  </span>
                                )}
                                <span className="font-semibold">
                                  {" "}
                                  ৳{item?.price - item?.discount}
                                </span>
                              </h2>
                            </div>

                            <p className="md:mb-2 pb-1 font-norma md:text-base text-sm">
                              SKU : {item?.sku}
                            </p>
                          </div>
                        </div>

                        <p className="font-medium md:text-base hidden text-sm block p-2 md:hidden">
                          Available for immediate delivery, delivery time
                          (domestic) approx. 2-5 working days
                        </p>
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          )}
          {regularProduct?.map((item, i) => (
            <div key={i} className="element rounded-lg">
              <div className="flex lg:gap-4 gap-3">
                <div className="w-[14rem] lg:w-[16rem] md:gap-4 flex items-center md:h-[10rem] h-[13rem]">
                  <div className="lg:block hidden">
                    <AiFillDelete
                      onClick={() => {
                        dispatch(
                          removeFromCart({
                            productId: item?._id,
                            selectedSize: item?.selectedSize,
                          })
                        );
                        pushToDataLayer("remove_from_cart", {
                          id: item?._id,
                          name: item?.title,
                          price: item?.price,
                          quantity: item?.quantity,
                        });
                      }}
                      className="text-2xl  text-red-500 cursor-pointer font-bold"
                    />
                  </div>
                  <div className="lg:w-[15rem]">
                    <img
                      className="w-full h-[12rem] lg:h-[10rem] object-contain md:rounded-none rounded-tl-lg"
                      src={item?.url?.[0]?.url}
                      alt={item?.title}
                    />
                  </div>
                </div>
                <div className="mt-1 w-full">
                  <h1 className="flex w-full gap-1 justify-between">
                    <h2 className="md:text-[18px] text-[15px] line-clamp-3 md:py- font-semibold">
                      {item?.title}
                    </h2>
                    <h2 className="py-1 px-2">
                      <RxCross1
                        onClick={() =>
                          dispatch(
                            removeFromCart({
                              productId: item?._id,
                              selectedSize: item?.selectedSize,
                            })
                          )
                        }
                        className="text-sm lg:hidden block cursor-pointer font-bold"
                      />
                    </h2>
                  </h1>

                  <div className="flex gap-3">
                    <div>
                      {item?.selectedSize && (
                        <p className="lg:pt-1.5 md:text-base text-sm">
                          Size : {item?.selectedSize}
                        </p>
                      )}
                      {item?.selectColor && (
                        <p className="lg:pt-1 md:text-base text-sm">
                          Color : {item?.selectColor}
                        </p>
                      )}
                    </div>
                  </div>

                  <h2 className="flex py-2 gap-2 lg:px-0 items-center">
                    <button
                      onClick={() => dispatch(decreaseQuantity(item))}
                      className="px-2 md:py-[5px] py-[1px] bg-white text-gray-700 font-bold rounded-md hover:bg-slate-50"
                    >
                      <FaMinus />
                    </button>
                    <input
                      type="text"
                      value={item?.quantity}
                      readOnly
                      className="md:w-20 w-14 md:py-[1.5px] md:h-full h-[20px] text-center rounded-md border border-gray-200 focus:outline-none"
                    />
                    <button
                      onClick={() => dispatch(increaseQuantity(item))}
                      className="px-2 md:py-[5px] py-[1px] bg-white text-gray-700 font-bold rounded-md hover:bg-slate-50"
                    >
                      <FaPlus />
                    </button>
                  </h2>

                  <div className="flex justify-between md:gap-8 md:flex-row flex-col">
                    <p className="font-norma md:text-base text-sm">
                      Discount:{" "}
                      <span className="mr-2 font-medium">
                        ৳{item?.discount}
                      </span>
                    </p>
                    <h2 className="md:pt-0 py-1 md:text-base text-sm items-center">
                      <span className="lg:hidden">Price: </span>
                      {item?.discount > 0 && (
                        <span className="line-through ml-1 text-gray-500">
                          {" "}
                          ৳{item?.price}
                        </span>
                      )}
                      <span className="font-semibold">
                        {" "}
                        ৳{item?.price - item?.discount}
                      </span>
                    </h2>
                  </div>

                  <p className="md:mb-2 pb-1 font-norma md:text-base text-sm">
                    SKU : {item?.sku}
                  </p>
                </div>
              </div>

              <p className="font-medium md:text-base hidden text-sm block p-2 md:hidden">
                Available for immediate delivery, delivery time (domestic)
                approx. 2-5 working days
              </p>
            </div>
          ))}
        </div>

        {/* line */}
        <div className="hidden  items- mt-24 lg:flex ">
          <div className="h-[300px] border-l border-[1px] border-[#989898]"></div>
        </div>
        {/* check out page */}

        <div className="p-4 h-fit lg:w-[30%]  w-full  border bg-white rounded-md">
          <h2 className="text-lg font-semibold ">Total Cost</h2>
          <hr className=" border-gray-400 my-2" />
          <div className="space-y-2 mt-3">
            {cartProducts?.map((item, i) => {
              // console.log(item);
              return (
                <div key={i} className="flex justify-between">
                  <div className="font-medium text-[14px] flex items-center gap-2">
                    {item?.title}
                    <span>
                      <RxCross2 />
                    </span>
                    <span>{item?.quantity}</span>
                  </div>
                  <div className="text-right">
                    <span className="ml-2 font-semibold text-black">
                      <span className="font-bold t">৳</span>
                      {item?.totalPrice - item?.discount * item?.quantity}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="my-4 border-b"></div>

          <div className="flex justify-between mb-4">
            <div className="font-semibold text-black">Total amount</div>
            <div className="font-semibold text-black">
              <span className="ml-2 font-semibold text-black">
                <span className="font-bold t">৳</span>
                {mainTotalPrice - mainDiscountTotalPrice}
              </span>
            </div>
          </div>

          <div className="text-sm text-green-600 mb-4">
            <p
              className="font-medium md:text-base text-sm
                  "
            >
              Available for immediate delivery, delivery time (domestic) approx.
              2-5 working days
            </p>
          </div>

          <div className="mb-4">
            <div className="text-sm font-semibold mb-2">We Support</div>
            <div className="flex flex-wrap justify-between items-center  mt-3 space-x-2">
              <img src={master} alt="Mastercard" />
              <img src={visa} alt="Visa" />
              <img src={bkash} alt="bkash" className="h-[2.5rem]" />
              <img src={nogod} alt="PayPal" className="h-[4.5rem] " />
            </div>
          </div>

          <div className="flex w-full justify-center">
            <Link
              to="/check-out"
              onClick={handleClickEvent}
              className=" mt-3  border-2 w-fit  border-gray-600 px-5   py-[4px]  rounded-md font-semibold"
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
