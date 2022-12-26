import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-deep-blue p-3 min-vh-90 min-w-24">
      <h1 className="title text-white">Food Recipe</h1>
      <div className="p-3 flex-align-left flex-col ">
        <Link className="dashboard-link" to={"/dashboard/add-recipe"}>
          Add Recipe
        </Link>
        <Link className="dashboard-link" to={"/dashboard/show-all-recipe"}>
          Show All Recipe
        </Link>
        <Link className="dashboard-link" to={"/dashboard/favourites"}>
          Favourites
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
