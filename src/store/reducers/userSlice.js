import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: { firstName: "", lastName: "", email: "", dashboard: false },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserData: (state, action) => {
      state.userData = { ...action.payload };
    },
    openDashboard: (state) => {
      state.userData = { ...state.userData, dashboard: true };
    },
  },
});

export const { addUserData, openDashboard } = userSlice.actions;

export default userSlice.reducer;
