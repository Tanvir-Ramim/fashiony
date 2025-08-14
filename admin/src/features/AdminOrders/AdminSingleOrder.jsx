import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import Invoice from "../Invoice/Invoice";
import Api from "../../shared/Axios/axios";
import "./Modal.css";
import UserUpdateModal from "./UserUpdateModal";
import toast from "react-hot-toast";
import "./UserUpdate.css";
import SendNotification from "./SendNotification";
import StatusChange from "./StatusChange";
import AddOrderProductModal from "./AddOrderProductModal";
import AddNewProduct from "./AddNewProduct";
import { MdDeleteForever } from "react-icons/md";
const AdminSingleOrder = () => {
  const [order, setOrderData] = useState({});

  const { id } = useParams();
  const [status, setStatus] = useState({
    id: "",
    type: "",
    status: "",
  });
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState();
  //##### get #################
  const getOrder = async () => {
    try {
      const res = await Api.get(`/orders/${id}`);
      setOrderData(res.data.data);
      setFormData({
        customer_name: res.data.data.customer_name,
        customer_phone: res.data.data.customer_phone,
        city: res.data.data.city,
        address: res.data.data.address,
      });
      setEmail(res.data.data.customer_eamil);
    } catch (error) {
      console.error(error.code);
    }
  };
  useEffect(() => {
    getOrder();
  }, [id]);
  const rend = (i) => {
    if (i === 1) {
      getOrder();
    }
  };

  //##########Pataho start  ###########
  const upFun = async (id, type, status) => {
    if (id === "" || type === "" || status === "") {
      return;
    }
    setLoading(true);
    try {
      const res = await Api.patch(`/orders/${id}`, { [type]: status });
      if (res.status === 204) {
        setStatus({
          id: "",
          type: "",
          status: "",
        });
        getOrder();
        alert("Updated");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    upFun(status?.id, status?.type, status?.status);
  }, [status?.id, status?.type, status?.status]);
  //################## use Effect ##############

  //################## use Effect end ##############
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const [formData, setFormData] = useState({
    customer_name: "",
    customer_phone: "",
    city: "",
    address: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "customer_phone" && value.length > 11) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateUserInfo = async () => {
    try {
      const res = await Api.patch(`/orders/updateOrder/${id}`, formData);
      if (res.status === 204) {
        closeModal();
        getOrder();
        toast.success("Update Successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [modal, setModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const handleComboSubmit = (product, size) => {
    setSelectedProduct(product);
    setSelectedSize(size);
  };
  const handleQuantityChange = (action, currentQuantity, setQuantity) => {
    const findSize = selectedProduct?.size?.find(
      (s) => s?.name === selectedSize
    );

    if (action === "increase") {
      if (findSize && currentQuantity < findSize?.stock) {
        setQuantity(currentQuantity + 1);
      } else {
        toast.error(`Stock limit reached for size ${selectedSize}.`);
      }
    } else if (action === "decrease" && currentQuantity > 1) {
      setQuantity(currentQuantity - 1);
    }
  };
  const handleAddProduct = async (oid, pid, size, quantity, sku) => {
    const data = {
      productId: pid,
      size: size,
      quantity: quantity,
      sku: sku,
    };
    try {
      const res = await Api.patch(`/orders/addProduct/${oid}`, data);
      if (res.status === 204) {
        setSelectedProduct({});
        setQuantity(1);
        setSelectedSize("");
        toast.success("Add Successfully");
        getOrder();
      }
    } catch (error) {
      console.log(error);
    }
  };
  // handle Delete

  const handleDeleteProduct = async (value, id) => {
    console.log(value);
    try {
      const res = await Api.patch(`/orders/removeProduct/${id}`, value);
      if (res.status === 204) {
        toast.success("Remove Successfully");
        getOrder();
      }
    } catch (error) {
      console.error(error);
    }
  };
  const isValid =
    selectedProduct &&
    selectedProduct?.url?.length > 0 &&
    selectedProduct?.title !== "";
  console.log(order);
  return (
    <div className="container gri w-full  gap-10 py-5 mx-auto ps-20 md:py-5">
      <div className="flex  gap-2">
        <div className="bg-white w-[60%] py-3 px-6 rounded shadow-md ">
          <h3 className="font-semibold text-xl text-gray-700 mb-1">
            Billed To
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {/* Billed To Section */}

            <div className="mt-1">
              <p className="text-gray-900 font-semibold">
                {order?.customer_name}
              </p>
              {/* <p className="text-gray-700"></p> */}
              <p className="text-gray-700">
                {order?.address}, {order?.city}
              </p>
              <button
                disabled={order?.is_disable}
                onClick={openModal}
                className="mt-4 flex items-center text-blue-600 border border-blue-600 px-3 py-1 rounded hover:bg-blue-600 hover:text-white transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 3.487a2.25 2.25 0 113.182 3.182l-9.193 9.193-3.75.625.625-3.75 9.193-9.193z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 4.5l1.75 1.75m2 2L15.5 8m-.375-.375L19.125 4.5m.375.375L15.5 8"
                  />
                </svg>
                Edit
              </button>
              {/* <p className="text-gray-700">{order?.customer_phone}</p> */}
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-1">Email</h3>
              <p className="text-blue-600">{order?.customer_eamil}</p>
              <h3 className="font-semibold text-gray-700 mt-2">Phone Number</h3>
              <p className="text-blue-600">{order?.customer_phone}</p>
            </div>
          </div>
        </div>
        <div className="bg-white w-[40%]  rounded shadow-md">
          <SendNotification
            order={order}
            email={email}
            setEmail={setEmail}
          ></SendNotification>
        </div>
      </div>

      <div className="flex gap-2">
        <div className="bg-white w-[60%] py-3 mt-4 rounded shadow-md">
          <h1 className="px-2 pt-1 font-semibold">
            Order No : {order?.invoice_id}
            
          </h1>
          <p className="px-2 text-sm  font-normal">Order Date : {order?.createdAt?.slice(0,10)}</p>
          <div
            className={`flex px-2 mt-2 ${
              isValid ? "justify-between" : "justify-end"
            } `}
          >
            {isValid && (
              <div>
                <AddNewProduct
                  size={selectedSize}
                  selectedProduct={selectedProduct}
                  handleQuantityChange={handleQuantityChange}
                  quantity={quantity}
                  setQuantity={setQuantity}
                ></AddNewProduct>
                <div className="mt-2 flex justify-center">
                  <button
                    disabled={order?.is_disable}
                    onClick={() =>
                      handleAddProduct(
                        id,
                        selectedProduct?._id,
                        selectedSize,
                        quantity,
                        selectedProduct?.sku
                      )
                    }
                    className="text-xs bg-[#323D97] text-white py-1 px-2 rounded"
                  >
                    Add Now
                  </button>
                </div>
              </div>
            )}
            <button
              disabled={order?.is_disable}
              onClick={() => setModal(true)}
              type="button"
              className=" text-sm py-2 w-fit h-fit px-3 mt-2 border border-blue-500 text-blue-500 font-semibold rounded hover:bg-blue-100"
            >
              Select Product
            </button>
          </div>
          <div className="pt-3">
            <table className="w-full  text-left">
              <thead>
                <tr>
                  <th className="lg:p-4 border-none font-semibold">
                    Description
                  </th>
                  <th className="lg:p-4 px-2 border-none  text-center font-semibold">
                    Quantity
                  </th>
                  <th className="lg:p-4 px-2 border-none font-medium">Price</th>
                  <th className="lg:p-4 border-none font-medium text-end">
                    Amount
                  </th>
                  <th className="lg:p-4 border-none font-medium text-end"></th>
                </tr>
              </thead>
              <tbody>
                {order?.product_list?.map((item, i) => (
                  <tr key={i} className="border-t border-gray-300">
                    <td className="pt-4 lg:px-4 border-none">
                      <div className="flex items-center">
                        <img
                          src={item?.p_ref?.url[0]?.url}
                          alt="Item"
                          className="h-20 w-20 mr-4 rounded-md border border-gray-300"
                        />
                        <div>
                          <p className="text-gray-800 capitalize font-medium">
                            {item?.p_ref?.title}
                          </p>
                          <p className="text-sm capitalize text-gray-500">
                            Size: {item?.size}
                          </p>
                          <p className="text-sm text-gray-500">
                            SKU: {item?.p_ref?.sku}
                          </p>

                          {/* <p className="text-sm text-gray-500">
                            Order no. {item?.}
                          </p> */}
                        </div>
                      </div>
                    </td>
                    <td className="lg:p-2 text-center border-none text-gray-800">
                      {item?.quantity}
                    </td>
                    <td className="lg:p-2 border-none text-gray-800">
                      ৳ {item?.p_ref?.price - item?.p_ref?.discount}
                    </td>
                    <td className="lg:p-3 border-none text-gray-800 text-end">
                      ৳{" "}
                      {(item?.p_ref?.price - item?.p_ref?.discount) *
                        item?.quantity}
                    </td>
                    <td className="border-none text-gray-800 text-end">
                      <button disabled={order?.is_disable}>
                        <MdDeleteForever
                          onClick={() => handleDeleteProduct(item, order?._id)}
                          className="text-red-600 cursor-pointer"
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary Section */}
          <div className="flex justify-end mr-3  border-t border-black/40">
            <div className="w-full sm:w-1/2 md:w-1/3  ">
              <div className="flex justify-between py-2 border-t">
                <p className="text-gray-600">Subtotal</p>
                <p className="text-gray-800">
                ৳{order?.offer_price + order?.coupon_discount || 0}
                </p>
              </div>
              {order?.applied_coupon?.isAppied && (
                <div className="flex justify-between py-2 border-t">
                  <p className="text-gray-600">Coupon Discount </p>
                  <p className="text-gray-800">- ৳{order?.coupon_discount ||0}</p>
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
        </div>
        <div className="w-[40%]">
          <StatusChange setStatus={setStatus} order={order}></StatusChange>
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
            <div className="space-y-2 z-[5000000]   overflow-auto mt-3  ">
              <UserUpdateModal
                formData={formData}
                handleChange={handleChange}
                handleUpdateUserInfo={handleUpdateUserInfo}
              ></UserUpdateModal>
            </div>
          </div>
        </div>
      )}
      {modal && (
        <AddOrderProductModal
          setModal={setModal}
          handleComboSubmit={handleComboSubmit}
        />
      )}
    </div>
  );
};

export default AdminSingleOrder;
