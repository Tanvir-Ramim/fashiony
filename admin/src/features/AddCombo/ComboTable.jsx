import Api from "../../shared/Axios/axios";
import AdminProductLists from "../AdminProducts/AdminProductLists";
import swal from "sweetalert";
const ComboTable = ({ products, setFlag }) => {
  const handleDelete = (id) => {
    //
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this product!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const res = await Api.delete(`/products`, {
            data: { pids: [id] },
          });
          //   resetFilters();
          if (res.status === 204) {
            setFlag(true);
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
  return (
    <div className=" w-full ">
      <div className="w-full overflow-x-auto overflow-y-hidden ">
        <div className=" mx-auto divide-y divide-gray-200">
          <table className="  border border-gray-100 text-brand bg- ">
            <thead className="">
              <tr className="">
                <th className="px-2 py-2 text-xs font-medium tracking-wider text-left uppercase whitespace-nowrap">
                  #SI
                </th>
                <th className="px-2 py-2 text-xs font-medium tracking-wider text-left uppercase whitespace-nowrap">
                  Product Info
                </th>
                <th className="px-2 py-2 text-xs font-medium tracking-wider text-left uppercase whitespace-nowrap">
                  Image
                </th>
                <th className="px-2 py-2 text-xs font-medium tracking-wider text-left uppercase whitespace-nowrap">
                  Brand
                </th>
                <th className="px-2 py-2 text-xs font-medium tracking-wider text-left uppercase whitespace-nowrap">
                  Tags
                </th>
                <th className="px-2 py-2 text-xs font-medium tracking-wider text-left uppercase whitespace-nowrap">
                  Sizes
                </th>

                <th className="px-2 py-2 text-xs font-medium tracking-wider text-left uppercase whitespace-nowrap">
                  SKU
                </th>
                <th className="px-2 py-2 text-xs font-medium tracking-wider text-left uppercase whitespace-nowrap">
                  Price
                </th>
                <th className="px-2 py-2 text-xs font-medium tracking-wider text-left uppercase whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product, index) => (
                <AdminProductLists
                  key={product._id}
                  product={product}
                  index={index + 1}
                  handleDelete={handleDelete}
                ></AdminProductLists>
              ))}
            </tbody>
          </table>
        </div>
      </div>{" "}
    </div>
  );
};

export default ComboTable;
