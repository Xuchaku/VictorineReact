import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../../types/User/User";
import { POINT_API_GET_USER } from "../../constants/constants";
import { api } from "../../API";
import { AppDispatch } from "../store";
const initialState: User = {
  login: "",
  dataRegistrate: "",
  imgUrl: "",
  link: "",
  about: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state = action.payload;
    },
  },
});
export const { setUser } = userSlice.actions;
export const loadUserAsync = () => async (dispatch: AppDispatch) => {
  const response = await api.post(POINT_API_GET_USER);
  console.log(response);
  if (response.ok) {
    dispatch(setUser(response.user));
  } else {
    dispatch(setUser(initialState));
  }
};
export default userSlice.reducer;
