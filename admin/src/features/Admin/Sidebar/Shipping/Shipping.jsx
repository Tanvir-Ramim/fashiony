import React, { useState, useEffect } from "react";
import Api from "../../../../../../client/src/apiClient/ApiClient";
import { toast } from "react-hot-toast";
const Shipping = () => {
  const [shippingInfo, setShippingInfo] = useState({});
  const [formData,setFormData]=useState({
    in_dhaka: null,
    out_dhaka: null
  })

  const getShippingInfo = async () => {
    try {
      const res = await Api.get("/shipping");
      setShippingInfo(res.data.data);
      setFormData(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateShippingInfo = async (e) => {
    e.preventDefault();
   const  data={
        in_dhaka: parseInt(formData?.in_dhaka),
        out_dhaka: parseInt(formData?.out_dhaka)
      }
    try {
    const res=   await Api.patch("/shipping", data);
      if(res.status===201){
        toast.success("Successfully Updated")
        getShippingInfo()
      }

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getShippingInfo();
  }, []);

  return (
    <div className="py-20 ps-28">
      <div className="text-center pb-10">
        <h1 className="text-primary capitalize font-bold text-2xl">
          Shipping Details
        </h1>
        <p className="text-lg text-gray-500 mt-2">Current Shipping Costs</p>
      </div>
      <form onSubmit={updateShippingInfo} className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Inside Dhaka (Current: {shippingInfo?.in_dhaka} Tk)
          </label>
          <input
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            name="in_dhaka"
            value={formData.in_dhaka}
            placeholder="Inside Dhaka"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Outside Dhaka (Current: {shippingInfo?.out_dhaka} Tk)
          </label>
          <input
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            name="out_dhaka"
            value={formData.out_dhaka}
            placeholder="Outside Dhaka"
            required
          />
        </div>
        <div className="flex justify-center mt-5">
          <button className="bg-primary rounded capitalize text-xl text-white px-6 py-2 hover:bg-blue-600 transition-colors duration-300">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default Shipping;
