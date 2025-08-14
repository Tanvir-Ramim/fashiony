import React, { useState, useRef } from "react";

const Cash = () => {
  const [selected, setSelected] = useState(null);

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null); // Collapse if already selected
    }
    setSelected(i); // Expand the clicked item
  };

  const getContentHeight = (ref) => {
    return ref.current ? `${ref.current.scrollHeight}px` : "0px";
  };

  const faqData = [
    {
      question: "Is there a refund policy?",
      answer:
        "DreamSeat Enterprise Xperience Partners shall issue a full refund to any member who wishes to cancel their enrolment within 45 days prior to the start of the season. Stadium seat memberships are not refundable after the first home event of the football season. If a patron's seat is damaged or removed, DreamSeat EXP shall replace the item at no cost to the customer. Please contact the customer service hotline (864-626-9676) with any questions regarding the return policy. All sales are final. Refunds and adjustments will be considered on an individual basis.",
    },
    {
      question: "Why Can't I log in?",
      answer:
        "If you are unable to log in, please make sure you have created a new account first. This ordering portal is different than the one where you purchase your Texas A&M game tickets.",
    },
    {
      question: "When will I receive my seats?",
      answer:
        "Game day seats rentals will be in place for the first game of the season, unless you are in sections 409-421. Those sections will have game day seats midway through the football season.",
    },
  ];

  return (
    <div className="bg-gray-100 h-screen w-screen flex justify-center pt-10">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Accordion Items */}
          {faqData.map((faq, index) => {
            const contentRef = useRef(null);

            return (
              <div
                key={index}
                className="bg-white max-w-full mx-auto border border-gray-200"
              >
                <ul className="shadow-box">
                  <li className="relative border-b border-gray-200">
                    <button
                      type="button"
                      className="w-full px-6 py-6 text-left flex justify-between items-center"
                      onClick={() => toggle(index)}
                    >
                      <span>{faq.question}</span>
                      <svg
                        className={`w-5 h-5 text-gray-500 transform ${
                          selected === index ? "rotate-180" : ""
                        }`}
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </button>
                    <div
                      className="overflow-hidden transition-all duration-700"
                      style={{
                        maxHeight:
                          selected === index
                            ? getContentHeight(contentRef)
                            : "0px",
                      }}
                    >
                      <div ref={contentRef} className="px-6 pb-6">
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Cash;
