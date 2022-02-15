import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import CouponsState from "./contexts/coupons/State";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <React.StrictMode>
    <CouponsState>
      <App />
    </CouponsState>
  </React.StrictMode>,
  document.getElementById("root")
);
