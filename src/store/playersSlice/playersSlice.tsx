import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Player from "../../types/Player/Player";
const initialState: { players: Player[] } = {
  players: [],
};
const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    setPlayer(state, action: PayloadAction<Player>) {
      state.players = [...state.players, action.payload];
    },
    deletePlayer(state, action: PayloadAction<Player>) {
      state.players = state.players.filter((player: Player) => {
        return player.login != action.payload.login;
      });
    },
    clearAllPlayers(state) {
      state.players = [];
    },
  },
});
export const { setPlayer, deletePlayer, clearAllPlayers } =
  playersSlice.actions;
export default playersSlice.reducer;
