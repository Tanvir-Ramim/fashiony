import React, { useState } from "react";
import Container from "../Container/Container";
import Typography from "../Typography/Typography";
import { Link } from "react-router-dom";
import Api from "../../apiClient/ApiClient";
import { useParams } from "react-router-dom";
const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const { token } = useParams();
  //  console.log(token)
  //  console.log(formData)
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    // Handle password submission logic
    const data = {
      password: formData.password,
    };
    try {
      const res = await Api.post(`/auth/set-new-password/${token}`, data);
      if (res.status === 204) {
        setShow(true);
      }
      console.log("new reps", res);
    } catch (error) {
      console.log("error", error.response.data.error);
      setError(error.response.data.error);
      setShow(false);
    }

    setLoading(false);
  };

  return (
    <div>
      <div className="bg-[#f6f5f0] py-32 lg:py-22">
        <Container>
          <div className="pt-10">
            <Typography variant={"h3"} className={"text-center"}>
              New Password
            </Typography>
          </div>

          <div className="max-w-2xl max-md:max-w-xl mx-auto rounded-md p-6">
            <div className="items-center gap-8">
              <form
                onSubmit={handleSubmit}
                className="max-md:max-w-xl w-full mx-auto"
              >
                <div className="mt-8">
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
                        <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" />
                      ) : (
                        <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm-21.7-64.3c-1.6-1.6-4.2-1.6-5.8 0L3.7 56.5c-1.6 1.6-1.6 4.2 0 5.8 1.6 1.6 4.2 1.6 5.8 0l32.8-32.8c1.6-1.6 1.6-4.2 0-5.8z" />
                      )}
                    </svg>
                  </div>
                </div>

                <div className="mt-8">
                  <label className="block text-sm text-gray-600 mb-2">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <input
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={changeHandler}
                      required
                      className="w-full text-sm border-b border-gray-300 focus:border-black px-2 py-3 outline-none"
                      placeholder="Confirm password"
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
                        <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" />
                      ) : (
                        <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm-21.7-64.3c-1.6-1.6-4.2-1.6-5.8 0L3.7 56.5c-1.6 1.6-1.6 4.2 0 5.8 1.6 1.6 4.2 1.6 5.8 0l32.8-32.8c1.6-1.6 1.6-4.2 0-5.8z" />
                      )}
                    </svg>
                  </div>
                </div>

                {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}

                {show && (
                  <p className="text-green-700 mt-2 text-sm">
                    Successfully Update Your Password
                  </p>
                )}
                <button
                  type="submit"
                  className={`mt-8 w-full bg-black text-white py-3 font-semibold rounded-md ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Reset Password"}
                </button>
              </form>

              <div className="flex justify-center gap-4 items-center mt-8">
                <p>Return to</p>
                <Link
                  to={"/login"}
                  className="text-black font-semibold hover:underline"
                >
                  Log In
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default ForgotPassword;
