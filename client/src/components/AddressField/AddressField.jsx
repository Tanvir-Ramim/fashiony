import React from "react";
import { area } from "../../constants/area";

const AddressField = ({ user, handleChange, formData }) => {
  return (
    <div>
      <div className="">
        <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
        <hr className="border-gray-400 w-[65%] mb-4" />
        {/* ////////////////////////// */}
        <div className=" space-y-2 mb-4 lg:py-4 py-2">
          <div>
            <label className="block text-sm font-medium">
              Full Name{" "}
              <span className="text-red-500 cursor-help" title="required">
                *
              </span>
            </label>
            <input
              type="text"
              name="first_name"
              placeholder="Input Full Name"
              defaultValue={user?.first_name || ""}
              required
              // value={formData.first_name}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:border-[#d1b970] focus:ring-2 focus:ring-[#d6d6d6]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Phone{" "}
              <span className="text-red-500 cursor-help" title="required">
                *
              </span>
            </label>
            <input
              type="text"
              name="customer_phone"
              required
              placeholder="Enter Number"
              // defaultValue={user?.phone || ""}
              value={formData.customer_phone}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:border-[#d1b970] focus:ring-2 focus:ring-[#d6d6d6]"
            />
          </div>
          {/* <div>
                <label className="block text-sm font-medium">Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  placeholder="Enter Full Name"
                  defaultValue={user?.last_name || ""}
                  // value={formData.last_name}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:border-[#d1b970] focus:ring-2 focus:ring-[#d6d6d6]"
                />
              </div> */}
          <div>
            <label className="block text-sm font-medium">
              Email address (optional)
            </label>
            <input
              type="email"
              name="customer_eamil"
              placeholder="Enter  Email"
              defaultValue={user?.email || ""}
              // value={formData.customer_eamil}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:border-[#d1b970] focus:ring-2 focus:ring-[#d6d6d6]"
            />
          </div>

          {/* <div>
                <label className="block text-sm font-medium">
                  Street Address{" "}
                  <span className="text-red-500 cursor-help" title="required">
                    *
                  </span>
                </label>
                <input
                  type="text"
                  name="area"
                  placeholder="House number and street name"
                  value={formData.area}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border  border-gray-300 rounded-md focus:border-[#d1b970] focus:ring-2 focus:ring-[#d6d6d6]"
                />
              </div> */}
          <div className="lg:col-span-2 sm:col-span-2">
            <label className="block text-sm font-medium">
              Street Address{" "}
              <span className="text-red-500 cursor-help" title="required">
                *
              </span>
            </label>
            <input
              type="text"
              name="address"
              required
              placeholder="House number and street name"
              // value={formData.address}
              defaultValue={user?.address || ""}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:border-[#d1b970] focus:ring-2 focus:ring-[#d6d6d6]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              District
              <span className="text-red-500 cursor-help" title="required">
                *
              </span>
            </label>
            <select
              name="city"
              value={formData.city}
              required
              onChange={handleChange}
              className="w-full mt-1 p-2 custom-scrollbar border border-gray-300
                   rounded-md focus:border-[#d1b970] focus:ring-2 focus:ring-[#d6d6d6]"
            >
              <option value="">Select City</option>
              {area?.map((item, i) => (
                <option key={i} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="lg:col-span-2 sm:col-span-2">
            <label className="block text-sm font-medium">
              Note
              <span className="ml-1" title="required">
               (optional)
              </span>
            </label>
            <input
              type="text"
              name="note"
              placeholder="Note"
              value={formData?.note}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:border-[#d1b970] focus:ring-2 focus:ring-[#d6d6d6]"
            />
          </div>
          <div>
            <label className="block text-sm pt-3 font-medium">
              Country{" "}
              <span className="text-red-500 cursor-help" title="required">
                *
              </span>
            </label>
            <input
              type="text"
              name="country"
              value="Bangladesh"
              onChange={handleChange}
              readOnly
              className="w-full font-bold bg-transparent mt-1 focus:outline-none 
                "
            />
          </div>
          {/* <div>
                <label className="block text-sm font-medium">
                  House Number
                </label>
                <input
                  type="text"
                  name="house_nbr"
                  placeholder="Input Your House Number"
                  value={formData.house_nbr}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:border-[#d1b970] focus:ring-2 focus:ring-[#d6d6d6]"
                />
              </div> */}
          {/* <div>
                <label className="block text-sm font-medium">Road Number</label>
                <input
                  type="text"
                  name="road_nbr"
                  placeholder="Enter Road Number"
                  value={formData.road_nbr}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:border-[#d1b970] focus:ring-2 focus:ring-[#d6d6d6]"
                />
              </div> */}
          {/* <div>
                <label className="block text-sm font-medium">Post Code</label>
                <input
                  type="number"
                  name="post_code"
                  placeholder="Input Your Post Code"
                  value={formData.post_code}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:border-[#d1b970] focus:ring-2 focus:ring-[#d6d6d6]"
                />
              </div> */}
        </div>

        {/* Effective Delivery */}
        {/* <div className=" items-center">
              <div className="text-left w-full max-w-xl">
                <h1 className="text-2xl font-bold mb-2">Effective Delivery</h1>
                <hr className="border-gray-400 mb-4" />
                <div className="flex space-x-4 py-2">
                  <label className="flex items-center w-52 p-4 bg-white rounded-md shadow-sm cursor-pointer">
                    <input
                      type="radio"
                      name="deliveryOption"
                      value="Home"
                      checked={selectedOption === "Home"}
                      onChange={(e) => setSelectedOption(e.target.value)}
                      className="form-radio text-indigo-600 "
                    />
                    <span className="ml-2 text-gray-800">Home</span>
                  </label>
                  <label className="flex items-center px-3  w-52 bg-white rounded-md shadow-sm cursor-pointer">
                    <input
                      type="radio"
                      name="deliveryOption"
                      value="Office"
                      checked={selectedOption === "Office"}
                      onChange={(e) => setSelectedOption(e.target.value)}
                      className="form-radio text-indigo-600 h-4 w-4"
                    />
                    <span className="ml-2 text-gray-800">Office</span>
                  </label>
                </div>
              </div>
            </div> */}
      </div>
    </div>
  );
};

export default AddressField;
