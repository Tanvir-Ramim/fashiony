import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const TopBottom = () => {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHide(
        document.body.scrollTop > 500 ||
          document.documentElement.scrollTop > 500
      );
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // This ensures smooth scrolling
    });
  };

  return (
    <>
      {hide && (
        <div
          className={`fixed bottom-18 right-5 z-40 bg-primary transition-all duration-500 p-4 rounded-full cursor-pointer hover:scale-105 
      ${
        hide
          ? "opacity-100 translate-x-0 pointer-events-auto"
          : "opacity-0 translate-x-full pointer-events-none"
      }`}
          onClick={handleTop}
        >
          <FaArrowUp className="size-5 text-white" />
        </div>
      )}
    </>
  );
};

export default TopBottom;
