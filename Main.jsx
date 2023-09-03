import { View, Text, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer, useRoute } from "@react-navigation/native";
import "react-native-gesture-handler";
import Home from "./Screens/Home";

import Login from "./Screens/Login";
import Register from "./Screens/Register";
import CameraComponent from "./Screens/Camera";
import ToastWrapper from "./Component/ToastWrapper";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./Redux/Actions/UserAction";
import Verify from "./Screens/Verify";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Loader from "./Component/Loader";
import Dashboard from "./Screens/Dashboard";
import AddItem from "./Component/AddItem";
import RegisterCamera from "./Component/RegisterCamera";
import AddVideo from "./Component/AddVideo";
import ProductDetail from "./Component/ProductDetail";
import Cart from "./Screens/Cart";
import HangOn from "./Component/HangOn";
import BuyNow from "./Component/BuyNow";
import Order from "./Component/Order";
import OrderSuccess from "./Component/OrderSuccess";
import Footer from "./Component/Footer";
import Profile from "./Component/Profile";
import EditProfile from "./Component/EditProfile";
import MyOrder from "./Component/MyOrder";
import OrderDetails from "./Component/OrderDetails";
import SearchResult from "./Component/SearchResult";
import ResetPasswd from "./Component/ResetPasswd";

const Stack = createNativeStackNavigator();
const navigationRef = React.createRef();

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const [currentScreen, setCurrentScreen] = useState("");

  useEffect(() => {
    const unsubscribe = navigationRef.current?.addListener("state", (state) => {
      const currentRouteName = state.routes[state.index].name;
      setCurrentScreen(currentRouteName);
    });

    return unsubscribe;
  }, []);

  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  return loading ? (
    <Loader />
  ) : (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName={isAuthenticated ? "home" : "login"}>
          <Stack.Screen
            name="login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="verify"
            component={Verify}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="loader"
            component={Loader}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="addvedio"
            component={AddVideo}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="rcamera"
            component={RegisterCamera}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="camera"
            component={CameraComponent}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="dashboard"
            component={Dashboard}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="hangon"
            component={HangOn}
            options={{ headerShown: false }}
          />

          {/* //Dashboard Component */}

          <Stack.Screen
            name="additem"
            component={AddItem}
            options={{ headerShown: false }}
          />

          {/* //Product Componet */}
          <Stack.Screen
            name="productdetail"
            component={ProductDetail}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="cart"
            component={Cart}
            options={{ headerShown: false }}
          />

          <Stack.Screen name="Address" component={BuyNow} />

          <Stack.Screen name="Payment" component={Order} />

          <Stack.Screen
            name="successOrder"
            component={OrderSuccess}
            options={{ headerShown: false }}
          />

          {/* //Profile */}
          <Stack.Screen
            name="profile"
            component={Profile}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="hot-featured"
            component={Loader}
            options={{ headerShown: false }}
          />

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

          {/* Search */}
          <Stack.Screen
            name="SearchResults"
            component={SearchResult}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
        <ToastWrapper />
        {isAuthenticated && <Footer />}
      </NavigationContainer>
    </>
  );
};

export default Main;

// ==================================================================================================================

// import { View, Text, StatusBar, RefreshControl, ScrollView } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { NavigationContainer } from "@react-navigation/native";
// import 'react-native-gesture-handler';
// import Home from './Screens/Home';
// import { createStackNavigator } from '@react-navigation/stack';
// import Login from './Screens/Login';
// import Register from './Screens/Register';
// import CameraComponent from './Screens/Camera';
// import ToastWrapper from './Component/ToastWrapper';
// import { useDispatch, useSelector } from 'react-redux';
// import { loadUser } from './Redux/Actions/UserAction';
// import Verify from './Screens/Verify';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Loader from './Component/Loader';
// import Dashboard from './Screens/Dashboard';
// import AddItem from './Component/AddItem';
// import RegisterCamera from './Component/RegisterCamera';
// import AddVideo from './Component/AddVideo';
// import ProductDetail from './Component/ProductDetail';
// import Cart from './Screens/Cart';
// import HangOn from './Component/HangOn';

// const Stack = createNativeStackNavigator();

// const Main = () => {
//   const dispatch = useDispatch();
//   const [refreshing, setRefreshing] = useState(false);
//   const [key, setKey] = useState(0);

//   useEffect(() => {
//     dispatch(loadUser());
//   }, [dispatch]);

//   const { isAuthenticated, loading } = useSelector((state) => state.auth);

//   const onRefresh = () => {
//     setRefreshing(true);

//     // Perform the necessary data reload or any other actions

//     setKey(prevKey => prevKey + 1);
//     setRefreshing(false);
//   };

//   return (
//     loading ? <Loader /> : <>
//       <StatusBar barStyle="dark-content" backgroundColor="white" />

//       <ScrollView
//         contentContainerStyle={{ flexGrow: 1 }}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//         }
//       >
//         <NavigationContainer key={key.toString()}>
//           <Stack.Navigator initialRouteName={isAuthenticated ? "home" : "login"}>
//             <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
//             <Stack.Screen name="home" component={Home} options={{ headerShown: false }} />
//             <Stack.Screen name="register" component={Register} options={{ headerShown: false }} />
//             <Stack.Screen name='verify' component={Verify} options={{ headerShown: false }} />
//             <Stack.Screen name='loader' component={Loader} options={{ headerShown: false }} />
//             <Stack.Screen name='addvedio' component={AddVideo} options={{ headerShown: false }} />
//             <Stack.Screen name="rcamera" component={RegisterCamera} options={{ headerShown: false }} />
//             <Stack.Screen name='camera' component={CameraComponent} options={{ headerShown: false }} />
//             <Stack.Screen name='dashboard' component={Dashboard} options={{ headerShown: false }} />

//             <Stack.Screen name='hangon' component={HangOn} options={{ headerShown: false }} />

//             {/* //Dashboard Component */}
//             <Stack.Screen name='additem' component={AddItem} options={{ headerShown: false }} />

//             {/* //Product Component */}
//             <Stack.Screen name='productdetail' component={ProductDetail} options={{ headerShown: false }} />
//             <Stack.Screen name='cart' component={Cart} options={{ headerShown: false }} />

//           </Stack.Navigator>
//           <ToastWrapper />
//         </NavigationContainer>
//       </ScrollView>
//     </>
//   );
// };

// export default Main;
