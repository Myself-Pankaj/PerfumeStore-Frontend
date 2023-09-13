import axios from "axios";
import { serverUrl } from "../Store";


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