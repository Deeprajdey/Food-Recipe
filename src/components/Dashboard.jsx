import React from "react";
import Sidebar from "./Sidebar";
import "./Dashboard.css";
import AddRecipe from "./AddRecipe";
import ShowAllRecipe from "./ShowAllRecipe";
import { Outlet } from "react-router-dom";
const Dashboard = () => {
  return (
    <div className="Dashboard flex-left">
      <Sidebar />
      <Outlet />
      {/* <AddRecipe /> */}
      {/* <ShowAllRecipe /> */}
    </div>
  );
};

export default Dashboard;
