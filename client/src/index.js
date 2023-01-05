import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import Login from "./Pages/Login";
import Nav from "./Pages/Nav";
import Order from "./Pages/Order";
import AddHospital from "./Pages/AddHospital";
import UserHospital from "./Pages/UserHospital";
import Orderlist from "./Pages/Orderlist";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Nav />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/order",
        element: <Order />,
      },
      { path: "/addHospital", element: <AddHospital/> },
      { path: "/myHospitals", element: <UserHospital/> },
      { path: "/orderlist", element: <Orderlist /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
