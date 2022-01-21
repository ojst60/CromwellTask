import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: null,
  error: null,
  user: null,
  localStore: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      return {
        ...state,
        isAuthenticated: true,
        error: null,
        user: action.payload,
      };
    },
    loginFail: (state, action) => {
      return {
        ...state,
        isAuthenticated: false,
        error: action.payload,
        user: action.payload,
      };
    },
    logOut: (state) => {
      return {
        ...state,
        isAuthenticated: false,
        error: null,
        user: null,
        localStore: localStorage.clear(),
      };
    },
  },
});

export const { loginSuccess, loginFail, logOut } = loginSlice.actions;

export default loginSlice.reducer;
