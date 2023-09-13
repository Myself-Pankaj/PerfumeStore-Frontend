import axios from "axios";
import { serverUrl } from "../Store";


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
  