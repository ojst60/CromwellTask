import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../helpers/slices/loginSlice";
import registerReducer from "../helpers/slices/registerSlice";

export default configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer
  },
});
