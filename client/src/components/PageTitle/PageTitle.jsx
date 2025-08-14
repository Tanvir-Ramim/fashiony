// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";

// const PageTitle = ({ title }) => {
//   const location = useLocation();

//   useEffect(() => {
//     document.title = title;
//   }, [location, title]);

//   return null;
// };

// export default PageTitle;

import React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

const PageTitle = ({ title, description, keywords }) => {
  const location = useLocation();

  return (
    <Helmet>
      <title>{title}</title>
      <meta
        name="description"
        content={
          description ||
          "At Fashiony, we believe that every woman deserves clothing that reflects her unique style and grace."
        }
      />
      <meta
        name="keywords"
        content={keywords || "e-commerce, shop, products, fashion, clothing"}
      />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={window.location.href} />
    </Helmet>
  );
};

export default PageTitle;
