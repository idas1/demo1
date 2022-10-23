import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "flag-icon-css/css/flag-icons.css";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import LoadingBar from "react-redux-loading-bar";

import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import history from "./history";
import { Provider } from "react-redux";
import store, { persistor } from "./store/index";
import { PersistGate } from "redux-persist/integration/react";

import "./i18n";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <HistoryRouter history={history}>
        <div className="position-absolute w-100" style={{ zIndex: 1000 }}>
          <LoadingBar updateTime={100} className="bg-danger" style={{ height: "2px" }} />
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnHover
          pauseOnFocusLoss
          draggable
          theme="colored"
        />
        <App />
      </HistoryRouter>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
