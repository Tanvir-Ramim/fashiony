import { createSlice } from "@reduxjs/toolkit";
import { CgLayoutGrid } from "react-icons/cg";
import { toast } from "react-toastify";
const initialState = {
  product: [],
  setSuggestions: [],
};

export const reduxSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // addToCart: (state, action) => {
    //   const product = action.payload;
    //   state.product.forEach((product) => {
    //     // console.log(product.selectedSize);
    //   });
    //   // Ensure selectedSize is included in the comparison
    //   const existingProduct = state.product.find(
    //     (p) => p._id === product._id && p.selectedSize === product.selectedSize
    //   );

    //   if (existingProduct) {
    //     // If the product with the same size exists, update its quantity and prices
    //     existingProduct.quantity += product.quantity || 1;
    //     existingProduct.totalPrice =
    //       existingProduct.quantity * existingProduct.price;
    //     existingProduct.totalDiscountPrice =
    //       existingProduct.quantity * existingProduct.discount;
    //     existingProduct.totalOfferPrice =
    //       existingProduct.quantity * existingProduct.offer_price;

    //     // toast.success("Quantity updated for this size in the cart.");
    //   } else {
    //     // Add as a new entry if no matching product and size is found
    //     state.product.push({
    //       ...product,
    //       quantity: product.quantity || 1,
    //       totalPrice: product.price * (product.quantity || 1),
    //       totalOfferPrice: product.offer_price * (product.quantity || 1),
    //       totalDiscountPrice: product.discount * (product.quantity || 1),
    //       selectedSize: product.selectedSize || "", // Ensure size is included
    //     });

    //     // toast.success(
    //     //   "This product is added to the cart. Click on the cart for checkout."
    //     // );
    //   }
    // },

    // removeFromCart: (state, action) => {
    //   const productId = action.payload;
    //   state.product = state.product.filter((p) => p._id !== productId);
    // },
    addToCart: (state, action) => {
      const product = action.payload;
      // console.log(product)
      // Find an existing product in the cart that matches the same ID and size
      const existingProduct = state.product.find(
        (p) =>
          p._id === product._id &&
          p.selectedSize === product.selectedSize &&
          !product.isCombo
      );

      if (existingProduct) {
        // If the product with the same size exists, update its quantity and prices
        existingProduct.quantity = product.quantity || 1;
        existingProduct.totalPrice =
          existingProduct.quantity * existingProduct.price;
        existingProduct.totalDiscountPrice =
          existingProduct.quantity * existingProduct.discount;
        existingProduct.totalOfferPrice =
          existingProduct.quantity * existingProduct.offer_price;

        // Optionally show a toast or log that the quantity has been updated
        // toast.success("Quantity updated for this size in the cart.");
      } else {
        // If the product with the same size doesn't exist, add it as a new entry
        state.product.push({
          ...product,
          quantity: product.quantity || 1,
          totalPrice: product.price * (product.quantity || 1),
          totalOfferPrice: product.offer_price * (product.quantity || 1),
          totalDiscountPrice: product.discount * (product.quantity || 1),
          selectedSize: product.selectedSize || "", // Ensure size is included
        });

        // Optionally show a toast or log that the product has been added to the cart
        // toast.success("This product is added to the cart. Click on the cart for checkout.");
      }
    },

    removeFromCart: (state, action) => {
      const { productId, selectedSize } = action.payload;

      state.product = state.product.filter(
        (p) => !(p._id === productId && p.selectedSize === selectedSize)
      );
    },
    removeComboProduct: (state, action) => {
      const { combo } = action.payload;
      console.log(action.payload);
      state.product = state.product.filter((p) => !(p.comb === combo));
    },
    removeAll: (state) => {
      state.product = []; // Clear all products
    },
    increaseQuantity: (state, action) => {
      const product = action.payload;

      const productInc = state.product.find(
        (p) => p._id === product._id && p.selectedSize === product.selectedSize
      );

      const filterSize = product?.size?.filter(
        (item) => item?.name === productInc.selectedSize
      );
      const toastId = "unique-toast-id";
      if (filterSize[0].stock <= productInc?.quantity) {
        // toast.dismiss();
        // toast.error(`Cannot add this product more than ${filterSize[0]?.stock}`);
        if (!toast.isActive(toastId)) {
          toast.error(
            `Cannot add this product more than ${filterSize[0]?.stock}`,
            {
              toastId,
            }
          );
        }
        if (productInc) {
          productInc.quantity;
          productInc.totalPrice = productInc.quantity * productInc.price;
          (productInc.totalOfferPrice =
            productInc.offer_price * productInc.quantity),
            (productInc.totalDiscountPrice =
              productInc.quantity * productInc.discount);
        }
      } else {
        if (productInc) {
          productInc.quantity += 1;
          productInc.totalPrice = productInc.quantity * productInc.price;
          (productInc.totalOfferPrice =
            productInc.offer_price * productInc.quantity),
            (productInc.totalDiscountPrice =
              productInc.quantity * productInc.discount);
        }
      }
    },
    decreaseQuantity: (state, action) => {
      const product = action.payload;
      const productdec = state.product.find(
        (p) => p._id === product._id && p.selectedSize === product.selectedSize
      );
      if (productdec && productdec.quantity > 1) {
        productdec.quantity -= 1;
        productdec.totalPrice = productdec.quantity * productdec.price;
        (productdec.totalOfferPrice =
          productdec.offer_price * productdec.quantity),
          (productdec.totalDiscountPrice =
            productdec.quantity * productdec.discount);
      }
    },

    setSuggestions: (state, action) => {
      console.log("redux", action?.payload);
      state.setSuggestions = state.setSuggestions || [];
      if (action?.payload === "") {
        return;
      }

      const text = state.setSuggestions.some(
        (item) => item === action?.payload
      );

      if (!text) {
        if (state.setSuggestions.length >= 8) {
          state.setSuggestions.shift();
        }
        state.setSuggestions.push(action.payload);
      }
    },
    delSuggestion: (state, action) => {
      state.setSuggestions = state?.setSuggestions?.filter(
        (item) => item !== action?.payload
      );
    },
  },
});

export const {
  removeFromCart,
  removeAll,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  setSuggestions,
  delSuggestion,
  removeComboProduct,
} = reduxSlice.actions;

export default reduxSlice.reducer;
