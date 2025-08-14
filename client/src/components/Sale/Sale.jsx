import { useEffect, useState } from "react";
import getBanner from "../../Context/ApiServices";
import { Link } from "react-router-dom";
import ReactGA from "react-ga4";
import { CustomNextArrow, CustomPrevArrow } from "../CustomArrows/CustomArrows";
import Slider from "react-slick";
const Sale = () => {
  const [saleImage, setSaleImage] = useState([]);
  // console.log(saleImage);
  useEffect(() => {
    getBanner(setSaleImage, "Image-Theme", "Home-Middle");
  }, []);
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
  const handleLinkClick = (label) => {
    // Track link click event
    ReactGA.event({
      category: `${label} Category`,
      action: `${label} Category Clicked Link`,
      label: label,
    });
  };
  // console.log(saleImage);
  return (
    <>
      <div className="pb-20 lg:pb-20">
        {saleImage.length > 0 && (
          <Slider {...settings} className="relative group">
            {saleImage?.map((banner, index) => (
              <div key={index} className="relative overflow-hidden">
                <Link
                  to={`${banner.link ? `${banner.link}` : `${banner.tag}`}`}
                  onClick={() => handleLinkClick(saleImage?.title)}
                >
                  <img
                    // src={banner?.images[0]?.secureUrl}
                    src={banner?.url?.url}
                    alt={banner?.title}
                    loading="lazy"
                    className="animate-fade-in 
         abs olute inset-0  w-full 
              block scale-100 transform object-center
              opacity-100 transition duration-300 
              group-hover:scale-105 
              lg:group-hover:translate -x-10 
               lg:h- [65vh] 
              h- [20vh]   lg:object-cover"
                  />
                </Link>

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
        )}
      </div>
    </>
  );
};

export default Sale;
