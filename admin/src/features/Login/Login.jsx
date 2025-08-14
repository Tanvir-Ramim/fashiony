import { useEffect, useRef, useState } from "react";
import login_BG from "../Login/assets/pat.jpg";

import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import cookie from "js-cookie";
import { adminInfo, userLocation } from "../../shared/redux/slices/reduxslices";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Api from "../../shared/Axios/axios";
const Login = () => {
  let [show, setShow] = useState(false);

  const ref = useRef();
  const location = useLocation();

  let handleEyeEmail = () => {
    setShow(!show);
  };

  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setData] = useState({
    password: "",
    email: "",
  });

  //formData
  const inputHandle = (e) => {
    const { name, value } = e.target;
    setData({ ...formData, [name]: value });
  };
  // _.use("/auth", role);
  let handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await Api.post(`/auth/login`, formData);
      if (res.status === 200) {
        const token = res.data.data.token;
        dispatch(adminInfo(res.data.data));
        cookie.set("loginSession", token);
        navigate("/admin");
        dispatch(userLocation("/"));
        return;
      } else {
        alert("Try Again");
        navigate("/");
        return;
      }
    } catch (error) {
      toast.error("Please Provide a valid info");
    }
  };
  //?############ div ###
  const [divWidth, setDivWidth] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setDivWidth(ref.current.offsetWidth);
    }
  }, []);
  const date = new Date().getFullYear();

  return (
    <>
      <div
        ref={ref}
        className=" w-full  h-screen   grid grid-cols-1 md:grid-cols-2  bg-white"
      >
        <div className=" relative before:absolute before:top-0 before:left-0  before:w-full before:h-full before:bg-gradient-to-b before:to-[rgba(0,0,0,0.41)] before:from-[rgba(0,0,0,0.06)] hidden md:block">
          <picture>
            <img
              src={login_BG}
              alt="registration Bg"
              className=" h-screen w-full"
            />
          </picture>
        </div>

        <div className="    flex items-center justify-center  h-screen w-full bg-[#F6FDF9] bg-cover bg-no-repeat bg-opacity-90  bg-center">
          <div className="md:py-4 py-2.5 px-14 text-center">
            <div className="mx-auto">
              <div>
                <h2 className="text-[28px] text-black font-bold -tracking-tighter  py-[20px]">
                  Welcome to Fashiony Shopping.
                </h2>
                <div>
                  <div className="max-w-[364px] mx-auto py-4">
                    <div className="text-left ">
                      <div className="text-[#333333] text-xl font-semibold pb-[5px]">
                        <label> User-Email</label>
                      </div>
                      <div className=" relative">
                        <input
                          value={formData.email}
                          name="email"
                          onChange={inputHandle}
                          type="email"
                          className="p-3 bg-[#F8F8F8] outline-[#D8D8D8] border border-[#D8D8D8] rounded-[4px] w-full placeholder:text-[#757575] placeholder:text-xs text-black "
                          placeholder="email"
                        />
                      </div>
                    </div>
                    <div className="text-left pt-8 pb-5">
                      <div className="text-[#333333] text-xl font-semibold pb-[5px]">
                        <label>User Credential </label>
                      </div>
                      <div className=" relative">
                        <input
                          onChange={inputHandle}
                          value={formData.password}
                          name="password"
                          type={show ? "text" : "password"}
                          className="p-3 bg-[#F8F8F8] outline-[#D8D8D8] border border-[#D8D8D8] rounded-[4px] w-full placeholder:text-[#757575] placeholder:text-xs text-black "
                          placeholder="Credential 2"
                        />
                        {show ? (
                          <span
                            className="text-[#757575] text-xl absolute top-[50%] right-4 -translate-y-[50%]"
                            onClick={() => handleEyeEmail()}
                          >
                            <IoIosEyeOff />
                          </span>
                        ) : (
                          <span
                            className="text-[#757575] text-xl absolute top-[50%] right-4 -translate-y-[50%]"
                            onClick={() => handleEyeEmail()}
                          >
                            <IoIosEye />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col  justify-center w-full">
                    {divWidth < 0 ? (
                      <>
                        <p className="bg-[#1F2937] px-[6px] py-4 text-red-600 rounded-[4px] font-bold">
                          Your Device Not Fit For Admin Panel
                        </p>
                        <p className="text-red-600 font-semibold text-sm">
                          Device Width {" >"} 600
                        </p>
                      </>
                    ) : (
                      <Link>
                        <button
                          onClick={handleClick}
                          type="button"
                          className="bg-[#1F2937] text-white py-[6px] px-[138px] rounded-[4px]"
                        >
                          login{" "}
                        </button>
                      </Link>
                    )}
                  </div>
                  <div className=" pt-5">
                    <a
                      href="www.fashiony.com"
                      className="text-sm text-black font-semibold py-2"
                    >
                      Terms & Conditions, Privacy Settings.
                    </a>
                    <br />
                    <a
                      href="https://www.fashiony.com/"
                      target="_blank"
                      className="text-sm cursor-pointer text-sky-600 font-semibold "
                    >
                      © {date} All Rights Reserved created by Fashiony.
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
