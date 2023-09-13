import { createReducer } from "@reduxjs/toolkit";

export const productReducer = createReducer(
  {},
  {
    allProductRequest: (state) => {
      state.loading = true;
      state.products = [];
    },
    allProductSuccess: (state = { products: [] }, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.productsCount = action.payload.productsCount;
      state.resultPerPage = action.payload.resultPerPage;
      state.filteredProductsCount = action.payload.filteredProductsCount;
    },
    allProductFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearErrors: (state) => {
      state.error = null;
    },
  }
);


const initialState = {
  loading: false,
  product:[],
  error: null,
};


export const detailReducer = createReducer(
  { initialState },
  {
    detailRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    detailSuccess: (state, action) => {
      state.loading = false;
      state.product = action.payload.product;
    },
    detailFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  }
);
