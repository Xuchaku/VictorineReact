import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import StatusAnswer from "../../types/StatusAnswer/StatusAnswer";
const initialState: {
  totalScore: number;
  currentTime: number;
  status: StatusAnswer;
} = {
  totalScore: 0,
  currentTime: 0,
  status: { type: "", text: "" },
};

const scoreSlice = createSlice({
  name: "score",
  initialState,
  reducers: {
    setScore(state) {
      state.totalScore += 1;
    },
    setTime(state, action: PayloadAction<number>) {
      state.currentTime = action.payload;
    },
    setStatus(state, action: PayloadAction<StatusAnswer>) {
      state.status = action.payload;
    },
  },
});
export const { setScore, setTime, setStatus } = scoreSlice.actions;
export default scoreSlice.reducer;
