import { Icon } from "@iconify/react";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./invoice.css";
import Api from "../../shared/Axios/axios";
import logo from "../../assets/logo/mainLogo.png";
const Invoice = ({ order }) => {
  // var [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  // const [idd, setIdd] = useState("");
  // const [upIn, setInn] = useState();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   var timer = setInterval(() => setDate(new Date()), 1000);
  //   return function cleanup() {
  //     clearInterval(timer);
  //   };
  // });
  // const invoiceRef = useRef(null);

  // const handlePrint = () => {
  //   window.print();
  // };
  // ############### update ########

  // const [inData, setIn] = useState({
  //   addrerss: "",
  //   area: "",
  //   division: "",
  //   TotalPrice: "",
  // });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //   setIn({ ...inData, [name]: value });
  // };
  // const id = order?._id;
  // const invouceCall = async () => {
  //   const id = order?._id;
  //   try {
  //     const ingett = await Api.get(`/master/api/v1/get-invoice/${id}`);

  //     setInn(ingett.data.data);
  //   } catch (error) {
  //     console.log(error.code);
  //   }
  // };
  // const onPressDown = async (e) => {
  //   const idd = order?._id;
  //   if (e.key === "Enter" && idd !== "") {
  //     try {
  //       const id = idd;
  //       await Api.post(`/master/api/v1/invoice/${id}`, inData);
  //       invouceCall();
  //       alert("Update Success");
  //       setShow(false);
  //     } catch (error) {
  //       invouceCall();
  //       console.error(error);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   if (rend === 1) {
  //     invouceCall();
  //   }
  // }, []);
  // ############### update ########
  //   <div className="text-right">
  //   <button
  //     onClick={handlePrint}
  //     className="flex items-center justify-center gap-2 px-4 py-2 mt-4 ml-auto font-semibold text-white rounded bg-primary "
  //   >
  //     Print Invoice <Icon icon="material-symbols:download" />
  //   </button>
  // </div>
  const invoiceRef = useRef(null);
  const handlePrint = () => {
    const printContents = invoiceRef.current.innerHTML;
    const iframe = document.createElement("iframe");
    iframe.style.position = "absolute";
    iframe.style.width = "0px";
    iframe.style.height = "0px";
    iframe.style.border = "none";
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(`
    <html>
      <head>
        <title>Print</title>
        <style>
          ${[...document.styleSheets]
            .map((styleSheet) => {
              try {
                return [...styleSheet.cssRules]
                  .map((rule) => rule.cssText)
                  .join("");
              } catch (e) {
                return "";
              }
            })
            .join("")}
        </style>
      </head>
      <body>
        ${printContents}
      </body>
    </html>
  `);
    doc.close();
    iframe.onload = () => {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
      document.body.removeChild(iframe);
    };
  };
  const dateStr = order?.createdAt;
  const date = new Date(dateStr);
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  console.log(order);
  return (
    <div>
      <div className="hidden print:block bg-[#F7F5EF] py-20 pt-24">
        <div className="   max-w-[1400px] mx-auto " ref={invoiceRef}>
          <div className=" w-full lg:p-8 p-2">
            {/* Invoice Header */}
            <div className="flex justify-between items-center border-b pb-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Invoice</h1>
                <p className="text-sm text-gray-500"># {order?.invoice_id}</p>
              </div>
              <div>
                <img src={logo} alt="Logo" className="h-16 w-16" />
              </div>
            </div>

            {/* Invoice Date and Due Date */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <p className="text-sm text-gray-500">Invoice Date</p>
                <p className="text-lg font-semibold text-gray-800">
                  {formattedDate}
                </p>
              </div>
              {/* <div>
            <p className="text-sm text-gray-500">Due Date</p>
            <p className="text-lg font-semibold text-gray-800">
              7 March, 2023
            </p>
          </div> */}
            </div>

            {/* Billing and Sender Information */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <p className="text-sm font-medium text-gray-500">From</p>
                <p className="text-lg font-bold text-gray-800">
                  Starfleet Alliance
                </p>
                <p className="text-sm text-gray-600">Patranee@gmail.com</p>
                <p className="text-sm text-gray-600">Dhaka, Mirpur</p>
                <p className="text-sm text-gray-600">+8801886-230003</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Billed To</p>
                <p className="text-lg font-bold text-gray-800">
                  {order?.customer_name}
                </p>
                <p className="text-sm text-gray-600">{order?.customer_eamil}</p>
                <p className="text-sm text-gray-600">{order?.address}</p>
                <p className="text-sm text-gray-600">{order?.country}</p>
                <p className="text-sm text-gray-600">{order?.customer_phone}</p>
              </div>
            </div>
            <div className="flex justify-between py-4">
              {" "}
              <p className="pt-2">
                {" "}
                <strong>Payment Status:</strong> {order?.payment_status}
              </p>
              <p className="pt-2">
                {" "}
                <strong>Order Status:</strong> {order?.oder_status}
              </p>
            </div>
            {/* Items Table */}
            <div className="mb-8">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="">
                    <th className="lg:p-4  font-semibold ">Description</th>
                    <th className="lg:p-4 px-2 text-center font-semibold ">
                      Quantity
                    </th>
                    <th className="lg:p-4 px-2 font-medium ">Price</th>
                    <th className="lg:p-4 font-medium  text-end">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {order?.product_list?.map((item, i) => (
                    <tr key={i} className="border-t border-black/40">
                      <td className="pt-4 lg:px-4">
                        <div className="flex items-center">
                          <img
                            src={item?.p_ref?.url[0]?.url}
                            alt="Item"
                            className="h-16 lg:block print:block hidden  w-16 object-contain mr-4"
                          />
                          <div>
                            <p className="text-gray-800">
                              {item?.p_ref?.title}
                            </p>
                            <p className="text-sm text-gray-500">
                              Size: {item?.size}
                            </p>
                            <p className="text-sm text-gray-500">
                              Color: {item?.color}
                            </p>
                            <p className="text-sm text-gray-500">
                              SKU: {item?.p_ref?.sku}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="lg:p-4 text-center text-gray-800">
                        {item?.quantity}
                      </td>
                      <td className="lg:p-4 text-gray-800">
                        ৳{item?.p_ref?.price - item?.p_ref?.discount}{" "}
                      </td>
                      <td className="lg:p-4  text-gray-800 text-end">
                        {" "}
                        ৳
                        {item?.p_ref?.price * item?.quantity -
                          item?.p_ref?.discount * item?.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary */}
            {/* <hr className="" /> */}
            <div className="flex justify-end  border-t border-black/40">
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 ">
                <div className="flex justify-between py-2 ">
                  <p className="text-gray-600">Subtotal</p>
                  <p className="text-gray-800">
               
                    ৳{order?.offer_price + order?.coupon_discount || 0}
                  </p>
                </div>
                {order?.applied_coupon?.isAppied && (
                  <div className="flex justify-between py-2 border-t">
                    <p className="text-gray-600">Coupon Discount </p>
                    <p className="text-gray-800">
                    - ৳{order?.coupon_discount || 0}
                    </p>
                  </div>
                )}
                <div className="flex justify-between py-2 border-t">
                  <p className="text-gray-600">Shipping </p>
                  <p className="text-gray-800">+ ৳{order?.shipping}</p>
                </div>
                <div className="flex justify-between py-2 border-t">
                  <p className="text-gray-600">Total</p>
                  <p className="text-gray-800">৳{order?.total_price}</p>
                </div>
                {/* <div className="flex justify-between py-2 border-t">
                  <p className="text-gray-600">Paid Amount</p>
                  <p className="text-gray-800">
                    ৳{order?.paid_amount > 0 ? order?.paid_amount : 0}
                  </p>
                </div> */}
                <div className="flex justify-between py-2 border-t border-b">
                  <p className="font-bold text-gray-800">Amount Due</p>
                  <p className="font-bold text-gray-800">
                    ৳{order?.total_price - order?.paid_amount}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Message */}
            <div className="mt-8 text-center">
              <p className="text-lg font-semibold text-gray-700">
                Thank you for your purchase! We hope to serve you again soon.
              </p>
              <div className="mt-2  border-gray-300 pt-2">
                {/* <p className="hidden print:block text-xs text-gray-400 italic">
                Powered by{" "}
                <span className="font-bold text-indigo-500">fashiony</span>
              </p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={handlePrint}
        className="px-4 py-2 text-sm font-medium text-blue-700 border border-blue-500 rounded hover:bg-blue-100 focus:outline-none focus:ring focus:ring-blue-300"
      >
        Download PDF Invoice
      </button>
    </div>
  );
};

export default Invoice;
