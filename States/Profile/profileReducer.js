import { createReducer } from "@reduxjs/toolkit";

export const profileReducer = createReducer(
    {},
    {
      updateProfileRequest: (state) => {
        state.loading = true;
      },
      updateProfileSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
      },
      updateProfileFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      deleteProfileFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      deleteProfileRequest: (state) => {
        state.loading = true;
      },
      deleteProfileSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
      },
      updatePasswordRequest: (state) => {
        state.loading = true;
      },
      updatePasswordSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
      },
      updatePasswordFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
  
      forgetPasswordRequest: (state) => {
        state.loading = true;
      },
      forgetPasswordSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
      },
      forgetPasswordFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
  
      resetPasswordRequest: (state) => {
        state.loading = true;
      },
      resetPasswordSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
      },
      resetPasswordFailure: (state, action) => {
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