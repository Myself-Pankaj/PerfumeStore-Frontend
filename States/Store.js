import { configureStore } from "@reduxjs/toolkit";
import { authReducer, loginReducer, registerReducer, verificationReducer } from "./Auth/authReducer";
import { profileReducer } from "./Profile/profileReducer";
import { mediaReducer } from "./Media/mediaReducer";
import { detailReducer, productReducer } from "./Product/productReducer";
import { newReviewReducer, productReviewsReducer } from "./Review/reviewReducer";
import { cartItemReducer, cartReducer } from "./Cart/cartReducer";
import { myOrderReducer, newOrderReducer, orderDetailReducer } from "./Order/orderReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    register:registerReducer,

    verification:verificationReducer,
    profile: profileReducer,
    media: mediaReducer,
    product:productReducer,
    productdetail:detailReducer,
    reviews:productReviewsReducer,
    n_review:newReviewReducer,
    addToCart: cartReducer,
    getFromCart: cartItemReducer,
    Order: newOrderReducer,
    myOrder:myOrderReducer,
    orderDetail:orderDetailReducer,    
  },
});

export default store;

export const serverUrl = "https://m-attar-plazaa.onrender.com/attar/v1";
