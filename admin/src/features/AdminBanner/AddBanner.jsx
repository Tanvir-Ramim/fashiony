import { useState } from "react";
import { toast } from "react-hot-toast";

import AdminBanners from "./AdminBanners";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
const AddBanner = () => {
  const [loading, setLoading] = useState(false);
  const [rend, setRend] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [megaOffer, setMegaOffer] = useState(false);
  const [offerDate, setOfferDate] = useState("");
  const [image, setImage] = useState();
  const [imageMobile, setImageMobile] = useState();
  const [bannerUploaded, setBannerUploaded] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    let formDataObj = new FormData();
    formDataObj.append(
      "data",
      JSON.stringify({ category: selectedCategory, megaOffer, offerDate })
    );
    if (image) {
      formDataObj.append("image", image);
    }
    if (imageMobile) {
      formDataObj.append("imageMobile", imageMobile);
    }

    try {
      //
      let response;
      if (image && image.name) {
        response = await fetch(`${apiUrl}/banner`, {
          method: "POST",
          body: formDataObj,
        });

        const data = await response.json();

        if (response.ok) {
          setImage({});
          setBannerUploaded(!bannerUploaded);
          toast.success("Banner added successfully");
          setMegaOffer(false);
        } else {
          console.error("Upload failed");
          toast.error("Upload failed");
        }
      } else {
        console.error("Please provide a banner");
        toast.error("Please provide a banner");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  console.log(selectedCategory, megaOffer);
  return (
    <>
      <div className="container flex items-center justify-center w-full mx-auto my-20 md:ps-52 md:my-20">
        <div>
          <h3 className="mb-20 text-xl font-extrabold text-center uppercase md:text-4xl text-primary">
            Banners Upload
          </h3>

          <div className="grid grid-cols-3 gap-10">
            <div className="w-96">
              <div className="flex flex-col w-full p-6 shadow-lg rounded-2xl text-light bg-primary">
                <div>
                  <h3 className="pb-3 text-base font-medium tracking-widest text-center uppercase">
                    Banner Upload
                  </h3>
                  <div className="pt-4 pb-2 shadow">
                    <div className="flex flex-col w-full">
                      <span className="my-1 mb-1 text-xs">
                        Upload Images for Dekhstop
                      </span>
                      <input
                        autoComplete="off"
                        required
                        type="file"
                        name="images"
                        accept="image/*"
                        multiple
                        onChange={(e) => setImage(e.target.files[0])}
                        className="w-full px-2 py-2 text-sm capitalize transition-all duration-500 border rounded-md outline-none bg-primary text-light focus:bg-light focus:text-primary focus:shadow-md"
                      />
                    </div>
                  </div>
                  <div className="pt-4 pb-2 shadow">
                    <div className="flex flex-col w-full">
                      <span className="my-1 mb-1 text-xs">Select Category</span>
                      <select
                        autoComplete="off"
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-2 py-2 text-sm capitalize transition-all duration-500 border rounded-md outline-none bg-primary text-light focus:bg-light focus:text-primary focus:shadow-md"
                        type="text"
                        name="category"
                      >
                        <option> Select Category</option>
                        {[]?.map((item, idx) => (
                          <option
                            className="text-primary"
                            key={idx}
                            value={item.category}
                          >
                            {item.category}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div
                    className={`py-4 shadow ${
                      ["Brand", "Weekly", "Shop"].includes(selectedCategory)
                        ? "hidden"
                        : "block"
                    }`}
                  >
                    <div className="flex flex-col w-full">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="megaOffer"
                          name="megaOffer"
                          onChange={(e) => {
                            setMegaOffer(e.target.checked);
                          }}
                          className="w-3 h-3 bg-transparent"
                        />
                        <label
                          htmlFor="megaOffer"
                          className="mb-1 ml-2 text-sm font-normal capitalize opacity-100 text-light"
                        >
                          Mega Offer
                        </label>
                      </div>
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
              <AdminBanners bannerUploaded={bannerUploaded}></AdminBanners>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBanner;
