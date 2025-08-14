import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import { removeComboProduct, removeFromCart } from "../../redux/reduxSlice";
import { Link } from "react-router-dom";
import ReactGA from "react-ga4";
import { pushToDataLayer } from "../../Analytics/gtmUtils";
const CartDrawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [mainTotalPrice, setMainTotalPrice] = useState(0);
  const [mainDiscountTotalPrice, setMainDiscountTotalPrice] = useState(0);
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state?.reduxSlice?.product);
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
    // Track purchase event with Google Analytics
    ReactGA.event({
      category: "Cart Drawer",
      action: "Cart Drawer Clicked",
      label: `Cart Total`,
      value: mainTotalPrice - mainDiscountTotalPrice,
    });
    pushToDataLayer("view_cart", {
      totalPrice: mainTotalPrice - mainDiscountTotalPrice,
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
      totalProductQuantity: cartProducts?.length || 0,
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
  const comboDelete = (combo) => {
    dispatch(
      removeComboProduct({
        combo,
      })
    );
  };
  return (
    <div className="fixed top-[60%]  right-3 z-99999">
      {/* Button to toggle the drawer */}
      <div className="text-center relative h-16">
        <button
          className="py-2 px-2 text-xs bg-gray-200  [#c3af82] text-black rounded cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:text-indigo-700"
          onClick={toggleDrawer}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8 lg:size-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
        </button>
        <span className="absolute size-6 right-0 -top-2 rounded-full text-md bg-black text-white">
          {cartProducts?.length}
        </span>
      </div>

      {/* Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50"
          onClick={toggleDrawer}
        ></div>
      )}

      {/* Drawer Content */}
      <div
        className={`fixed inset-y-0 right-0 w-64 sm:w-80
             bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-999999 ${
               isDrawerOpen ? "translate-x-0 z-999999" : "translate-x-full"
             }`}
      >
        <div className="relative h-full">
          <div className="flex items-center">
            <h2 className="text-gray-900 text-lg font-semibold  relative py-5 pl-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </h2>
            <p className="text-gray-500 text-lg font-normal leading-snug pl-4">
              Your Cart ({cartProducts?.length || 0})
            </p>

            <button
              type="button"
              onClick={toggleDrawer}
              aria-controls="drawer-left-example"
              className="absolute top-6 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex items-center justify-center"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close menu</span>
            </button>
          </div>

          <hr />
          {/* Drawer content */}
          <div className="py-6 px-2 overflow-y-auto h-[60%] full">
            {/* Cart Items */}
            {cartProducts?.length === 0 ? (
              <p className="text-gray-600 text-center">Your cart is empty</p>
            ) : (
              <>
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
                          {items?.map((product, i) => (
                            <div
                              className="grid grid-cols-4 gap-4 p-2 shadow mb-4"
                              key={i}
                            >
                              <div className="">
                                {" "}
                                <img
                                  src={product?.url?.[0]?.url}
                                  alt={product?.name}
                                  className="size-20"
                                />
                              </div>
                              <div className="col-span-2">
                                <h5 className="text-gray-900 text-[12px] font-medium leading-snug mb-1">
                                  {product?.title}
                                </h5>
                                <h4 className="text-gray-500 text-xs">
                                  Size: {product?.selectedSize}
                                </h4>
                                <p className="text-gray-500 text-xs">
                                  {product?.quantity} x{" "}
                                  <span className=" text-md">Tk.</span>{" "}
                                  {product?.discount > 0 && (
                                    <span className="line-through ml-1   text-gray-500">
                                      {" "}
                                      ৳{product?.price}
                                    </span>
                                  )}{" "}
                                  {product?.price - product?.discount}
                                </p>
                                <p className="text-gray-500 text-xs font-normal leading-[18px]">
                                  Total: <span className=" t">Tk.</span>
                                  {product?.totalPrice -
                                    product?.discount * product?.quantity}
                                </p>
                              </div>
                              <div>
                                {" "}
                                <div className="lg: block h idden ">
                                  <AiFillDelete
                                    onClick={() => comboDelete(product?.comb)}
                                    className="text-2xl  cursor-pointer font-bold"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                  </div>
                )}

                {regularProduct?.map((product, index) => (
                  <div
                    className="grid grid-cols-4 gap-4 p-2 shadow mb-4"
                    key={index}
                  >
                    <div className="">
                      {" "}
                      <img
                        src={product?.url?.[0]?.url}
                        alt={product?.name}
                        className="size-20"
                      />
                    </div>
                    <div className="col-span-2">
                      <h5 className="text-gray-900 text-[12px] font-medium leading-snug mb-1">
                        {product?.title}
                      </h5>
                      <h4 className="text-gray-500 text-xs">
                        Size: {product?.selectedSize}
                      </h4>
                      <p className="text-gray-500 text-xs">
                        {product?.quantity} x{" "}
                        <span className=" text-md">Tk.</span>{" "}
                        {product?.discount > 0 && (
                          <span className="line-through ml-1   text-gray-500">
                            {" "}
                            ৳{product?.price}
                          </span>
                        )}{" "}
                        {product?.price - product?.discount}
                      </p>
                      <p className="text-gray-500 text-xs font-normal leading-[18px]">
                        Total: <span className=" t">Tk.</span>
                        {product?.totalPrice -
                          product?.discount * product?.quantity}
                      </p>
                    </div>
                    <div>
                      {" "}
                      <div className="lg: block h idden ">
                        <AiFillDelete
                          onClick={() =>
                            dispatch(
                              removeFromCart({
                                productId: product?._id,
                                selectedSize: product?.selectedSize,
                              })
                            )
                          }
                          className="text-2xl  cursor-pointer font-bold"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}

            <div className="absolute bg-white bottom-5 px-5">
              {/* Subtotal and additional details */}
              <div className="py-1">
                <div className="flex  justify-between">
                  <p className="text-sm font-semibold text-gray-700">
                    Subtotal
                  </p>
                  <p className="text-sm font-semibold text-gray-700">
                    ৳ {mainTotalPrice - mainDiscountTotalPrice}
                  </p>
                </div>
                <p className="text-sm text-gray-500">
                  Shipping, taxes, and discounts calculated at checkout.
                </p>
              </div>

              {/* Buttons for View Cart and Continue Shopping */}
              <div className=" w-full gap-2 space-y-4 mt-2">
                <div>
                  {cartProducts?.length > 0 ? (
                    <Link
                      to="/check-out"
                      onClick={() => {
                        handleClickEvent();
                        toggleDrawer();
                      }}
                      className="w-full inline-block text-center bg-[#c3af82] hover:bg-transparent hover:border hover:text-black text-white py-2 px-4 rounded hover:bg-opacity-90 transition duration-300"
                    >
                      Checkout
                    </Link>
                  ) : (
                    <Link
                      to="/shop"
                      onClick={() => {
                        handleClickEvent();
                        toggleDrawer();
                      }}
                      className="w-full inline-block text-center bg-[#c3af82] hover:bg-transparent hover:border hover:text-black text-white py-2 px-4 rounded hover:bg-opacity-90 transition duration-300"
                    >
                      Checkout
                    </Link>
                  )}
                </div>
                <div>
                  <Link
                    to="/cart"
                    onClick={toggleDrawer}
                    className="w-full inline-block text-center bg-gray-200 hover:bg-transparent hover:border hover:text-black text-gray-700  py-2 px-4 rounded hover:bg-opacity-90 transition duration-300"
                  >
                    View Cart
                  </Link>
                </div>
                <div>
                  <Link
                    to={"/shop"}
                    onClick={toggleDrawer}
                    className="inline-block text-center w-full bg-gray-200 hover:bg-transparent hover:border text-gray-700 py-2 px-4 rounded hover:bg-gray-300 transition duration-300"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
