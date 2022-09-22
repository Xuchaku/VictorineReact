import React, { useLayoutEffect, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useAppDispatch } from "./store/store";
import { loadUserAsync } from "./store/userSlice/userSlice";
import { api } from "./API";
import { POINT_API_GET_USER, POINT_API_ONLINE } from "./constants/constants";
import "./App.scss";
import PrivatePage from "./hoc/PrivatePage";
import Game from "./pages/Game/Game";
import Login from "./pages/Login/Login";
import Main from "./pages/Main/Main";
import Menu from "./pages/Menu/Menu";
import User from "./pages/User/User";
import EditUser from "./pages/EditUser/EditUser";
import Error from "./pages/Error/Error";
import About from "./pages/About/About";
import Registration from "./pages/Registration/Registration";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    initUser();
  }, []);
  async function initUser() {
    //dispatch(authUserAsync(POINT_API_ONLINE));
    dispatch(loadUserAsync(POINT_API_GET_USER));
  }
  return (
    <Routes>
      <Route path="/" element={<Main></Main>}>
        <Route path="/" element={<About></About>}></Route>
        <Route path="menu" element={<Menu></Menu>}></Route>
        <Route path="game" element={<Game></Game>}></Route>
      </Route>
      <Route path="user" element={<User />}></Route>
      <Route path="login" element={<Login></Login>}></Route>
      <Route path="edituser" element={<EditUser />}></Route>
      <Route
        path="registration"
        element={<Registration></Registration>}
      ></Route>
      <Route path="*" element={<Error></Error>}></Route>
    </Routes>
  );
}

export default App;
