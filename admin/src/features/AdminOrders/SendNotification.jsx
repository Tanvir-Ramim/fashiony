import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import Api from "../../shared/Axios/axios";
import toast from "react-hot-toast";
const SendNotification = ({ order ,setEmail,email}) => {
 
    const orderId=order._id
  const sendEmail = async () => {
    try {
      const res = await Api.post(`/orders/mail`, { email, orderId });
      if (res.status === 200) {
        toast.success("Successfully Uploaded");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full p-2  border border-gray-200 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        Send Notification
      </h2>

      <div className="flex gap-2">
        <div className="mb-4 w-full">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              defaultValue={order?.customer_eamil}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-2 px-3  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            />
          </div>
          <button
          disabled={order?.is_disable}
            onClick={() => sendEmail()}
            type="button"
            className=" text-sm py-1 w-fit px-3 mt-2 border border-blue-500 text-blue-500 font-semibold rounded hover:bg-blue-100"
          >
            Send Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendNotification;
