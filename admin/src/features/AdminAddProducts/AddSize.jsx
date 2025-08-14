import React, { useState } from "react";

const AddSize = ({ formData, setFormData }) => {
  console.log(formData);
  const handleInputChange = (index, field, value) => {
    const updatedSizes = formData?.size?.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setFormData({
      ...formData,
      size: updatedSizes,
      total_stock: updatedSizes?.reduce(
        (total, size) => total + (Number(size?.stock) || 0),
        0
      ),
    });
  };

  const handleAddSize = () => {
    setFormData({
      ...formData,
      size: [...formData.size, { name: "", stock: 0 }],
    });
  };

  const handleRemoveSize = (index) => {
    if (formData.size.length > 1) {
      const updatedSizes = formData.size?.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        size: updatedSizes,
        total_stock: updatedSizes?.reduce(
          (total, size) => total + (Number(size?.stock) || 0),
          0
        ),
      });
    }
  };
  return (
    <div className=" p-6  rounded-2xl text-light bg-white shadow-md">
      <h3 className="pb-3 text-base font-medium tracking-widest text-center uppercase">
        Size
      </h3>
      {formData?.size?.map((item, index) => (
        <div key={index} className="flex mt-4 items-center gap-4 mb-3">
          <input
            type="text"
            placeholder="Name"
            value={item?.name}
            onChange={(e) => handleInputChange(index, "name", e.target.value)}
            className="p-1 border text-sm rounded w-40 focus:outline-none focus:ring focus:ring-blue-300"
          />
          <input
            type="number"
            placeholder="Stock"
            value={item?.stock}
            onChange={(e) => handleInputChange(index, "stock", e.target.value)}
            className="p-1 border rounded text-sm w-24 focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            onClick={() => handleRemoveSize(index)}
            disabled={formData.size.length === 1}
            className={`bg-gray-300 text-sm p-1 rounded ${
              formData.size.length === 1 && " text-gray-500 cursor-not-allowed"
            }`}
          >
            ❌
          </button>
          {index === formData?.size?.length - 1 && (
            <button
              onClick={handleAddSize}
              className="p-1 bg-green-500 text-sm text-white rounded hover:bg-green-600"
            >
              ➕
            </button>
          )}
        </div>
      ))}
      <div className="mt-4 text-gray-700 font-semibold">
        Total Stock:{" "}
        <span className="text-blue-600">{formData?.total_stock || 0}</span>
      </div>
    </div>
  );
};

export default AddSize;
