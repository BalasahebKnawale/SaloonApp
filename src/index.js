// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter as Router } from "react-router-dom";

// import "./index.css";
// import App from "./App";
// import { CartProvider } from "./context/CartContext";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <CartProvider>
//       <Router>
//         <App />
//       </Router>
//     </CartProvider>
//   </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { CartProvider } from "./context/CartContext";
import { router } from "./routes/router"; // Import the router configuration

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CartProvider>
    <RouterProvider router={router} />
  </CartProvider>
);
