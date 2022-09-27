import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserInfo from "../../types/UserInfo/UserInfo";
import { api } from "../../API";
import { AppDispatch } from "../store";

const initialState: {
  isAuth: boolean;
  isLoading: boolean;
  user: UserInfo;
} = {
  isAuth: false,
  isLoading: true,
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
      state.user = action.payload;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setIsAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
  },
});
export const { setUser, setIsLoading, setIsAuth } = userSlice.actions;

export const loadUserAsync =
  (point: string, data?: UserInfo) => async (dispatch: AppDispatch) => {
    const response = await api.post(point, data);
    if (response.ok) {
      dispatch(setIsAuth(true));
      dispatch(setUser(response.user));
    } else {
      dispatch(setUser(initialState.user));
    }
    dispatch(setIsLoading(false));
  };

export default userSlice.reducer;
