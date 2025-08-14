import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo/mainLogo-01.png";
import { getCategory, getSearch } from "../../Context/ApiServices";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlices";
import { categories } from "../../Utils";
import HeaderSearch from "./HeaderSearch";
import CartDrawer from "../../pages/Cart/CartDrawer";
import ReactGA from "react-ga4";

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [auth, setAuthOpen] = useState(false);
  const [bar, setBar] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);
  const [show, setShow] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const cart = useSelector((state) => state.reduxSlice.product);
  const [searchValue, setSearchValue] = useState("");
  // console.log(cart);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    setAuthOpen(false); // Update auth state to reflect logout
    navigate("/login");
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setSearchOpen((prev) => {
      if (!prev) setAuthOpen(false); // Close auth dropdown when opening search
      return !prev;
    });
  };

  const toggleAuth = () => {
    setAuthOpen((prev) => {
      if (!prev) setSearchOpen(false); // Close search when opening auth dropdown
      return !prev;
    });
  };

  const handleClickOutsideDropdown = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      auth
    ) {
      setAuthOpen(false);
    }
  };

  // Handle clicks outside the search bar
  const handleClickOutsideSearch = (event) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target) &&
      isSearchOpen
    ) {
      setSearchOpen(false);
      setShow(false);
      setSearchValue("");
    }
  };

  useEffect(() => {
    const handleDocumentClick = (event) => {
      handleClickOutsideDropdown(event);
      handleClickOutsideSearch(event);
    };

    document.addEventListener("mousedown", handleDocumentClick);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, [auth, isSearchOpen]);
  let query;

  useEffect(() => {
    getCategory(setBar);
  }, []);
  useEffect(() => {
    getSearch(setProducts, `${query}`);
  }, [query]);
  // console.log(bar);
  const handleLinkClick = (label, sub) => {
    // Track link click event
    ReactGA.event({
      category: `Category=${label} ${sub ? `& subCategory=${sub}` : ``}`,
      action: `${label} Category Clicked Link`,
      label: sub ? `${label} & ${sub}` : label,
    });
  };
  return (
    <div className="relative ">
      <div
        className={`shado 
     bg-[#Ffff]  tracking-wide  animate-fadein border-b border-1 fixed w-full top-0 z-[99]  `}
      >
        <div className="relative  container mx-auto  px-5">
          {/* mega */}
          <div
            className="flex  border-b border-1 
          bg-white font-sans min-h-[70px] tracking-wide relative "
          >
            <div
              className="w-full   flex  flex- wrap items-center  lg:gap-y-4 gap-y-6 gap- x -4 
            justify-center sm:justify-between gap-2 6 
           py-3 relative"
            >
              <div className="">
                <Link to="/">
                  <img
                    src={logo}
                    alt="Fashiony Logo"
                    className="w-18 h-18 object-contain"
                  />
                </Link>
              </div>

              <div
                className={` ${
                  isMenuOpen ? "max-lg:flex" : "max-lg:hidden"
                } lg:!flex lg:items-center
              max-lg:before:fixed max-lg:overflow-auto
               max-lg:before:bg-black max-lg:before:opacity-40
               max-lg:before:inset-0 max-lg:before:z-50`}
              >
                <button
                  className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3"
                  onClick={toggleMenu}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 fill-black"
                    viewBox="0 0 320.591 320.591"
                  >
                    <path
                      d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                      data-original="#000000"
                    ></path>
                    <path
                      d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </button>

                <ul
                  className="lg:flex lg:ml-10 lg:gap-x-10   max-lg:space-y-3 
            max-lg:fixed max-lg:bg-white max-lg:w- 2/3
             max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0
             max-lg:px-10 max-lg:py-4 max-lg:h-full max-lg:shadow-md
              max-lg:overflow-auto z-50"
                >
                  {/* Menu Items */}
                  <li className="max-lg:border-b max-lg:pb-4 px-3 lg:hidden">
                    <Link href="/">
                      <img src={logo} alt="logo" className="w-20" />
                    </Link>
                  </li>
                  <li className="max-lg:border-b max-lg:px-3 max-lg:py-2">
                    <Link
                      to="/"
                      className="hover:text-accent text-accent font-bold text-sm block"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="group text-[14px] max-lg:border-b max-lg:px-3 max-lg:py-2 relative">
                    <Link
                      to="/shop"
                      onClick={() => handleLinkClick("shop")}
                      className="hover:text-accent hover:fill-accent text-gray-500 font-bold text-[15px] block"
                    >
                      Shop
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16px"
                        height="16px"
                        className="ml-1 inline-block"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 16a1 1 0 0 1-.71-.29l-6-6a1 1 0 0 1 1.42-1.42l5.29 5.3 5.29-5.29a1 1 0 0 1 1.41 1.41l-6 6a1 1 0 0 1-.7.29z"
                          data-name="16"
                          data-original="#000000"
                        />
                      </svg>
                    </Link>
                    <div
                      className="absolute  lg:top-6 max-lg:top-8 
                    -left-6 lg:-left-[10rem] z-99999 flex
                  shadow-lg bg-white max-h-0 overflow-hidden
                  group-hover:opacity-100 group-hover:max-h-fit 
                  group-hover:translate-y-0 transform translate-y-2
                 px-8 group-hover:pb-8 group-hover:pt-6 transition-all
                  duration-500  group-hover:z-999999
                   min-h- [360px]
                    "
                    >
                      <div
                        className="grid grid-cols-1
                   sm:grid-cols- 2 lg:grid-cols-3 2xl:grid-cols-4 gap-y-8
                    gap-x-16 w-max"
                      >
                        {categories.map((item) => (
                          <ul key={item?.id} className="space-y-4">
                            <li key={item.id} className="rounded">
                              <Link
                                to={`/shop?category=${item.category}`}
                                onClick={() => handleLinkClick(item?.category)}
                                className="hover:text-accent text-primary font-semibold text-sm block"
                              >
                                {item.category}
                              </Link>
                              {/* Render subcategories if they exist */}
                              {item.subCategories && (
                                <ul className="space-y-4 mt-4">
                                  {item.subCategories.map(
                                    (subCategory, index) => (
                                      <li key={index} className="rounded">
                                        <Link
                                          to={`/shop?category=${item.category}&subcategory=${subCategory}`}
                                          onClick={() =>
                                            handleLinkClick(
                                              item.category,
                                              subCategory
                                            )
                                          }
                                          className="hover:text-accent
                                           text-black text-sm block"
                                        >
                                          {subCategory}
                                        </Link>
                                      </li>
                                    )
                                  )}
                                </ul>
                              )}
                            </li>
                          </ul>
                        ))}
                      </div>
                    </div>
                  </li>
                  {/* <li className="max-lg:border-b max-lg:px-3 max-lg:py-2">
                    <Link
                      to={"/shop?category=Man"}
                      className="hover:text-accent text-gray-500 font-bold text-[15px] block"
                    >
                      Man
                    </Link>
                  </li> */}
                  <li className="max-lg:border-b max-lg:px-3 max-lg:py-2 hidden">
                    <Link
                      to="/shop?category=Woman"
                      onClick={() => handleLinkClick("Woman")}
                      className="hover:text-accent text-gray-500 font-bold text-[15px] block"
                    >
                      Woman
                    </Link>
                  </li>
                  {/* <li className="max-lg:border-b max-lg:px-3 max-lg:py-2">
                    <Link
                      to={"/shop?category=Kids"}
                      className="hover:text-accent text-gray-500 font-bold text-[15px] block"
                    >
                      Kids
                    </Link>
                  </li> */}
                </ul>
              </div>

              <div className="flex items-center space-x-8 justify-center ">
                <span className="relative hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    className="cursor-pointer fill-[#333] hover:fill-accent inline"
                    viewBox="0 0 64 64"
                  >
                    <path
                      d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                      data-original="#000000"
                    />
                  </svg>
                  <span
                    className="absolute left-auto
                 -ml-1 top-0 rounded-full bg-black px-1 py-0 
                 text-xs text-white"
                  >
                    0
                  </span>
                </span>

                <Link to={`${cart?.length > 0 ? "/cart" : "/shop"}`}>
                  <span className="relative ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20px"
                      height="20px"
                      className="cursor-pointer fill-[#333] hover:fill-accent inline"
                      viewBox="0 0 512 512"
                    >
                      <path
                        d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm167 15c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm0 0"
                        data-original="#000000"
                      ></path>
                    </svg>
                    <span className="absolute left-auto -ml-1 top-0 rounded-full bg-black px-1 py-0 text-xs text-white">
                      {cart?.length || 0}
                    </span>
                  </span>
                </Link>
                <div className=" w-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 192.904 192.904"
                    width="20px"
                    onClick={toggleSearch}
                    className="cursor-pointer fill-[#333] hover:fill-accent"
                  >
                    <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
                  </svg>
                  {/* ///////////////////////////////////////////////////////////////////////////////////////// */}

                  <div
                    ref={searchRef}
                    className={`absolute lg:right-13 lg:bottom-6 md:right-19 right-0
                      top-full md:w-[30rem] sm:w-[24rem] w-[18rem] px-3 py-2
                      lg:-mt-5 md:-mt-2 -mt-1
                      transition-all duration-300 ease-out transform
                      ${
                        isSearchOpen
                          ? "opacity-100 translate-y-0 visible"
                          : "opacity-0 -translate-y-4 invisible"
                      }
                      focus:outline-none focus:border-accent`}
                  >
                    <HeaderSearch
                      setSearchOpen={setSearchOpen}
                      setSearchValue={setSearchValue}
                      searchValue={searchValue}
                      show={show}
                      setShow={setShow}
                      ref={searchRef}
                    />
                  </div>
                </div>
                {/* user */}
                <div>
                  <ul>
                    <li
                      className="relative group px-1 after:absolute after:bg-black 
          after:w-full after:h-[2px] 
          after:block after:top-8 after:left-0 after:transition-all
          after:duration-300"
                    >
                      <div className="cursor-pointer" onClick={toggleAuth}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24px"
                          height="24px"
                          className="hover:fill-black"
                          viewBox="0 0 512 512"
                        >
                          <path
                            d="M437.02 74.981C388.667 26.629 324.38 0 256 0S123.333 26.629 74.98 74.981C26.629 123.333 0 187.62 0 256s26.629 132.667 74.98 181.019C123.333 485.371 187.62 512 256 512s132.667-26.629 181.02-74.981C485.371 388.667 512 324.38 512 256s-26.629-132.667-74.98-181.019zM256 482c-66.869 0-127.037-29.202-168.452-75.511C113.223 338.422 178.948 290 256 290c-49.706 0-90-40.294-90-90s40.294-90 90-90 90 40.294 90 90-40.294 90-90 90c77.052 0 142.777 48.422 168.452 116.489C383.037 452.798 322.869 482 256 482z"
                            data-original="#000000"
                          />
                        </svg>
                      </div>

                      <div
                        ref={dropdownRef}
                        className={`bg-white z-20 shadow-md py-6 px-6 sm:min-w-[320px] max-sm:min-w-[250px] 
                         absolute lg:right-0 sm:right-0 md:right-0 -right-18 top-14 opacity-0 transform
                          transition-all duration-300 ease-in-out
                         ${
                           auth
                             ? "opacity-100 translate-y-0 pointer-events-auto"
                             : "opacity-0 translate-y-2 pointer-events-none"
                         }`}
                      >
                        <h6 className="font-semibold text-[15px]">
                          Welcome,{user?.first_name || "User"}
                        </h6>
                        <p className="text-sm text-gray-500 mt-1">
                          To access account and manage orders
                        </p>
                        {isAuthenticated ? (
                          <button
                            type="button"
                            onClick={handleLogout}
                            className="bg-transparent border-2 border-gray-300 hover:border-black rounded px-4 py-2.5 mt-4 text-sm text-black font-semibold"
                          >
                            Logout
                          </button>
                        ) : (
                          <Link to={"/login"} onClick={toggleAuth}>
                            {" "}
                            <button
                              type="button"
                              className="bg-transparent border-2 border-gray-300 hover:border-black rounded px-4 py-2.5 mt-4 text-sm text-black font-semibold"
                            >
                              LOGIN / SIGNUP
                            </button>
                          </Link>
                        )}

                        <hr className="border-b-0 my-4" />
                        <ul className="space-y-1.5">
                          {isAuthenticated && (
                            <>
                              <li>
                                <Link
                                  state={"profile"}
                                  to="/profile"
                                  onClick={toggleAuth}
                                  className="text-sm text-gray-500 hover:text-black"
                                >
                                  My Dashboard
                                </Link>
                              </li>
                              <li>
                                <Link
                                  state={"order"}
                                  to="/profile"
                                  onClick={toggleAuth}
                                  className="text-sm text-gray-500 hover:text-black"
                                >
                                  Order
                                </Link>
                              </li>
                            </>
                          )}
                          {/* <li>
                            <Link
                              to="/wishlist"
                              onClick={toggleAuth} // Adjust if needed
                              className="text-sm text-gray-500 hover:text-black"
                            >
                              Wishlist
                            </Link>
                          </li> */}
                          <li>
                            <Link
                              to="/contact-us"
                              onClick={toggleAuth} // Adjust if needed
                              className="text-sm text-gray-500 hover:text-black"
                            >
                              Contact Us
                            </Link>
                          </li>
                          {isAuthenticated && (
                            <li>
                              <button
                                onClick={handleLogout}
                                className="text-sm text-gray-500 hover:text-black"
                              >
                                Logout
                              </button>
                            </li>
                          )}
                        </ul>
                        {/* <hr className="border-b-0 my-4" /> */}
                      </div>
                    </li>
                  </ul>
                </div>

                <button onClick={toggleMenu} className="lg:hidden ml-7">
                  <svg
                    className="w-7 h-7"
                    fill="#000"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative">
        <CartDrawer />
      </div>
    </div>
  );
};

export default Header;
