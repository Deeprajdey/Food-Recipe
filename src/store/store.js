import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./reducers/userSlice";
import recipeReducer from "./reducers/recipeSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    recipe: recipeReducer,
  },
});
