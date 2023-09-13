import axios from "axios";
import { serverUrl } from "../Store";

export const getAllMedia =() =>async (dispatch) => {
  try {
    dispatch({
      type: "allVideoRequest",
    });

    const { data } = await axios.get(`${serverUrl}/all-feature-vedios`);
    dispatch({
      type: "allVideoSuccess",
      payload: data,
    });
  
  } catch (error) {
    dispatch({
      type: "allVideoFail",
      payload: error.response.data.message,
    });
  }
};