import { useEffect } from "react";

import { useState } from "react";
import JoditEditor from "jodit-react";
import { toast } from "react-hot-toast";
import TagCom from "./TagCom";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import "./style.css";
import Api from "../../shared/Axios/axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";
import NewTag from "./NewTag";
import AddSize from "./AddSize";
import { cats, jeans, shirt, tShirt } from "../../shared/Utils";

const AdminAddProducts = () => {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [offerPrice, setOfferPrice] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]);
  const [thumb, setThumb] = useState({});
  const [prevThum, setPrevThum] = useState(null);
  const [previewImage, setPreviewImage] = useState([]);
  const [description, setDescription] = useState("");
  // const [colorTags, setColorTags] = useState([]);
  const [product, setProduct] = useState({});
  const editor = useRef(null);
  const location = useLocation();
  //##### input fields value ############
  const [formData, setFormData] = useState({
    price: 0,
    discount: 0,
    offerPrice: 0,
    title: "",
    category: "",
    subcategory: "",
    brand: "",
    sku: "",
    description: "",
    choice: location.state
      ? location.state === "choice1"
        ? "choice1"
        : "choice2"
      : null,
    isCombo: location.state ? true : false,
    size: [{ name: "", stock: 0 }],
    total_stock: 0,
    tags: [],
  });
  console.log(location.state);
  console.log(formData.isCombo);
  console.log(formData.choice);
  const resetForm = () => {
    setOfferPrice(0);
    setSelectedImages([]);
    setThumb({});
    setPrevThum(null);
    setPreviewImage([]);
    setDescription("");
    // setColorTags([]); // Uncomment if you're using colorTags
    setProduct({});
    setFormData({
      price: 0,
      discount: 0,
      offerPrice: 0,
      title: "",
      category: "",
      subcategory: "",
      brand: "",
      sku: "",
      description: "",
      choice: "",
      size: [{ name: "", stock: 0 }],
      total_stock: 0,
      isCombo: false,
      tags: [],
    });
  };
  console.log(formData);
  //##### input fields submit ############
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formDataObj = new FormData();

    formData.tags.forEach((tag) => {
      formDataObj.append("tags[]", tag);
    });
    formData.size.forEach((sizeItem, index) => {
      formDataObj.append(`size[${index}][name]`, sizeItem.name);
      formDataObj.append(`size[${index}][stock]`, sizeItem.stock);
    });
    // formDataObj.append("color", JSON.stringify(colorTags));
    formDataObj.append("title", formData.title);
    formDataObj.append("price", formData.price);
    formDataObj.append("discount", formData.discount);
    formDataObj.append("offer_price", formData.offerPrice);
    // formDataObj.append("stock", formData.stock);
    formDataObj.append("category", formData.category);
    formDataObj.append("subcategory", formData.subcategory);
    formDataObj.append("brand", formData.brand);
    formDataObj.append("sku", formData.sku);
    formDataObj.append("description", description);
    formDataObj.append("total_stock", formData.total_stock);
    // formDataObj.append("isNew", formData.isNew);
    formDataObj.append("thumb", thumb);
    formDataObj.append("isCombo", formData.isCombo);
    if (location.state) {
      formDataObj.append("choice", formData.choice);
    }

    selectedImages.forEach((image) => {
      formDataObj.append("url", image);
    });

    try {
      const res = await Api.post(`/product?`, formDataObj);
      setProduct(res.data.data);
      if (res.status === 201) {
        setLoading(false);
        if (location.state) {
          navigate(-1);
        }
        resetForm();
        toast.success("Successfully Add Your Product");
      }
    } catch (error) {
      alert(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };
  //##### input fields onChange ############
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    //
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: newValue }));
  };
  //##### calculation of offerPrice############

  const dis = () => {
    let cal = formData.price - formData.discount;
    console.log(cal);
    setFormData((prevFormData) => ({
      ...prevFormData,
      offerPrice: cal,
      price: formData.price,
    }));
    setOfferPrice(cal);
  };

  useEffect(() => {
    dis();
  }, [formData.discount, formData.price]);

  //* setDiscount Price
  const handleDiscount = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  //#### color size #############

  // const handleSizeTagsChange = (newSizeTags) => {
  //   setSizeTags(newSizeTags);
  // };
  // const handleColorTagsChange = (newColor) => {
  //   setColorTags(newColor);
  // };

  //#### image Function #######################################
  const handleImageChange = (e) => {
    let files = e.target.files;
    if (
      selectedImages?.length > 6 ||
      files.length > 6 ||
      previewImage?.length + files?.length > 6
    ) {
      // setSelectedImages([]);
      e.target.value = "";
      alert("image cannot be more than 6 images");
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

  const removeImageFn = (inx, i) => {
    const filtPreviewImage = previewImage?.filter((url, index) => index !== i);
    const filtSelectedImages = selectedImages?.filter(
      (_, index) => index !== i
    );

    setSelectedImages(filtSelectedImages);
    setPreviewImage(filtPreviewImage);
  };
  //############ array #############

  return (
    <>
      <div
        className=" py-10   w-full 
       mx- auto ps-28 lg:ps-10 "
      >
        <div>
          <h3 className="mb-5 text-xl font-extrabold text-center uppercase md:text-4xl text-primary ">
            {location.state
              ? location.state === "choice1"
                ? "Add Combo 1"
                : "Add Combo 2"
              : "Add Product"}
          </h3>

          <div className="flex flex-col gap-10">
            <div
              className="flex flex-col w-full p-6 shadow-lg rounded-2xl text-light
             bg-white"
            >
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
                      value={formData.title}
                      name="title"
                      required
                      className="w-full px-2 py-2 text-sm capitalize transition-all duration-500 border rounded-md outline-none bg-white text-light focus:bg-light focus:text-primary focus:shadow-md"
                      placeholder="product? name"
                    />
                  </div>

                  <div className="flex flex-col w-full">
                    <span className="my-4 mb-1 text-xs">Brand</span>
                    <input
                      autoComplete="off"
                      onChange={handleInputChange}
                      type="text"
                      value={formData.brand}
                      name="brand"
                      required
                      className="w-full px-2 py-2 text-sm capitalize transition-all duration-500 border rounded-md outline-none bg-white text-light focus:bg-light focus:text-primary focus:shadow-md"
                      placeholder="product? name"
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <span className="my-4 mb-1 text-xs">Category</span>
                    <select
                      autoComplete="off"
                      onChange={handleInputChange}
                      type="text"
                      name="category"
                      value={formData.category}
                      required
                      className="w-full px-2 py-2 text-sm capitalize transition-all duration-500 border rounded-md outline-none bg-white text-light focus:bg-light focus:text-primary focus:shadow-md"
                      placeholder="product? name"
                    >
                      <option value="">Select Category</option>
                      {cats?.map((it, i) => (
                        <option key={i} value={it}>
                          {it}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col w-full">
                    <span className="my-4 mb-1 text-xs">Sub-Category</span>
                    <select
                      autoComplete="off"
                      onChange={handleInputChange}
                      type="text"
                      name="subcategory"
                      value={formData.subcategory}
                      required
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
                      {formData?.category === "T-Shirt" &&
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

                  {/* <div className="flex flex-col w-full">
                    <span className="my-4 mb-1 text-xs">Quantity</span>
                    <input
                      autoComplete="off"
                      onChange={handleInputChange}
                      type="number"
                      name="stock"
                      min="1"
                      required
                      className="w-full px-2 py-2 text-sm capitalize transition-all duration-500 border rounded-md outline-none bg-white text-light focus:bg-light focus:text-primary focus:shadow-md"
                      placeholder="quantity"
                    />
                  </div> */}

                  <div className="flex flex-col w-full">
                    <span className="my-4 mb-1 text-xs">SKU</span>
                    <input
                      autoComplete="off"
                      onChange={handleInputChange}
                      type="text"
                      name="sku"
                      value={formData.sku}
                      required
                      className="w-full px-2 py-2 text-sm capitalize transition-all duration-500 border rounded-md outline-none bg-white text-light focus:bg-light focus:text-primary focus:shadow-md"
                      placeholder="SKU"
                    />
                  </div>
                  <div className="flex mt-3 flex-col w-full">
                    <NewTag
                      formData={formData}
                      setFormData={setFormData}
                    ></NewTag>
                  </div>
                  {/* <div className="flex flex-col w-full">
                    <span className="my-4 mb-1 text-xs">Color</span>
                    <TagCom
                      onSizeTagsChange={handleColorTagsChange}
                      ifSize={false}
                    />
                  </div> */}
                </div>
              </div>
            </div>
            <div>
              <AddSize formData={formData} setFormData={setFormData}></AddSize>
            </div>
            <div className="flex flex-col w-full p-6  rounded-2xl text-light bg-white">
              <div>
                <h3 className="pb-3 text-base font-medium tracking-widest text-center uppercase">
                  Product Description
                </h3>
                <div className="py-4 ">
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
                  </div> */}

                  <div className="flex flex-col w-full">
                    <span className="my-1 mb-1 text-xs">Description</span>

                    {/* <textarea
                      autoComplete="off"
                      onChange={handleInputChange}
                      className="w-full px-2 py-2 text-sm capitalize transition-all duration-500 border rounded-md outline-none bg-white text-light focus:bg-light focus:text-primary focus:shadow-md"
                      type="text"
                      name="description"
                      rows="6"
                      required
                    ></textarea> */}
                    <JoditEditor
                      ref={editor}
                      value={description.description || ""}
                      onChange={(newContent) => setDescription(newContent)}
                      className="w-full bg-white px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all"
                    />
                  </div>
                </div>
              </div>
              <div className="pt-10 pb-5 ">
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
                      value={formData.price || ""}
                      id="price"
                      required
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
                        value={formData.discount || ""}
                        className="w-full col-span-2 px-2 py-2 text-sm capitalize transition-all duration-500 border border-r-0 outline-none rounded-l-md bg-white text-light focus:bg-light focus:text-primary focus:shadow-md"
                        placeholder="discount Price"
                      />

                      <input
                        autoComplete="off"
                        type="number"
                        name="offerPrice"
                        id="offerPrice"
                        value={offerPrice}
                        disabled
                        className="w-full px-2 py-2 text-xl font-bold text-center capitalize transition-all duration-500 border rounded-r-lg outline-none bg-light text-primary "
                        placeholder="price"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full p-6   text-light bg-white">
              <div>
                <h3 className="pb-3 text-base font-medium tracking-widest text-center uppercase">
                  Images Upload
                </h3>
                <div className="py-4  ">
                  <div className="flex flex-col w-full">
                    <span className="my-1 mb-1 text-xs">
                      Upload Images (
                      <span className="text-red-600">
                        You're allowed to upload a maximum of 5 images.
                      </span>
                      )
                    </span>

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
                      onClick={() => removeImageFn(url, i)}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="py-4  col-span-1 bg-white px-5">
              <div className="flex flex-col w-full">
                <span className="my-1 mb-12 text-center text-xl">
                  Size Chart Image
                </span>

                <input
                  autoComplete="off"
                  type="file"
                  name="thumb"
                  accept="image/*"
                  multiple
                  className="w-full px-2 py-2 text-sm capitalize transition-all duration-500 border rounded-md outline-none bg-white text-light focus:bg-light focus:text-primary focus:shadow-md"
                  onChange={thumbImageChange}
                ></input>
              </div>
              {prevThum && (
                <div
                  className="w-48 h-48  border rounded-lg shadow-lg my-2  from-[#006419]  to-[#0CD21D]"
                  style={{
                    backgroundImage: `url(${prevThum})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
              )}
            </div>

            <div className="flex items-center w-72 mx-auto justify-center">
              <div className="flex flex-col items-center w-full ">
                <button
                  onClick={handleSubmit}
                  className="shadow-lg w-96 bg-white rounded text-light"
                  type="submit"
                >
                  <div className="flex items-center justify-center">
                    <button
                      disabled={loading}
                      className="flex items-center justify-center px-5 py-2 text-base font-bold uppercase duration-300 rounded-full text-black bg-light"
                    >
                      {loading ? <>Adding..... Product</> : <>Add Product</>}
                    </button>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/*------------------key feature------------- */}
        </div>

        {/* {show && (
          <div className="fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-75 flex">
            <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">{product?.title}</h2>

             
              <div className="mb-4">
                <div className="flex space-x-2 overflow-x-auto">
                  {product?.url?.map((image, index) => (
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
                  src={product?.thumb?.url}
                  alt={`thumb image`}
                  className="w-24 h-24 object-cover rounded-lg shadow-md"
                />
              </div>

              <div className="mb-4">
                <p>
                  <strong>Category:</strong> {product?.category}
                </p>
                <p>
                  <strong>Brand:</strong> {product?.brand}
                </p>
                <p>
                  <strong>SKU:</strong> {product?.sku}
                </p>
                <p>
                  <div
                    className="md:mb-4 text-black"
                    dangerouslySetInnerHTML={{
                      __html: product?.description?.slice(0, 500),
                    }}
                  ></div>
                </p>
                <p>
                  <strong>Price:</strong> {product?.price?.toFixed(2)}tk
                </p>
                <p>
                  <strong>Discount:</strong> {product?.discount}tk
                </p>
                <p>
                  <strong>Stock:</strong> {product?.stock}
                </p>
                <p>
                  <strong>Colors:</strong> {product?.color?.join(",")}
                </p>
                <p>
                  <strong>Sizes:</strong> {product?.size?.join(",")}
                </p>
              </div>
              <div className="flex justify-end">
                <Link
                  to={
                    product?.subcategory && product?.subcategory !== ""
                      ? `/edit-product/${product?.brand}/${product?.category}/${product?.subcategory}/${product?.title}`
                      : `/edit-product/${product?.brand}/${product?.category}/${product?.title}`
                  }
                >
                  <button className="bg-white text-white font-bold py-2 px-4 rounded mr-2">
                    Edit
                  </button>{" "}
                </Link>

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

export default AdminAddProducts;
