import { createBrowserRouter } from "react-router-dom";
import Main from "../components/Layout/Main/Main";
import PageTitle from "../components/PageTitle/PageTitle";
import Home from "../pages/Home/Home";
import NotFound from "./../components/NotFound/NotFound";
import Shop from "../pages/Shop/Shop";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import Cart from "../pages/Cart/Cart";
import CartInfo from "../pages/Cart/CartInfo";
import Invoice from "../pages/Invoice/Invoice";
import SignIn from "./../components/Auth/SignIn";
import SignUp from "../components/Auth/SignUp";
import ForgotPassword from "./../components/Auth/ForgotPassword";
import ResetPassword from "./../components/Auth/ResetPassword";
import RequestPasswordReset from "../components/Auth/RequestPasswordReset";
import VerifyEmail from "../components/Auth/VerifyEmail";
// import Payment from "../pages/payment/Payment";
import ContactUs from "../pages/ContactUs/ContactUs";
import AboutUs from "../pages/Aboutus/AboutUs";
import Dashboard from "../pages/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";

import Terms from "../components/Terms/Terms";
import Refund from "../components/Refund/Refund";

import PaymentCancel from "../pages/PaymentCancel/PaymentCancel";
import ComboPage from "../pages/ComboPage/ComboPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: (
          <>
            <PageTitle
              title="Home | Fashiony"
              description="Discover the latest in fashion at Fashiony."
            />
            <Home />
          </>
        ),
      },
      {
        path: "/shop",
        element: (
          <>
            <PageTitle
              title="Shop | Fashiony"
              description="Explore our exclusive clothing collection."
            />
            <Shop />
          </>
        ),
      },
      {
        path: "/combo",
        element: (
          <>
            <PageTitle
              title="Combo | Fashiony"
              description="Explore our exclusive combo clothing collection."
            />
            <ComboPage />
          </>
        ),
      },
      {
        path: "/shop/:brand/:category/:subcategory?/:title",
        element: (
          <>
            <PageTitle
              title="Product Details | Fashiony"
              description="View product details and shop now!"
            />
            <ProductDetails />
          </>
        ),
      },
      {
        path: "/cart",
        element: (
          <>
            <PageTitle
              title="Cart | Fashiony"
              description="Review your cart items before checkout."
            />
            <Cart />
          </>
        ),
      },
      {
        path: "/check-out",
        element: (
          <>
            <PageTitle title=" Check-out | Fashiony " />
            <CartInfo />
          </>
        ),
      },
      // {
      //   path: "/payment/:id",
      //   element: (
      //     <>
      //       <PageTitle title=" Payment | Fashiony " />
      //       <Payment></Payment>
      //     </>
      //   ),
      // },
      {
        path: "/payment/success/:id",
        element: (
          <>
            <PageTitle title=" Invoice | Fashiony " />

            <Invoice />
          </>
        ),
      },
      {
        path: "/login",
        element: (
          <>
            <PageTitle title=" SignIn | Fashiony " />
            <SignIn />
          </>
        ),
      },
      {
        path: "/login/:token",
        element: (
          <>
            <PageTitle title=" SignIn | Fashiony " />
            <ForgotPassword></ForgotPassword>
          </>
        ),
      },
      {
        path: "/sign-up",
        element: (
          <>
            <PageTitle title=" SignUp | Fashiony " />
            <SignUp />
          </>
        ),
      },
      {
        path: "/forget-pass",
        element: (
          <>
            <PageTitle title=" Forget Password | Fashiony " />
            <ForgotPassword />
          </>
        ),
      },
      {
        path: "/reset-password/:token",
        element: (
          <>
            <PageTitle title=" Reset Password | Fashiony " />
            <ResetPassword />
          </>
        ),
      },
      {
        path: "/request-reset-password",
        element: <RequestPasswordReset />,
      },
      {
        path: "/verify-email",
        element: <VerifyEmail />,
      },
      {
        path: "/contact-us",
        element: (
          <>
            <PageTitle
              title="Contact Us | Fashiony"
              description="Get in touch with us."
            />
            <ContactUs />,
          </>
        ),
      },
      {
        path: "/about",
        element: (
          <>
            <PageTitle
              title="About Us | Fashiony"
              description="Learn more about Fashiony."
            />
            <AboutUs />
          </>
        ),
      },
      {
        path: "/payment/fail/:tran_id",
        element: <PaymentCancel></PaymentCancel>,
      },
      {
        path: "/profile",
        element: (
          <>
            <PageTitle title="User Dashboard | Fashiony " />
            <PrivateRoute>
              {" "}
              <Dashboard />
            </PrivateRoute>
          </>
        ),
      },
      {
        path: "/terms",
        element: (
          <>
            <PageTitle
              title="Terms and Conditions | Fashiony"
              description="Read our terms and conditions."
            />
            <Terms />
          </>
        ),
      },
      {
        path: "/refund-policy",
        element: (
          <>
            <PageTitle
              title="Return and Refund Policy | Fashiony"
              description="Read our refund policy."
            />
            <Refund />
          </>
        ),
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);
