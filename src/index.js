import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// provider now from react-redux
import { Provider } from "react-redux";
import { store } from "./store/store";

import "./index.scss";
import App from "./App";
// formerly used for global state management

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        {/* <UserProvider> */} {/* user comes now through the store */}
        {/* <CategoriesProvider> */} {/* user comes now through the store */}
        {/* <CartProvider> */}
        <App />
        {/* </CartProvider> */}
        {/* </CategoriesProvider> */}
        {/* </UserProvider> */}
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
