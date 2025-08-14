import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { Icon } from "@iconify/react";

const AdminOrdersList = ({ order, handleDelete, index }) => {
  const {
    _id,
    address,
    userName,
    email,
    quantity,
    contactNumber,
    price,
    offerPrice,
    products,
    shippingCost,
    updatedAt,
    createdAt,
    category,
    subcategoy,
    deliveryFee,
    note,
    paid_amount,
    paymentMethod,
    paidStatus,
    orderStatus,
  } = order;

  const [statusColor, setStatusColor] = useState("");

  useEffect(() => {
    if (orderStatus === "Delivered") {
      setStatusColor("green");
    } else if (orderStatus === "canceled") {
      setStatusColor("red");
    } else {
      setStatusColor("#DAAD01");
    }
  }, []);

  const date = new Date();

  return (
    <>
      <tr className={`${index % 2 == 0 ? " bg-black text-white " : ""} `}>
        <td className="px-2 py-2 text-xs text-white capitalize whitespace-nowrap">
          {new Date(createdAt).toLocaleString("en-us")}
        </td>
        <td className="px-2 py-2 text-xs text-white capitalize whitespace-nowrap">
          {products?.map((item, i) => {
            return (
              <li className="text-xs text-white" key={i}>
                {item.sku}
              </li>
            );
          })}
        </td>
        <td className="px-2 py-2 text-xs text-white capitalize whitespace-nowrap">
          {products?.map((item) => (
            <>
              <p className="text-xs text-white">{item.name}</p>
            </>
          ))}
        </td>
        <td className="px-2 py-2 text-xs text-white capitalize whitespace-nowrap">
          {products?.map((item, i) => {
            return (
              <li className="text-xs text-white" key={i}>
                {item.sizes}
              </li>
            );
          })}
        </td>
        <td
          scope="row"
          className="px-2 py-2 text-xs text-white capitalize whitespace-nowrap"
        >
          {products?.map((item, i) => {
            return (
              <li className="text-xs text-white" key={i}>
                {item.category} - {item.subcategory}
              </li>
            );
          })}
        </td>
        <td
          scope="row"
          className="px-2 py-2 text-xs text-white capitalize whitespace-nowrap"
        >
          {products?.map((item, i) => (
            <div key={i} className="text-xs text-white ">
              {item.quantity} * {item.offerPrice}
            </div>
          ))}
        </td>

        <td className="px-2 py-2 text-xs text-white whitespace-nowrap">
          <p>
            {userName}
            <br />
            {contactNumber}
            <br />
            {email}
            <br />
          </p>
        </td>

        <td className="px-2 py-2 text-xs text-white capitalize whitespace-nowrap">
          {note}
        </td>

        <td className="px-2 py-2 text-xs text-white capitalize whitespace-nowrap text-right">
          <p className=" flex flex-col">
            <span className=" p-2 inline-block">
              PR.{" "}
              <span className=" font-bold ml-1">
                {offerPrice - shippingCost}
              </span>
              <br />
            </span>
            {shippingCost && (
              <span className=" p-2 inline-block">
                {" "}
                DPR. <span className=" font-bold ml-1">{shippingCost}</span>
                <br />
              </span>
            )}
            <span
              className={`mt-2 inline-block ${
                paid_amount === offerPrice ? "bg-green-600" : "bg-brand"
              } p-2 rounded shadow`}
            >
              paid.{" "}
              <span className=" font-bold ml-1 mt-2">
                {paid_amount > 0 && paid_amount}
              </span>
            </span>

            <span className=" mt-2 inline-block bg-red-500 p-2 rounded shadow ">
              Due.{" "}
              <span className=" font-bold ml-1 mt-2">
                {paid_amount > 0 ? offerPrice - paid_amount : offerPrice}
              </span>
            </span>
            <br />
          </p>
        </td>
        <td className="px-2 py-2 text-xs text-white capitalize whitespace-nowrap">
          <p
            className={`text-primary_hov ${
              statusColor && `text-${statusColor}-400`
            } text-xs`}
          >
            {orderStatus}
          </p>
          <p>{paymentMethod}</p>
          <p>{paidStatus ? "Yes" : "No"}</p>
        </td>
        <td className="px-2 py-2 text-xs text-white capitalize whitespace-nowrap">
          <Link to={`${order?._id}`} className="text-xs">
            <div className="flex items-center  justify-between text-xs text-white">
              {/* <BiEdit className="ml-4 text-xs" /> */}
              <div className=" bg-brand rounded-full shadow-lg border-primary w-8 h-8 flex items-center justify-center">
                <Icon icon="icon-park:edit-two" className=" w-5 h-5 "></Icon>
              </div>
              <div className=" bg-brand rounded-full shadow-lg border-primary w-8 h-8 flex items-center justify-center">
                <Icon
                  icon="arcticons:pathao"
                  className=" w-5 h-5 text-red-700 font-bold "
                ></Icon>
              </div>
            </div>
          </Link>
        </td>
        <td className="px-2 py-2 text-xs  capitalize whitespace-nowrap">
          <div
            onClick={() => handleDelete(_id)}
            className=" bg-brand rounded-full shadow-lg border-primary cursor-pointer w-8 h-8 flex items-center justify-center"
          >
            <Icon
              icon="ph:trash-bold"
              className=" w-5 h-5 text-red-800 "
            ></Icon>
          </div>
        </td>
      </tr>
    </>
  );
};

export default AdminOrdersList;
