import { useState } from "react";

import AdminGallery from "./AdminGallery";
import Api from "../../shared/Axios/axios";
import { cat, position, tags } from "../../shared/Utils";

const AdminAddGallery = () => {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [image, setImage] = useState(null); // Initialize with null
  const [prevThum, setPrevThum] = useState(null);
  const [showDetails, setShowDetails] = useState(true);
  const [data, setData] = useState({
    asset_type: "",
    position: "",
    title: "",
    link: "",
    description: "",
    tag: "",
    select: "",
  });

  const inputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // console.log(data);
  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let formDataObj = new FormData();
      if (data.asset_type !== "") {
        formDataObj.append("asset_type", data.asset_type);
      }
      if (data.position !== "") {
        formDataObj.append("position", data.position);
      }
      if (data.description !== "") {
        formDataObj.append("description", data.description);
      }
      if (data.title !== "") {
        formDataObj.append("title", data.title);
      }
      if (data.link !== "") {
        formDataObj.append("link", data.link);
      }
      if (data.tag !== "") {
        formDataObj.append("tag", data.tag);
      }

      if (image) {
        formDataObj.append("url", image);
      }

      const res = await Api.post(`/asset-local`, formDataObj);

      if (res.status === 201) {
        setData({
          asset_type: "",
          position: "",
          title: "",
          link: "",
          description: "",
        });
        setImage(null);
        setPrevThum(null);
        alert("Added");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };
  //?########### asset type###
  let arr = [
    "Image-Banner",
    // "Info-Text",
    // "Image-Brand",
    "Image-Theme",
    // "Image-Offer",
    "Image-Category",
    "Image-Combo",
  ];

  const handleAdd = () => {
    setShow(true);
    setShowDetails(false);
  };

  const handleDetails = () => {
    setShow(false);
    setShowDetails(true);
  };
  return (
    <>
      <div className="container  w-full mx-auto my-5 ps-32 md:ps-20 md:my-5 ">
        <div>
          <h3 className="mb-5 text-xl font-extrabold text-center uppercase md:text-4xl text-primary">
            UPLOAD ASSET
          </h3>
          <div className="flex justify-center gap-10 py-10 max-w-2xl mx-auto">
            <button
              onClick={handleAdd}
              className={`flex items-center justify-center w-52 px-5 py-2 text-base font-bold uppercase duration-300 rounded-full text-white ${
                show === true ? "bg-secondary" : "bg-slate-400"
              }`}
              type="button"
            >
              Add
            </button>
            <button
              onClick={handleDetails}
              className={`flex items-center justify-center w-52 px-5 py-2 text-base font-bold uppercase duration-300 rounded-full text-white ${
                showDetails === true ? "bg-secondary" : "bg-slate-400"
              }`}
              type="button"
            >
              Details
            </button>
          </div>
          {show && (
            <div className="grid grid-cols-1 gap-10 w-full">
              <div className="  p-6 shadow-lg rounded-2xl text-light bg-white">
                <div>
                  <div className="pt-4 pb-2 shadow">
                    <div className="flex flex-col w-full">
                      <span className="my-1 mb-1 text-xs">Type</span>
                      <select
                        autoComplete="off"
                        type="text"
                        name="asset_type"
                        value={data?.asset_type}
                        onChange={inputChange}
                        className="w-full px-2 py-2 text-sm capitalize transition-all duration-500 border rounded-md outline-none bg-white text-light focus:bg-light focus:text-primary focus:shadow-md"
                      >
                        <option value="">Select Order</option>
                        {arr?.map((it, i) => (
                          <option key={i} value={it}>
                            {it}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="pt-4 pb-2 shadow">
                    <div className="flex flex-col w-full">
                      <span className="my-1 mb-1 text-xs">Position:</span>
                      {/* <input
                        autoComplete="off"
                        type="text"
                        name="position"
                        value={data?.position}
                        onChange={inputChange}
                        className="w-full px-2 py-2 text-sm capitalize transition-all duration-500 border rounded-md outline-none bg-white text-light focus:bg-light focus:text-primary focus:shadow-md"
                      /> */}
                      <select
                        autoComplete="off"
                        type="text"
                        name="position"
                        value={data?.position}
                        onChange={inputChange}
                        className="w-full px-2 py-2 text-sm capitalize transition-all duration-500 border rounded-md outline-none bg-white text-light focus:bg-light focus:text-primary focus:shadow-md"
                      >
                        <option value="">Select Position</option>
                        {position?.map((it, i) => (
                          <option key={i} value={it}>
                            {it}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {data.position === "home-middle" && (
                    <div className="pt-4 pb-2 shadow">
                      <div className="flex flex-col w-full">
                        <span className="my-1 mb-1 text-xs">
                          Select Link / Tag:
                        </span>
                        {/* <input
                        autoComplete="off"
                        type="text"
                        name="position"
                        value={data?.position}
                        onChange={inputChange}
                        className="w-full px-2 py-2 text-sm capitalize transition-all duration-500 border rounded-md outline-none bg-white text-light focus:bg-light focus:text-primary focus:shadow-md"
                      /> */}
                        <select
                          autoComplete="off"
                          type="text"
                          name="select"
                          value={data?.select}
                          onChange={inputChange}
                          className="w-full px-2 py-2 text-sm capitalize transition-all duration-500 border rounded-md outline-none bg-white text-light focus:bg-light focus:text-primary focus:shadow-md"
                        >
                          <option value="">Select Link / Tag</option>

                          <option value="link">Link</option>
                          <option value="tag">tag</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {data.select === "tag" && (
                    <div className="pt-4 pb-2 shadow">
                      <div className="flex flex-col w-full">
                        <span className="my-1 mb-1 text-xs">Select Tag:</span>
                        {/* <input
                        autoComplete="off"
                        type="text"
                        name="position"
                        value={data?.position}
                        onChange={inputChange}
                        className="w-full px-2 py-2 text-sm capitalize transition-all duration-500 border rounded-md outline-none bg-white text-light focus:bg-light focus:text-primary focus:shadow-md"
                      /> */}
                        <select
                          autoComplete="off"
                          type="text"
                          name="tag"
                          value={data?.tag}
                          onChange={inputChange}
                          className="w-full px-2 py-2 text-sm capitalize transition-all duration-500 border rounded-md outline-none bg-white text-light focus:bg-light focus:text-primary focus:shadow-md"
                        >
                          <option value="">Select tag</option>
                          {tags?.map((it, i) => (
                            <option key={i} value={it}>
                              {it}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {(data.select === "link" ||
                    data.position === "home-banner") && (
                    <div className="pt-4 pb-2 shadow">
                      <div className="flex flex-col w-full">
                        <span className="my-1 mb-1 text-xs">Link:</span>
                        <input
                          autoComplete="off"
                          required
                          type="text"
                          name="link"
                          value={data?.link}
                          onChange={inputChange}
                          className="w-full px-2 py-2 text-sm capitalize transition-all duration-500 border rounded-md outline-none bg-white text-light focus:bg-light focus:text-primary focus:shadow-md"
                        />
                      </div>
                    </div>
                  )}

                  {data?.asset_type === "Image-Category" ? (
                    <div className="pt-4 pb-2 shadow">
                      <div className="flex flex-col w-full">
                        <span className="my-1 mb-1 text-xs">Title</span>
                        <select
                          autoComplete="off"
                          type="text"
                          name="title"
                          value={data?.title}
                          onChange={inputChange}
                          className="w-full px-2 py-2 text-sm capitalize transition-all duration-500 border rounded-md outline-none bg-white text-light focus:bg-light focus:text-primary focus:shadow-md"
                        >
                          <option value="">Select Title</option>
                          {cat?.map((it, i) => (
                            <option key={i} value={it}>
                              {it}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ) : (
                    <div className="pt-4 pb-2 shadow">
                      <div className="flex flex-col w-full">
                        <span className="my-1 mb-1 text-xs">Title:</span>
                        <input
                          autoComplete="off"
                          required
                          type="text"
                          name="title"
                          value={data?.title}
                          onChange={inputChange}
                          className="w-full px-2 py-2 text-sm capitalize transition-all duration-500 border rounded-md outline-none bg-white text-light focus:bg-light focus:text-primary focus:shadow-md"
                        />
                      </div>
                    </div>
                  )}
                  <div className="pt-4 pb-2 shadow">
                    <div className="flex flex-col w-full">
                      <span className="my-1 mb-1 text-xs">Description:</span>
                      <textarea
                        autoComplete="off"
                        required
                        type="text"
                        name="description"
                        cols={4}
                        rows={6}
                        value={data?.description}
                        onChange={inputChange}
                        className="w-full px-2 py-2 text-sm capitalize transition-all duration-500 border rounded-md outline-none bg-white text-light focus:bg-light focus:text-primary focus:shadow-md"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="pt-4 pb-2 shadow">
                    <div className="flex flex-col w-full">
                      <span className="my-1 mb-1 text-xs">Image</span>
                      <input
                        autoComplete="off"
                        required
                        type="file"
                        name="images"
                        accept="image/*"
                        onChange={(e) => {
                          setImage(e.target.files[0]),
                            setPrevThum(URL.createObjectURL(e.target.files[0]));
                        }}
                        className="w-full px-2 py-2 text-sm capitalize transition-all duration-500 border rounded-md outline-none bg-white text-light focus:bg-light focus:text-primary focus:shadow-md"
                      />
                    </div>
                  </div>

                  {prevThum && (
                    <div
                      className=" h-[300px] w-full  border rounded-lg shadow-lg   from-[#006419]  to-[#0CD21D]"
                      style={{
                        backgroundImage: `url(${prevThum})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></div>
                  )}
                  <div className="flex items-center justify-center mt-5">
                    <button
                      onClick={handleUpload}
                      className="flex items-center justify-center w-52 px-5 py-2 text-base font-bold uppercase duration-300 rounded-full
                     text-white bg-primary"
                      type="submit"
                    >
                      Upload
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showDetails && (
        <div className="ps-32 md:ps-20">
          <AdminGallery />
        </div>
      )}
    </>
  );
};

export default AdminAddGallery;
