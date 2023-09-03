import { createReducer } from "@reduxjs/toolkit";

export const newOrderReducer = createReducer(
  {},
  {
    createOrderRequest: (state) => {
      state.loading = true;
    },
    createOrderSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    createOrderFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    paymentVerificationRequest: (state) => {
      state.loading = true;
    },
    paymentVerificationSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    paymentVerificationFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearErrors: (state) => {
      state.error = null;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  }
);

export const myOrderReducer = createReducer(
  {},
  {
    allOrderRequest: (state) => {
      state.loading = true;
      state.orders = [];
    },
    allOrderSuccess: (state = { orders: [] }, action) => {
      state.loading = false;
      state.orders = action.payload;

    },
    allOrderFail: (state, action) => {
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
  order:[],
  error: null,
};

export const orderDetailReducer = createReducer(
  { initialState },
  {
    orderDetailRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    orderDetailSuccess: (state, action) => {
      state.loading = false;
      state.order = action.payload.order;
    },
    orderDetailFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  }
);