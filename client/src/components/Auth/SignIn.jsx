import React, { useState } from "react";
import Container from "../Container/Container";
import Typography from "./../Typography/Typography";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ReactGA from "react-ga4";
import Api from "../../apiClient/ApiClient";
import { toast } from "react-toastify";
import { login } from "../../redux/authSlices";

const SignIn = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    avatar: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const changeHandler = (e) => {
    if (e.target.name === "avatar") {
      setFormData({ ...formData, avatar: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // console.log(formData);
      const response = await Api.post(`/auth/login`, formData);

      if (response.status !== 200) {
        throw new Error(`Login failed with status: ${response.status}`);
      }

      const responseData = response.data;
      // console.log(response.data);

      if (responseData.success === true) {
        if (responseData.data.user.isVerified === true) {
          const { user, token } = response.data.data;
          dispatch(login({ user, token }));

          // Track successful login event with Google Analytics
          ReactGA.event({
            category: "User",
            action: "Logged In",
            label: "Login Page",
          });

          toast("Login Successful", { position: "top-center" });
          navigate("/");

          return;
        } else {
          toast("Please verify your email before logging in.", {
            position: "top-center",
          });
        }
      } else {
        toast("Login failed. Please check your credentials.", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast(`${error.response.data.error || error.response.data.message}`, {
        position: "top-center",
      });
    } finally {
      setLoading(false);
      setFormData({
        username: "",
        email: "",
        password: "",
        avatar: "",
      });
    }
  };
  return (
    <div className="bg-[#f6f5f0] py-32">
      <Container>
        <div className="pt-14">
          <Typography variant={"h3"} className={"text-center"}>
            Login
          </Typography>
        </div>

        <div className=" max-w-2xl max-md:max-w-xl mx-auto rounded-md p-6">
          <div className=" items-center gap-8">
            <form
              onSubmit={handleSubmit}
              className="max-md:max-w-xl w-full mx-auto"
            >
              <div>
                <label className="block relative">
                  <span className="block text-sm mb-2  text-slate-700">
                    Email <span className="text-red-500">*</span>
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={changeHandler}
                    className="peer relative w-full  peer
                     text-gray-800  
                     text-sm border-b border-gray-300 focus:border-black
                     px-2  py-3 outline-none"
                    placeholder="Enter Your Email"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute top-10  right-2"
                    viewBox="0 0 682.667 682.667"
                  >
                    <defs>
                      <clipPath id="a" clipPathUnits="userSpaceOnUse">
                        <path
                          d="M0 512h512V0H0Z"
                          data-original="#000000"
                        ></path>
                      </clipPath>
                    </defs>
                    <g
                      clipPath="url(#a)"
                      transform="matrix(1.33 0 0 -1.33 0 682.667)"
                    >
                      <path
                        fill="none"
                        strokeMiterlimit="10"
                        strokeWidth="40"
                        d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                        data-original="#000000"
                      ></path>
                      <path
                        d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                        data-original="#000000"
                      ></path>
                    </g>
                  </svg>
                  <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
                    Please provide a valid email address.
                  </p>
                </label>
              </div>

              <div className="mt-2">
                <label className="block text-sm text-gray-600 mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={changeHandler}
                    required
                    className="w-full text-sm border-b border-gray-300 focus:border-black px-2 py-3 outline-none"
                    placeholder="Enter password"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                    viewBox="0 0 128 128"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <path
                        d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                        data-original="#000000"
                      />
                    ) : (
                      <path
                        d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm-21.7-64.3c-1.6-1.6-4.2-1.6-5.8 0L3.7 56.5c-1.6 1.6-1.6 4.2 0 5.8 1.6 1.6 4.2 1.6 5.8 0l32.8-32.8c1.6-1.6 1.6-4.2 0-5.8z"
                        data-original="#000000"
                      />
                    )}
                  </svg>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    for="remember-me"
                    className="text-gray-800 ml-3 block text-sm"
                  >
                    Remember me
                  </label>
                </div>
                <div>
                  <Link
                    to="/request-reset-password"
                    className="text-secondary font-semibold text-sm hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>

              <div className="mt-12">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-md flex justify-center mx-auto shadow
                   py-2.5 px-5 text-sm font-semibold rounded-md border border-[#8C6E42]
                    hover:text-white  hover:bg-black
                    bg-transparent text-black focus:outline-none"
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>
                <p className="text-gray-800 text-sm text-center mt-6">
                  Don't have an account{" "}
                  <Link
                    to="/sign-up"
                    className="text-secondary font-semibold hover:underline ml-1 whitespace-nowrap"
                  >
                    Register here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SignIn;
