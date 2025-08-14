import { useState } from "react";
import { useEffect } from "react";

import { MdOutlineDelete } from "react-icons/md";

import Api from "../../shared/Axios/axios";
import { Link } from "react-router-dom";
import { useThrottle } from "@custom-react-hooks/use-throttle";

const Customer = () => {
  const [customer, setCustomer] = useState([]);

  const [searchValue, setSearchValue] = useState("");
  const [selk, setSlk] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const shr = useThrottle(searchValue, 1000);
  console.log(customer);
  const getCustomer = async () => {
    const params = new URLSearchParams();

    if (shr) params.append("query", shr);
    if (selk) params.append("order_list", selk);
    params.append("page", page);
    params.append("limit", limit);
    try {
      const res = await Api.get(`/user?${params.toString()}`);
      setCustomer(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  //update
  const getCustomerOrder = async (id, role) => {
    if (id === undefined || role === undefined) {
      return;
    }
    try {
      const res = await Api.patch(`/user/${id}/${role}`);
      if (res.status === 204) {
        getCustomer();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // delete order
  const orderDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this order?"
    );
    if (!confirm) return;
    try {
      await Api.delete(`/user/${id}`);

      getCustomer();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCustomer();
  }, [shr, selk, limit, page]);
  console.log(customer);
  return (
    <div className="w-full container mx-auto ps-24   my-8">
      <div className="p-2 shadow-lg rounded bg-white to-black">
        <div>
          <h1 className="text-center font-bold text-2xl pt-3 pb-5">
            User Details
          </h1>
        </div>
        <div className="flex">
          <input
            type=""
            placeholder="Search customer by email or mobile or name"
            size="large"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-[95%] p-3 my-3 mx-5 border-2 outline-none placeholder:text-xs lg:placeholder:text-base"
          />
          <select
            type=""
            placeholder="Search customer by email or mobile or name"
            size="large"
            value={selk}
            onChange={(e) => setSlk(e.target.value)}
            className="w-[95%] p-3 my-3 mx-5 border-2 outline-none placeholder:text-xs lg:placeholder:text-base"
          >
            <option selected value="">
              Sort Order
            </option>
            <option value=">">More than 5</option>
            <option value="<">Less than 5</option>
            <option value="0">No Order</option>
          </select>
          <select
            type=""
            placeholder="Search customer by email or mobile or name"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            className="w-fit p-3 my-3 mx-5 border-2 outline-none placeholder:text-xs lg:placeholder:text-base"
          >
            <option selected value="10">
              Set Limit
            </option>
            <option value="20">20</option>
            <option value="40">40</option>
            <option value="70">70</option>
            <option value="100">100</option>
            <option value="150">150</option>
          </select>
        </div>
        <div className="flex justify-center gap-x-5 mt-2">
          <button
            onClick={() => setPage(page - 1)}
            className="p-2 bg-gray-300 text-sm font-semibold rounded-md "
          >
            Prev
          </button>{" "}
          <button
            onClick={() => {
              setPage(1), setLimit(10), setSearchValue();
              setSlk();
            }}
            className="p-2 bg-gray-300 text-sm font-semibold rounded-md "
          >
            Reset
          </button>{" "}
          <button
            onClick={() => setPage(page + 1)}
            className="p-2 bg-gray-300 text-sm font-semibold rounded-md "
          >
            Next
          </button>
        </div>
        <h3 className="pl-5 text-sm font-semibold text-white">
          Searched Result : {customer?.length}
        </h3>
      </div>

      <section
        id="Customer"
        className="w-full h-[53rem] px-2 mt-2 overflow-auto lg:overflow-x-hidden"
      >
        <div className=" sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-900 bg-white relative">
            <thead className="text-xs text-gray-900 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3">
                  Contact
                </th>
                <th scope="col" className="px-6 py-3">
                  Address
                </th>

                <th scope="col" className="px-6 py-3">
                  Total Order
                </th>
                <th scope="col" className="px-6 py-3">
                  View Order
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {customer?.map((info, i) => (
                <tr
                  key={i}
                  className="bg-white border-b border-gray-700  font-semibold"
                >
                  <td className="px-6 py-4">
                    {" "}
                    {info?.first_name} {info?.last_name}
                    <br />
                    {info?.role === "Admin" && info?.isActive && (
                      <span className="px-2  bg-green-500 rounded-full animate-pulse"></span>
                    )}
                    {info?.role === "Admin" && !info?.isActive && (
                      <span className="px-2  bg-yellow-500 rounded-full animate-spin">
                        {" "}
                      </span>
                    )}
                    {info?.role}
                    <br />
                  </td>

                  <td className="px-6 py-4">
                    {info?.email} <br /> {info?.phone}
                  </td>
                  <td className="px-6 py-4">{info?.address}</td>
                  <td className="px-6 py-4"> {info?.order_list?.length}</td>
                  <td>
                    {info?.order_list?.map((it, i) => (
                      <>
                        <Link
                          key={i}
                          to={`/admin/orders/${it}`}
                          className="w-6 h-6 bg-gray-300 px-3 py-1  font-semibold rounded-md"
                        >
                          Order({i + 1})
                        </Link>
                        <br />
                        <br />
                      </>
                    ))}
                  </td>

                  <td>
                    {" "}
                    {info?.role === "Customer" ? (
                      <button
                        onClick={() => getCustomerOrder(info?._id, "Admin")}
                        className="mt-4 bg-primary px-3 font-semibold py-2 rounded-md text-white"
                      >
                        Assing To Admin
                      </button>
                    ) : (
                      <button
                        onClick={() => getCustomerOrder(info?._id, "Customer")}
                        className="mt-4 bg-gray-100 px-3 font-semibold py-2 rounded-md text-black"
                      >
                        Assing To Customer
                      </button>
                    )}{" "}
                    <br />
                    <MdOutlineDelete
                      onClick={() => orderDelete(info?._id)}
                      className=" text-red-500 w-10 h-6 mt-5 cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Customer;
