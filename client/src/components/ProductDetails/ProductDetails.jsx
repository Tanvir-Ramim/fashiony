import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import RelatedProducts from "../RelatedProducts/RelatedProducts";
import Description from "./Description";
import { useParams } from "react-router-dom";
import { getSingleDetails } from "../../Context/ApiServices";
import ReactGA from "react-ga4";
import { pushToDataLayer } from "../../Analytics/gtmUtils";
import Skeleton from "../Skeleton/Skeleton"; // Import the Skeleton component

const ProductDetails = () => {
  const [activeSection, setActiveSection] = useState("description");
  const [productDetails, setSingleData] = useState(null); // Set initial value to null
  const { brand, category, title } = useParams();
  // console.log(  productDetails  );
  useEffect(() => {
    getSingleDetails(setSingleData, brand, category, title);
  }, [brand, category, title]);

  useEffect(() => {
    if (productDetails) {
      // Track event with Google Analytics
      ReactGA.event({
        category: `${category} E-commerce`,
        action: "Product Viewed",
        label: {
          products_details: [
            {
              id: productDetails._id,
              name: productDetails.title,
              price: productDetails.offer_price,
            },
          ],
        },
      });

      // Track event with GTM
      pushToDataLayer("Product Viewed", {
        products_details: [
          {
            id: productDetails._id,
            name: productDetails.title,
            price: productDetails.offer_price,
          },
        ],
      });
    }
  }, [productDetails, category]);

  return (
    <>
      {productDetails === null ? (
        <Skeleton /> // Show skeleton loader if data is null
      ) : (
        <>
          <ProductItem
            data={productDetails}
            setActiveSection={setActiveSection}
          />
          <Description
            description={productDetails?.description}
            feature={productDetails?.feature}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
          <RelatedProducts
            brand={productDetails?.brand}
            title={productDetails?.title}
            category={productDetails?.category}
          />
        </>
      )}
    </>
  );
};

export default ProductDetails;
