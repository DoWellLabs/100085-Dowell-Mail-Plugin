// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App";

// document.addEventListener("DOMContentLoaded", function () {
//   var element = document.getElementById("wp-dowell-email");
//   if (typeof element !== "undefined" && element !== null) {
//     ReactDOM.render(<App />, document.getElementById("wp-dowell-email"));
//   }
// });

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("wp-dowell-email"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
