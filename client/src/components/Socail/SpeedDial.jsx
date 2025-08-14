import React, { useState, useRef, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import TypeIcon from "./../Icon/TypeIcon";

const SpeedDial = () => {
  const [isOpen, setIsOpen] = useState(false);
  const speedDialRef = useRef(null);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        speedDialRef.current &&
        !speedDialRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      ref={speedDialRef}
      className="fixed bottom-17 left-6 lg:left-16 z-[999]"
    >
      <div className="relative w-full h-full">
        {/* Hidden buttons that appear when isOpen is true */}
        <div
          className={`absolute bottom-14 left-0 flex
             flex-col items-center mb-4 space-y-2 transition-all duration-300 ${
               isOpen
                 ? "opacity-100 translate-y-0"
                 : "opacity-0 pointer-events-none translate-y-4"
             }`}
        >
          {/* WhatsApp Button */}
          <button
            type="button"
            className="flex justify-center items-center  w-14 h-14 lg:w-16 lg:h-16 text-white bg-green-500 
            rounded-full border border-green-600 shadow-sm hover:bg-green-600 focus:outline-none"
            onClick={() =>
              window.open("https://wa.me/+8801886230003", "_blank")
            }
          >
            <FaWhatsapp size={30} />
          </button>

          {/* Call Button */}
          <a
            href="tel:+8801886230003"
            type="button"
            className="flex justify-center items-center  w-14 h-14 lg:w-16 lg:h-16 text-white bg-blue-500 rounded-full
             border border-blue-600 shadow-sm hover:bg-blue-600 focus:outline-none"
          >
            <FaPhone size={20} />
          </a>
        </div>

        {/* + Button */}
        <button
          type="button"
          aria-expanded={isOpen ? "true" : "false"}
          onClick={toggleOpen}
          className="flex items-center justify-center text-white bg-indigo-600
           rounded-full w-14 h-14 lg:w-16 lg:h-16 hover:bg-indigo-700 focus:ring-4 focus:outline-none"
        >
          <TypeIcon type={"customer"} size={28} />
          <span className="sr-only">Open actions menu</span>
        </button>
      </div>
    </div>
  );
};

export default SpeedDial;
