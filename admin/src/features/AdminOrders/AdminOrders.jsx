import { useEffect } from "react";
import { useState } from "react";
import "../AdminProducts/product.css";
import Api from "../../shared/Axios/axios";
import { Link } from "react-router-dom";
import { useThrottle } from "@custom-react-hooks/use-throttle";
import { IoIosPrint } from "react-icons/io";
import { GrPowerReset } from "react-icons/gr";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
import swal from "sweetalert";
import toast from "react-hot-toast";
const AdminOrders = () => {
  const [orders, setorders] = useState([]);
  console.log(orders);
  const [pagi, setPagi] = useState({});
  const [reload] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(0);
  const [searchSKU, setSearchSKU] = useState("");
  const [payment, setPayment] = useState("");
  const [odr, setOdd] = useState("");
  const [invoice, setInvoice] = useState("");
  const [searchCustomerNo, setSearchCustomerNo] = useState("");
  const [searchCategoryName, setSearchCategoryName] = useState("");
  const [sku, setSKU] = useState("");
  const shr = useThrottle(searchSKU, 1000);
  const email = useThrottle(searchCategoryName, 1000);
  const phone = useThrottle(searchCustomerNo, 1000);
  const payy = useThrottle(payment, 1000);
  const os = useThrottle(odr, 1000);
  const iV = useThrottle(invoice, 1000);
  const skut = useThrottle(sku, 1000);
  const [fetching, setFetching] = useState(false);
  //############### fetch ####################
  const fetchData = async (date, em, ph, p, o, pg, li, inv, skut) => {
    const params = new URLSearchParams();

    if (em) params.append("customer_eamil", em);
    if (ph) params.append("customer_phone", ph);
    if (date) params.append("date", date);
    if (p) params.append("payment_status", p);
    if (o) params.append("oder_status", o);
    if (inv) params.append("invoice_id", inv);
    if (skut) params.append("sku", skut);
    params.append("sortBy", "latest");
    params.append("page", pg);
    params.append("limit", li);

    try {
      const res = await Api.get(`/orders?${params.toString()}`);
      setorders(res.data.data.orderByquery.docs);
      setPagi(res.data.data.paginate);
    } catch (error) {
      console.error(error);
    }
  };

  //########## delete ############
  const delOrderFn = async (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Order!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const res = await Api.delete(`/orders`, {
            data: { idList: [id] },
          });
          //   resetFilters();
          if (res.status === 204) {
            fetchData();
            swal("Your Order item has been deleted !", {
              icon: "success",
            });
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        swal("Your product item is safe!");
      }
    });
  };

  useEffect(() => {
    fetchData(shr, email, phone, payy, os, page, limit, iV, skut);
  }, [reload, shr, email, phone, payy, os, page, limit, iV, skut]);
  //############
  const pay = ["Pending", "Paid", "Transcation-Failed", "Canceled"];
  const od = ["Placed", "In-Progress", "Shifted", "Canceled"];

  const [selectedOrders, setSelectedOrders] = useState([]);

  const handleCheckboxChange = (orderId) => {
    setSelectedOrders((prevSelected) =>
      prevSelected?.includes(orderId)
        ? prevSelected?.filter((id) => id !== orderId)
        : [...prevSelected, orderId]
    );
  };

  const handlePrint = () => {
    const rowsToPrint =
      selectedOrders.length > 0
        ? orders.filter((order) => selectedOrders?.includes(order.id))
        : orders;

    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write(
      `<style>
            table {
                border-collapse: collapse;
                width: 100%;
                margin: 20px 0;
                font-size: 12px;
                text-align: left;
            }
            th, td {
                border: 1px solid #ddd;
                padding: 8px;
            }
            th {
                background-color: #f4f5f9;
                color: #333;
            }
            tr:nth-child(even) { background-color: #f9f9f9; }
        </style>`
    );
    printWindow.document.write("</head><body>");
    printWindow.document.write("<h1>Order List</h1>");
    printWindow.document.write("<table><thead><tr>");
    printWindow.document.write(`
        <th>Order ID</th>
        <th>Product Info</th>
        <th>Date</th>
        <th>Customer Info</th>
        <th>Payment Status</th>
        <th>Order Status</th>
        <th>Total Price</th>
    </tr></thead><tbody>`);

    rowsToPrint.forEach((order) => {
      printWindow.document.write("<tr>");
      printWindow.document.write(`<td>${order.invoice_id}</td>`);
      printWindow.document.write(
        `<td>
                <table class="nested-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Sku</th>
                            <th>Size</th>
                            <th>Q</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${order.product_list
                          .map(
                            (item) => `
                                    <tr>
                                        <td>${item?.p_ref?.title}</td>
                                        <td>${item?.sku}</td>
                                        <td>${item?.size}</td>
                                        <td>${item?.quantity}</td>
                                        <td>${
                                          item.p_ref?.price * item?.quantity -
                                          item.p_ref?.discount * item?.quantity
                                        }
                                        </td>
                                    </tr>`
                          )
                          .join("")}
                    </tbody>
                </table>
            </td>`
      );
      printWindow.document.write(
        `<td>${new Date(order.createdAt).toLocaleString()}</td>`
      );
      printWindow.document.write(
        `<td>
                Name: ${order.customer_name}<br>
                Email: ${order.customer_eamil}<br>
                Phone: ${order.customer_phone}<br>
                Address: ${order.address}, ${order.city}
            </td>`
      );
      printWindow.document.write(`<td>${order.payment_status}</td>`);
      printWindow.document.write(`<td>${order.oder_status}</td>`);
      printWindow.document.write(`<td>${order.total_price} tk</td>`);
      printWindow.document.write("</tr>");
    });

    printWindow.document.write("</tbody></table></body></html>");
    printWindow.document.close();
    printWindow.print();

    // Clear selected orders after printing
    setSelectedOrders([]);
  };

  // update status
  const updateStatus = async (value) => {
    if (selectedOrders?.length <= 0) {
      return;
    }
    if (typeof value !== "string" || value === "") {
      return;
    }
    try {
      setFetching(true);
      const data = {
        selectedOrders,
        status: value,
      };
      const res = await Api.post(`/orders/update-array`, data);
      console.log(res.data);
      if (res.status === 204) {
        toast.success("Successfully Update Your Status");
        fetchData(shr, email, phone, payy, os, page, limit, iV, skut);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setFetching(false);
      setSelectedOrders([]);
    }
  };

  return (
    <div className="w-full ps-28 lg:ps-10 pr-10 py-10">
      <h3
        className="mb-8 text-xl font-extrabold  uppercase md:text-4xl
       text-primary underline  text-center "
      >
        {/* Orders Information ({orders?.length}) */}
        Orders
      </h3>
      {/* <div className="py-4 flex gap-2">
        <p className="font-semibold">
          All <span className="font-thin">({orders?.length})</span> |
        </p>
        <p className="font-semibold text-[#323D97]">
          Pending Payment{" "}
          <span className="font-thin text-black">({orders?.length})</span> |
        </p>
        <p className="font-semibold text-[#323D97]">
          Paid Payment{" "}
          <span className="font-thin text-black">({orders?.length})</span> |
        </p>
        <p className="font-semibold text-red-600">
          Canceled Payment{" "}
          <span className="font-thin text-black">({orders?.length})</span>{" "}
          <span className="text-black">|</span>
        </p>
        <p className="font-semibold text-[#323D97]">
          Placed{" "}
          <span className="font-thin text-black">({orders?.length})</span> |
        </p>
        <p className="font-semibold text-[#323D97]">
          Shifted{" "}
          <span className="font-thin text-black">({orders?.length})</span> |
        </p>
        <p className="font-semibold text-[#323D97]">
          In-Progress{" "}
          <span className="font-thin text-black">({orders?.length})</span>
        </p>
      </div> */}
      <div className="px-1 shadow">
        <h1 className="flex py-2 font-bold">Filter By :</h1>
        <div className="flex">
          <input
            className="px-1 py-2 mb-5 mr-2 text-xs transition-all duration-300 border rounded outline-none focus:shadow text-black  border-black"
            type="date"
            placeholder="Search SKU"
            value={searchSKU}
            onChange={(e) => setSearchSKU(e.target.value)}
          />
          <input
            className="px-2 py-2 mb-5 mr-2 text-xs transition-all duration-300 border rounded outline-none focus:shadow text-black  border-black"
            type="text"
            placeholder="Phone"
            value={searchCustomerNo}
            onChange={(e) => setSearchCustomerNo(e.target.value)}
          />

          <input
            className="px-2 py-2 mb-5 mr-2 text-xs transition-all duration-300 border rounded outline-none focus:shadow text-black  border-black"
            type="text"
            placeholder="Eamil"
            value={searchCategoryName}
            onChange={(e) => setSearchCategoryName(e.target.value)}
          />
          <input
            className="px-2 py-2 mb-5 mr-2 text-xs transition-all duration-300 border rounded outline-none focus:shadow text-black  border-black"
            type="text"
            placeholder="order Id"
            value={invoice}
            onChange={(e) => setInvoice(e.target.value)}
          />
          <input
            className="px-2 py-2 mb-5 mr-2 text-xs transition-all duration-300 border rounded outline-none focus:shadow text-black  border-black"
            type="text"
            placeholder="SKU"
            value={sku}
            onChange={(e) => setSKU(e.target.value)}
          />
          <select
            className="px-2 py-2 mb-5 mr-2 text-xs transition-all duration-300 border rounded outline-none focus:shadow text-black  border-black"
            type="text"
            placeholder="Payment Status"
            onChange={(e) => setPayment(e.target.value)}
          >
            <option value={""}>Payment Status</option>
            {pay?.map((it, i) => (
              <option key={i} value={it}>
                {it}
              </option>
            ))}
          </select>
          <select
            className="px-2 py-2 mb-5 mr-2 text-xs transition-all duration-300 border rounded outline-none focus:shadow text-black  border-black"
            type="text"
            placeholder="Payment Status"
            onChange={(e) => setOdd(e.target.value)}
          >
            <option value={""}>Order Status</option>
            {od?.map((it, i) => (
              <option key={i} value={it}>
                {it}
              </option>
            ))}
          </select>
          {/* <select
            className="px-3 py-2  mr-2 text-sm transition-all duration-300 border rounded outline-none focus:shadow text-black  border-black"
            type="text"
            onChange={(e) => setLimit(e.target.value)}
          >
            <option value={10}>Limit</option>
            {lit.map((it, i) => (
              <option key={i} value={it}>
                {it}
              </option>
            ))}
          </select> */}

          <p
            onClick={() => {
              setSearchSKU(""),
                setPayment(""),
                setOdd(""),
                setSearchCustomerNo(""),
                setSearchCategoryName(""),
                setInvoice(""),
                setPage(1),
                setLimit(1);
            }}
            className="text-lg font-semibold cursor-pointer"
          >
            <button className="  bg-primary t px-6 text-white  py-[8px] rounded-md hover:bg-red-600">
              <GrPowerReset />
            </button>
          </p>
        </div>
      </div>
      <div className="flex mt-5 mb-2  justify-between">
        <p className="flex items-center gap-1">
          <h3 className="font-bold">Order Limit :</h3>
          <input
            className="px-1 py-1 w-[70px]  mr-2 text-xs transition-all duration-300 border rounded outline-none focus:shadow text-black  border-black"
            type="number"
            placeholder="Limit"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
          />
        </p>
        <div className="flex  last:">
          <select
            className="px-2 py-1 mb-5 mr-2 text-xs transition-all duration-300 border rounded outline-none focus:shadow text-black  border-black"
            type="text"
            placeholder="Payment Status"
            onChange={(e) => updateStatus(e.target.value)}
          >
            <option value={""}>Update Status</option>
            {od?.map((it, i) => (
              <option key={i} value={it}>
                {it}
              </option>
            ))}
          </select>
          <button
            onClick={handlePrint}
            className="  px-2  flex items-center gap-1 text-sm  h-fit py-1 bg-[#323D97] text-white rounded"
          >
            <IoIosPrint /> Print
          </button>
        </div>
      </div>

      <div className="w-full overflow-x-auto overflow-y-hidden bg-white">
        <div>
          <table className="max-w-full text-black divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-1 text-xs font-medium text-center uppercase">
                  Select
                </th>
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
                    <td className="py-2 px-1">
                      <div className="flex justify-center items-center">
                        <input
                          disabled={order?.is_disable}
                          type="checkbox"
                          onChange={() => handleCheckboxChange(order?.id)}
                          checked={selectedOrders?.includes(order?.id)}
                        />
                      </div>
                    </td>
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

                    <td className="px-1 py-2 text-xs">{order?.oder_status}</td>
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

      <div className="flex justify-between mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={!pagi.hasPrevPage} // Disable if there is no previous page
          className={`${
            pagi?.hasPrevPage
              ? "bg-primary cursor-pointer"
              : "bg-gray-300 cursor-not-allowed"
          } text-white py-1  px-3 rounded-md`}
        >
          Previous
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={!pagi?.hasNextPage} // Disable if there is no next page
          className={`${
            pagi?.hasNextPage
              ? "bg-primary cursor-pointer"
              : "bg-gray-300 cursor-not-allowed"
          } text-white py-1 px-3  rounded-md`}
        >
          Next
        </button>
      </div>
      <div className="mt-4 pagination"></div>
    </div>
    // </div>
  );
};

export default AdminOrders;
