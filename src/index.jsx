import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./index.css";

import ReactDOM from "react-dom/client";
import {createBrowserRouter, redirect, RouterProvider} from "react-router-dom"

//import Navbar from "./Components/Navbar";
import Home from "./Routes/Home";
import Login from "./Routes/Login"
import LogOut from "./Routes/logOut"
import Detail from "./Routes/Detail"
//import Footer from "./Components/Footer";

import App from "./App";
import {MainProvider} from "./Hooks/mainContext"


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {
        path: "/",
        loader: () => redirect('/home')
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/logout",
        element: <LogOut />
      },
      {
        path: "/dentist/:idDentist",
        element: <Detail />
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MainProvider>
      <RouterProvider router={router} />
    </MainProvider>
  </React.StrictMode>
);
