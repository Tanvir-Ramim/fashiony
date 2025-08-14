import React, { useState } from "react";
import TypeIcon from "../../shared/components/FallBackComponent/TypeIcon/TypeIcon";
import AddCoupon from "./AddCoupon";
import CouponList from "./CouponList";

const Coupon = () => {
  const [item, setSelectedItem] = useState("details");
  return (
    <div
      className=" py-10   w-full 
    mx- auto ps-28 lg:ps-10 "
    >
      <div className="flex items-center py-5 justify-between">
        <div>
          <h3 className="mb-5 text-xl font-extrabold text-center uppercase md:text-4xl text-[#323D97] ">
            Coupon
          </h3>
        </div>
        <div className="flex gap-5 mr-5">
          {[
            { key: "details", label: "Details" },
            { key: "addNew", label: "Add New" },
          ].map(({ key, label }, i) => (
            <button
              key={i}
              aria-pressed={key}
              onClick={() => setSelectedItem(key)}
              className={` flex items-center gap-2  rounded-md py-2 text-[15px] 
                  capitalize  px-[12px] ${
                    item === key ? `bg-[#323D97] text-white` : "bg-white "
                  }`}
            >
              <TypeIcon
                type={key}
                className={`   ${item === key ? ` text-white` : ""}`}
              />{" "}
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="bg-white shadow-card p-3">
        {item === "details" && <CouponList />}
        {item === "addNew" && <AddCoupon setSelectedItem={setSelectedItem} />}
      </div>
    </div>
  );
};

export default Coupon;
