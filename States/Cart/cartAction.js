import axios from "axios";
import { serverUrl } from "../Store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const addToCart = (productId, quantity) => async (dispatch) => {
  try {
    dispatch({
      type: "addToCartRequest",
    });

    const response = await axios.post(`${serverUrl}/add-to-cart`, {
      productId,
      quantity,
    });
    dispatch({
      type: "addToCartSuccess",
      payload: {
        cartItems: response.data.cart,
        message: response.data.message,
      },
    });
  } catch (error) {
    dispatch({
      type: "addToCartFailure",
      payload: error.message,
    });
  }
};

export const getCartItems = () => async (dispatch) => {
  try {
    dispatch({
      type: "getCartItemRequest", // Updated action type
    });

    const { data } = await axios.get(`${serverUrl}/get-cart`);
    dispatch({
      type: "getCartItemSuccess", // Updated action type
      payload: data.cart,
    });
    // console.log(data.cart)
  } catch (error) {
    dispatch({
      type: "getCartItemFailure", // Updated action type
      payload: error.response.data.message,
    });
  }
};

export const updateCartItemQuantity =
  (productId, newQuantity, operation) => async (dispatch) => {
    try {
      dispatch({
        type: "updateCartRequest",
      });

      const updatedQuantity =
        operation === "increase" ? newQuantity + 1 : newQuantity - 1;

      const response = await axios.put(`${serverUrl}/update-cart`, {
        productId,
        quantity: updatedQuantity,
      });

      dispatch({
        type: "updateCartSuccess",
        payload: {
          cartItems: response.data.cart,
          message: response.data.message,
        },
      });
    } catch (error) {
      dispatch({
        type: "updateCartFailure",
        payload: error.message,
      });
    }
  };

export const removeFromCart = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "removeFromCartRequest",
    });

    const { data } = await axios.delete(`${serverUrl}/remove-from-cart/${id}`);
    dispatch({
      type: "removeFromCartSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "removeFromCartFailure",
      payload: error.response.data.message,
    });
  }
};

export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: "saveShippingInfo",
    payload: data,
  });

  try {
    await AsyncStorage.setItem("shippingInfo", JSON.stringify(data));
  } catch (error) {
    console.error("Error saving shipping info:", error);
  }
};
