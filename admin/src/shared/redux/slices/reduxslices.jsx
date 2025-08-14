import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminInfo: [],
  location: "",
  locationB: "",
  loginSession: 0,
};

export const reduxSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    adminInfo: (state, action) => {
      state.adminInfo = action.payload;
    },
    userLocation: (state, action) => {
      state.location = action.payload;
    },
    beforeLocation: (state, action) => {
      state.locationB = action.payload;
    },
    logoutUser: (state) => {
      state.adminInfo = null;
      state.location = null;
      state.loginSession = 0;
    },
    loginSession: (state, action) => {
      state.loginSession = action.payload;
    },
  },
});

export const {
  adminInfo,
  logoutUser,
  userLocation,
  beforeLocation,
  loginSession,
} = reduxSlice.actions;
export default reduxSlice.reducer;
