import React, { useState } from "react";
export const area = [
  {
    id: 1,
    name: "Bagerhat",
  },
  {
    id: 2,
    name: "Bandarban",
  },
  {
    id: 3,
    name: "Barguna",
  },
  {
    id: 4,
    name: "Barisal",
  },
  {
    id: 5,
    name: "Bhola",
  },
  {
    id: 6,
    name: "Bogra",
  },
  {
    id: 7,
    name: "Branhmanbaria",
  },
  {
    id: 8,
    name: "Chandpur",
  },
  {
    id: 9,
    name: "Chapai Nawabganj",
  },
  {
    id: 10,
    name: "Chattogram (Chittagong)",
  },
  {
    id: 11,
    name: "Chuadanga",
  },
  {
    id: 12,
    name: "Comilla",
  },
  {
    id: 13,
    name: "Cox's Bazar",
  },
  {
    id: 14,
    name: "Dhaka",
  },
  {
    id: 15,
    name: "Dinajpur",
  },
  {
    id: 16,
    name: "Faridpur",
  },
  {
    id: 17,
    name: "Feni",
  },
  {
    id: 18,
    name: "Gaibandha",
  },
  {
    id: 19,
    name: "Gazipur",
  },
  {
    id: 20,
    name: "Gopalganj",
  },
  {
    id: 21,
    name: "Habiganj",
  },
  {
    id: 22,
    name: "Jamalpur",
  },
  {
    id: 23,
    name: "Jashore (Jessore)",
  },
  {
    id: 24,
    name: "Jhalokati",
  },
  {
    id: 25,
    name: "Jhenaidah",
  },
  {
    id: 26,
    name: "Joypurhat",
  },
  {
    id: 27,
    name: "Khagrachhari",
  },
  {
    id: 28,
    name: "Khulna",
  },
  {
    id: 29,
    name: "Kishoreganj",
  },
  {
    id: 30,
    name: "Kurigram",
  },
  {
    id: 31,
    name: "Kushtia",
  },
  {
    id: 32,
    name: "Lakshmipur",
  },
  {
    id: 33,
    name: "Lalmonirhat",
  },
  {
    id: 34,
    name: "Madaripur",
  },
  {
    id: 35,
    name: "Magura",
  },
  {
    id: 36,
    name: "Manikganj",
  },
  {
    id: 37,
    name: "Meherpur",
  },
  {
    id: 38,
    name: "Moulvibazar",
  },
  {
    id: 39,
    name: "Munshiganj",
  },
  {
    id: 40,
    name: "Mymensingh",
  },
  {
    id: 41,
    name: "Naogaon",
  },
  {
    id: 42,
    name: "Narail",
  },
  {
    id: 43,
    name: "Narayanganj",
  },
  {
    id: 44,
    name: "Narsingdi",
  },
  {
    id: 45,
    name: "Natore",
  },
  {
    id: 46,
    name: "Netrokona",
  },
  {
    id: 47,
    name: "Nilphamari",
  },
  {
    id: 48,
    name: "Noakhali",
  },
  {
    id: 49,
    name: "Pabna",
  },
  {
    id: 50,
    name: "Panchagarh",
  },
  {
    id: 51,
    name: "Patuakhali",
  },
  {
    id: 52,
    name: "Pirojpur",
  },
  {
    id: 53,
    name: "Rajbari",
  },
  {
    id: 54,
    name: "Rajshahi",
  },
  {
    id: 55,
    name: "Rangamati",
  },
  {
    id: 56,
    name: "Rangpur",
  },
  {
    id: 57,
    name: "Satkhira",
  },
  {
    id: 58,
    name: "Shariatpur",
  },
  {
    id: 59,
    name: "Sherpur",
  },
  {
    id: 60,
    name: "Sirajganj",
  },
  {
    id: 61,
    name: "Sunamganj",
  },
  {
    id: 62,
    name: "Sylhet",
  },
  {
    id: 63,
    name: "Tangail",
  },
  {
    id: 64,
    name: "Thakurgaon",
  },
];


const UserUpdateModal = ({  formData ,handleChange,handleUpdateUserInfo }) => {
     


  return (
    <div>
      <div className="">
     {/* ////////////////////////// */}
        <div className=" space-y-2 mb-4 lg:py-4 py-2">
         <div className="flex justify-between gap-5">
         <div className="w-full">
            <label className="block text-sm font-medium">
              Full Name{" "}
              <span className="text-red-500 cursor-help" title="required">
                *
              </span>
            </label>
            <input
              type="text"
              name="customer_name"
              placeholder="Input Full Name"
              required
              value={formData?.customer_name}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:border-[#d1b970] focus:ring-2 focus:ring-[#d6d6d6]"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium">
              Phone{" "}
 
            </label>
            <input
              type="text"
              name="customer_phone"
              required
              placeholder="Enter Number"
              // defaultValue={user?.phone || ""}
              value={formData?.customer_phone}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:border-[#d1b970] focus:ring-2 focus:ring-[#d6d6d6]"
            />
          </div>
         </div>
     <div className="flex  pt-4 gap-5">
     <div className="w-full">
            <label className="block text-sm font-medium">
              Street Address{" "}
  
            </label>
            <input
              type="text"
              name="address"
              required
              placeholder="House number and street name"
              value={formData?.address}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:border-[#d1b970] focus:ring-2 focus:ring-[#d6d6d6]"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium">
              District
            </label>
            <select
              name="city"
              value={formData?.city}
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
     </div>
        </div>

     <div className="flex justify-center">   <button onClick={handleUpdateUserInfo} className="bg-blue-600 text-white px-2 py-1 rounded text-sm">Update</button></div>
      </div>
    </div>
  );
};

export default UserUpdateModal;
