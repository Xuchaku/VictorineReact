import React, { useLayoutEffect, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./store/store";
import { loadUserAsync } from "./store/userSlice/userSlice";

import WebSocketApiService from "./API/WebSocketApiService";
import { POINT_API_GET_USER } from "./constants/constants";
import "./App.scss";
import { Provider } from "react";
import WebSocketContext from "./context/WebSocketContext";
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
//import useWebSocket from "./hooks/useWebSocket";
import Rooms from "./pages/Rooms/Rooms";

function App() {
  const dispatch = useAppDispatch();
  const { isAuth, user } = useAppSelector((state) => state.user);
  const [socket, setSocket] = useState<null | WebSocketApiService>(null);

  useEffect(() => {
    initUser();
  }, []);

  useEffect(() => {
    if (isAuth) {
      setSocket(new WebSocketApiService());
    }
  }, [isAuth]);
  useEffect(() => {}, []);

  async function initUser() {
    dispatch(loadUserAsync(POINT_API_GET_USER));
  }
  return (
    <WebSocketContext.Provider value={socket}>
      <Routes>
        <Route path="/" element={<Main></Main>}>
          <Route path="/" element={<About></About>}></Route>
          <Route path="menu" element={<Menu></Menu>}></Route>
          <Route path="game" element={<Game></Game>}></Route>
          <Route path="rooms" element={<Rooms />}></Route>
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
    </WebSocketContext.Provider>
  );
}

export default App;
