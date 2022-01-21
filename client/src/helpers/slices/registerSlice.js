import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token"),
  error: null,
  successful: null,
  msg: null,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    registersucess(state, action) {
      return { ...state, successful: true, msg: action.payload };
    },
  },
});

export const { registersucess } = registerSlice.actions;

export default registerSlice.reducer;
