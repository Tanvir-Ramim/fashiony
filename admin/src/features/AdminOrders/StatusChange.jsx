import React from "react";
import Invoice from "../Invoice/Invoice";

const StatusChange = ({ order, setStatus }) => {
  return (
    <div>
      <div className=" bg-white  w-full py-2 px-2 mt-4 rounded shadow-md">
        <div className="w-full     border-gray-200 rounded-lg shadow-sm">
          {/* <h2 className="text-lg font-semibold text-gray-800 mb-2">Status</h2> */}

          <div className="space-y-2">
            <div className="mb-4 ">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Order Status
              </label>
              <div className="relative">
                <select
                  disabled={order?.is_disable}
                  value={order?.oder_status}
                  className="w-full py-2 px-3 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  onChange={(e) =>
                    setStatus({
                      id: order?._id,
                      type: "oder_status",
                      status: e.target.value,
                    })
                  }
                >
                  <option value="Placed">Placed</option>
                  <option value="In-Progress">In-Progress</option>
                  <option value="Shifted">Shifted</option>
                  <option value="Canceled">Canceled</option>
                </select>
              </div>
            </div>
            <div className="mb-4 ">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Payment Status
              </label>
              <div className="relative">
                <select
                  disabled={order?.is_disable}
                  value={order?.payment_status}
                  className="w-full py-2 px-3 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  onChange={(e) =>
                    setStatus({
                      id: order?._id,
                      type: "payment_status",
                      status: e.target.value,
                    })
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                  <option value="Transcation-Failed">Transaction Failed</option>
                  <option value="Canceled">Canceled</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white  w-full py-2 px-2 mt-4 rounded shadow-md">
        <h1>Note :</h1>
        <p className="mt-1">
          {order?.note !== "" ? (
            order?.note
          ) : (
            <p className="text-red-400 text-center">
              Customer Is Not Provided Any Note
            </p>
          )}
        </p>
      </div>
      <div className="bg-white  w-full py-2 px-2 mt-4 rounded shadow-md">
        <div className="flex flex-col items-start p-4 border rounded-md shadow-sm">
          <p className="text-sm font-medium text-gray-700 mb-2">Create PDF</p>
          <Invoice order={order} />
        </div>
      </div>
    </div>
  );
};

export default StatusChange;
