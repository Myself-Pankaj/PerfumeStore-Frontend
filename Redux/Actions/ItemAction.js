import axios from "axios";
import { serverUrl } from "../store";

export const getAllItems = (keyword='') => async (dispatch) => {
  try {
    dispatch({
      type: "allProductRequest",
    });
    const { data } = await axios.get(`${serverUrl}/get-product?keyword=${keyword}`);
    dispatch({
      type: "allProductSuccess",
      payload: data,
    });
    
  } catch (error) {
    dispatch({
      type: "allProductFail",
      payload: error.response.data.message,
    });
  }
};

export const getByCategory = (category='') => async (dispatch) => {
  try {
    dispatch({
      type: "allProductRequest",
    });
    const { data } = await axios.get(`${serverUrl}/by-category?category=${category}`);
    dispatch({
      type: "allProductSuccess",
      payload: data,
    });
    
  } catch (error) {
    dispatch({
      type: "allProductFail",
      payload: error.response.data.message,
    });
  }
};

export const createNewItem = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: "newProductRequest",
    });

    const { data } = await axios.post(`${serverUrl}/create-product`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch({
      type: "newProductSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "newProductFail",
      payload: error.response.data.message,
    });
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: "detailRequest" });

    const { data } = await axios.get(`${serverUrl}/product/${id}`);
    // console.log(data)
    dispatch({
      type: "detailSuccess",
      payload: data,
    });
    return data; 
    // console.log(data);
  } catch (error) {
    dispatch({
      type: "detailFailure",
      payload: error.response.data.message,
    });
  }
};



export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: "allReviewRequest" });

    const { data } = await axios.get(`${serverUrl}/product-review`);

    dispatch({
      type: "allReviewSuccess",
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: "allReviewFail",
      payload: error.response.data.message,
    });
  }
};

// NEW REVIEW
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: "newReviewRequest" });

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    const { data } = await axios.put(`${serverUrl}/review-product`, reviewData);

    dispatch({
      type: "newReviewSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "newReviewFail",
      payload: error.response.data.message,
    });
  }
};
