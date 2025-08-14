import React, { useEffect, useState } from "react";
import Api from "../../shared/Axios/axios";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import swal from "sweetalert";
import { RxCross2 } from "react-icons/rx";
import CouponUpdateModal from "./CouponUpdateModal";
const CouponList = () => {
  const [allCoupon, setAllCoupon] = useState([]);
  const getCoupon = async () => {
    try {
      const res = await Api.get("/coupon");
      setAllCoupon(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(allCoupon);
  useEffect(() => {
    getCoupon();
  }, []);

  const handleDelete = async (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this product!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const res = await Api.delete(`/coupon/${id}`);
          if (res.status === 200) {
            getCoupon();
            swal("Your product item has been deleted !", {
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [singleCoupon, setSingleCoupon] = useState({});

  const openModal = async (code) => {
    try {
      const res = await Api.get(`/coupon?code=${code}`);
      setSingleCoupon(res.data.data);
    } catch (error) {
      console.log(error);
    }
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="py-8">
        <h2 className="text-2xl font-semibold text-center text-blue-500 mb-8">
          Coupon List
        </h2>
        <div className=" w-full ">
          <div className="w-full overflow-x-auto overflow-y-hidden ">
            <div className=" mx-auto divide-y divide-gray-200">
              <table className="  border border-gray-100 text-brand bg- ">
                <thead className="">
                  <tr className="">
                    <th className="px-2 py-2 text-center text-xs font-medium tracking-wider uppercase whitespace-nowrap">
                      #SI
                    </th>
                    <th className="px-2 py-2 text-xs font-medium tracking-wider text-left uppercase whitespace-nowrap">
                      Title
                    </th>
                    <th className="px-2 py-2 text-xs font-medium tracking-wider text-left uppercase whitespace-nowrap">
                      Code
                    </th>
                    <th className="px-2 py-2 text-xs font-medium tracking-wider text-center uppercase whitespace-nowrap">
                      Discount
                    </th>
                    <th className="px-2 py-2 text-xs font-medium tracking-wider text-center uppercase whitespace-nowrap">
                      Max Usage
                    </th>
                    <th className="px-2 py-2 text-xs font-medium tracking-wider text-center uppercase whitespace-nowrap">
                      Usage Count
                    </th>

                    <th className="px-2 py-2 text-xs font-medium tracking-wider text-center uppercase whitespace-nowrap">
                      Is Active
                    </th>
                    <th className="px-2 py-2 text-xs font-medium tracking-wider text-center uppercase whitespace-nowrap">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allCoupon?.map((item, index) => (
                    <tr
                      key={index}
                      className={`${
                        (index - 1) % 2 == 0 ? " bg-white  " : "bg-white  "
                      } `}
                    >
                      <td className="px-2 py-2 text-xs text-black font-bold text-center capitalize whitespace-nowrap">
                        {index}
                      </td>
                      <td className="px-2 py-2 text-xs text-black font-semibold  capitalize whitespace-nowrap">
                        {item?.title}
                      </td>
                      <td className="px-2 py-2 text-xs text-black font-bold  capitalize whitespace-nowrap">
                        {item?.code}
                      </td>

                      <td className="px-2 py-2 text-xs text-black font-bold  text-center capitalize whitespace-nowrap">
                        {item?.discount *100}%
                      </td>
                      <td className="px-2 py-2  text-xs text-black font-bold text-center capitalize whitespace-nowrap">
                        {item?.max_usage}
                      </td>
                      <td className="px-2 py-2 text-xs text-black text-center   capitalize whitespace-nowrap">
                        {item?.usage_count}
                      </td>
                      <td className="px-2 py-2 text-xs text-black  text-center  capitalize whitespace-nowrap">
                        {item?.is_active ? (
                          <span className="text-green-500">True</span>
                        ) : (
                          <span className="text-red-500">False</span>
                        )}
                      </td>

                      <td className="px-2 pt-2  text-xs text-black font-bold  capitalize whitespace-nowrap">
                        <div className="flex justify-center  gap-4">
                          <p
                            onClickCapture={() => openModal(item?.code)}
                            className="flex items-center justify-center text-sm cursor-pointer  font-bold text-black text-primary_hov"
                          >
                            {" "}
                            <span className=" mb-1 text-sm  text-blue-600">
                              <AiFillEdit></AiFillEdit>
                            </span>
                          </p>
                          <p>
                            {" "}
                            <button
                              type="submit"
                              className="flex items-center p-0 mx-auto text-sm  text-black font-bold  "
                              onClick={() => handleDelete(item?._id)}
                            >
                              <span className=" text-sm text-red-500">
                                <AiFillDelete></AiFillDelete>
                              </span>
                            </button>
                          </p>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex z-[5000000]  items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-[650px] modal-slide-down relative">
            <button
              className="absolute top-3 right-3 text-red-400"
              onClick={closeModal}
            >
              <RxCross2 className=" text-xl" />
            </button>
            <div className="space-y-2 z-[5000000]   overflow-auto   ">
              <CouponUpdateModal
                getCoupon={getCoupon}
                closeModal={closeModal}
                singleCoupon={singleCoupon}
              ></CouponUpdateModal>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CouponList;
