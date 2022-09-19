import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

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
  function setIsAuthWrapper(data: boolean) {
    setIsAuth(data);
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
