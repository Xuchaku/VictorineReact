import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import userReducer from "./userSlice/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
export default store;
export type AppDispatch = typeof store.dispatch; // you can use this Dispatch type in your thunks
export const useAppDispatch = () => useDispatch<AppDispatch>();
