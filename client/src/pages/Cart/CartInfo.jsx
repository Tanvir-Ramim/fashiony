import { useEffect } from "react";

import { useState } from "react";

import { useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa6";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Api from "../../apiClient/ApiClient";

import "./Cart.css";

import { useDispatch } from "react-redux";
import { addToCart, removeAll, removeComboProduct, removeFromCart } from "../../redux/reduxSlice";
import AddressField from "../../components/AddressField/AddressField";
import StepIndicator from "./../../components/StepIndicator/StepIndicator";
import ReactGA from "react-ga4";
import { pushToDataLayer } from "../../Analytics/gtmUtils";
import PaymentMethod from "../../components/PaymentMethod/PaymentMethod";
import { RxCross2 } from "react-icons/rx";

const CartInfo = () => {
  const [selectedOption, setSelectedOption] = useState("Home");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [mainOfferPrice, setMainOfferPrice] = useState(0);
  const [stockOut, setStockOut] = useState(null);
  const [code, setCode] = useState(false);
  const [couponCode, setCouponData] = useState("");
  const [couponDiscount, setCouponDiscount] = useState("");
  const cartProducts = useSelector((state) => state?.reduxSlice?.product);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customer_eamil: user?.email || "",
    first_name: user?.first_name || "",

    customer_phone: "",
    city: "",
    country: "Bangladesh",
    note: "",
    address: user?.address || "",
  });
  //  console.log(formData.note);
  ///shipping
  const [shippingInfo, setShippingInfo] = useState({});
  const bangladeshPhoneRegex = /^01[3-9]\d{8}$/;

  //combo product

  const product_list = cartProducts?.map((product) => ({
    p_ref: product?._id,
    quantity: product?.quantity || 1,
    size: product?.selectedSize || "",
    sku: product?.sku,
  }));

  const products = cartProducts?.map((product) => ({
    id: product?._id,
    quantity: product?.quantity,
    size: product?.selectedSize,
  }));
  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "customer_phone" && value.length > 11) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);

    ReactGA.event({
      category: "Payment",
      action: "add_payment_info",
      label: "add_payment_info",
      value: method,
    });
    pushToDataLayer("add_payment_info", { payment_option: method });
  };
  const calculateTotalPrice = () => {
    return (
      mainOfferPrice +
      ((formData.city && shippingInfo[formData.city.toLowerCase()]) || 0)
    );
  };
  const trackEvent = (category, action, value) => {
    ReactGA.event({ category, action, label: action, value });
    pushToDataLayer(action, {
      currencyCode: "Tk",
      total_price: calculateTotalPrice(),
      products: cartProducts.map((product) => ({
        item_id: product._id,
        item_name: product.title,
        item_category: product.category,
        price: product.totalPrice,
        quantity: product.quantity,
      })),
    });
  };
  // New trackPurchaseEvent function
  const trackPurchaseEvent = (orderId) => {
    const purchaseData = {
      transaction_id: orderId,
      affiliation: "Online Store",
      value: calculateTotalPrice(),
      currency: "TK",
      items: cartProducts.map((product) => ({
        item_id: product._id,
        item_name: product.title,
        item_category: product.category,
        price: product.totalPrice,
        quantity: product.quantity,
      })),
    };

    ReactGA.event({
      category: "E-commerce",
      action: "purchase",
      label: "Purchase Completed",
      value: orderId,
    });

    pushToDataLayer("purchase", purchaseData);
  };
  const handleFull = async (amount, orderId) => {
    try {
      let res;
      if (paymentMethod === "SSL Commerce") {
        if (amount && amount > 0) {
          res = await Api.post(`/payment/${orderId}?amount=${amount}`);
          if (res.status === 200) {
            window.location.href = res.data.url; // Redirect to SSL payment gateway
          }
        }
      } else if (paymentMethod === "Cash on Delivery") {
        // Handle Cash on Delivery option
        res = await Api.patch(`/orders/${orderId}`, {
          data: {
            order_status: "Order Confirmed",
            payment_status: "Pending",
            payment_by: "Cash On Delivery",
          },
        });
        if (res.status === 204) {
          // Clear cart, show thank you page, and navigate to invoice
          toast.success("Thank you for your order!");
          dispatch(removeAll());
          navigate(`/payment/success/${orderId}`, { replace: true });
          // Track purchase event
          trackPurchaseEvent(orderId);
        }
      } else {
        toast.error("Please select a payment method.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  //handle coupon

  const handleCoupon = async (e) => {
    e.preventDefault();

    try {
      const result = await Api.post("/coupon/apply", { code: couponCode });
      console.log(result.data);

      if (result.data.status === 200) {
        setCouponDiscount(result.data.discount);

        setCode(!code);
        toast.success(`${result.data.message}`);
      }
    } catch (error) {
      console.error(error);
      toast.error(`${error.response.data.error} .Please try again`);
      setCouponData("");
      setCouponDiscount("");
    }
  };
  let isToastVisible = false;
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent multiple submissions
    if (isPlacingOrder) return;

    const isAnyFieldEmpty = Object.entries(formData).some(
      ([key, value]) =>
        value.trim() === "" && key !== "customer_eamil" && key !== "note"
    );

    if (isAnyFieldEmpty) {
      if (isToastVisible) return;
      isToastVisible = true;
      toast.error("All input fields are required except Email & Note", {
        onClose: () => {
          isToastVisible = false;
        },
      });
      return;
    }

    if (!bangladeshPhoneRegex.test(formData.customer_phone)) {
      if (isToastVisible) return;

      isToastVisible = true;
      toast.error("Invalid Bangladeshi phone number", {
        onClose: () => {
          isToastVisible = false;
        },
      });
      return;
    }
    if (!paymentMethod) {
      toast.error("Please select a payment method.");
      return; // Stop further execution if no payment method is selected
    }
    const customer_name = `${formData.first_name}`;
    console.log(couponDiscount);
    const updatedFormData = {
      ...formData,
      product_list: product_list,
      products: products,
      customer_name: customer_name,
      email: formData.customer_eamil,
      // effective_delivery: selectedOption,
      applied_coupon: {
        code: couponCode,
        discount: couponDiscount,
        isAppied: couponDiscount ? true : false,
      },
    };

    try {
      setIsPlacingOrder(true);
      const result = await Api.post("/orders", updatedFormData);
      // console.log(result);

      if (result.status === 201) {
        const orderId = result.data.data._id;

        // Handle payment or cash on delivery
        await handleFull(
          mainOfferPrice +
            (formData.city
              ? formData.city.toLowerCase() === "dhaka"
                ? shippingInfo?.in_dhaka
                : shippingInfo?.out_dhaka
              : 0),
          orderId
        );

        ReactGA.event({
          category: "E-commerce",
          action: `Shipping_info`,
          label: `Shipping_info`,
          value: updatedFormData,
        });
        pushToDataLayer("add_shipping_info", { details: updatedFormData });
        trackEvent("purchase", "Purchase Completed", orderId);
      }
    } catch (error) {
      if (error.status === 400) {
        setStockOut(error.response.data.outStock);
      }
    } finally {
      setIsPlacingOrder(false);
    }
  };

  // Navigate to Success Page
  // const handleNavigate = (orderId) => {
  //   navigate(`/payment/success/${orderId}`, { replace: true });
  // };
  useEffect(() => {
    const calculatedOfferTotalPrice = cartProducts?.reduce(
      (prev, next) => prev + next.totalOfferPrice,
      0
    );

    setMainOfferPrice(calculatedOfferTotalPrice);
  }, [cartProducts]);
  useEffect(() => {
    const getShippingInfo = async () => {
      try {
        const res = await Api.get("/shipping");
        setShippingInfo(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    getShippingInfo();
  }, []);

  const comboProduct = cartProducts?.filter((item) => {
    if (item?.isCombo) {
      return item;
    }
    return null;
  });
  console.log(comboProduct);
  console.log(cartProducts);
  const regularProduct = cartProducts?.filter((item) => {
    if (!item?.isCombo) {
      return item;
    }
    return null;
  });
  const cartClear = (stockArray) => {
    const updatedCartProducts = cartProducts?.map((item) => {
      const isStockOut = stockArray?.some(
        (item2) => item._id === item2.id && item.selectedSize === item2.size
      );

      // Return a new object with the updated `stockOut` property
      return isStockOut ? { ...item, stockOut: true } : item;
    });

    return updatedCartProducts; // Return the updated cart products array
  };
  useEffect(() => {
    if (stockOut) {
      dispatch(removeAll());
      const mx = cartClear(stockOut);
      mx.map((item) => dispatch(addToCart(item)));
    }
  }, [stockOut]);

  const comboDelete = (combo) => {
    dispatch(
      removeComboProduct({
        combo,
      })
    );
  };
  
  const groupedProducts = comboProduct?.reduce((acc, item) => {
    if (!acc[item.comb]) {
      acc[item.comb] = [];
    }
    acc[item.comb].push(item);
    return acc;
  }, {});
  // console.log({ cartProducts });
  //  useEffect()

  const disCountAmount = mainOfferPrice * couponDiscount || 0;
  return (
    <div className="bg-[#F7F5EF]  py-30">
      <div className="  xl:container  mx-auto ">
        <StepIndicator currentStep={2} />
        <div
          className="grid grid-cols-1 max-w-6xl mx-auto lg:grid-cols-2 lg:space-x-5
         lg:p-6 p-3 lg:gap-10 bg-[#F5F5EF] text-[#333]"
        >
          {/* Shipping Address Form */}
          <AddressField
            user={user}
            handleChange={handleChange}
            formData={formData}
          ></AddressField>

          {/* Cart Summary */}
          <div className=" w-full mt-8 lg:mt-0 pr-3 lg:border lg:p-5">
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            <hr className="border-gray-500/40 border-dashed mb-4" />
            <div className="space-y-4 ">
              <div
                className={`${
                  regularProduct?.length > 0
                    ? `space-y-4 overflow-auto h-[300px]`
                    : ` overflow-auto h-[300px]`
                }`}
              >
                {comboProduct?.length > 0 && (
                  <div className="shadow bg-gray-200 border-b-2 p-3 rounded">
                    {/* <h1 className="capitalize text-black font-semibold pb-2">
                      Combo Packages
                    </h1> */}

                    {comboProduct &&
                      Object.entries(
                        comboProduct.reduce((acc, item) => {
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
                          {items.map((item, i) => (
                            <div
                              key={i}
                              className="flex flex-col sm:flex-row justify-between items-center gap-6 pb-2"
                            >
                              <div className="w-20 flex items-center h-[5rem]">
                                {item?.stockOut && (
                                  <p
                                    onClick={() => comboDelete(item?.comb)}
                                    className="text-red-700 cursor-pointer"
                                  >
                                    <RxCross2 className="text-xl" />
                                  </p>
                                )}
                                <img
                                  className="w-full h-full mb-2 md:mb-0"
                                  src={item?.url[0]?.url}
                                  alt="Product"
                                />
                              </div>
                              <div
                                className={`flex px-1 w-full ${
                                  item?.stockOut && "bg-red-300 rounded"
                                } justify-between gap-5`}
                              >
                                <div>
                                  <p className="font-semibold text-[13px] sm:text-[16px]">
                                    {item?.title}
                                  </p>
                                  <div className="flex gap-3 py-1">
                                    {item?.selectedSize && (
                                      <p className="md:text-base text-sm">
                                        Size: {item?.selectedSize}
                                      </p>
                                    )}
                                    {item?.selectColor && (
                                      <p className="md:text-base text-sm">
                                        Color: {item?.selectColor}
                                      </p>
                                    )}
                                  </div>
                                  <p className="text-sm font-medium">
                                    Quantity: {item?.quantity}
                                  </p>
                                  <p className="text-sm mt-1">
                                    SKU: {item?.sku}
                                  </p>
                                </div>
                                <div className="text-right">
                                  {item?.discount > 0 && (
                                    <p className="line-through">
                                      ৳{item?.totalPrice}
                                    </p>
                                  )}
                                  <p className="font-semibold">
                                    ৳
                                    {item?.totalPrice -
                                      item?.discount * item?.quantity}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                  </div>
                )}
                {regularProduct?.length > 0 && (
                  <div>
                    <h1 className="capitalize text-black font-semibold pb-2 ">
                      Regular Products
                    </h1>

                    {regularProduct &&
                      regularProduct?.map((item, i) => {
                        return (
                          <div
                            title={item?.stockOut && "Stock Out"}
                            key={i}
                            className={`flex  flex- col sm: flex-row justify-between items-center gap-4  pb-2`}
                          >
                            <div className="w-32 flex items-center gap-1 h-[7rem] ">
                              {item?.stockOut && (
                                <p
                                  onClick={() =>
                                    dispatch(
                                      removeFromCart({
                                        productId: item?._id,
                                        selectedSize: item?.selectedSize,
                                      })
                                    )
                                  }
                                  className="text-red-700 cursor-pointer"
                                >
                                  <RxCross2 className="text-xl" />
                                </p>
                              )}
                              <img
                                className="w-full h-full mb-2 md:mb-0"
                                src={item?.url?.[0]?.url}
                                alt="Product"
                              />
                            </div>
                            <div
                              className={`flex w-full px-1 justify-between ${
                                item?.stockOut && "bg-red-300 rounded "
                              } gap-5`}
                            >
                              <div className="">
                                <p className=" font-semibold text-[13px] sm:text-[16px]">
                                  {item?.title}
                                </p>
                                <div className="flex gap-3 py-1">
                                  {item?.selectedSize && (
                                    <p className=" md:text-base text-sm">
                                      Size : {item?.selectedSize}
                                    </p>
                                  )}
                                  {item?.selectColor && (
                                    <p className=" md:text-base text-sm">
                                      Color : {item?.selectColor}
                                    </p>
                                  )}
                                </div>
                                <p className="text-sm font-medium">
                                  Quantity: {item?.quantity}
                                </p>
                                <p className="text-sm mt-1">SKU: {item?.sku}</p>
                              </div>
                              <div className="text-right">
                                {item?.discount > 0 && (
                                  <p className="line-through">
                                    {" "}
                                    ৳{item?.totalPrice}
                                  </p>
                                )}
                                <p className="font-semibold">
                                  ৳
                                  {item?.totalPrice -
                                    item?.discount * item?.quantity}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>

              <hr className="border-gray-500/40 border-dashed  " />
              <div className=" ">
                <div className="flex justify-between">
                  <span className="font-semibold">Total value of goods</span>
                  <span className="font-semibold">
                    {" "}
                    <span>৳{mainOfferPrice}</span>
                  </span>
                </div>
                <div className="py-3">
                  <span
                    className="cursor-pointer"
                    onClick={() => setCode(!code)}
                  >
                    Have a special Code ? Click here
                  </span>
                  {code && (
                    <div className=" shado w-md rounded  pt-6 pb-8 ">
                      <form
                        onSubmit={handleCoupon}
                        className="flex items-center gap-5"
                      >
                        <div>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={couponCode}
                            onChange={(e) => setCouponData(e.target.value)}
                            type="text"
                            placeholder="Enter your coupon code"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <button
                            className="bg-transparent hover:bg-primary transition-colors hover:text-white text-black border font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                          >
                            Apply Coupon
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
                {/* coupon  discount */}
                {couponDiscount && (
                  <div className="flex justify-between mb-3 pt-2">
                    <span>Coupon Discount:{couponCode}</span>
                    <span className="flex items-center gap-1">
                      -{disCountAmount}
                    </span>
                  </div>
                )}
                <div className="flex justify-between mb-3 pt-2">
                  <span>Shipping</span>
                  <span className="flex items-center gap-1">
                    {formData.city && (
                      <span className="text-green-700 text-sm">
                        <FaPlus />
                      </span>
                    )}
                    {formData.city ? (
                      formData.city.toLowerCase() === "dhaka" ? (
                        <span>৳{shippingInfo?.in_dhaka}</span>
                      ) : (
                        <span>৳{shippingInfo?.out_dhaka}</span>
                      )
                    ) : (
                      "Select Area"
                    )}
                  </span>
                </div>

                <hr className="border-gray-500/40 border-dashed  mb-4" />
                <div className="flex justify-between font-bold text-lg mt-2">
                  <span>Total Cost</span>
                  <span>
                    ৳
                    {mainOfferPrice +
                      (formData.city
                        ? formData.city.toLowerCase() === "dhaka"
                          ? shippingInfo?.in_dhaka
                          : shippingInfo?.out_dhaka
                        : 0) -
                      disCountAmount}
                  </span>
                </div>
                <hr className="border-gray-500/40 border-dashed mb-4" />
              </div>

              {/* Add payment method selection buttons */}
              <PaymentMethod
                handlePaymentMethodChange={handlePaymentMethodChange}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-around">
          <Link
            to={"/cart"}
            className="mt-6 px-4 py-2 text-black border 
             border-gray-400/50 font-bold rounded-md"
          >
            Go Back
          </Link>
          {/* <button
            onClick={handleSubmit}
            className="mt-6 px-4 py-2 bg-[#000]
             text-white rounded-md"
          >
            Place an Order
          </button> */}

          <button
            onClick={handleSubmit}
            className={` font-semibold rounded px-4
               py-2 mt-6  ${
                 isPlacingOrder
                   ? "bg-primary text-white cursor-not-allowed"
                   : "bg-transparent border  border-gray-400/50  font-bold rounded-md text-black  transition-all"
               }`}
            disabled={isPlacingOrder || cartProducts?.length === 0}
          >
            {isPlacingOrder ? "Placing order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartInfo;
