import { useParams, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Api from "../../apiClient/ApiClient";

const VerifyEmail = () => {
  // const { token } = useParams();
  ////console.log(token);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  ////console.log(token);
  const navigate = useNavigate();

  const verifyEmailAd = async () => {
    try {
      const response = await Api.post(`/user/verify-email?token=${token}`);
      ////console.log(response);
      // dispatch(setSession(response.data.user));

      if (response.status === 200) {
        toast(response.data.message, {
          type: "success",
          position: "top-center",
        });
        navigate("/login"); // Redirect to login after successful verification
      }
    } catch (error) {
      toast(error.response?.data?.message || "An error occurred", {
        type: "error",
      });
    }
  };
  const handleVerify = () => {
    verifyEmailAd();
  };
  return (
    <div className="container mx-auto py-32">
      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12 bg-white">
        <div className="max-w-xl px-5 text-center bg-white shadow-lg p-5">
          <h2 className="mb-2 text-[42px] font-bold text-zinc-800">
            Verify Your Email
          </h2>

          <button
            onClick={handleVerify}
            className="mt-3 inline-block w-96 rounded bg-indigo-600 px-5 py-3 font-medium text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700"
          >
            Verify your email →
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
