import axios from "axios";
import { serverUrl } from "../store";

export const getAllVideos =() =>async (dispatch) => {
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

export const createNewVideo = (formData) => async (dispatch) => {
  try {
    dispatch({
            type: "newVideoRequest",
          });

    console.log("Server URL:", serverUrl);
    console.log("Form Data:", formData);

    const response = await axios.post(`${serverUrl}/feature-vedio`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const data = response.data;

    console.log("Response Data:", data);

    dispatch({
            type: "newVideoSuccess",
            payload: data.message,
          });
  } catch (error) {
    console.log("Error:", error);

    dispatch({
            type: "newVideoFail",
            payload: error.response.data.message,
          });
  }
};



