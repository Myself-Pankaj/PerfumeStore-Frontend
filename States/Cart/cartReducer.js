import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  loading: false,
  error: null,
  message: "",
};

export const cartReducer = createReducer(
  { initialState },
  {
    addToCartRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    addToCartSuccess: (state, action) => {
      state.loading = false;
      state.cartItems = action.payload.cartItems;
      state.message = action.payload.message;
    },
    addToCartFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateCartRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateCartSuccess: (state, action) => {
      state.loading = false;
      state.cartItems = action.payload.cartItems;
      // console.log(action.payload.cartItems)
      state.message = action.payload.message;
    },
    updateCartFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    removeFromCartRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    removeFromCartSuccess: (state, action) => {
      state.loading = false;
      state.cartItems = action.payload.cartItems;
      state.message = action.payload.message;
    },
    removeFromCartFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    

    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
        state.message = null;
      },
  }
);

export const cartItemReducer = createReducer({},
  
  {
    getCartItemRequest: (state) => {
      state.loading = true;
      state.cart = [];
    },
    getCartItemSuccess: (state, action) => {
      state.loading = false;
      state.cart = action.payload; // Assign the cart items from the response to the state
      state.success = action.payload.success;
     
    },
    getCartItemFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    saveShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
      // console.log(action.payload)
    },
    

    clearError: (state) => {
      return {
        ...state,
        error: null,
      };
    },
    clearMessage: (state) => {
      return {
        ...state,
        message: null,
      };
    },
  }
);
