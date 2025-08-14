import { useEffect, useMemo, useState } from "react";

import "./PrductItem.css";

import { useDispatch } from "react-redux";

import Container from "../Container/Container";

import ReactGA from "react-ga4";
import { addToCart } from "../../redux/reduxSlice";

import { pushToDataLayer } from "../../Analytics/gtmUtils";
import { toast } from "react-toastify";
import ProductSlider from "./ProductSlider";
import ProductShortDes from "./ProductShortDes";
const ProductItem = ({ data, setActiveSection }) => {
  const [mainImage, setMainImage] = useState();
  const [activeIndex, setActiveIndex] = useState();
  const [selectedSize, setSelectedSize] = useState([]);
  const [error, setError] = useState("");
  const [activeColorSize, setActiveColorSize] = useState(null);
  // console.log(selectedSize);

  const [quantity, setQuantity] = useState(1);

  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
    setMainImage(data?.url[index].url);
  };

  let handleView = () => {
    setActiveSection("description");
    document
      .getElementById("details-section")
      .scrollIntoView({ behavior: "smooth" });
  };
  const dispatch = useDispatch();

  const handleIncrease = () => {
    if (selectedSize?.length === 0) {
      setError("Choose a Size First");
      return;
    }
    const filterData = data?.size?.filter(
      (item) => item?.name === selectedSize[0]
    );
    console.log(selectedSize);
    if (filterData[0]?.stock <= quantity) {
      console.log("dsfsdf");
      setError(
        `Can Not be added ${selectedSize[0]} product more than ${filterData[0]?.stock}`
      );
      return;
    }
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (selectedSize?.length === 0) {
      setError("Choose a Size First");
      return;
    }
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (selectedSize.length === 0) {
      toast.error("Please choose a size before adding to the cart.");
      return;
    }
    setError("");
    const cartItem = {
      ...data,
      quantity,
      selectedSize: selectedSize[0],
    };
    dispatch(addToCart(cartItem));

    // Track "Add to Cart" event with react-ga4
    ReactGA.event("add_to_cart", {
      currency: "TK", // Currency code (e.g., Bangladeshi Taka "TK")
      items: [
        {
          item_id: data._id, // Product ID
          item_name: data.title, // Product name
          price: data.offer_price, // Product price
          quantity: quantity, // Quantity added to cart
          item_category: data.category, // Optional: Category of the product
          item_brand: data.brand, // Optional: Brand of the product
          item_variant: selectedSize, // Optional: Size/variant if applicable
        },
      ],
    });

    // Track event with GTM
    pushToDataLayer("add_to_cart", {
      currencyCode: "TK",
      add: {
        products: [
          {
            id: data._id,
            name: data.title,
            price: data.offer_price,
            quantity: quantity,
          },
        ],
      },
    });
  };

  useEffect(() => {
    if (data?.url && data?.url.length > 0) {
      setMainImage(data?.url[0]?.url);
    }
  }, [data?.url]);

  // set sizes
  let sizesString = [];
  try {
    sizesString = data?.size || "[]";

    if (typeof sizesString === "string" && !sizesString.startsWith("[")) {
      sizesString = `["${sizesString.replace(/,/g, '","')}"]`;
    }
  } catch (error) {
    console.error("Error parsing sizes:", error);
  }

  const cartItem = {
    ...data,
    selectedSize: selectedSize[0],
    selectColor: activeColorSize,
  };
  const handleSizeClick = (value) => {
    setQuantity(1);
    setSelectedSize((prevSizes) => {
      if (prevSizes.includes(value)) {
        return [];
      } else {
        return [value];
      }
    });
    //for multiple size
    // setSelectedSize((prevSizes) => {
    //   if (prevSizes.includes(value)) {
    //     return prevSizes.filter((size) => size !== value);
    //   } else {
    //     return [...prevSizes, value];
    //   }
    // });
  };

  // const handleSizeClick = (value, name) => {
  //   if (name == "size") {
  //     setSelectedSize(value);
  //   }

  //   // else if (name == "color") {
  //   //   setActiveColorSize(value);
  //   // }
  // };

  const clean = useMemo(() => {
    return data?.description?.replace(/<\/?[^>]+(>|$)/g, "");
  }, [data?.description]);
  // const clean = data?.description?.replace(/<\/?[^>]+(>|$)/g, "");
  const truncated =
    clean?.length > 80
      ? clean.slice(0, clean.lastIndexOf(" ", 80)) + "..."
      : clean;
  // console.log(clean);
  const size2 = [];
  // console.log(data);

  useEffect(() => {
    if (selectedSize?.length === 0) {
      setQuantity(1);
    } else {
      setError("");
    }
  }, [selectedSize]);

  return (
    <>
      <div className="details md:py-20 pt-24 font-nunito py-10  bg-[#fafafa] px-2.5 relative">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 min-h-screen pt-10 ">
            <div className="thumbnail-viewer  lg:sticky top-0 pt-10 ">
              <ProductSlider
                mainImage={data?.url[activeIndex]?.url}
                data={data}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                totalImages={data?.url?.length}
              />

              <div className="thumbnail hidden pt-5 ">
                {data?.url?.map((image, index) => (
                  <div
                    key={index}
                    className={`thumbnailBox ${
                      index === activeIndex ? "active " : ""
                    }`}
                    onClick={() => handleThumbnailClick(index)}
                  >
                    <img src={image?.url} alt={data?.title} />
                  </div>
                ))}
              </div>
            </div>
            <ProductShortDes
              data={data}
              quantity={quantity}
              truncated={truncated}
              handleView={handleView}
              handleDecrease={handleDecrease}
              handleIncrease={handleIncrease}
              handleSizeClick={handleSizeClick}
              error={error}
              setError={setError}
              selectedSize={selectedSize}
              activeColorSize={activeColorSize}
              handleAddToCart={handleAddToCart}
            />
          </div>
        </Container>
      </div>
    </>
  );
};

export default ProductItem;
