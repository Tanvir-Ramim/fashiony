import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
const AdminBanners = ({ bannerUploaded }) => {
  const [banners, setBanners] = useState([]);
  const [catBan, setCatban] = useState("");
  const [refetch, setRefetch] = useState(false);
  //

  useEffect(() => {
    getBanners();
  }, [refetch, bannerUploaded]);

  const getBanners = async () => {
    try {
      const res = await fetch(`${apiUrl}/banner`);

      if (res.ok) {
        const data = await res.json();
        setBanners(data);
      } else {
        // Handle the case where the request was not successful
        console.error("Failed to fetch banners");
      }
    } catch (error) {
      console.error("An error occurred while fetching banners:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete?");
      if (!confirmDelete) return;

      const res = await fetch(`${apiUrl}/banner/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // If the delete request was successful, update the UI
        getBanners();
        toast.success("Banner deleted successfully");
      } else {
        // Handle the case where the delete request was not successful
        console.error("Failed to delete banner");
      }
    } catch (error) {
      console.error("An error occurred while deleting banner:", error);
    }
  };

  return (
    <div>
      <p>
        {" "}
        মেগা অফার যদি না থাকে ক্যাটেগরিতে , তাহলে সেটি বড় ব্যানার। আর থাকলে তা
        ছোট ব্যানার।{" "}
      </p>
      <div className="flex items-center  gap-3 w-full my-3">
        {Array.from(new Set(banners?.map((item) => item.category))).map(
          (cat, i) => (
            <div key={i}>
              {" "}
              <p
                onClick={() => setCatban(cat)}
                className="px-6 my-2 text-white bg-black rounded-md cursor-pointer"
              >
                {cat}
              </p>
            </div>
          )
        )}
      </div>

      <div className="flex gap-5 flex-wrap w-full">
        {banners?.map(
          (item) =>
            item?.category === catBan && (
              <div key={item?._id} className="relative">
                <img
                  src={item?.image}
                  alt="desktop-banner"
                  className="object-cover w-40 h-40 rounded-lg"
                />

                <div
                  onClick={() => handleDelete(item?._id)}
                  className="w-5 h-5 bg-light cursor-pointer shadow-lg -top-2 -right-2 absolute z-[999] rounded-full flex items-center justify-center"
                >
                  <Icon
                    icon="basil:cross-outline"
                    className="w-5 h-5 text-red-500 "
                  />
                </div>
                <div className="flex justify-between absolute top-0">
                  {item?.megaOffer && (
                    <p className="inline-block px-2 text-sm font-medium text-white bg-red-500 rounded-br-md">
                      {item?.megaOffer && "Mega Offer"}
                    </p>
                  )}
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default AdminBanners;
