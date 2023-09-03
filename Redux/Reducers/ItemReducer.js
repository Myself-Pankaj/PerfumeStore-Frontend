import { createReducer } from "@reduxjs/toolkit";

export const itemReducer = createReducer(
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

export const addItemReducer = createReducer(
  {},
  {
    newProductRequest(state) {
      state.loading = true;
    },
    newProductSuccess(state, action) {
      state.loading = false;
      state.success = action.payload.success;
      state.message = action.payload;
      state.product = action.payload.product;
    },
    newProductFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    newProductReset(state) {
      state.success = false;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  }
);

const initialState = {
  loading: false,
  product:[],
  error: null,
};


export const itemDetailReducer = createReducer(
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

export const productReviewsReducer = createReducer (
  { reviews: [] },{
    allReviewRequest:(state) => {
      state.loading = true;
      state.error = null;
    },
    allReviewSuccess:(state, action)=> {
      state.loading = false;
      state.reviews = action.payload;
      state.message = action.payload.message;
    },
    allReviewFail:(state, action)=>{
      state.loading = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },

    clearMessage: (state) => {
      state.message = null;
    },
  }) ;
export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case "newReviewRequest":
      return {
        ...state,
        loading: true,
      };
    case "newReviewSuccess":
      return {
        loading: false,
        success: action.payload,
      };
    case "newReviewFail":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "newReviewReset":
      return {
        ...state,
        success: false,
      };
    case "clearErrors":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const reviewReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case DELETE_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_REVIEW_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
