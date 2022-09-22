import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserInfo from "../../types/UserInfo/UserInfo";
import { api } from "../../API";
import { AppDispatch } from "../store";
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
// export const authUserAsync =
//   (point: string) => async (dispatch: AppDispatch) => {
//     dispatch(setIsLoading(true));
//     const response = await api.post(point);
//     if (response.ok) {
//       dispatch(setIsLoading(false));
//       dispatch(setIsAuth(true));
//     } else {
//       dispatch(setIsLoading(false));
//       dispatch(setIsAuth(false));
//     }
//   };
export const loadUserAsync =
  (point: string, data?: UserInfo) => async (dispatch: AppDispatch) => {
    //dispatch(setIsLoading(true));
    const response = await api.post(point, data);
    console.log(response);
    if (response.ok) {
      console.log("herer");
      dispatch(setIsLoading(false));
      dispatch(setIsAuth(true));
      dispatch(setUser(response.user));
    } else {
      dispatch(setIsLoading(false));
      dispatch(setUser(initialState.user));
    }
  };

export default userSlice.reducer;
