import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { CustomNextArrow, CustomPrevArrow } from "../CustomArrows/CustomArrows";
import { useEffect, useState } from "react";
import getBanner from "../../Context/ApiServices";

const Banner = () => {
  const [banner, setBan] = useState([]);

  useEffect(() => {
    getBanner(setBan, "Image-Banner", "Home-Banner");
  }, []);

  // console.log(banner);
  const settings = {
    dots: false,
    waitForAnimate: false,
    fade: true,
    infinite: true,
    speed: 2000,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };
  return (
    <div className="relative pt-24 lg:pt-24">
      <Slider {...settings} className="relative group">
        {banner?.map((banner, index) => (
          <div key={index} className="relative">
            <img
              // src={banner?.images[0]?.secureUrl}
              src={banner?.url?.url}
              alt={banner?.title}
              loading="lazy"
              className="lg:h-[50vh] xl:h-[70vh]  2xl:h-[87vh] h-[28vh]  md:h-[45vh] w-full object-center   md:object-cover"
            />

            {/* <div className="absolute inset-0 gradient-bg"></div> */}

            {/* <>
              <div className="absolute inset-0 flex flex-col items-center justify-center container mx-auto max-w-6xl z-10 px-5 text-white">
                <h1
                  className="font-helvetica leading-6 text-center lg:text-start uppercase pt-14 text-title-sm leading-12 md:text-title-md 
                        lg:text-[48px] mb-4"
                >
                  <span className="lg:leading-[55px] lg:py-10">
                    {banner?.title?.slice(0, 50)}
                  </span>
                </h1>
              </div>
            </> */}
            {/* <CustomPrevArrow />
            <CustomNextArrow /> */}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
