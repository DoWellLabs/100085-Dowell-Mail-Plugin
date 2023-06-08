import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

document.addEventListener("DOMContentLoaded", function () {
  var element = document.getElementById("wpde-admin-app");
  if (typeof element !== "undefined" && element !== null) {
    ReactDOM.render(<App />, document.getElementById("wpde-admin-app"));
  }
});
