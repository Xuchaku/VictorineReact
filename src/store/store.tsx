import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import userReducer from "./userSlice/userSlice";
import playersReducer from "./playersSlice/playersSlice";
import gameReducer from "./gameSlice/gameSlice";
import roomsReducer from "./roomsSlice/roomsSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    players: playersReducer,
    game: gameReducer,
    rooms: roomsReducer,
  },
});
export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
