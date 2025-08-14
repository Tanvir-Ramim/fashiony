import { useEffect, useState } from "react";

import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import "./style.css";
import Api from "../../shared/Axios/axios";
import { useParams, useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";
import { useRef } from "react";
import NewTag from "./NewTag";
import AddSize from "./AddSize";
import { cats, jeans, shirt, tShirt } from "../../shared/Utils";
const EditProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [offerPrice, setOfferPrice] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]);
  const [previewImage, setPreviewImage] = useState([]);
  const [thumb, setThumb] = useState(null);
  const [prevThum, setPrevThum] = useState(null);
  // const [sizeTags, setSizeTags] = useState([]);
  // const [colorTags, setColorTags] = useState([]);
  const [edit, setEdit] = useState({});
  const [pro, setProduct] = useState({});
  const [description, setDescription] = useState("");
  const editor = useRef(null);
  //##### input fields value ############
  const [formData, setFormData] = useState({
    regularPrice: 0,
    price: 0,
    discount: 0,
    offerPrice: 0,
    title: "",
    category: "",
    subcategory: "",
    brand: "",
    sku: "",
    description: "",
    tags: [],
    size: [{ name: "" }, { stock: 0 }],
    total_stock: 0,
  });
  //##### input fields onChange ############
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevFormData) => ({ ...prevFormData, [name]: newValue }));
  };
  // console.log(formData);
  //################ path location get product ########
  const { brand, category, subcategory, product } = useParams();
  const editProduct = async (b, c, s, t) => {
    try {
      const endpoint = s
        ? `product/${b}/${c}/${s}/${t}`
        : `product/${b}/${c}/${t}`;
      const res = await Api.get(`/${endpoint}`);
      setEdit(res.data.data);
      setSelectedImages([]);
      setPreviewImage([]);
      console.log(res.data.data);
      setFormData((pre) => ({
        ...pre,
        tags: res.data.data.tags,
        size: res.data.data.size,
        total_stock: res.data.data.total_stock,
        discount: res.data.data.discount,
        offerPrice: res.data.data.offer_price,
        price: res.data.data.price,
        description: res.data.data.description,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  //###### edit produt get ebd####################
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (!edit?._id) {
      return;
    }
    const formDataObj = new FormData();
    // if (sizeTags.length > 0) {
    //   formDataObj.append("size", JSON.stringify(sizeTags));
    // }
    // if (colorTags.length > 0) {
    //   formDataObj.append("color", JSON.stringify(colorTags));
    // }
    formData.size.forEach((sizeItem, index) => {
      formDataObj.append(`size[${index}][name]`, sizeItem.name);
      formDataObj.append(`size[${index}][stock]`, sizeItem.stock);
    });

    formDataObj.append("total_stock", formData.total_stock);
    formData?.tags?.forEach((tag) => {
      formDataObj?.append("tags[]", tag);
    });
    if (formData.title !== "") {
      formDataObj.append("title", formData.title);
    }
    if (formData.price > 0) {
      formDataObj.append("price", formData.price);
    }
    if (formData.discount > 0) {
      formDataObj.append("discount", formData.discount);
    }
    if (offerPrice > 0) {
      formDataObj.append("offer_price", offerPrice);
    }
    if (formData.stock > 0) {
      formDataObj.append("stock", formData.stock);
    }
    if (formData.category !== "") {
      formDataObj.append("category", formData.category);
    }

    if (formData.subcategory !== "") {
      formDataObj.append("subcategory ", formData.subcategory);
    }
    if (formData.brand !== "") {
      formDataObj.append("brand", formData.brand);
    }
    if (formData.sku !== "") {
      formDataObj.append("sku", formData.sku);
    }
    if (description !== "") {
      formDataObj.append("description", description);
    }
    if (thumb) {
      formDataObj.append("thumb", thumb);
    }
    formDataObj.append("isNew", formData.isNew);
    if (selectedImages?.length > 0) {
      selectedImages.forEach((image) => {
        formDataObj.append("url", image);
      });
    }

    try {
      const res = await Api.patch(`/product/${edit?._id}`, formDataObj);

      setProduct(res.data.data);
      if (res.status === 200) {
        toast.success("Successfully Updated");

        editProduct(brand, category, subcategory, product);
        setLoading(false);
        setShow(true);
      }
    } catch (error) {
      alert(error.response.data.error);
    } finally {
      navigate("/admin/products-view/all");
      setLoading(false);
    }
  };

  //##### calculation of offerPrice############

  useEffect(() => {
    const dis = () => {
      let cal = formData.price - formData.discount;
      setFormData((prevFormData) => ({
        ...prevFormData,
        offerPrice: cal,
        price: formData.price,
      }));
      setOfferPrice(cal);
    };
    dis();
  }, [formData.discount, formData.price]);

  //* setDiscount Price
  const handleDiscount = (e) => {
    const { name, value } = e.target;
    // if (name === "discount")
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  //#### color size #############

  // const handleSizeTagsChange = (newSizeTags) => {
  //   setSizeTags(newSizeTags);
  // };
  // const handleColorTagsChange = (newColor) => {
  //   setColorTags(newColor);
  // };

  const svgVariants = {
    hidden: { rotate: -0 },
    visible: {
      rotate: 0,
      transition: { duration: 1 },
    },
  };

  const pathVariants = {
    hidden: { opacity: 0, pathLength: 0 },
    visible: {
      opacity: 1,
      pathLength: 1,
      transition: {
        duration: 2,
        ease: "easeInOut",
      },
    },
  };

  //#### image Function #######################################
  const handleImageChange = (e) => {
    let files = e.target.files;

    if (
      selectedImages?.length > 5 ||
      files.length > 5 ||
      edit?.url?.length >= 5
    ) {
      setSelectedImages([]);
      e.target.value = "";
      alert("image cannot be more than 5 images");
    } else {
      const newSelectedImages = [
        ...selectedImages,
        ...Array.from(files).reverse(),
      ];
      const newPreviewImages = [
        ...previewImage,
        ...Array.from(files)
          .reverse()
          .map((file) => URL.createObjectURL(file)),
      ];

      setSelectedImages(newSelectedImages);
      setPreviewImage(newPreviewImages);
    }
  };

  const thumbImageChange = (e) => {
    let files = e.target.files;

    if (files.length > 1) {
      alert("Select One Image");
      e.target.value = "";
      return;
    } else {
      setThumb(files[0]);
      setPrevThum(URL.createObjectURL(files[0]));
    }
  };

  //##### image delete#############
  const removeImageFn = async (pid, i) => {
    try {
      const res = await Api.patch(`/product/images/${pid}`, {
        pids: [i],
      });

      if (res.status === 204) {
        editProduct(brand, category, subcategory, product);
      }
    } catch (error) {
      console.error(error);
    }
  };
  //########### color size delete########
  // const delColorSize = async (mx) => {
  //   try {
  //     const res = await Api.patch(`/product/${edit?._id}/${mx}`);
  //     console.log(res);
  //     editProduct(brand, category, product);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  //########### effect#####
  useEffect(() => {
    editProduct(brand, category, subcategory, product);
  }, [brand, category, product, subcategory]);
  //############ array #############

  //##### log#########
  // console.log(description);
  const removeImageFn2 = (inx, i) => {
    const filtPreviewImage = previewImage?.filter((url, index) => index !== i);
    const filtSelectedImages = selectedImages?.filter(
      (_, index) => index !== i
    );

    setSelectedImages(filtSelectedImages);
    setPreviewImage(filtPreviewImage);
  };
  return (
    <>
      <div className="ps-14 w-full py-20 mx-auto  md:py-20 relative">
        <div>
          <h3 className="mb-20 text-xl font-extrabold text-center uppercase md:text-4xl text-primary ">
            Update Product
          </h3>

          <div className=" gap-10">
            <div className="flex flex-col w-full p-6 shadow-lg rounded-2xl text-light bg-white">
              <div>
                <h3 className="pb-3 text-base font-medium tracking-widest text-center uppercase">
                  Product Information
                </h3>
                <div>
                  <div className="flex flex-col w-full">
                    <span className="my-4 mb-1 text-xs">Product Name</span>
                    <input
                      autoComplete="off"
                      onChange={handleInputChange}
                      type="text"
                      name="title"
                      defaultValue={edit?.title}
                      className="w-full px-2 py-2 text-sm capitalize transition-all duration-500 border rounded-md outline-none bg-white text-light focus:bg-light focus:text-primary focus:shadow-md"
                      placeholder="product? name"
                    />
                  </div>

                  <div className="flex flex-col w-full">
                    <span className="my-4 mb-1 text-xs">Brand</span>
                    <input
                      autoComplete="off"
                      onChange={handleInputChange}
                      defaultValue={edit?.brand}
                      type="text"
                      name="brand"
                      className="w-full px-2 py-2 text-sm capitalize transition-all duration-500 border rounded-md outline-none bg-white text-light focus:bg-light focus:text-primary focus:shadow-md"
                      placeholder="product? name"
                    />
                  </div>

                  <>
                    <div className="flex flex-col w-full">
                      <span className="my-4 mb-1 text-xs">
                        Category ({edit?.category}){" "}
                      </span>
                      <select
                        autoComplete="off"
                        onChange={handleInputChange}
                        defaultValue={edit?.category}
                        type="text"
                        name="category"
                        className="w-full px-2 py-2 text-sm capitalize transition-all duration-500 border rounded-md outline-none bg-white text-light focus:bg-light focus:text-primary focus:shadow-md"
                        placeholder="product? name"
                      >
                        <option>Select Category</option>
                        {cats?.map((it, i) => (
                          <option key={i} value={it}>
                            {it}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col w-full">
                      <span className="my-4 mb-1 text-xs">
                        Sub-Category ({edit?.subcategory})
                      </span>
                      <select
                        autoComplete="off"
                        onChange={handleInputChange}
                        type="text"
                        name="subcategory"
                        className="w-full px-2 py-2 text-sm capitalize transition-all duration-500 border rounded-md outline-none bg-white text-light focus:bg-light focus:text-primary focus:shadow-md"
                        placeholder="subcategory"
                      >
                        <option value="">Select Sub-Category</option>
                        {formData?.category === "Jeans" &&
                          jeans.map((it, i) => (
                            <option key={i} value={it}>
                              {it}
                            </option>
                          ))}
                        {formData?.category === "T Shirt" &&
                          tShirt.map((it, i) => (
                            <option key={i} value={it}>
                              {it}
                            </option>
                          ))}
                        {formData?.category === "Shirt" &&
                          shirt.map((it, i) => (
                            <option key={i} value={it}>
                              {it}
                            </option>
                          ))}
                      </select>
                    </div>
                  </>

                  <div className="flex flex-col w-full">
                    <span className="my-4 mb-1 text-xs">SKU</span>
                    <input
                      autoComplete="off"
                      onChange={handleInputChange}
                      type="text"
                      name="sku"
                      defaultValue={edit?.sku}
                      className="w-full px-2 py-2 text-sm capitalize transition-all duration-500 border rounded-md outline-none bg-white text-light focus:bg-light focus:text-primary focus:shadow-md"
                      placeholder="SKU"
                    />
                  </div>
                  <div className="flex mt-2 flex-col w-full">
                    {/* <span className="my-4 mb-1 text-xs">Size</span>
                    <TagCom
                      onSizeTagsChange={handleSizeTagsChange}
                      ifSize={true}
                    /> */}
                    <NewTag
                      formData={formData}
                      setFormData={setFormData}
                    ></NewTag>
                  </div>

                  {/* <div className="flex gap-x-2 items-center mt-4 font-bold ">
                    {" "}
                    {edit?.size?.join(",")}
                    <IoIosRemoveCircleOutline
                      className="text-red-600 font-bold w-6 h-6 cursor-pointer"
                      onClick={() => delColorSize("sz")}
                    />
                  </div> */}

                  {/* <div className="flex flex-col w-full">
                    <span className="my-4 mb-1 text-xs">Color</span>
                    <TagCom
                      onSizeTagsChange={handleColorTagsChange}
                      ifSize={false}
                    />
                  </div> */}
                  {/* <div className="flex gap-x-2 items-center mt-4 font-bold">
                    {" "}
                    {edit?.color?.join(",")}{" "}
                    <IoIosRemoveCircleOutline
                      className="text-red-600 font-bold w-6 h-6 cursor-pointer"
                      onClick={() => delColorSize("cl")}
                    />
                  </div> */}
                </div>
              </div>
            </div>
            <div className="mt-7">
              <AddSize formData={formData} setFormData={setFormData}></AddSize>
            </div>
            <div className="flex flex-col mt-12 w-full p-6 shadow-lg rounded-2xl text-light bg-white">
              <div>
                <h3 className="pb-3 text-base font-medium tracking-widest text-center uppercase">
                  Product Description
                </h3>
                <div className="py-4 shadow ">
                  {/* <div className="flex flex-col w-full">
                    <div className="flex items-center">
                      <input
                        autoComplete="off"
                        onChange={handleInputChange}
                        className="w-3 h-3 bg-transparent"
                        type="checkbox"
                        id="#default-checkbox"
                        name="isNew"
                      ></input>
                      <label
                        htmlFor="isNew"
                        className="mb-1 ml-2 text-sm font-normal capitalize opacity-100 text-light "
                      >
                        New Arrival
                      </label>
                    </div>
                    <p className="p-2 text-white font-semibold">
                      {edit?.isNew ? "YES" : "NO"}
                    </p>
                  </div> */}

                  <div className="flex flex-col w-full">
                    <span className="my-1 mb-1 text-xs">Description</span>

                    {/* <textarea
                      autoComplete="off"
                      onChange={handleInputChange}
                      className="w-full px-2 py-2 text-sm capitalize transition-all duration-500 border rounded-md outline-none bg-white text-light focus:bg-light focus:text-primary focus:shadow-md"
                      type="text"
                      name="description"
                      defaultValue={edit?.description}
                      rows="6"
                    ></textarea> */}
                    <JoditEditor
                      ref={editor}
                      value={formData.description}
                      defaultValue={""}
                      onChange={(newContent) => setDescription(newContent)}
                      className="w-full bg-white px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all"
                    />
                  </div>
                </div>
              </div>
              <div className="pt-10 pb-5  m">
                <h3 className="text-base font-medium tracking-widest text-center uppercase ">
                  Product Price
                </h3>
                <div className="py-2  ">
                  <div className="flex flex-col w-full">
                    <span className="my-4 mb-1 text-xs">Regular Price</span>

                    <input
                      autoComplete="off"
                      onChange={handleInputChange}
                      type="number"
                      name="price"
                      id="price"
                      value={formData?.price}
                      className="w-full px-2 py-2 text-sm capitalize transition-all duration-500 border rounded-md outline-none bg-white text-light focus:bg-light focus:text-primary focus:shadow-md"
                      placeholder="price"
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <span className="my-4 mb-1 text-xs">Discount Price</span>

                    <div className="grid grid-cols-3">
                      <input
                        autoComplete="off"
                        // onChange={handleInputChange}

                        onChange={(e) => {
                          if (
                            !(Number(formData.price) > Number(e.target.value))
                          ) {
                            toast.error(
                              "Discount Price Must Be Less Than Price"
                            );
                          } else {
                            handleInputChange(e);
                            handleDiscount(e);
                          }
                        }}
                        type="number"
                        name="discount"
                        id="discount"
                        value={formData?.discount}
                        className="w-full col-span-2 px-2 py-2 text-sm capitalize transition-all duration-500 border border-r-0 outline-none rounded-l-md bg-white text-light focus:bg-light focus:text-primary focus:shadow-md"
                        placeholder="discount Price"
                      />
                      <div>
                        {/* <span className=" mb-1 text-xs">Offer Price</span> */}
                        <input
                          autoComplete="off"
                          type="number"
                          name="offerPrice"
                          id="offerPrice"
                          value={offerPrice || edit?.price - edit?.discount}
                          disabled
                          className="w-full px-2 py-2 text-xl font-bold text-center capitalize transition-all duration-500 border rounded-r-lg outline-none bg-light text-primary"
                          placeholder="price"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex mt-10 flex-col w-full p-6 shadow-lg rounded-2xl text-light bg-white">
              <div>
                <h3 className="pb-3 text-base font-medium tracking-widest text-center uppercase">
                  Images Upload
                </h3>
                <div className="py-4 shadow ">
                  <div className="flex flex-col w-full">
                    <span className="my-1 mb-1 text-xs">Upload Images</span>

                    <input
                      autoComplete="off"
                      required
                      type="file"
                      name="url"
                      accept="image/*"
                      multiple
                      className="w-full px-2 py-2 text-sm capitalize transition-all duration-500 border rounded-md outline-none bg-white text-light focus:bg-light focus:text-primary focus:shadow-md"
                      onChange={handleImageChange}
                    ></input>
                  </div>
                </div>
              </div>
              {previewImage?.length > 0 && <h1>Preview Image</h1>}
              <div className="w-[650px] flex flex-wrap mt-5 gap-x-8 h-full ">
                {previewImage?.map((url, i) => (
                  <div
                    key={i}
                    className="w-48 h-48  border rounded-lg shadow-lg my-2  from-[#006419]  to-[#0CD21D]"
                    style={{
                      backgroundImage: `url(${url})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <IoIosRemoveCircleOutline
                      className="text-red-600 w-6 h-6  cursor-pointer"
                      onClick={() => removeImageFn2(url, i)}
                    />
                  </div>
                ))}
              </div>
              {edit?.url?.length > 0 && <h1 className="mt-3">Images</h1>}
              <div className="flex flex-wrap  mt-5 gap-x-8 h-full ">
                {edit?.url?.map((url, i) => (
                  <div
                    key={i}
                    className="relative w-48 h-48  border rounded-lg shadow-lg my-2  from-[#006419]  to-[#0CD21D]"
                  >
                    <IoIosRemoveCircleOutline
                      className="text-red-600 w-6 h-6  cursor-pointer  "
                      onClick={() => removeImageFn(edit?._id, url?.public_id)}
                    />
                    <img src={url.url} alt="55" className="w-44 h-40 ml-2   " />
                  </div>
                ))}
              </div>
            </div>
            <div className="py-4 shadow mt-10 col-span-1 bg-white rounded-lg  px-5">
              <div className="flex flex-col w-full">
                <span className="my-1 mb-12 text-center text-xl">
                  Size Chart Image
                </span>

                <input
                  autoComplete="off"
                  required
                  type="file"
                  name="thumb"
                  accept="image/*"
                  multiple
                  className="w-full px-2 py-2 text-sm capitalize transition-all duration-500 border rounded-md outline-none bg-white text-light focus:bg-light focus:text-primary focus:shadow-md"
                  onChange={thumbImageChange}
                ></input>
              </div>

              <div
                className="w-48 h-48  border rounded-lg shadow-lg my-2  from-[#006419]  to-[#0CD21D]"
                style={{
                  backgroundImage: `url(${prevThum || edit?.thumb?.url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
            </div>

            <div className="flex items-center mt-10 col-span-1  justify-center">
              <div className="flex flex-col items-center w-full ">
                <button
                  onClick={handleSubmit}
                  className="p-4 shadow-lg bg-white rounded-2xl text-light"
                  type="submit"
                >
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    variants={svgVariants}
                    initial="hidden"
                    animate="visible"
                    whileInView={true}
                    className="w-10 h-10 mx-auto"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    >
                      <motion.path
                        variants={pathVariants}
                        d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12m10-8a8 8 0 1 0 0 16a8 8 0 0 0 0-16"
                      ></motion.path>
                      <motion.path
                        variants={pathVariants}
                        d="M13 7a1 1 0 1 0-2 0v4H7a1 1 0 1 0 0 2h4v4a1 1 0 1 0 2 0v-4h4a1 1 0 1 0 0-2h-4z"
                      ></motion.path>
                    </g>
                  </motion.svg>

                  <div className="flex items-center justify-center mt-1">
                    <button
                      disabled={loading}
                      className="flex items-center justify-center px-5 py-2 text-base font-bold uppercase duration-300 rounded-full text-black bg-light"
                    >
                      {loading ? (
                        <>Updating..... Product</>
                      ) : (
                        <>Update Product</>
                      )}
                    </button>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* {show && (
          <div className="fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-75 flex">
            <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">{pro?.title}</h2>

              <div className="mb-4">
                <div className="flex space-x-2 overflow-x-auto">
                  {pro?.url?.map((image, index) => (
                    <img
                      key={index}
                      src={image?.url}
                      alt={`Product image ${index + 1}`}
                      className="w-24 h-24 object-cover rounded-lg shadow-md"
                    />
                  ))}
                </div>
              </div>
              <div className="flex space-x-2 overflow-x-auto">
                <img
                  src={pro?.thumb?.url}
                  alt={`thumb image`}
                  className="w-24 h-24 object-cover rounded-lg shadow-md"
                />
              </div>
              <div className="mb-4">
                <p>
                  <strong>Category:</strong> {pro?.category}
                </p>
                <p>
                  <strong>SubCategory:</strong> {pro?.subcategory}
                </p>
                <p>
                  <strong>Brand:</strong> {pro?.brand}
                </p>
                <p>
                  <strong>SKU:</strong> {pro?.sku}
                </p>
                <p>
                  <div
                    className="md:mb-4 text-black"
                    dangerouslySetInnerHTML={{
                      __html: pro?.description?.slice(0, 500),
                    }}
                  ></div>
                </p>
                <p>
                  <strong>Price:</strong> {pro?.price.toFixed(2)}tk
                </p>
                <p>
                  <strong>Discount:</strong> {pro?.discount}tk
                </p>
                <p>
                  <strong>Stock:</strong> {pro?.stock}
                </p>
                <p>
                  <strong>Colors:</strong> {pro?.color?.join(",")}
                </p>
                <p>
                  <strong>Sizes:</strong> {pro?.size?.join(",")}
                </p>
                <p>
                  <strong>New Arrival:</strong> {pro?.isNew ? "Yes" : "No"}
                </p>
              </div>

         
              <div className="flex justify-end">
                <button
                  onClick={() => setShow(false)}
                  className="bg-red-500 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )} */}
      </div>
    </>
  );
};

export default EditProduct;
