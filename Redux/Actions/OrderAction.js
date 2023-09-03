import axios from "axios";
import { serverUrl } from "../store";

// Create Order
export const createOrder = (orderData) => async (dispatch) => {
  try {
    dispatch({ type: "createOrderRequest" });

    const { data } = await axios.post(`${serverUrl}/place-order`, orderData, {
      headers: {
        "Content-Type": "application/json", // Updated the content type
      },
    });
    // console.log(data)
    dispatch({ type: "createOrderSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "createOrderFail",
      payload: error.response.data.message,
    });
  }
};

export const paymentVerification = (
  razorpay_payment_id, razorpay_order_id, razorpay_signature, orderOptions ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "paymentVerificationRequest",
      });

      const { data } = await axios.post(
        `${serverUrl}/payment-verification`,
        {
          razorpay_payment_id,
          razorpay_order_id,
          razorpay_signature,
          orderOptions,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      dispatch({
        type: "paymentVerificationSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "paymentVerificationFail",
        payload: error.response.data.message,
      });
    }
  };

  export const getMyOrders = () => async (dispatch) => {
    try {
      dispatch({ type: 'allOrderRequest' });
  
      const { data } = await axios.get(`${serverUrl}/myorders`, {
        withCredentials: true,
      });
  
      dispatch({ type: 'allOrderSuccess', payload: data.orders });
    } catch (error) {
      dispatch({ type: 'allOrderFail', payload: error.response.data.message });
    }
  };
  
 
  export const getOrderDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: "orderDetailRequest" });
  
      const { data } = await axios.get(`${serverUrl}/myorder/${id}`);
      // console.log(data)
      dispatch({
        type: "orderDetailSuccess",
        payload: data,
      });
      return data; 
      // console.log(data);
    } catch (error) {
      dispatch({
        type: "orderDetailFail",
        payload: error.response.data.message,
      });
    }
  };