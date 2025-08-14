import { useEffect, useState } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Container from "../Container/Container";
import ProductCard from "../card/ProductCard";
import { getProducts } from "../../Context/ApiServices";

const RelatedProducts = ({ brand, category, title }) => {
  const [related, setProduct] = useState([]);

  const [loader, setLoader] = useState(false);
  // console.log(related);
  useEffect(() => {
    let fields = "title,price,discount,url";
    let limit = 10;
    let page = 1;

    getProducts(setProduct, title, category, brand, fields, limit, page);
  }, [brand, category, title]);

  var settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    className: "center",
    centerMode: true,
    centerPadding: "60px",
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
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
    ],
  };
  // console.log(related);
  return (
    <>
      <div className="py-10">
        <Container>
          {related?.length > 1 && (
            <>
              {" "}
              <h2 className="text-xl  text-ash text-center font-Monteserat font-bold pb-10">
                Related product
              </h2>
              <div className="overflow-hidden ">
                <Slider {...settings}>
                  {related?.map((item) => {
                    const discountPercentage = item?.discount
                      ? Math.round((item.discount / item.price) * 100)
                      : 0;
                    const discountedPrice = item?.price - item?.discount;
                    return (
                      <div key={item._id} className="">
                        {" "}
                        <div className="mx-2">
                          <ProductCard
                            item={item}
                            discountPercentage={discountPercentage}
                            discountedPrice={discountedPrice}
                          />
                        </div>
                      </div>
                    );
                  })}
                </Slider>
              </div>
            </>
          )}
        </Container>
      </div>
    </>
  );
};

export default RelatedProducts;
