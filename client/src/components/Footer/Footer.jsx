import { useEffect } from "react";
import logo from "../../assets/logo/Fashiony-02-01.png";
import { Link, useLocation } from "react-router-dom";
import { FaThreads, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";
const Footer = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const year = new Date().getFullYear();
  return (
    <div>
      <footer
        className="bg-black 
      font-nunito tracking-wide relative overflow-hidden"
      >
        <div
          className="grid grid-cols-1
         container mx-auto sm:grid-cols-2
          lg:grid-cols-5 lg:gap-12 gap-8 py-14 px-12 relative z-20"
        >
          <div className="w-full ">
            <img src={logo} alt="" className="w-20  lg:w-36" />
          </div>
          <div>
            <h2 className="text-lg text-gray-300 font-semibold mb-6">
              Company
            </h2>
            <ul className="space-y-5">
              <li>
                <a
                  href={"/"}
                  className="text-gray-300 hover:text-white text-base flex items-center transition-all"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="inline mr-1.5 h-4 w-4 shrink-0"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                  Home
                </a>
              </li>{" "}
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-white text-base flex items-center transition-all"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="inline mr-1.5 h-4 w-4 shrink-0"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact-us"
                  className="text-gray-300 hover:text-white text-base flex items-center transition-all"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="inline mr-1.5 h-4 w-4 shrink-0"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg text-gray-300 font-semibold mb-6">
              Products
            </h2>
            <ul className="space-y-5">
              <li>
                <Link
                  to="/shop"
                  className="text-gray-300 hover:text-white text-base flex items-center transition-all"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="inline mr-1.5 h-4 w-4 shrink-0"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                  Shop
                </Link>
              </li>
              {/* <li>
                <Link
                  to="/shop?category=Man"
                  className="text-gray-300 hover:text-white text-base flex items-center transition-all"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="inline mr-1.5 h-4 w-4 shrink-0"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                  Man
                </Link>
              </li> */}

              <li>
                <Link
                  to="/shop?category=Jeans"
                  className="text-gray-300  hover:text-white text-base flex items-center transition-all"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="inline mr-1.5 h-4 w-4 shrink-0"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                  Jeans
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg text-gray-300 font-semibold mb-6">
              Fashiony
            </h2>
            <ul className="space-y-5">
              <li>
                <Link
                  to="/terms"
                  className="text-gray-300 hover:text-white text-base flex items-center transition-all"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="inline mr-1.5 h-4 w-4 shrink-0"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/refund-policy"
                  className="text-gray-300 hover:text-white text-base flex items-center transition-all"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="inline mr-1.5 h-4 w-4 shrink-0"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                  Return & Refund Policy
                </Link>
              </li>

              <li>
                <Link
                  to="/contact-us"
                  className="text-gray-300 hover:text-white text-base flex items-center transition-all"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="inline mr-1.5 h-4 w-4 shrink-0"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                  Get In Touch
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg text-gray-300 font-semibold mb-6">
              Find Us
            </h2>
            <div className="space-y-5 flex flex-col text-white">
              <p>House 11, Road 1,, Section 2, Mirpur, Dhaka</p>

              <a href="tel:+01886230003">0180000000</a>
              <a href="mailto:Fashionycommerce@gmail.com">
                Fashionycommerce@gmail.com
              </a>
              <p>Every Day From 10AM to 8PM</p>
            </div>
            <div
              className=" relative z-3 space-x-2 text-white pt-5
                   justify-center pt- 5 
             "
            >
              <ul
                className="flex  space-x-4 
                   cursor-pointer"
              >
                <a
                  href="https://www.facebook.com/profile.php?id=61565674560852&mibextid=ZbWKwL"
                  target="_blank"
                  className=" p-1 rounded-full"
                >
                  <FaFacebookF size={20} />
                </a>
                <a href="" target="_blank" className=" p-1 rounded-full">
                  <FaInstagram size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/Fashiony-clothing-brand-9a7522328"
                  target="_blank"
                  className=" p-1 rounded-full"
                >
                  <FaLinkedin size={20} />
                </a>

                <a
                  href="https://wa.me/+8801886230003"
                  target="_blank"
                  className=" p-1 rounded-full"
                >
                  <FaWhatsapp size={20} />
                </a>
              </ul>
            </div>
          </div>
        </div>

        <hr className="border-gray-600" />

        <div
          className="my-8 px-12 container mx-auto 
         text-center gap-6 relative z-20"
        >
          <p>
            {" "}
            <span className="text-sm text-gray-500 ">
              Copyright © {year}. All rights reserved by Fashiony
              {/* <a
                href="https://fashiony.com"
                target="_blank"
                className="hover:underline hover:text-white [#004a8f] duration-300"
              >
                {" "}
                fashiony
              </a> */}
            </span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
