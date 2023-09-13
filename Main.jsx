import { View, Text, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Screens
import Home from "./Screen/Home";
import Loader from "./Components/Loader";
import { useSelector } from "react-redux";
import Auth from "./Screen/Auth";
import ToastWrapper from "./Components/ToastWrapper";
import Footer from "./Layouts/Footer";
import RegisterCamera from "./Components/Camera";
import Register from "./Screen/SignUp";
import Profile from "./Screen/Profile";
import SearchResult from "./Layouts/Result";
import Cart from "./Screen/Cart";
import BuyNow from "./Screen/BuyNow";
import ProductDetail from "./Layouts/ProductDetail";
import EditProfile from "./Layouts/EditProfile";
import MyOrder from "./Screen/MyOrder";
import Payment from "./Layouts/Order";
import OrderSuccess from "./Layouts/OrderSuccess";
import OrderDetails from "./Layouts/OrderDetails";
import ResetPasswd from "./Layouts/ResetPasswd";

const Stack = createNativeStackNavigator();
const navigationRef = React.createRef();
const Main = () => {
  const [currentScreen, setCurrentScreen] = useState("");

  useEffect(() => {
    const unsubscribe = navigationRef.current?.addListener("state", (state) => {
      const currentRouteName = state.routes[state.index].name;
      setCurrentScreen(currentRouteName);
    });

    return unsubscribe;
  }, []);

  const { loading } = useSelector((state) => state.auth);

  return loading ? (
    <Loader />
  ) : (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <NavigationContainer>
        <Stack.Navigator initialRouteName="home">
          <Stack.Screen
            name="home"
            component={Home}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="auth"
            component={Auth}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="register"
            component={Register}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="R_camera"
            component={RegisterCamera}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="profile"
            component={Profile}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="SearchResults"
            component={SearchResult}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="cart"
            component={Cart}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="productdetail"
            component={ProductDetail}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Address" component={BuyNow} />
          <Stack.Screen
            name="edit-profile"
            component={EditProfile}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="order"
            component={MyOrder}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Payment" component={Payment} />
          <Stack.Screen
            name="OrderDetails"
            component={OrderDetails}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="resetPasswd"
            component={ResetPasswd}
            options={{ headerShown: false }}
          />


          <Stack.Screen
            name="successOrder"
            component={OrderSuccess}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
        <ToastWrapper />
        {<Footer />}
      </NavigationContainer>
    </>
  );
};

export default Main;
