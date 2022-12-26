import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./store/store";
import ErrorRoute from "./components/ErrorRoute";
import Registration from "./components/Registration";
import Login from "./components/Login";
import ShowAllRecipe from "./components/ShowAllRecipe";
import AddRecipe from "./components/AddRecipe";
import Favourites from "./components/Favourites";
import EditRecipe from "./components/EditRecipe";
import Dashboard from "./components/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorRoute />,
  },
  {
    path: "/registration",
    element: <Registration />,
    errorElement: <ErrorRoute />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorRoute />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <ErrorRoute />,
    children: [
      {
        path: "show-all-recipe",
        element: <ShowAllRecipe />,
      },
      {
        path: "add-recipe",
        element: <AddRecipe />,
      },
      {
        path: "edit-recipe/:recipeName",
        element: <EditRecipe />,
      },
      {
        path: "favourites",
        element: <Favourites />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
