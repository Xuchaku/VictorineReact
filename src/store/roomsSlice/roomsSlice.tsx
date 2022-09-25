import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import GameSettings from "../../types/GameSettings/GameSettings";
const initialState: { activeRooms: GameSettings[] } = {
  activeRooms: [],
};
const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    setRoom(state, action: PayloadAction<GameSettings>) {
      state.activeRooms = [...state.activeRooms, action.payload];
    },
    setRooms(state, action: PayloadAction<GameSettings[]>) {
      state.activeRooms = [...action.payload];
    },
  },
});
export default roomsSlice.reducer;
export const { setRoom, setRooms } = roomsSlice.actions;
