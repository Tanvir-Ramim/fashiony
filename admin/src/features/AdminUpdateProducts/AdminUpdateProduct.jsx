import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { SiMinutemailer } from "react-icons/si";

import { toast } from "react-hot-toast";

// Import components

import EditTagCom from "../AdminAddProducts/EditTagCom";

// API URL
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const AdminUpdateProduct = () => {
  const [loading, setLoading] = useState(false);
  const [offerPrice, setOfferPrice] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]);

  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [sizeTags, setSizeTags] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [product, setProduct] = useState({});

  // Other hooks
  const { register, handleSubmit, setValue, watch } = useForm();
  const id = useParams();
  const navigate = useNavigate();

  // Function to handle image change
  const handleImageChange = (e) => {
    let files = e.target.files;
    const imageList = [];
    const selectedImage = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview(reader.result);
    };

    if (selectedImage) {
      reader.readAsDataURL(selectedImage);
    }

    if (selectedImages?.length > 3) {
      setSelectedImages([]);
      e.target.value = "";
      alert("image cannot be more than 4 images");
    } else {
      setSelectedImages([...selectedImages, ...Array.from(files).reverse()]);
    }
  };

  // Function to handle size tags change
  const handleSizeTagsChange = (newSizeTags) => {
    setSizeTags(newSizeTags);
  };

  // Fetching single product data
  useEffect(() => {
    const getSingleProduct = async () => {
      try {
        const res = await fetch(`${apiUrl}/products/${id?.id}`);
        const data = await res.json();
        if (res.ok) {
          setProduct(data);
        }
      } catch (error) {
        console.error("Error fetching single product:", error);
      }
    };
    getSingleProduct();
  }, [id?.id]);

  // Effect to set initial form values based on product data
  useEffect(() => {
    setValue("name", product?.name);
    setValue("category", product?.category);
    setValue("subcategory", product?.subcategory);
    setValue("stock", product?.stock);
    setValue("sku", product?.sku);
    setValue("newArrival", product?.newArrival === "true" ? true : false);
    setValue("description", product?.description);
    setValue("regularPrice", Number(product?.regularPrice));
    setValue("discountPrice", Number(product?.discountPrice));
    setValue("video", product?.video);
  }, [setValue, product]);

  // Effect to update size tags in the form
  useEffect(() => {
    setValue("sizes", JSON.stringify(sizeTags));
  }, [sizeTags]);

  // Effect to update selected category index when product category changes
  useEffect(() => {
    if (product?.category) {
      const index = findIndexByStringProperty(
        category,
        "category",
        product.category
      );
      setSelectedCategoryIndex(Number(index));
    }
  }, [product]);

  // Effect to calculate offer price based on discount
  const categoryValue = watch("category");
  const discountValue = watch("discountPrice");
  const regularValue = watch("regularPrice");

  useEffect(() => {
    const index = findIndexByStringProperty(
      category,
      "category",
      categoryValue
    );
    setSelectedCategoryIndex(Number(index));
    setOfferPrice(Number(regularValue) - Number(discountValue));
  }, [categoryValue, setValue, discountValue, regularValue]);

  // Submit form function
  const submitForm = async (data) => {
    setLoading(true);
    data.offerPrice = offerPrice;

    let formDataObj = new FormData();
    if (selectedImages?.length) {
      formDataObj.append("product", JSON.stringify(data));
      selectedImages.forEach((image) => {
        formDataObj.append("images", image);
      });
    }
    try {
      let response;
      if (selectedImages?.length) {
        response = await fetch(`${apiUrl}/products/${product._id}`, {
          method: "PUT",
          body: formDataObj,
        });
      } else {
        response = await fetch(`${apiUrl}/products/${product._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "Application/json",
          },
          body: JSON.stringify(data),
        });
      }
      if (response.ok) {
        toast.success("Product updated successfully");
        navigate("/admin/adminProducts");
      } else {
        alert("Update failed");
        console.error("Update failed");
      }
    } catch (error) {
      toast.error("Update failed");
      console.error("Error updating data and images:", error);
    } finally {
      setLoading(false);
    }
  };

  // Effect to update size tags from product data
  useEffect(() => {
    if (product && product?.sizes) {
      setSizeTags(JSON.parse(product?.sizes));
    }
  }, [product]);

  // Helper function to find index by string property
  function findIndexByStringProperty(array, propertyName, targetValue) {
    for (let i = 0; i < array?.length; i++) {
      if (array[i][propertyName] === targetValue) {
        return i;
      }
    }
    return -1;
  }

  return (
    <>
      <div className="container flex items-center justify-center w-full py-20 mx-auto md:ps-52 md:py-20">
        <form
          onSubmit={handleSubmit(submitForm)}
          id="myForm"
          encType="multipart/form-data"
        >
          <h3 className="mb-20 text-xl font-extrabold text-center uppercase md:text-4xl text-primary ">
            Update Product
          </h3>

          <div className="grid grid-cols-2 gap-10">
            <div className="flex flex-col w-full p-6 shadow-lg rounded-2xl text-light bg-primary">
              <div>
                <h3 className="pb-3 text-base font-medium tracking-widest text-center uppercase">
                  Product Information
                </h3>
                <div>
                  <div className="flex flex-col w-full">
                    <span className="my-4 mb-1 text-xs">Product Name</span>
                    <input
                      autoComplete="off"
                      {...register("name")}
                      defaultValue={product?.name}
                      type="text"
                      name="name"
                      required
                      className="w-full px-2 py-2 text-sm capitalize transition-all duration-500 border rounded-md outline-none bg-primary text-light focus:bg-light focus:text-primary focus:shadow-md"
                      placeholder="product name"
                    />
                  </div>

                  <div className="flex flex-col w-full">
                    <span className="my-4 mb-1 text-xs">Category</span>

                    <input
                      autoComplete="off"
                      required
                      defaultValue={product?.category}
                      {...register("category")}
                      className="w-full px-2 py-2 text-sm capitalize transition-all duration-500 border rounded-md outline-none bg-primary text-light focus:bg-light focus:text-primary focus:shadow-md"
                      type="text"
                      name="category"
                    />
                  </div>

                  <div className="flex flex-col w-full">
                    <span htmlFor="subcategory" className="my-4 mb-1 text-xs">
                      Sub-category
                    </span>

                    <input
                      {...register("subcategory")}
                      className="w-full px-2 py-2 text-sm capitalize transition-all duration-500 border rounded-md outline-none bg-primary text-light focus:bg-light focus:text-primary focus:shadow-md"
                      type="text"
                      name="subcategory"
                      defaultValue={product?.subcategory}
                    />
                  </div>

                  <div className="flex flex-col w-full">
                    <span className="my-4 mb-1 text-xs">Quantity</span>
                    <input
                      autoComplete="off"
                      {...register("stock")}
                      type="number"
                      name="stock"
                      defaultValue={product?.stock}
                      required
                      className="w-full px-2 py-2 text-sm capitalize transition-all duration-500 border rounded-md outline-none bg-primary text-light focus:bg-light focus:text-primary focus:shadow-md"
                      placeholder="quantity"
                    />
                  </div>

                  <div className="flex flex-col w-full">
                    <span className="my-4 mb-1 text-xs">SKU</span>
                    <input
                      autoComplete="off"
                      {...register("sku")}
                      type="text"
                      name="sku"
                      defaultValue={product?.sku}
                      required
                      className="w-full px-2 py-2 text-sm capitalize transition-all duration-500 border rounded-md outline-none bg-primary text-light focus:bg-light focus:text-primary focus:shadow-md"
                      placeholder="SKU"
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <span className="my-4 mb-1 text-xs">Size</span>
                    <EditTagCom
                      onSizeTagsChange={handleSizeTagsChange}
                      product={product}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full p-6 shadow-lg rounded-2xl text-light bg-primary">
              <div>
                <h3 className="pb-3 text-base font-medium tracking-widest text-center uppercase">
                  Product Description
                </h3>
                <div className="py-4 shadow ">
                  <div className="flex flex-col w-full">
                    <div className="flex items-center">
                      <input
                        autoComplete="off"
                        {...register("newArrival")}
                        className="w-3 h-3 bg-transparent"
                        type="checkbox"
                        id="default-checkbox"
                        defaultChecked={product?.newArrival === "true"}
                        name="newArrival"
                      />

                      <label
                        htmlFor="newArrival"
                        className="mb-1 ml-2 text-sm font-normal capitalize opacity-100 text-light "
                      >
                        New Arrival
                      </label>
                    </div>
                  </div>

                  <div className="flex flex-col w-full">
                    <span className="my-1 mb-1 text-xs">Description</span>

                    <textarea
                      autoComplete="off"
                      defaultValue={product?.description}
                      {...register("description")}
                      className="w-full px-2 py-2 text-sm capitalize transition-all duration-500 border rounded-md outline-none bg-primary text-light focus:bg-light focus:text-primary focus:shadow-md"
                      type="text"
                      name="description"
                      rows="6"
                      required
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="pt-10 pb-5 ">
                <h3 className="text-base font-medium tracking-widest text-center uppercase ">
                  Product Price
                </h3>
                <div className="py-2 shadow ">
                  <div className="flex flex-col w-full">
                    <span className="my-4 mb-1 text-xs">Regular Price</span>

                    <input
                      autoComplete="off"
                      {...register("regularPrice")}
                      defaultValue={product?.regularPrice}
                      type="number"
                      name="regularPrice"
                      id="price"
                      required
                      className="w-full px-2 py-2 text-sm capitalize transition-all duration-500 border rounded-md outline-none bg-primary text-light focus:bg-light focus:text-primary focus:shadow-md"
                      placeholder="Regular price"
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <span className="my-4 mb-1 text-xs">Discount Price</span>

                    <div className="grid grid-cols-3">
                      <input
                        autoComplete="off"
                        type="number"
                        name="discountPrice"
                        id="discountPrice"
                        {...register("discountPrice")}
                        required
                        defaultValue={product?.discountPrice}
                        className="w-full col-span-2 px-2 py-2 text-sm capitalize transition-all duration-500 border border-r-0 outline-none rounded-l-md bg-primary text-light focus:bg-light focus:text-primary focus:shadow-md"
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

            <div className="flex flex-col w-full p-6 shadow-lg rounded-2xl text-light bg-primary">
              <div>
                <h3 className="pb-3 text-base font-medium tracking-widest text-center uppercase">
                  Images Upload
                </h3>
                <div className="py-4 shadow ">
                  <div className="flex flex-col w-full">
                    <Link
                      to={
                        product &&
                        product?.imageUrls?.length > 0 &&
                        product?.imageUrls[0]
                      }
                    >
                      <img
                        className="h-40 mx-auto rounded-lg shadow-lg"
                        src={
                          imagePreview
                            ? imagePreview
                            : product &&
                              product?.imageUrls?.length > 0 &&
                              product?.imageUrls[0]
                        }
                        alt="image"
                      />
                    </Link>
                    <span className="my-1 mb-1 text-xs">Upload Images</span>

                    <input
                      autoComplete="off"
                      type="file"
                      name="images"
                      accept="image/*"
                      multiple
                      className="w-full px-2 py-2 text-sm capitalize transition-all duration-500 border rounded-md outline-none bg-primary text-light focus:bg-light focus:text-primary focus:shadow-md"
                      onChange={handleImageChange}
                    ></input>
                  </div>
                </div>
              </div>
              <div className="pt-10 pb-5 ">
                <h3 className="text-base font-medium tracking-widest text-center uppercase ">
                  Video ADD
                </h3>
                <div className="py-2 shadow ">
                  <div className="flex flex-col w-full">
                    <span className="my-4 mb-1 text-xs">Video ADD</span>

                    <textarea
                      autoComplete="off"
                      {...register("video")}
                      name="video"
                      defaultValue={product?.video}
                      type="text"
                      rows="6"
                      className="w-full px-2 py-2 text-sm capitalize transition-all duration-500 border rounded-md outline-none bg-primary text-light focus:bg-light focus:text-primary focus:shadow-md"
                      placeholder="Added Video"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="flex flex-col items-center w-full ">
                <button
                  className="p-6 shadow-lg bg-primary rounded-2xl text-light"
                  type="submit"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-20 h-20 mx-auto"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    >
                      <path d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12m10-8a8 8 0 1 0 0 16a8 8 0 0 0 0-16"></path>
                      <path d="M13 7a1 1 0 1 0-2 0v4H7a1 1 0 1 0 0 2h4v4a1 1 0 1 0 2 0v-4h4a1 1 0 1 0 0-2h-4z"></path>
                    </g>
                  </svg>

                  <div className="flex items-center justify-center mt-5">
                    <button
                      disabled={loading}
                      className="flex items-center justify-center px-5 py-2 text-base font-bold uppercase duration-300 rounded-full text-primary bg-light"
                    >
                      {loading ? (
                        "Updating....... Product"
                      ) : (
                        <>
                          Update Product <SiMinutemailer className="ml-2 " />
                        </>
                      )}
                    </button>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminUpdateProduct;
