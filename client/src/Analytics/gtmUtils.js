// gtmUtils.js
export const pushToDataLayer = (event, ecommerceData) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: event,
    ...ecommerceData,
  });
  // console.log("Data Layer Updated: ", window.dataLayer); // Optional for debugging
};
