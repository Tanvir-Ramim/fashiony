import { Icon } from "@iconify/react";
import Api from "../../Api";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "./invoice.css";

const Invoice1 = () => {
  var [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const [upIn, setInn] = useState();

  const { id } = useParams();
  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });
  const invoiceRef = useRef(null);

  const handlePrint = () => {
    window.print();
  };
  // ############### update ########

  const onPressDown = async (e) => {
    try {
      const ingett = await Api.get(`/master/api/v1/get-invoice/${id}`);

      setInn(ingett.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    onPressDown();
  }, [id]);
  // ############### update ########

  return (
    <div className="w-full bg-white rounded-md">
      <div className="max-w-screen-xl p-8 mx-auto border rounded-lg shadow-md ">
        <div>
          <div className="text-right">
            <button
              onClick={handlePrint}
              className="flex items-center justify-center gap-2 px-4 py-2 mt-4 ml-auto font-semibold text-black rounded bg-primary "
            >
              Print Invoice <Icon icon="material-symbols:download" />
            </button>
          </div>
        </div>

        <div className="print-section" id="print-section" ref={invoiceRef}>
          <div className="flex justify-between gap-5 py-5 border-b-2">
            <div className="w-1/2">
              <h1 className="py-2 text-xl font-bold">Bill From</h1>
              <p>ELITE MENZ</p>
              <p>01935060277</p>
              <p>Mirpur, Dhaka</p>
              <p> Date : {date.toLocaleDateString()}</p>
            </div>
            <div className="w-1/2 text-right">
              <h1 className="py-2 text-xl font-bold">Bill To</h1>
              <p>{upIn?.customerData?.name}</p>
              <p>{upIn?.customerData?.mobile}</p>

              <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div
                  className="group cursor-pointer relative inline-block"
                  onClick={() => {
                    setShow(!show);
                    setIdd(upIn?._id);
                  }}
                >
                  <p> {upIn?.customerData?.addrerss}, </p>
                  <p> {upIn?.customerData?.area}, </p>
                  <p> {upIn?.customerData?.division}</p>
                  <div className="absolute z-10 px-3 py-2 text-xs text-center text-white bg-black rounded-lg opacity-0 pointer-events-none w-36 group-hover:opacity-100 bottom-full -left-1/2 ml-14">
                    Update? Click here
                    <svg
                      className="absolute text-black h-2 w-full left-0 top-full"
                      x="0px"
                      y="0px"
                      viewBox="0 0 255 255"
                    >
                      <polygon
                        className="fill-current"
                        points="0,0 127.5,127.5 255,0"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between border-b">
            <div className="my-5 mb-4">
              <p>
                <strong>
                  {upIn?._id?.slice(0, 6) ? "Transaction ID" : "Order ID"}:
                </strong>{" "}
                {upIn?._id?.slice(0, 6) ? upIn?._id?.slice(0, 6) : "01234"}
              </p>
              <p className="pt-2">
                <strong>Order Date:</strong>{" "}
                {new Date(upIn?.createdAt).toLocaleDateString()}
              </p>
              <p className="pt-2">
                {" "}
                <strong>Status:</strong> {upIn?.orderStatus}
              </p>
            </div>
            <div className="curier-Info">
              Courier Information:
              <p> {upIn?.courierService}</p>
              <p>{upIn?.courierLocation}</p>
              <p>{upIn?.courierMan}</p>
              <p> {upIn?.courierPhone}</p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Products</h3>
            <table className="w-full mt-4">
              <thead>
                <tr>
                  <th className="px-5 text-left">Name</th>
                  <th className="px-5 text-left">SQU</th>
                  <th className="px-5 text-end">Quantity</th>
                  <th className="px-5 text-end">Sizes</th>
                  <th className="px-5 text-end">Price </th>
                </tr>
              </thead>
              <tbody>
                {upIn?.products?.map((product, i) => (
                  <tr key={i}>
                    <td className="px-5 text-left">{product?.name} </td>
                    <td className="px-5 text-left">
                      {product?.id?.slice(0, 6)}{" "}
                    </td>
                    <td className="px-5 text-end">{product?.quantity}</td>
                    <td className="px-5 uppercase text-end">
                      {product?.sizes !== undefined ? product?.sizes : "N/A"}
                    </td>

                    <td className="px-5 text-end">BDT {product?.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end border-t">
            <div>
              <p className="flex justify-between my-2 font-bold w-60">
                <span className="">Sub-Total:</span>{" "}
                <span className="">{upIn?.Subtotal} Taka</span>
              </p>
              <p className="flex justify-between my-2 font-bold w-60">
                <span>Shipping Cost: </span>{" "}
                <span> {upIn?.deliveryFee} Taka</span>
              </p>

              <div className="mt-6 ">
                <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                  <div
                    className="relative flex items-center justify-between px-3 py-2 text-lg font-bold text-right text-black rounded-md cursor-pointer group bg-slate-200 w-60"
                    onClick={() => setShow(!show)}
                  >
                    <span className="mr-2">Grand Total:</span>{" "}
                    <span> {Math.round(upIn?.TotalPrice)} Taka</span>
                    <div className="absolute z-10 px-3 py-2 text-xs text-center text-white bg-black rounded-lg opacity-0 pointer-events-none w-36 group-hover:opacity-100 bottom-full -left-1/2 ml-14">
                      Update? Click here
                      <svg
                        className="absolute text-black h-2 w-full left-0 top-full"
                        x="0px"
                        y="0px"
                        viewBox="0 0 255 255"
                      >
                        <polygon
                          className="fill-current"
                          points="0,0 127.5,127.5 255,0"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              {upIn?.duePrice && (
                <div className="mt-6 ">
                  <span
                    onClick={() => {
                      setShow(!show);
                      // setIdd(upIn?._id);
                    }}
                    className="inline-flex items-center px-3 py-2 text-lg font-bold text-black rounded-md bg-slate-200"
                  >
                    <span className="mr-2"> Due: BDT </span>{" "}
                    {Math.round(upIn?.duePrice)}
                  </span>
                </div>
              )}
              {upIn?.paidPrice && (
                <div className="mt-6 ">
                  <span className="inline-flex items-center px-3 py-2 text-lg font-bold text-black rounded-md bg-slate-200">
                    <span className="mr-2"> Paid: BDT </span>{" "}
                    {Math.round(upIn?.paidPrice)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* print style end */}
      </div>
    </div>
  );
};

export default Invoice1;
