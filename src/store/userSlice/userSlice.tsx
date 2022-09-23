import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserInfo from "../../types/UserInfo/UserInfo";
import { api } from "../../API";
import { AppDispatch } from "../store";
import LoginUser from "../../types/LoginUser/LoginUser";
import Status from "../../types/Status/Status";
import { POINT_API_GET_USER } from "../../constants/constants";
const initialState = {
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
      console.log(action.payload);
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
    //dispatch(setIsLoading(true));
    const response = await api.post(point, data);
    console.log(response);
    if (response.ok) {
      //dispatch(setIsLoading(false));
      dispatch(setIsAuth(true));
      dispatch(setUser(response.user));
    } else {
      //dispatch(setIsLoading(false));
      dispatch(setUser(initialState.user));
    }
    dispatch(setIsLoading(false));
  };

export default userSlice.reducer;
