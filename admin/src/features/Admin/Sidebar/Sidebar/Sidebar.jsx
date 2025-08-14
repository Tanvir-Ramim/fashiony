import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Sidebar.css";
import {
  FaUserAlt,
  FaShoppingBag,
  FaThList,
  FaPlusCircle,
} from "react-icons/fa";
import { GrDeliver } from "react-icons/gr";
import { Icon } from "@iconify/react";

import log from "../../../../assets/logo/pat.jpg";
import Api from "../../../../shared/Axios/axios";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../../shared/redux/slices/reduxslices";
import { RiCoupon4Fill } from "react-icons/ri";
const menuItem = [
  {
    path: "/admin",
    name: "dashboard",
    icon: <Icon icon={"bxs:dashboard"}></Icon>,
  },
  {
    path: "admin/orders",
    name: "Order",
    icon: <FaShoppingBag />,
  },

  {
    path: "adminAddProducts",
    name: "Add Product",
    icon: <Icon icon={"flowbite:cart-plus-alt-solid"}></Icon>,
  },
  {
    path: "/admin/addCombo",
    name: "Add Combo",
    icon: <FaPlusCircle />,
  },
  {
    path: "/admin/coupon",
    name: "Add Coupon",
    icon: <RiCoupon4Fill />,
  },
  {
    path: "admin/products-view/all",
    name: "Products",
    icon: <Icon icon={"typcn:shopping-cart"}></Icon>,
  },

  {
    path: "admin/images",
    name: "Image",
    icon: <Icon icon={"fluent:image-add-20-filled"}></Icon>,
  },

  {
    path: "/admin/user",
    name: "Customer",
    icon: <FaUserAlt />,
  },
  {
    path: "/admin/shipping",
    name: "Shipping",
    icon: <GrDeliver />,
  },
  // {
  //   path: "/admin/info",
  //   name: "Info",
  //   icon: <FaThList />,
  // },
];
const Sidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [timeLeft, setTimeLeft] = useState(20 * 60);
  const user = useSelector((state) => state.reduxSlice.adminInfo);

  const handleLogout = async () => {
    try {
      dispatch(logoutUser());
      await Api.patch(`/auth/${user?.user?._id}`);

      dispatch(logoutUser());
      sessionStorage.removeItem("session");
    } catch (error) {
      console.error(error);
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  //timeout
  // useEffect(() => {
  //   setTimeLeft(20 * 60);
  //   dispatch(userLocation(location.pathname));
  //   const intervalId = setInterval(() => {
  //     setTimeLeft((prevTime) => {
  //       if (prevTime <= 1) {
  //         handleLogout();
  //         return 0;
  //       }
  //       return prevTime - 1;
  //     });
  //   }, 1000);

  //   return () => clearInterval(intervalId);
  // }, [location, dispatch]);

  // const minutes = Math.floor(timeLeft / 60);
  // const seconds = timeLeft % 60;
  return (
    <>
      <div
        style={{ width: isOpen ? "220px" : "120px" }}
        id="admin-panel-sidebar"
        className="  z-20 flex flex-col items-center justify-between h-screen p-3 space-y-2 overflow-y-scroll  transition-all duration-500 bg-white shadow-lg rounded-r-xl md:w-60 hover:text-black backdrop-blur-md"
      >
        <a href="/">
          <div className="flex-col items-center justify-center mt-5 mb-5 md:mb-0 md:flex ">
            <div className="flex items-center justify-center rounded-full shadow-lg shadow-white ">
              <img src={log} alt="" className="object-contain" />
            </div>
          </div>
        </a>
        {/* <div className="mt-4 ">
          <p className="text-gray-800 font-semibold">Session Timeout</p>
          <p className="text-red-600 ">
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds} left
          </p>
        </div> */}
        <div>
          {menuItem?.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              // className="flex items-center justify-center mb-2 rounded-full w-7 h-7 bg-secondary text-light"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? `${
                      isOpen
                        ? "w-auto px-1 capitalize bg-light rounded-md items-center justify-start flex  transition-all duration-500  mb-2  h-7  text-primary "
                        : " justify-center flex items-center transition-all duration-500  mb-2 rounded-full w-7 h-7 bg-light text-primary "
                    } `
                  : `${
                      isOpen
                        ? "w-auto px-1 capitalize rounded-md items-center justify-start flex   transition-all duration-500 hover:bg-light hover:text-primary  mb-2  h-7 "
                        : " justify-center flex items-center transition-all duration-500 hover:bg-light hover:text-primary  mb-2 rounded-full w-7 h-7 bg- text-light"
                    } `
              }
              end
            >
              <div
                className={`${
                  isOpen ? "mr-1" : ""
                } flex items-center justify-center w-5 h-5 `}
              >
                {item.icon}
              </div>
              <div
                // style={{ display: isOpen ? "  " : "" }}
                className={`${
                  isOpen ? "w-auto" : "w-0"
                } overflow-hidden text-sm font-normal whitespace-nowrap `}
              >
                {item.name}
              </div>
            </NavLink>
          ))}
        </div>
        <div
          className={`${
            isOpen
              ? " w-full flex items-center justify-center"
              : "flex flex-col pt-5 md:pt-0"
          } transition-all `}
        >
          <div className="w-full rounded-md ">
            <div
              onClick={toggle}
              className={`${
                isOpen
                  ? "w-full py-1 hover:underline transition-all duration-500 px-2 mb-1 flex   capitalize rounded-md items-center justify-start"
                  : "flex items-center justify-center mb-2 transition-all duration-300 rounded-full bg-light text-primary w-7 h-7 hover:bg-primary hover:text-light"
              } cursor-pointer transition-all duration-500`}
            >
              <Icon
                className={`${isOpen ? " mr-2" : ""} transition-all `}
                icon="pepicons-pop:expand-circle-filled"
              ></Icon>
              <span
                className={`${
                  isOpen ? "w-auto" : "w-0"
                } overflow-hidden text-sm font-normal whitespace-nowrap border border-none`}
              >
                Close
              </span>
            </div>
            <div
              onClick={handleLogout}
              className={`${
                isOpen
                  ? "w-full py-1 px-2 mb-1 hover:underline transition-all duration-500 flex capitalize rounded-md items-center justify-start"
                  : "flex items-center justify-center mb-2 transition-all duration-300 rounded-full bg-light text-primary w-7 h-7 hover:bg-primary hover:text-light"
              } cursor-pointer transition-all duration-500`}
            >
              <Icon
                icon="streamline:logout-1-solid"
                className={`${isOpen ? " mr-2" : ""} transition-all `}
              ></Icon>
              <span
                className={`${
                  isOpen ? "w-auto" : "w-0"
                } overflow-hidden text-sm font-normal whitespace-nowrap border border-none`}
              >
                Logout
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
