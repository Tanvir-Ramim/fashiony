export const categories = [
  {
    id: 1,
    category: "Jeans",
    subCategories: ["Slim Fit", "Regular Fit", "Straight Fit"],
  },
  {
    id: 2,
    category: "T-Shirt",
    subCategories: ["Round neck", "V neck", "Drop Shoulder"],
  },
  { id: 3, category: "Shirt", subCategories: ["Full Sleeve", "Half Sleeve"] },
  { id: 4, category: "Co-ords and Top" },
  { id: 5, category: "Polo" },
  { id: 6, category: "Jacket" },
  { id: 7, category: "Hoodie" },
  { id: 8, category: "Sweater" },
  { id: 9, category: "Inner" },

  { id: 11, category: "Pants" },

  { id: 12, category: "Saree" },
];

const cat = [
  "Jeans",
  "T-Shirt",
  "Shirt",
  "Co-ords and Top",
  "Polo",
  "Jacket",
  "Hoodie",
  "Saree",
  "Sweater",
  "Inner",

  "Dress",
];

export const sortOptions = [
  { name: "Most Popular", value: "latest" },
  { name: "winter", value: "winter" },
  { name: "summer", value: "summer" },
  { name: "yearend", value: "yearend" },
  { name: "Offer", value: "offer" },
  { name: "Newest", value: "isNew" },
  { name: "Low to High", value: "low_to_high" },
  { name: "High to Low", value: "high_to_low" },
];

import ssl from "../assets/payment/sslcz-verified.png";

export const cash = [
  {
    question: "Cash On delivery",
    pay: "Cash on Delivery",
    answer: "Pay with cash upon delivery.",
    img: "",
  },
  // {
  //   question: " Pay Online(Credit/Debit Card/Mobile/NetBanking)",
  //   pay: "SSL Commerce",
  //   img: ssl,
  //   answer:
  //     "Pay securely by Credit/Debit card, Internet banking or Mobile banking through SSLCommerz.",
  // },
];
