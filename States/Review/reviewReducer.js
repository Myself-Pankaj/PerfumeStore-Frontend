import { createReducer } from '@reduxjs/toolkit';

export const productReviewsReducer = createReducer(
  { reviews: [] },
  {
    allReviewRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    allReviewSuccess: (state, action) => {
      state.loading = false;
      state.reviews = action.payload;
      state.message = action.payload.message;
    },
    allReviewFail: (state, action) => {
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

export const newReviewReducer = createReducer(
  { loading: false, success: false, error: null },
  {
    newReviewRequest: (state) => {
      state.loading = true;
    },
    newReviewSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    newReviewFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    newReviewReset: (state) => {
      state.success = false;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  }
);
