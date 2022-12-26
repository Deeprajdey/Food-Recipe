import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipeData: [],
};

export const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    addRecipeData: (state, action) => {
      state.recipeData = [...state.recipeData, { ...action.payload }];
    },
    updateFavourites: (state, action) => {
      const myRecipe = state.recipeData.find(
        (ele) => ele.recipeName === action.payload
      );
      const restRecipes = state.recipeData.filter(
        (ele) => ele.recipeName !== action.payload
      );
      myRecipe.favourite = true;
      state.recipeData = [myRecipe, ...restRecipes];
    },
    updateRecipeData: (state, action) => {
      const restRecipes = state.recipeData.filter(
        (ele) => ele.recipeName !== action.payload.recipeName
      );
      state.recipeData = [action.payload.myRecipe, ...restRecipes];
    },
  },
});

export const { addRecipeData, updateFavourites, updateRecipeData } =
  recipeSlice.actions;

export default recipeSlice.reducer;
