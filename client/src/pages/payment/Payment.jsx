// import React, { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import Api from "../../apiClient/ApiClient";
// import ssl from "../../assets/logo/ssl.png";
// import sslLogo from "../../assets/logo/sslLogo.png";
// import cod from "../../assets/logo/cod.png";
// import { useDispatch, useSelector } from "react-redux";
// import { TbTruckReturn } from "react-icons/tb";
// import { MdOutlinePayment } from "react-icons/md";
// import { FaMoneyBillWave, FaCreditCard } from "react-icons/fa";
// import logo from "../../assets/logo/mainLogo.png";
// import Swal from "sweetalert2";
// import Aos from "aos";
// import "aos/dist/aos.css";
// import "./Payment.css";
// import { removeAll } from "../../redux/reduxSlice";
// const Payment = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const [order, setOder] = useState({});
//   const navigate = useNavigate();
//   const getData = async () => {
//     const res = await Api.get(`/orders/${id}`);
//     console.log(res.data.data);
//     setOder(res.data.data);
//   };
//   const [isOpen, setIsOpen] = useState(false);
//   useEffect(() => {
//     Aos.init({
//       duration: 1000,
//       easing: "ease-out-cubic",
//     });
//   }, []);
//   console.log();

//   const [shippingInfo, setShippingInfo] = useState({});
//   const getShippingInfo = async () => {
//     try {
//       const res = await Api.get("/shipping");
//       setShippingInfo(res.data.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   const handleFull = async (amount, oderId) => {
//     try {
//       let res;
//       if (amount && amount > 0) {
//         console.log(amount);
//         res = await Api.post(`/payment/${oderId}?amount=${amount}`);
//       } else {
//         Swal.fire({
//           title: "Proceed with your Order?",
//           text: "Are you sure you want to confirm this order with 'Cash On Delivery'? You can cancel if you change your mind.",
//           imageUrl: `${logo}`, // Replace with your own image URL
//           imageWidth: 100,
//           imageHeight: 100,
//           showCancelButton: true,
//           confirmButtonColor: "#B9A36B",
//           cancelButtonColor: "#d33",
//           confirmButtonText: "Yes, Place Order",
//           cancelButtonText: "No, Go Back",
//           buttonsStyling: true,
//           customClass: {
//             popup: "small-swal", // Will apply custom CSS for smaller modal
//           },
//         }).then(async (result) => {
//           if (result.isConfirmed) {
//             res = await Api.patch(`/orders/${oderId}`, {
//               data: {
//                 oder_status: "Order Confirmed",
//                 payment_status: "Pending",
//                 payment_by: "Cash On Delivery",
//               },
//             });
//             if (res.status === 204) {
//               setIsOpen(true);
//               dispatch(dispatch(removeAll()));
//             }
//           } else {
//             console.log("Order confirmation canceled by the user.");
//           }
//         });
//       }
//       if (res.status === 200) {
//         window.location.href = res.data.url;
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleNavigate = () => {
//     navigate(`/payment/success/${order?._id}`, { replace: true });
//   };

//   useEffect(() => {
//     getData();
//   }, [id]);
//   useEffect(() => {
//     getShippingInfo();
//   }, []);
//   return (
//     // sdfffffffffffffffffffffffffffffffffffffffffffff
//     <div className="bg-[#F7F5EF]  py-30">
//       <div className="  xl:container  mx-auto lg:px-6 md:px-4 px-2 ">
//         {/*      //////////////////////////////////////////////first line/////////////////////////////////////////////                                                */}
//         <div className="flex lg:pb-10 pb-4 pt-2 items-center justify-center space-x-4 ">
//           {/* Step 1 */}
//           <div className="flex items-center space-x-2">
//             <div className="w-6 h-6  flex items-center justify-center bg-green-500 text-white rounded-full">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586l-3.293-3.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </div>
//             <span className="text-gray-900 font-medium flex">
//               <span className="sm:block hidden">Shopping</span> Cart
//             </span>
//           </div>

//           {/* Separator */}
//           <div className="w-8 h-px bg-gray-300"></div>

//           {/* Step 2 */}
//           <div className="flex items-center space-x-2">
//             <div className="w-6 h-6  flex items-center justify-center bg-green-500 text-white rounded-full">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586l-3.293-3.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </div>
//             <span className="text-gray-900 font-medium">Address</span>
//           </div>

//           {/* Separator */}
//           <div className="w-8 h-px bg-gray-300"></div>

//           {/* Step 3 */}
//           <div className="flex items-center space-x-2">
//             <div className="w-6 h-6 flex items-center justify-center bg-gray-200 text-gray-800 rounded-full">
//               <span className="text-sm">3</span>
//             </div>
//             <span className="text-gray-900 font-medium">Step</span>
//           </div>
//         </div>

//         <div className="bg-[#F7F5EF]   flex lg:flex-row flex-col ">
//           <div className="py-2 lg:p-8 w-full  lg:w-[65%] mx-auto">
//             <h1 className="text-2xl font-semibold mb-6 mt-3">Your Orders</h1>

//             {/* Order Items */}
//             <div className="space-y-5 ">
//               {order?.product_list?.map((item, index) => (
//                 <div className="border-b pb-4" key={index}>
//                   <div className="flex  lg:gap-1 gap-3 flex-row md:items-center justify-between ">
//                     <img
//                       className="w-32 h-[9rem] mb-2 md:mb-0"
//                       src={item?.p_ref?.thumb?.url}
//                       alt="Product"
//                     />
//                     <div className="flex-1 md:pl-4">
//                       <p className="md:text-lg text-base font-medium">
//                         {item?.p_ref?.title}
//                       </p>
//                       <p className="text-sm text-gray-500 ">
//                         Size: {item?.size}
//                       </p>
//                       <p className="text-sm text-gray-500">
//                         Color: {item?.color}
//                       </p>
//                       <p className="text-sm text-gray-500">SKU: {item?.sku}</p>
//                       <div className="flex justify-between">
//                         <p className="text-sm text-gray-500">
//                           Quantity: {item?.quantity}
//                         </p>
//                         <p className="text-lg font-semibold">
//                           ৳
//                           {item?.p_ref?.price * item?.quantity -
//                             item?.p_ref?.discount * item?.quantity}
//                         </p>
//                       </div>

//                       <p className="text-sm hidden  md:block text-gray-500">
//                         Available for immediate delivery, delivery time
//                         (domestic) approx. 2-5 working days
//                       </p>
//                     </div>
//                   </div>
//                   <p className="text-sm block  md:hidden text-gray-500">
//                     Available for immediate delivery, delivery time (domestic)
//                     approx. 2-5 working days
//                   </p>
//                 </div>
//               ))}
//             </div>

//             <div className="mt-4 py-3 pb-7">
//               <div className="  grid  grid-cols-5 ">
//                 <div className=" col-span-2 ">
//                   <h2 className="text-xl border- font-semibold">Total Value</h2>
//                 </div>
//                 <div className=" col-span-3 w-full">
//                   <div className="flex justify-between">
//                     <div className="  text-start">
//                       <p>Total value of goods</p>
//                       <p className="">Shipping</p>
//                     </div>
//                     <div className=" ">
//                       <p className="text-end">৳{order?.offer_price}</p>
//                       <p className="text-end">
//                         {" "}
//                         ৳{" "}
//                         {order?.city?.toLowerCase() === "dhaka"
//                           ? shippingInfo?.in_dhaka
//                           : shippingInfo?.out_dhaka}{" "}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex justify-between ">
//                     <div className="w-full col-span-2">
//                       <hr className="my-2" />
//                       <p className="   font-bold">Total Cost</p>
//                     </div>
//                     <div className="col-span-2">
//                       <hr className="my-2" />
//                       <p className="cursor-pointer">
//                         ৳
//                         {order?.city?.toLowerCase() === "dhaka"
//                           ? order?.offer_price + shippingInfo?.in_dhaka
//                           : order?.offer_price + shippingInfo?.out_dhaka}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <hr className="border-dashed my-4 border-black/40" />
//             <div className="mt-8 flex mt-3 justify-between">
//               <div className="grid  grid-cols-5 w-full ">
//                 <h2 className="text-xl col-span-2 font-semibold">
//                   Shipping Details:
//                 </h2>
//                 <div className=" sm:col-span-2  w-full col-span-3">
//                   <h3 className="font-semibold ">Delivery's to:</h3>
//                   <p className="">{order?.customer_name}</p>
//                   <p className="font-light">
//                     {order?.house_nbr} , {order?.road_nbr}, {order?.area}
//                   </p>
//                   <p className="font-light">
//                     {order?.city} ,{order?.country}
//                   </p>
//                 </div>
//                 <div className="sm:col-span-1  hidden sm:block">
//                   <h3 className="font-bold text-end">Contact Info</h3>
//                   <p className="text-end f">{order?.customer_phone}</p>
//                   <p className="text-end f">{order?.customer_eamil}</p>
//                 </div>
//               </div>
//             </div>
//             <div className=" grid  grid-cols-5 w-full sm:hidden   ">
//               <h3 className="col-span-2 font-semibold  ">Contact Info:</h3>
//               <div>
//                 <p className="text-end f">{order?.customer_eamil}</p>
//                 <p className="col-span-2">{order?.customer_phone}</p>
//               </div>
//             </div>
//             <hr className="border-dashed my-4 border-black/40" />

//             <div className="">
//               <div className="grid  grid-cols-5 w-full   ">
//                 <div className="col-span-2">
//                   <h2 className="text-xl font-semibold">Payment Details</h2>
//                 </div>
//                 <div className="col-span-2 ">
//                   <h3 className="font-semibold">Billing Address</h3>
//                   <p className="">{order?.customer_name}</p>
//                   <p className="font-light">
//                     {order?.house_nbr} , {order?.road_nbr}, {order?.area}
//                   </p>
//                   <p className="font-light">
//                     {order?.city} ,{order?.country}
//                   </p>
//                 </div>
//                 <div className="opacity-0 grid">+8801457515124</div>
//               </div>
//             </div>
//             {/* <hr className="border-dashed my-4 border-black/40" /> */}
//             {/* Total Value */}
//             {/* <div className="">
//               <div className="  grid  grid-cols-5 ">
//                 <div className=" col-span-2 ">
//                   <h2 className="text-xl border- font-semibold">Total Value</h2>
//                 </div>
//                 <div className=" col-span-3 w-full">
//                   <div className="flex justify-between">
//                     <div className="  text-start">
//                       <p>Total value of goods</p>
//                       <p className="">Shipping</p>
//                     </div>
//                     <div className=" ">
//                       <p className="text-end">৳{order?.offer_price}</p>
//                       <p className="text-end">
//                         {" "}
//                         ৳{" "}
//                         {order?.city?.toLowerCase() === "dhaka"
//                           ? shippingInfo?.in_dhaka
//                           :  shippingInfo?.out_dhaka}{" "}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex justify-between ">
//                     <div className="w-full col-span-2">
//                       <hr className="my-2" />
//                       <p className="   font-bold">Total Cost</p>
//                     </div>
//                     <div className="col-span-2">
//                       <hr className="my-2" />
//                       <p className="cursor-pointer">
//                         ৳
//                         {order?.city?.toLowerCase() === "dhaka"
//                           ? order?.offer_price + shippingInfo?.in_dhaka
//                           : order?.offer_price + shippingInfo?.out_dhaka}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div> */}
//           </div>
//           <div className="h-fit lg:mt-16 md:mt-11 mt-8 lg:w-[30%] w-full mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-lg">
//             <h2 className="text-2xl font-semibold mb-2 text-[#B7A16A] text-center">
//               Secure Your Order Now!
//             </h2>
//             <p className="text-center text-gray-600 mb-6">
//               Choose your preferred payment method to complete your purchase.
//             </p>

//             <div className="flex justify-center mb-6">
//               <img
//                 src={sslLogo}
//                 alt="SSL Commerce Logo"
//                 className="w-[50%] h-auto"
//               />
//             </div>

//             {order?.city?.toLowerCase() === "dhaka" ? (
//               <div className="flex flex-col items-center space-y-4">
//                 <div className="text-lg font-semibold text-gray-700">
//                   Total Amount:{" "}
//                   <span className="text-[#B7A16A]">
//                     {order?.offer_price + shippingInfo?.in_dhaka} Tk
//                   </span>
//                 </div>
//                 <button
//                   onClick={() => handleFull(0, order?._id)}
//                   className="flex items-center justify-center w-full md:max-w-xs max-w-[300px] px-2 md:py-2 py-1 bg-[#295CAB] text-white font-semibold rounded-md transition duration-300 ease-in-out transform hover:bg-opacity-90 hover:scale-105"
//                 >
//                   <FaMoneyBillWave className="mr-2" />
//                   Cash on Delivery
//                 </button>
//                 <div className="relative w-full max-w-xs flex items-center">
//                   <hr className="w-full border-gray-300" />
//                   <span className="absolute left-1/2 -translate-x-1/2 bg-white px-2 text-gray-500 font-medium">
//                     or
//                   </span>
//                 </div>
//                 <button
//                   onClick={() =>
//                     handleFull(
//                       order?.offer_price + shippingInfo?.in_dhaka,
//                       order?._id
//                     )
//                   }
//                   className="flex items-center justify-center w-full md:max-w-xs max-w-[300px] md:py-2 py-1 bg-[#295CAB] text-white font-semibold rounded-md transition duration-300 ease-in-out transform hover:bg-opacity-90 hover:scale-105"
//                 >
//                   <FaCreditCard className="mr-2" />
//                   Pay Full {order?.offer_price + shippingInfo?.in_dhaka} Tk
//                 </button>
//               </div>
//             ) : (
//               <div className="flex flex-col items-center space-y-4">
//                 <div className="text-lg font-semibold text-gray-700">
//                   Total Amount:{" "}
//                   <span className="text-[#B7A16A]">
//                     {order?.offer_price + shippingInfo?.out_dhaka} Tk
//                   </span>
//                 </div>
//                 <button
//                   onClick={() =>
//                     handleFull(shippingInfo?.out_dhaka, order?._id)
//                   }
//                   className="flex items-center justify-center w-full md:max-w-xs max-w-[300px] px-2 md:py-2 py-1 bg-[#295CAB] text-white font-semibold rounded-md transition duration-300 ease-in-out transform hover:bg-opacity-90 hover:scale-105"
//                 >
//                   <FaCreditCard className="mr-2" />
//                   Pay Delivery Charge {shippingInfo?.out_dhaka} TK Only
//                 </button>
//                 <div className="relative w-full max-w-xs flex items-center">
//                   <hr className="w-full border-gray-300" />
//                   <span className="absolute left-1/2 -translate-x-1/2 bg-white px-2 text-gray-500 font-medium">
//                     or
//                   </span>
//                 </div>
//                 <button
//                   onClick={() =>
//                     handleFull(
//                       order?.offer_price + shippingInfo?.out_dhaka,
//                       order?._id
//                     )
//                   }
//                   className="flex items-center justify-center w-full md:max-w-xs max-w-[300px] md:py-2 py-1 bg-[#295CAB] text-white font-semibold rounded-md transition duration-300 ease-in-out transform hover:bg-opacity-90 hover:scale-105"
//                 >
//                   <FaCreditCard className="mr-2" />
//                   Pay Full {order?.offer_price + shippingInfo?.out_dhaka} Tk
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="flex justify-around">
//           <Link
//             to={"/cart"}
//             className="mt-6 px-4 py-2 text-black border border-gray-400/50 font-bold rounded-md"
//           >
//             Go Back
//           </Link>
//         </div>
//       </div>
//       {/* modal */}
//       {isOpen && (
//         <div
//           className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50  ${
//             isOpen ? "opacity-100" : "opacity-0"
//           }`}
//         >
//           <div
//             data-aos="zoom-in"
//             className={`bg-white rounded-lg shadow-lg w-full max-w-4xl mx-4 ${
//               isOpen ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
//             } overflow-auto custom-scrollbar max-h-[90vh]`}
//           >
//             <div className="p-8">
//               <div className="flex flex-col items-center mb-8">
//                 <div className="h-20 animate-bounce w-20 bg-white border-4 border-blue-300 rounded-full mb-4 flex items-center justify-center"></div>
//                 <h1 className="text-xl font-semibold">
//                   Thank you for ordering
//                 </h1>
//               </div>
//               <div className="md:flex-row flex-col flex gap-6">
//                 <div className="lg:w-[50%] w-full">
//                   <div className="flex justify-between">
//                     <div>
//                       <h2 className="font-bold text-sm mb-2">Delivery's to:</h2>
//                       <p className="">{order?.customer_name}</p>
//                       <p className="font-light">
//                         {order?.house_nbr} , {order?.road_nbr}, {order?.area}
//                       </p>
//                       <p className="font-light">
//                         {order?.city} ,{order?.country}
//                       </p>
//                     </div>
//                     <div>
//                       <h2 className="font-bold text-sm mb-2">Contact Info</h2>
//                       <p className="col-span-2">{order?.customer_phone}</p>
//                     </div>
//                   </div>

//                   <div className="gap-6 mt-8">
//                     <div className="flex justify-between">
//                       <div>
//                         <h2 className="font-bold text-sm mb-2">
//                           Billing Address
//                         </h2>
//                         <p className="">{order?.customer_name}</p>
//                         <p className="font-light">
//                           {order?.house_nbr} , {order?.road_nbr}, {order?.area}
//                         </p>
//                         <p className="font-light">
//                           {order?.city} ,{order?.country}
//                         </p>
//                       </div>
//                       {/* <div>
//                         <h2 className="font-bold text-sm mb-2">
//                           Pay it full with:
//                         </h2>
//                         <p className="text-sm">
//                           <span role="img" aria-label="credit-card">
//                             💳
//                           </span>{" "}
//                           **** **** **** 4515
//                         </p>
//                       </div> */}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Your cart */}
//                 <div className="md:w-[50%] w-full">
//                   <div>
//                     <h2 className="font-bold text-sm mb-2">Your Cart</h2>
//                     <div className="space-y-4">
//                       {order?.product_list?.map((item, i) => (
//                         <div
//                           key={i}
//                           className="flex  py-1 border-b items-center space-x-4"
//                         >
//                           <div className=" w-16  rounded">
//                             <img
//                               className="h-18"
//                               src={item?.p_ref?.thumb?.url}
//                               alt=""
//                             />
//                           </div>
//                           <div className="flex-1 text-sm">
//                             <p>{item?.p_ref?.title}</p>
//                             <div className="flex gap-3 py-1">
//                               {item?.size && (
//                                 <p className=" md:text-base text-sm">
//                                   size : {item?.size}
//                                 </p>
//                               )}
//                               {item?.color && (
//                                 <p className=" md:text-base text-sm">
//                                   color : {item?.color}
//                                 </p>
//                               )}
//                             </div>
//                             <p>Quantity: {item?.quantity}</p>
//                           </div>
//                           <p className="text-sm">
//                             ৳
//                             {item?.p_ref?.price * item?.quantity -
//                               item?.p_ref?.discount * item?.quantity}
//                           </p>
//                         </div>
//                       ))}

//                       {/* <div className="flex items-center space-x-4">
//                         <div className="h-16 w-16 bg-gray-200 rounded"></div>
//                         <div className="flex-1 text-sm">
//                           <p>
//                             Functional leggings GIRL POWER with T-shirt in
//                             medium blue
//                           </p>
//                           <p>Quantity: 1</p>
//                         </div>
//                         <p className="text-sm">$30.00</p>
//                       </div> */}
//                     </div>
//                   </div>
//                   <div>
//                     <h2 className="font-bold text-sm mb-2">Summary</h2>
//                     <div className="space-y-1 text-sm">
//                       <div className="flex justify-between">
//                         <span>Total value of goods:</span>
//                         <p className="text-end">৳{order?.offer_price}</p>
//                       </div>
//                       <div className="flex justify-between text-green-600">
//                         <span>Shipping:</span>
//                         <p>
//                           {" "}
//                           ৳{" "}
//                           {order?.city?.toLowerCase() === "dhaka"
//                             ? shippingInfo?.in_dhaka
//                             : shippingInfo?.out_dhaka}{" "}
//                         </p>
//                       </div>

//                       <div className="flex justify-between font-bold border-t pt-2">
//                         <span>Total Cost:</span>
//                         <p className="cursor-pointer">
//                           ৳
//                           {/* {order?.city?.toLowerCase() === "dhaka"
//                           ? order?.offer_price + 60
//                           : order?.offer_price + 120} */}
//                           {order?.total_price}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-4">
//                 <p className="flex items-center gap-2 py-2">
//                   <span className="bg-[#D9D9D9] p-[5px] rounded-full">
//                     <TbTruckReturn />
//                   </span>{" "}
//                   <span className="font-semibold">30 days return package</span>
//                 </p>
//                 {/* <p className="mt-2 flex items-center gap-2">
//                   <span className="bg-[#D9D9D9] p-[5px] rounded-full">
//                     <MdOutlinePayment />
//                   </span>{" "}
//                   <span className="text-base font-semibold">
//                     Visa, MasterCard, Nogod, bkash, Rocket, Upay, Mcash
//                   </span>
//                 </p> */}
//               </div>
//               <div className="mt-8 flex justify-center">
//                 {/* payment/success/${order?._id} */}
//                 {/* <Link to={`payment/success/${order?._id}`}> */}
//                 <button
//                   onClick={handleNavigate}
//                   className="bg-black text-white py-2 px-8 rounded-lg"
//                 >
//                   Finish
//                 </button>
//                 {/* </Link> */}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Payment;
