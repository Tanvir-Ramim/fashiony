import { useEffect, useState } from "react";
import Container from "./../Container/Container";
import Typography from "./../Typography/Typography";
import { getProduct, getProducts } from "../../Context/ApiServices";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TypeIcon from "./../Icon/TypeIcon";
import ProductCard from "./../card/ProductCard";
import ReactGA from "react-ga4";
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";
const PrevArrow = ({ onClick }) => (
  <IoIosArrowRoundBack
    className={`absolute -bottom-8 md:-bottom-20 transform -translate-y-1/2
     right-24 text-2xl bg-secondary rounded-full
      p-1 text-white cursor-pointer z-20 animate -move`} // Increased z-index to 50
    onClick={onClick}
    size={40}
  />
);

// Custom Next Arrow Component
const NextArrow = ({ onClick }) => (
  <IoIosArrowRoundForward
    className={`absolute -bottom-8 md:-bottom-20 transform
    -translate-y-1/2 right-10 text-2xl bg-secondary
     rounded-full p-1 text-white cursor-pointer z-20 animate -move`} // Increased z-index to 50
    onClick={onClick}
    size={40}
  />
);

const FeatureProduct = () => {
  const [products, setProducts] = useState([]);
  const [queryProduct, setProduct] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const dispatch = useDispatch();

  const cartProducts = useSelector((state) => state?.cart?.products);

  const handleCategory = (e) => {
    setSelectedCategory(e);
  };

  useEffect(() => {
    getProducts(
      setProducts,
      "",
      "all",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      false,
      10,
      1
    );
  }, []);

  useEffect(() => {
    getProduct(
      setProduct,
      ``,
      `${selectedCategory}`,
      ``,
      ``,
      ``,
      ``,
      ``,
      ``,
      10,
      1
    );
  }, [selectedCategory]);
  // console.log(products);
  const uniqueCategories = [
    "all",
    ...new Set(products.map((product) => product.category)),
  ];
  // console.log(uniqueCategories);
  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    className: "center",
    centerMode: true,
    centerPadding: "10px",
    speed: 2000,
    autoplay: true,

    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    dots: false,
    waitForAnimate: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 280,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleLinkClick = (label) => {
    ReactGA.event({
      category: `${label} Category`,
      action: `${label} Category Clicked Link`,
      label: label,
    });
  };

  return (
    <>
      {queryProduct.length > 0 && (
        <Container>
          <div className="py-20">
            <Typography
              variant="h3"
              className="font-nunito text-[24px] capitalize font-semibold lg:text-[38px]"
            >
              Feature Product
            </Typography>
            {/* category list */}
            <div className="flex flex-wrap gap-5">
              <div className="flex flex-wrap pt-5 gap-2 lg:gap-5">
                {uniqueCategories.map((category) => (
                  <div
                    className={`${
                      selectedCategory === category
                        ? "bg-black text-white"
                        : "bg-white"
                    } cursor-pointer border capitalize text-base
                   lg:text-[17px] rounded-[70px] font-nunito
                    font-bold py-[10px] px-[30px] border-[#8C6E42]`}
                    key={category}
                    onClick={() => {
                      handleCategory(category);
                      handleLinkClick(category);
                    }}
                  >
                    {category}
                  </div>
                ))}
              </div>
            </div>

            {/* Slider */}
            <div className="relative pt-10">
              <Slider {...settings} className="relative">
                {queryProduct?.map((item, index) => {
                  const discountPercentage = item?.discount
                    ? Math.round((item.discount / item.price) * 100)
                    : 0;

                  return (
                    <div key={index} className="mx-2  px-3">
                      <div className="">
                        <div className="">
                          <ProductCard
                            item={item}
                            discountPercentage={discountPercentage}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </div>
            <div className="flex justify-center pt-13 lg:pt-10">
              <Link
                to="/shop"
                className="cursor-pointer border capitalize
                  text-base lg:text-[18px] rounded-[10px] font-nunito
                    font-bold py-[10px] px-[30px] border-[#8C6E42]"
              >
                Explore More
              </Link>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

export default FeatureProduct;
