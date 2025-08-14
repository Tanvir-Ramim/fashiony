import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, updateUser } from "../../redux/authSlices";
import { RxCross2 } from "react-icons/rx";

import { GoEye } from "react-icons/go";
import Api from "../../apiClient/ApiClient";
import "./Modal.css";
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("order");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState([]);
  const closeModal = () => {
    setIsModalOpen(false);
    setItems(null);
  };
  // console.log("open modal", items);

  const showItem = (mx) => {
    setItems(mx);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (user) {
      setAddress(user.address || "");
      setPhone(user.phone || "");
    }
  }, [user]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await Api.patch(`/user/${user._id}`, {
        address,
        phone,
      });
      // console.log(response);
      // Dispatch the updated user info to Redux store
      dispatch(updateUser({ address, phone }));
      // Exit edit mode after successful update
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update user", error);
    }
  };

  const [OwnOrders, setOwnOrders] = useState();
  // console.log("sdfsdfsdf", OwnOrders);
  const fetchData = async () => {
    try {
      const res = await Api.get(`/orders?customer_eamil=${user.email}`);
      setOwnOrders(res.data.data.orderByquery.docs);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  useEffect(() => {
    fetchData();
  }, [location.state]);
  useEffect(() => {
    const state = location.state || "profile";
    setActiveTab(state);
  }, [location.state]);
  // console.log(items);
  return (
    <div className="min-h-screen bg-gray-100 py-24">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap -mx-4">
          {/* Sidebar */}
          <div className="w-full md:w-1/4 px-4">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <h2 className="text-xl font-bold mb-4">Manage My Account</h2>
              <ul>
                <li
                  className={`cursor-pointer mb-2 p-2 ${
                    activeTab === "profile"
                      ? "text-blue-500 font-semibold"
                      : "text-gray-700"
                  }`}
                  onClick={() => setActiveTab("profile")}
                >
                  My Profile
                </li>
                <li
                  className={`cursor-pointer mb-2 p-2 ${
                    activeTab === "address"
                      ? "text-blue-500 font-semibold"
                      : "text-gray-700"
                  }`}
                  onClick={() => setActiveTab("address")}
                >
                  Address Book
                </li>
                <li
                  className={`cursor-pointer mb-2 p-2 ${
                    activeTab === "order"
                      ? "text-blue-500 font-semibold"
                      : "text-gray-700"
                  }`}
                  onClick={() => setActiveTab("order")}
                >
                  My Orders
                </li>
              </ul>
              {user && (
                <button
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              )}
            </div>
          </div>
          {/* Content */}
          <div className="w-full md:w-3/4 overflow-auto py-4 px-4">
            <div className="bg-white rounded-lg shadow-md overflow-x-auto p-6">
              {activeTab === "profile" && user && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Personal Profile</h2>
                  <p>
                    Name: {user.first_name} {user.last_name}
                  </p>
                  <p>Email: {user.email}</p>
                </div>
              )}
              {activeTab === "address" && user && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Address Book</h2>
                  {isEditing ? (
                    <form onSubmit={handleUpdate}>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="address"
                        >
                          Address
                        </label>
                        <input
                          type="text"
                          id="address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="border border-gray-300 p-2 w-full"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="phone"
                        >
                          Phone Number
                        </label>
                        <input
                          type="text"
                          id="phone"
                          value={phone}
                          pattern="/(^(\+8801|8801|01|008801))[1|3-9]{1}(\d){8}$/"
                          onChange={(e) => setPhone(e.target.value)}
                          className="border border-gray-300 p-2 w-full"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        className="ml-2 px-4 py-2 bg-gray-300 text-black rounded-lg"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </button>
                    </form>
                  ) : (
                    <div>
                      <p>Address: {user.address || "Not provided"}</p>
                      <p>Phone Number: {user.phone || "Not provided"}</p>
                      <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                        onClick={handleEditClick}
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              )}
              {activeTab === "order" && OwnOrders?.length > 0 && (
                <div>
                  <h2 className="md:text-xl font-bold mb-4">Recent Orders</h2>
                  <table className="w-full text-left text-[14px] lg:text-[18px] ">
                    <thead>
                      <tr>
                        <th>Order #</th>
                        <th className="hidden lg:block">Placed On</th>
                        <th>Order Status</th>
                        <th>Items</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody className="space-x-5">
                      {OwnOrders?.length > 0 ? (
                        OwnOrders?.map((order) => (
                          <tr className="" key={order.id}>
                            <td className="p-1">#{order?.invoice_id}</td>
                            <td className="p-1 hidden lg:block">
                              {order?.createdAt?.slice(0, 10)}
                            </td>
                            <td className="p-1 text-primary">
                              {order?.oder_status}
                            </td>
                            <td className="p-1 ">
                              <button
                                onClick={() => showItem(order?.product_list)}
                                className="flex items-center justify-center px-1  py-1 text-white bg-[#B9A36B] rounded-md hover:bg-[#a3895d] transition-all duration-200 text-sm shadow-md"
                              >
                                <GoEye className="mr-1" /> Show
                              </button>
                            </td>
                            <td className="p-1">
                              ৳{order?.total_price}{" "}
                              <span className="text-[9px]">with Shipping</span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center">
                            No orders found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div
          className="fixed inset-0 flex  items-center justify-center 
         z-99 bg-black bg-opacity-50"
        >
          <div className="bg-white rounded-lg w-fit p-6 max-w-2xl modal-slide-down relative">
            <button
              className="absolute top-1 right-1 text-red-400"
              onClick={closeModal}
            >
              <RxCross2 />
            </button>
            <div className=" flex flex-wrap gap-6 overflow-auto ">
              {items?.map((item, index) => (
                <div key={index}>
                  <div className="w-34 b shadow-lg rounded-md mt-2 h-34 border">
                    <img
                      className="w-full h-full"
                      src={item?.p_ref?.url[0]?.url}
                      alt=""
                    />
                  </div>
                  <div className="mt-2 text-center">
                    <p className="font-semibold">{item?.p_ref?.title}</p>
                    <p>Brand: {item?.p_ref?.brand}</p>
                    <p>SKU: {item?.p_ref?.sku}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
