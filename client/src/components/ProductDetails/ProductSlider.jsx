import React, { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

const ProductSlider = ({
  mainImage,
  data,
  activeIndex,
  setActiveIndex,
  totalImages,
}) => {
  const [zoomStyle, setZoomStyle] = useState({
    display: "none",
    zoomX: "0%",
    zoomY: "0%",
  });

  const handleMouseMove = (event, imageElement) => {
    const rect = imageElement.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    setZoomStyle({
      display: "block",
      zoomX: `${x}%`,
      zoomY: `${y}%`,
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      display: "none",
      zoomX: "0%",
      zoomY: "0%",
    });
  };
  // console.log(data);
  // console.log(mainImage);
  return (
    <div className=" max-w-96 relative">
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        initialSlide={activeIndex}
      >
        {data?.url?.map((image, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative cursor-zoom-in"
              onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={mainImage || image.url}
                alt={data?.title}
                loading="lazy"
                className="object-cover w-full h-auto"
              />
              <div
                className="absolute inset-0 bg-cover bg-no-repeat pointer-events-none"
                style={{
                  display: zoomStyle.display,
                  //   backgroundImage: `url(${image?.url})`,
                  backgroundImage: `url(${mainImage || image?.url})`,
                  backgroundPosition: `${zoomStyle.zoomX} ${zoomStyle.zoomY}`,
                  backgroundSize: "200%",
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
