import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./style/index.css";
import "./style/templates.css";
import "./style/colortheme.css";
import "./style/static.css";
import "./style/responsive.css";
import "./style/loader.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/store";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import "./i18n";
ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback="loading">
      <App />
    </Suspense>
  </Provider>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
