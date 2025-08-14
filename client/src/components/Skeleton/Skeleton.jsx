import React from "react";
import "./skeleton.css";
const Skeleton = () => {
  return (
    <section className="bg- white flex justify-center h-screen py-20 dark:bg-dark">
      <div className="loader">
        <div className="square" id="sq1"></div>
        <div className="square" id="sq2"></div>
        <div className="square" id="sq3"></div>
        <div className="square" id="sq4"></div>
        <div className="square" id="sq5"></div>
        <div className="square" id="sq6"></div>
        <div className="square" id="sq7"></div>
        <div className="square" id="sq8"></div>
        <div className="square" id="sq9"></div>
      </div>
    </section>
  );
};
export default Skeleton;
