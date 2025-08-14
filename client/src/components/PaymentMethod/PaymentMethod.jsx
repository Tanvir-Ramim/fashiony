import React, { useState } from "react";
import { cash } from "../../Utils";

const PaymentMethod = ({ handlePaymentMethodChange }) => {
  const [selected, setSelected] = useState(null);
  //toggle

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null); // Collapse if already selected
    }
    setSelected(i); // Expand the clicked item
  };
  return (
    <div>
      <div className="mt-4">
        {cash?.map((faq, index) => {
          return (
            <div key={index} className="bg -white max-w-full ">
              <ul className="shadow-box">
                <li className="relative ">
                  <label className="flex  items-center w-full lg:px-6 py-4 text-left">
                    <input
                      type="radio"
                      name="faq-question"
                      className="mr-4"
                      checked={selected === index}
                      onChange={() => {
                        handlePaymentMethodChange(faq.pay); // Set the payment method first
                        toggle(index); // Then toggle the selection
                      }}
                    />
                    <span className="">{faq.question}</span>
                    <span className="hidden sm:block">
                      <img src={faq.img} alt="" />
                    </span>
                  </label>
                  <div
                    className="overflow-hidden transition-all duration-700"
                    style={{
                      maxHeight: selected === index ? "200px" : "0px", // Adjusted height
                    }}
                  >
                    <div className="px-6  pb -6">
                      <p className="bg-gray-300 max-w-2xl p-2">{faq.answer}</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentMethod;
