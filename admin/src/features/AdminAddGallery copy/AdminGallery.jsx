import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
const AdminGallery = ({ bannerUploaded }) => {
  const [gallery, setGallery] = useState([]);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    getBanners();
  }, [refetch, bannerUploaded]);

  const getBanners = async () => {
    try {
      const res = await fetch(`${apiUrl}/banner/getgallery`);
      if (res.ok) {
        const data = await res.json();
        setGallery(data);
      } else {
        // Handle the case where the request was not successful
        console.error("Failed to fetch gallery");
      }
    } catch (error) {
      console.error("An error occurred while fetching gallery:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete?");
      if (!confirmDelete) return;

      const res = await fetch(`${apiUrl}/banner/gallery/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // If the delete request was successful, update the UI
        setRefetch((prev) => !prev);
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
    <>
      {gallery && (
        <div className="grid justify-between grid-cols-4 gap-5">
          {gallery?.map((item) => (
            <div key={item._id} className="relative">
              <img
                src={item.image}
                alt="desktop-banner"
                className="rounded-lg "
              />

              <div
                onClick={() => handleDelete(item._id)}
                className="w-5 h-5 bg-light cursor-pointer shadow-lg -top-2 -right-2 absolute z-[999] rounded-full flex items-center justify-center"
              >
                <Icon
                  icon="basil:cross-outline"
                  className="w-5 h-5 text-red-500 "
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default AdminGallery;
