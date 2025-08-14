import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

import Dashboard from "../../features/Dashboard/Dashboard";
import AdminOrders from "../../features/AdminOrders/AdminOrders";

import AdminAddProducts from "../../features/AdminAddProducts/AdminAddProducts";
import AdminBanners from "../../features/AdminBanner/AdminBanners";
import AdminAddGallery from "../../features/AdminAddGallery/AdminAddGallery";
import AdminLayout from "../../features/Admin/Layout/AdminLayout";
import EditProduct from "../../features/AdminAddProducts/EditProduct";
import AdminSingleOrder from "../../features/AdminOrders/AdminSingleOrder";
import ProductList from "../../features/AdminProducts/ProductList";
import Customer from "../../features/Customer/Cutomer";
import AdminContact from "../../features/AdminContact/AdminContact";
import Login from "../../features/Login/Login";
import AdminRoutes from "./AdminRoute";
import Shipping from "../../features/Admin/Sidebar/Shipping/Shipping";
import AddCombo from "../../features/AddCombo/AddCombo";
import AddCoupon from "../../features/AddCoupon/Coupon";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AdminRoutes>
        <AdminLayout />{" "}
      </AdminRoutes>
    ),
    children: [
      {
        path: "/admin",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "/",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Dashboard />
          </Suspense>
        ),
      },

      {
        path: "/admin/orders",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminOrders />
          </Suspense>
        ),
      },
      {
        path: "/admin/orders/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminSingleOrder />
          </Suspense>
        ),
      },

      {
        path: "/adminAddProducts",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminAddProducts />
          </Suspense>
        ),
      },
      {
        path: "/admin/addCombo",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AddCombo></AddCombo>
          </Suspense>
        ),
      },
      {
        path: "/edit-product/:brand/:category/:subcategory?/:product",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <EditProduct />
          </Suspense>
        ),
      },
      {
        path: "admin/products-view/:category",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ProductList />
          </Suspense>
        ),
      },
      {
        path: "/admin/images",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminAddGallery />
          </Suspense>
        ),
      },
      {
        path: "/admin/user",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Customer />
          </Suspense>
        ),
      },
      {
        path: "/admin/info",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminContact />
          </Suspense>
        ),
      },

      {
        path: "/adminAddGallery",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminBanners />
          </Suspense>
        ),
      },
      {
        path: "/admin/shipping",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Shipping />
          </Suspense>
        ),
      },
      {
        path: "/admin/coupon",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AddCoupon></AddCoupon>
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
