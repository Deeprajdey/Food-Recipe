import React from "react";
import { useSelector } from "react-redux";

const Favourites = () => {
  const data = useSelector((state) => state.recipe.recipeData);
  const recipeData = data.filter((ele) => ele.favourite === true);
  return (
    <div className="p-3 w-100 overflow">
      <h1 className="heading text-center border-bottom-2 ">Favourites</h1>
      {recipeData.map((ele, i) => (
        <div key={i} className="grid-2 border-bottom-2 p-bottom-2 m-bottom-2">
          <div>
            <h3 className="title">{ele.recipeName}</h3>
            <img src={ele.recipeImgSrc} alt="image" className="display-img" />
          </div>
          <div>
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

export default Favourites;
