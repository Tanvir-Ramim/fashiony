import { useEffect, useState } from "react";

import "./style.css";

import "../AdminProducts/product.css";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import Api from "../../shared/Axios/axios";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalOr, setTotal] = useState([]);
  const [user, setUser] = useState([]);
  //########### time #########
  const today = new Date();
  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(today.getDate() - 2);
  const options = { day: "numeric", month: "long", year: "numeric" };

  const formattedTwoDaysAgo = twoDaysAgo.toLocaleDateString("en-US", options);
  const formattedToday = today.toLocaleDateString("en-US", options);
  //###########data fecthing#########
  const dashData = async () => {
    try {
      const res = await Api.get(`/dash`);

      if (res.status === 200) {
        setProducts(res.data.data.product);
        setOrders(res.data.data.order.reverse());
        setTotal(res.data.data.allOrder);
        setUser(res.data.data.user);
      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log(orders);
  //########## delete ############
  const delOrderFn = async (id) => {
    try {
      const res = await Api.delete(`/orders`, {
        data: { idList: [id] },
      });
      console.log(res.status);
      dashData();
    } catch (error) {
      console.error(error);
    }
  };
  //########## effect #########
  useEffect(() => {
    dashData();
  }, []);
  console.log("sssssssssss", products);
  console.log(orders);
  return (
    <div className="container ps-32 md:ps-24 flex items-center justify-center w-full py-10 mx-auto box-border md:ps-20  ">
      <div className="w-full ">
        <h3
          className="mb-10 text-xl font-extrabold text-center uppercase md:text-4xl
         text-secondary underline"
        >
          Dashboard
        </h3>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-10">
          {products?.map((pro, i) => (
            <Link to={`/admin/products-view/${pro?.category}`} key={i}>
              <div
                className="flex justify-between w-full p-4 text-center text-gray-900  
               transition-all duration-500 shadow-lg rounded-2xl text-light bg-white
                hover:bg-secondary hover:text-white"
              >
                <div>
                  <p className="mb-1 text-base font-medium text-start">
                    {pro?.category}
                  </p>
                  <h4 className="mb-0 text-4xl font-bold  text-start">
                    {" "}
                    {pro?.totalProducts}{" "}
                    <span className="text-sm">Stock: {pro?.totalStock}</span>
                  </h4>
                </div>
                <Icon
                  className="text-5xl"
                  icon="ant-design:product-outlined"
                ></Icon>
              </div>
            </Link>
          ))}
          <Link to="/admin/orders">
            {" "}
            <div
              className="flex justify-between w-full p-4 text-center
             transition-all duration-500 shadow-lg rounded-2xl
              text-white bg-primary hover:bg-white hover:text-black"
            >
              <div>
                <p className="mb-1 text-base font-medium">Total Orders</p>
                <h4 className="mb-0 text-4xl font-extrabold text-start">
                  {" "}
                  {totalOr?.length}
                </h4>
              </div>
              <Icon className="text-5xl" icon="lets-icons:order"></Icon>
            </div>
          </Link>
          <Link to="/admin/user">
            {" "}
            <div
              className="flex justify-between w-full p-4 text-center
             transition-all duration-500 shadow-lg
              rounded-2xl text-white bg-primary hover:bg-white hover:text-black"
            >
              <div>
                <p className="mb-1 text-base font-medium">Total Customer</p>
                <h4 className="mb-0 text-4xl font-extrabold text-start">
                  {" "}
                  {user?.length}
                </h4>
              </div>
              <Icon className="text-5xl" icon="lets-icons:order"></Icon>
            </div>
          </Link>
        </div>

        <div className="w-full mt-10">
          <h2 className="mb-4 text-4xl font-bold uppercase ">
            Recent Orders{" "}
            <span className="text-xs font-normal">
              ({formattedTwoDaysAgo} - {formattedToday})
            </span>
          </h2>
          <div className="w-full overflow-x-auto overflow-y-hidden bg-white">
            <div>
              <table className="max-w-full text-black divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="py-2 text-xs font-medium text-left uppercase">
                      Order ID
                    </th>
                    <th className="px-1 py-2 text-xs font-medium text-left uppercase">
                      Product Info
                    </th>
                    <th className="px-1 py-2 text-xs font-medium text-left uppercase">
                      Date
                    </th>
                    <th className="px-1 py-2 text-xs font-medium text-left uppercase">
                      Customer Info
                    </th>
                    <th className="px-1 py-2 text-xs font-medium text-left uppercase">
                      Payment Status
                    </th>
                    <th className="px-1 py-2 text-xs font-medium text-left uppercase">
                      Order Status
                    </th>
                    <th className="px-1 py-2 text-xs font-medium text-left uppercase">
                  Total Price
                </th>
                    <th className="px-1 py-2 text-xs font-medium text-center  uppercase">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.length > 0 ? (
                    orders?.map((order, index) => (
                      <tr
                        key={order.id}
                        className={`${index % 2 === 0 ? "bg-white" : ""}`}
                      >
                        <td className="py-2 text-xs">{order?.invoice_id}</td>
                        <td className="px-1 py-2 space-y-1 text-xs">
                          {/* {order?.product_list?.map((item, i) => (
                                <p key={i}>{item?.p_ref?.title}</p>
                              ))} */}
                          <div className="w-full overflow-x-auto">
                            <table className="border-collapse border border-gray-300 w-full text-left text-xs">
                              <thead>
                                <tr className="bg-gray-100">
                                  <th className="border border-gray-300 px-1 py-[2px]">
                                    Name
                                  </th>
                                  <th className="border border-gray-300 px-1 py-[2px]">
                                    Sku
                                  </th>
                                  <th className="border border-gray-300 px-1 py-[2px]">
                                    Size
                                  </th>
                                  <th className="border border-gray-300 px-1 py-[2px]">
                                    Q
                                  </th>
                                  <th className="border border-gray-300 px-1 py-[2px]">
                                    Price
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {order?.product_list?.map((item, i) => (
                                  <tr key={i}>
                                    <td className="border border-gray-300 px-1 py-[2px]">
                                      {item?.p_ref?.title}
                                    </td>
                                    <td className="border border-gray-300 px-1 py-[2px]">
                                      {item?.sku}
                                    </td>
                                    <td className="border border-gray-300 px-1 py-[2px]">
                                      {item?.size}
                                    </td>
                                    <td className="border border-gray-300 px-1 py-[2px]">
                                      {item?.quantity}
                                    </td>
                                    <td className="border border-gray-300 px-1 py-[2px]">
                                      {item.p_ref?.price * item?.quantity -
                                        item.p_ref?.discount * item?.quantity}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                              {/* <tfoot>
                                <tr className="bg-gray-100 font-bold">
                                  <td
                                    colSpan="4"
                                    className="border border-gray-300 px-1 py-[2px] text-right"
                                  >
                                    Total Price:
                                  </td>
                                  <td className="border border-gray-300 px-1 py-[2px]">
                                    {order?.offer_price}
                                  </td>
                                </tr>
                              </tfoot> */}
                            </table>
                          </div>
                        </td>
                        <td className="px-1 py-2 text-xs">
                          {new Date(order.createdAt).toLocaleString()}
                        </td>
                        <td className="px-1 py-2 text-xs">
                          <div>
                            <p>
                              <span className="font-bold">Name</span> :{" "}
                              {order?.customer_name}
                            </p>

                            <p>
                              <span className="font-bold">Email</span> :{" "}
                              {order?.customer_eamil}
                            </p>
                            <p>
                              <span className="font-bold">Phone</span> :{" "}
                              {order?.customer_phone}
                            </p>
                            <p>
                              <span className="font-bold">Address</span> :{" "}
                              {order?.address} , {order?.city}
                            </p>
                          </div>
                        </td>
                        <td className="px-1 py-2 text-xs">
                          {order?.payment_status}
                        </td>
                        <td className="px-1 py-2 text-xs">
                          {order?.oder_status}
                        </td>
                        <td className="px-1 py-2 text-center text-xs">
                      {order?.total_price}tk
                    </td>
                        <td className="px-2 py-2  text-black capitalize whitespace-nowrap">
                          <div className="flex items-center justify-center gap-4">
                            <Link
                              to={`/admin/orders/${order?._id}`}
                              className="cursor-pointer"
                            >
                              <FaEdit />
                            </Link>

                            <p
                              onClick={() => delOrderFn(order?._id)}
                              className="cursor-pointer text-red-500"
                            >
                              <RiDeleteBin2Fill />
                            </p>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="10"
                        className="p-5 font-bold text-center text-black uppercase"
                      >
                        No order to show
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
