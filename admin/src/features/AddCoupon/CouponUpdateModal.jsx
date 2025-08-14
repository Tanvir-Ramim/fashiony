import React, { useState } from "react";
import Api from "../../shared/Axios/axios";
import toast from "react-hot-toast";

const CouponUpdateModal = ({ singleCoupon, getCoupon, closeModal }) => {
  const [formData, setFormData] = useState({
    discount: singleCoupon?.discount || "",
    max_usage: singleCoupon?.max_usage || "",
    is_active: singleCoupon?.is_active || false,
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "discount" && Number(value) > 100) {
      toast.error("Discount cannot exceed 100!");
      return;
    }

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await Api.patch(`/coupon/${singleCoupon?._id}`, formData);
      if (res.status === 200) {
        getCoupon();
        closeModal();
        toast.success("Successfully Update");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mt-3">
      <div className="flex justify-between gap-3">
        <h1>
          <span className="font-semibold">Coupon Title</span>:{" "}
          {singleCoupon?.title}
        </h1>
        <h1>
          <span className="font-semibold">Code</span>: {singleCoupon?.code}
        </h1>
      </div>
      <form className="mt-2" onSubmit={handleSubmit}>
        <div className="flex items-center gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Discount
            </label>
            <input
              type="number"
              name="discount"
              placeholder="Enter discount amount"
              value={formData.discount}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 p-2 rounded-lg focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Maximum Uses
            </label>
            <input
              type="number"
              name="max_usage"
              placeholder="Enter maximum uses"
              value={formData.max_usage}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 p-2 rounded-lg focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="flex items-center gap-2">
            <p className="block text-gray-700 font-medium mb-1">Is Active:</p>
            <div>
              <input
                type="checkbox"
                name="is_active"
                checked={formData.is_active}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="mt-3 flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-2 py-1 rounded"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default CouponUpdateModal;
