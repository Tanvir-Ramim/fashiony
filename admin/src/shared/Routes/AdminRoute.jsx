import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import cookie from "js-cookie";

import { useSelector, useDispatch } from "react-redux";

import Api from "../Axios/axios";

import { loginSession } from "../redux/slices/reduxslices";

const AdminRoutes = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state?.reduxSlice?.adminInfo?.user);
  const navigate = useNavigate();
  const loginSessionCookie = cookie.get("loginSession");

  const loginSessionn = async () => {
    if (!loginSessionCookie) {
      alert("Login Required");
      navigate(`/login`);
      return;
    }
    try {
      const res = await Api.get(`/auth/login-session/${loginSessionCookie}`);
      const mx = (await res.data.data.exp) - (await res.data.data.iat);

      dispatch(loginSession(mx));
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert("Login Session Expired");
        navigate(`/login`);
      } else {
        // Handle other types of errors, such as network issues
        console.error("Error fetching login session:", error);
      }
    }
  };
  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);

  //   return () => clearTimeout(timeout);
  // }, []);

  // if (loading) {
  //   return <ComponentLoader />;
  // }

  if (user?.role === "") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (
    (user?.role !== "" && user?.role.includes("Admin")) ||
    user?.role.includes("superAdmin")
  ) {
    // loginSessionn();
    return children;
  }

  return <Navigate to="/admin" state={{ from: location }} replace />;
};

export default AdminRoutes;
