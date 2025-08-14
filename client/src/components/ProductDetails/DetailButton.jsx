import React from "react";
import { Link } from "react-router-dom";

const DetailButton = ({ to, onClick, title, className }) => {
  return (
    <>
      <button
        onClick={onClick}
        className={`p-2.5 bg-[#67676726] text-base text-black font-Monteserat font-medium rounded-md
           hover:bg-primary hover:text-white transition hover:transition duration-0.4s hover:duration-0.4s capitalize ${className}`}
      >
        {title}
      </button>
    </>
  );
};

export default DetailButton;
