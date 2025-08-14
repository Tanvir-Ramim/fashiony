import React, { useState } from "react";
import { toast } from "react-hot-toast";
import AdminGallery from "./AdminGallery";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const AdminAddGallery = () => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null); // Initialize with null
  const [link, setLink] = useState("");
  const [bannerUploaded, setBannerUploaded] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!image) {
        // Handle the case where no image is provided
        toast.error("Please provide an image");
        return;
      }

      let formDataObj = new FormData();
      formDataObj.append("data", JSON.stringify({ link }));
      formDataObj.append("image", image);

      const response = await fetch(`${apiUrl}/banner/gallery`, {
        method: "POST",
        body: formDataObj,
      });

      const data = await response.json();

      if (response.ok) {
        // Reset form and image state or perform other actions
        setImage(null);
        setLink("");
        setBannerUploaded(!bannerUploaded);
        toast.success("Banner added successfully");
      } else {
        // Handle the case where the response status is not OK
        console.error("Upload failed:", data.message);
        toast.error(`Upload failed: ${data.message}`);
      }
    } catch (error) {
      // Handle any other errors that might occur during the request
      console.error("An error occurred:", error);
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container flex items-center justify-center w-full mx-auto my-20 md:ps-52 md:my-20">
        <div>
          <h3 className="mb-20 text-xl font-extrabold text-center uppercase md:text-4xl text-primary">
            GALLERY UPLOAD
          </h3>

          <div className="grid grid-cols-3 gap-10">
            <div>
              <div className="flex flex-col w-full p-6 shadow-lg rounded-2xl text-light bg-primary">
                <div>
                  <h3 className="pb-3 text-base font-medium tracking-widest text-center uppercase">
                    Gallery Upload
                  </h3>
                  <div className="pt-4 pb-2 shadow">
                    <div className="flex flex-col w-full">
                      <span className="my-1 mb-1 text-xs">
                        Upload Image Gallery
                      </span>
                      <input
                        autoComplete="off"
                        required
                        type="file"
                        name="images"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="w-full px-2 py-2 text-sm capitalize transition-all duration-500 border rounded-md outline-none bg-primary text-light focus:bg-light focus:text-primary focus:shadow-md"
                      />
                    </div>
                  </div>
                  <div className="pt-4 pb-2 shadow">
                    <div className="flex flex-col w-full">
                      <span className="my-1 mb-1 text-xs">Link:</span>
                      <input
                        autoComplete="off"
                        required
                        type="text"
                        name="link"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        className="w-full px-2 py-2 text-sm capitalize transition-all duration-500 border rounded-md outline-none bg-primary text-light focus:bg-light focus:text-primary focus:shadow-md"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-center mt-5">
                    <button
                      onClick={handleUpload}
                      className="flex items-center justify-center w-full px-5 py-2 text-base font-bold uppercase duration-300 rounded-full text-primary bg-light"
                      type="submit"
                    >
                      Upload
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-2 ">
              <AdminGallery bannerUploaded={bannerUploaded}></AdminGallery>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminAddGallery;
