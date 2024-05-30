import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { persistor, store } from "../src/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import AuthProvider from "./components/AuthProvider/AuthProvider";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <Provider store={store}>
      <PersistGate loading={"loading"} persistor={persistor}>
        <App />
        <ToastContainer style={{ display: "grid", placeItems: "center", textAlign: "center", }} />
      </PersistGate>
    </Provider>
  </AuthProvider>
);
