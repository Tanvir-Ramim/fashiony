import { useEffect, useState } from "react";
import getBanner from "../../Context/ApiServices";
import { Link } from "react-router-dom";
import ReactGA from "react-ga4";

import Typography from "../Typography/Typography";

const Combo = () => {
  const [saleImage, setSaleImage] = useState([]);
  // console.log(saleImage);

  useEffect(() => {
    getBanner(setSaleImage, "Image-Combo", "combo");
  }, []);

  const handleLinkClick = (label) => {
    // Track link click event
    ReactGA.event({
      category: `${label} Category`,
      action: `${label} Category Clicked Link`,
      label: label,
    });
  };

  return (
    <>
      <div className="pb-20 lg:pb-20 container mx-auto px-5">
        {saleImage.length > 0 && (
          <div className="relative group ">
            <Typography
              variant="h3"
              className={
                "font-nunito container mx-auto text-[24px]  lg:text-[38px]"
              }
            >
              Combo package
            </Typography>
            {saleImage?.map((banner, index) => (
              <div key={index} className="relative pt-3">
                <Link
                  to={`/combo`}
                  onClick={() => handleLinkClick(saleImage?.title)}
                >
                  <img
                    srcSet={`${banner?.url?.url}?w=300 300w, ${banner?.url?.url}?w=600 600w, ${banner?.url?.url}?w=900 900w`}
                    sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 900px"
                    alt={banner?.title || "Banner image"}
                    loading="lazy"
                    className="animate-fade-in  w-full 
             block scale-100 transform object-cover
             opacity-100 transition duration-300 
              
          
             "
                  />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Combo;
