import React, { useState } from "react";
import Api from "../../shared/Axios/axios";
import toast from "react-hot-toast";

const AddCoupon = () => {
  const [formData, setFormData] = useState({
    code: "",
    discount: null,
    max_usage: null,
    title: "",
  });
  console.log(formData);
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = type === "number" ? Number(value) : value;
    if (name === "discount" && Number(value) > 100) {
      toast.error("Discount cannot exceed 100!");
      return;
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await Api.post("/coupon", formData);
      if (res.status === 201) {
        setFormData({
          code: "",
          discount: 0,
          max_usage: 0,
          title: "",
        });
        toast.success("Successfully Add You Coupon");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center py-5 items-center p-3">
      <div className="bg-white w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-center text-blue-500 mb-8">
          Add New Coupon
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Coupon Code
              </label>
              <input
                type="text"
                name="code"
                placeholder="Enter coupon code"
                value={formData.code}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring focus:ring-blue-200"
              />
            </div>
            {/* Discount */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Discount %
              </label>
              <input
                type="number"
                name="discount"
                placeholder="Enter discount "
                value={formData.discount}
                onChange={handleChange}
                required
                className="w-[35%] border border-gray-300 p-2 rounded-lg focus:ring focus:ring-blue-200"
              /> <span className="ml-1 text-lg">%</span>
            </div>
            {/* Maximum Uses */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Maximum Uses
              </label>
              <input
                type="number"
                name="max_usage"
                placeholder="Enter maximum uses"
                value={formData.max_usage}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring focus:ring-blue-200"
              />
            </div>
          </div>
          <div className="mt-8 text-center">
            <button
              type="submit"
              className="px-2 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCoupon;
