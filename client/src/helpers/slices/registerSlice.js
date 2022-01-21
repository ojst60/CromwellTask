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
    registerfail: (state, action) => {
      state.error = action.payload;
      state.successful = false;
    },
  },
});

export const { registersucess, registerfail } = registerSlice.actions;

export default registerSlice.reducer;
