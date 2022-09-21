import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "./store/store";
import { setUser, loadUserAsync } from "./store/userSlice/userSlice";
import { api } from "./API";
import { POINT_API_ONLINE } from "./constants/constants";
import "./App.scss";
import PrivatePage from "./hoc/PrivatePage";
import Auth from "./context/Auth";
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
  const [isAuth, setIsAuth] = useState(false);
  const dispatch = useAppDispatch();
  function setIsAuthWrapper(data: boolean) {
    setIsAuth(data);
  }
  useEffect(() => {
    initUser();
  }, []);
  async function initUser() {
    const response = await api.post(POINT_API_ONLINE);
    console.log(response);
    if (!response.ok) {
      setIsAuth(false);
    } else {
      setIsAuth(true);
      dispatch(loadUserAsync());
    }
  }
  return (
    <Auth.Provider value={{ isAuth, setIsAuthWrapper }}>
      <Routes>
        <Route path="/" element={<Main></Main>}>
          <Route path="/" element={<About></About>}></Route>
          <Route path="menu" element={<Menu></Menu>}></Route>
          <Route path="game" element={<Game></Game>}></Route>
        </Route>
        <Route
          path="user"
          element={
            <PrivatePage>
              <User />
            </PrivatePage>
          }
        ></Route>
        <Route path="login" element={<Login></Login>}></Route>
        <Route
          path="edituser"
          element={
            <PrivatePage>
              <EditUser />
            </PrivatePage>
          }
        ></Route>
        <Route
          path="registration"
          element={<Registration></Registration>}
        ></Route>
        <Route path="*" element={<Error></Error>}></Route>
      </Routes>
    </Auth.Provider>
  );
}

export default App;
