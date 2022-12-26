import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { updateFavourites } from "../store/reducers/recipeSlice";

const ShowAllRecipe = () => {
  const recipeData = useSelector((state) => state.recipe.recipeData);
  const dispatch = useDispatch();
  return (
    <div className="p-3 w-100 overflow">
      <h1 className="heading text-center border-bottom-2 ">All Recipes</h1>
      {recipeData.map((ele, i) => (
        <div key={i} className="grid-2 border-bottom-2 p-bottom-2 m-bottom-2">
          <div>
            <h3 className="title">{ele.recipeName}</h3>
            <img src={ele.recipeImgSrc} alt="image" className="display-img" />
          </div>
          <div>
            <div className="grid-2 m-bottom-2">
              <button
                className="input-btn"
                onClick={() => {
                  dispatch(updateFavourites(ele.recipeName));
                }}
              >
                Add favourite
              </button>
              <Link
                className="input-btn edit-link"
                to={`/dashboard/edit-recipe/${ele.recipeName}`}
              >
                Edit
              </Link>
            </div>
            <h3 className="title m-bottom-2">Ingredients</h3>
            {ele?.ingredients?.map((ing, j) => (
              <div className="grid-3" key={j}>
                <ion-icon name="chevron-forward-outline"></ion-icon>
                <span className="ingredient">{ing.ingredient}</span>
                <span className="ingredient">{ing.value}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowAllRecipe;
