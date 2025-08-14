import React, { useState } from "react";

import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Api from "../../apiClient/ApiClient";

const RequestPasswordReset = () => {
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);
  const [provide, setProvide] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("age",)
    try {
      const response = await Api.post(`/auth/reset-password-request`, {
        email,
      });
      // console.log("response",response)
      if (response.status === 200) {
        setShow(true);
        setProvide(false);
      }
    } catch (error) {
      setProvide(true);
      setShow(false);
    }
  };

  return (
    <div className="container mx-auto pt-36 py-32">
      <main className="w-full  max-w-md mx-auto py-10 p-6">
        <div>
          <h2 className="text-center text-xl">Welcome To Fashiony</h2>
        </div>
        <div className="mt-7 bg- white  rounded-xl shadow-lg  border-2 border-indigo-300">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 ">
                Forgot password?
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Remember your password?
                <Link
                  state={"Login"}
                  className="text-blue-600 decoration-2 hover:underline font-medium"
                  to="/login"
                >
                  Login here
                </Link>
              </p>
            </div>

            <div className="mt-5">
              <form onSubmit={handleSubmit}>
                <div className="grid gap-y-4">
                  <div>
                    <label className="block">
                      <span className="block text-sm mb-2 font-medium text-slate-700">
                        Email address
                      </span>
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="peer w-full text-sm peer text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600"
                      />
                      {provide && (
                        <p className="mt-2  peer-invalid:visible animate-pulse text-pink-600 text-sm">
                          Please provide a valid email address.
                        </p>
                      )}
                      {show && (
                        <p className="mt-2 animate-bounce peer-invalid:visible text-green-700 text-sm">
                          Please Check your mail
                        </p>
                      )}
                    </label>
                  </div>
                  {/* <button
                    type="submit"
                    className="py-3 px-4 inline-flex justify-center items-center
                     gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white
                      hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                  >
                    Reset password
                  </button> */}
                  <button
                    type="submit"
                    className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                      />
                    </svg>

                    <span>Reset password</span>
                  </button>
                  <p className="text-center">
                    Not registered yet?{" "}
                    <Link
                      state={"Signup"}
                      to="/login"
                      className="text-indigo-600 font-medium inline-flex space-x-1 items-center"
                    >
                      <span>Register now </span>
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </span>
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

        <p className="mt-3 flex justify-center items-center text-center divide-x divide-gray-300 dark:divide-gray-700">
          <a
            className="pl-3 inline-flex items-center gap-x-2 text-sm text-gray-600 decoration-2 hover:underline hover:text-blue-600 dark:text-gray-500 dark:hover:text-gray-200"
            href="/contact-us"
          >
            Contact us!
          </a>
        </p>
      </main>
    </div>
  );
};

export default RequestPasswordReset;
