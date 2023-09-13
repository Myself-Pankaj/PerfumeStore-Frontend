import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    videos: null,
    error: null,
  };

export const mediaReducer = createReducer(
    {initialState},
    {
        allVideoRequest:(state) => {
            state.loading = true;
          },
          allVideoSuccess:(state , action)=> {
            state.loading = false;
            state.videos = action.payload.videos;
  
          },
          allVideoFail:(state, action)=> {
            state.loading = false;
            state.error = action.payload;
          },
  
          clearErrors:(state)=> {
            state.error = null;
          },
    }
  )
