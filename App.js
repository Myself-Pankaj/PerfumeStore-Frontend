import React from "react";
import Main from "./Main";
import { Provider } from "react-redux";
import store from "./States/Store";

export default function App() {
  return (
    <Provider store={store}>
       <Main />
    </Provider>
     
  
  );
}
