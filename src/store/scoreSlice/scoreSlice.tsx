import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Results from "../../types/Results/Results";
import StatusAnswer from "../../types/StatusAnswer/StatusAnswer";
const initialState: {
  totalScore: number;
  currentTime: number;
  status: StatusAnswer;
  results: Results[];
} = {
  totalScore: 0,
  currentTime: 0,
  status: { type: "", text: "" },
  results: [],
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
    setResults(state, action: PayloadAction<Results[]>) {
      state.results = action.payload;
    },
  },
});
export const { setScore, setTime, setStatus, setResults } = scoreSlice.actions;
export default scoreSlice.reducer;
