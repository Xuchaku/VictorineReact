import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserInfo from "../../types/UserInfo/UserInfo";
import { api } from "../../API";
import { AppDispatch } from "../store";
const initialState = {
  user: {
    login: "",
    dataRegistrate: "",
    imgUrl: "",
    link: "",
    about: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserInfo>) {
      console.log(action.payload);
      state.user = action.payload;
    },
  },
});
export const { setUser } = userSlice.actions;
export const loadUserAsync =
  (point: string, data?: UserInfo) => async (dispatch: AppDispatch) => {
    const response = await api.post(point, data);

    if (response.ok) {
      dispatch(setUser(response.user));
    } else {
      dispatch(setUser(initialState.user));
    }
  };

export default userSlice.reducer;
