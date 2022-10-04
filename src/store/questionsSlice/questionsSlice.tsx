import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import QuestionLocal from "../../types/QuestionLocal/QuestionLocal";

const initialState: {
  isReady: boolean;
  isDone: boolean;
  currentQuestionNumber: number;
  uniqId: string;
  questions: QuestionLocal[];
} = {
  isReady: false,
  isDone: false,
  currentQuestionNumber: 0,
  uniqId: "",
  questions: [],
};
const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setReadyForQuestions(state, action: PayloadAction<boolean>) {
      state.isReady = action.payload;
    },
    setQuestions(state, action: PayloadAction<QuestionLocal[]>) {
      state.questions = action.payload;
    },
    setIdQuestions(state, action: PayloadAction<string>) {
      state.uniqId = action.payload;
    },
    setQuestionNumber(state, action: PayloadAction<number>) {
      state.currentQuestionNumber = action.payload;
    },
  },
});
export const {
  setReadyForQuestions,
  setQuestions,
  setIdQuestions,
  setQuestionNumber,
} = questionsSlice.actions;
export default questionsSlice.reducer;
