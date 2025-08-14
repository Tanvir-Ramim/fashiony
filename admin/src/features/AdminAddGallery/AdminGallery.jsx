import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Api from "../../shared/Axios/axios";
import { useThrottle } from "@custom-react-hooks/use-throttle";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
const AdminGallery = () => {
  const [gallery, setGallery] = useState([]);
  const [refetch, setRefetch] = useState(true);
  const [type, setType] = useState();
  const [position, setPosition] = useState();
  const pos = useThrottle(position, 1000);
  useEffect(() => {
    getBanners();
  }, [pos, type]);
  console.log(gallery);
  const getBanners = async () => {
    const params = new URLSearchParams();
    if (type) params.append("asset_type", type);
    if (pos) params.append("position", pos);
    try {
      const res = await Api.get(`asset-local?${params.toString()}`);
      setGallery(res.data.data);
    } catch (error) {
      console.error("An error occurred while fetching gallery:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete?");
      if (!confirmDelete) return;

      const res = await Api.delete(`asset-local/${id}`);

      if (res.status === 204) {
        alert("Deleted");
        getBanners();
      }
    } catch (error) {
      console.error("An error occurred while deleting banner:", error);
    }
  };
  const asset_type = [...new Set(gallery.map((item) => item?.asset_type))];
  console.log(asset_type);
  return (
    <>
      <div>
        <div className="flex flex-wrap  gap-3 items-center">
          <h1 className="font-bold">Filter By :</h1>
          <div className="flex gap-1  items-center">
            <label className="block text-sm font-medium text-gray-700">
              Position:
            </label>
            <input
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="mt-1 block  px-2 py-1 border rounded-md shadow-sm focus:outline-none sm:text-sm"
            />
          </div>
          <div className="flex items-center gap-1">
            <label className="block text-sm font-medium text-gray-700">
              Type:
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mt-1 block  px-2 py-1 border rounded-md shadow-sm focus:outline-none sm:text-sm"
            >
              <option value="">All Categories</option>
              {asset_type?.map((assetType, index) => {
                return (
                  <option key={index} value={assetType}>
                    {assetType}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
      {gallery && (
        <div className="grid justify-between grid-cols-1 md:grid-cols-2 py-10 lg:grid-cols-4 gap-5">
          {gallery?.map((item) => (
            <div key={item._id} className="relative bg-white p-3 rounded">
              <img
                src={item?.url?.url}
                alt="desktop-banner"
                className="rounded-lg h-52 w-full"
                loading="lazy"
              />

              <div
                onClick={() => handleDelete(item._id)}
                className="w-7 h-7 bg-gray-200 cursor-pointer shadow-lg -top-0
                 -right-0 absolute z-[999] rounded-full flex items-center justify-center"
              >
                <Icon
                  icon="basil:cross-outline"
                  className="w-8 h-8 text-red-500 "
                />
              </div>
              <div className="pt-5">
                <p> Type: {item?.asset_type}</p>
                <p>Position: {item?.position}</p>
                <p>Title: {item?.title}</p>

                <p> Description: {item?.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default AdminGallery;
