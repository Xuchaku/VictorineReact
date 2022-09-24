import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import Settings from "./../../types/Settings/Settings";

const initialState: { settings: Settings } = {
  settings: {
    categorie: "",
    mode: "public",
    players: "2",
  },
};
const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGameSettings(state, action: PayloadAction<Settings>) {
      state.settings = action.payload;
    },
  },
});
export default gameSlice.reducer;
export const { setGameSettings } = gameSlice.actions;
