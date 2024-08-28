import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import List from "./pages/List";
import About from "./pages/About";
import Detail from "./pages/Detail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/games", element: <List /> },
      { path: "/about", element: <About /> },
      { path: `/games/:gameID`, element: <Detail /> },
      { path: "*", element: <Navigate to="/" /> },
    ],
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
